import { create } from 'zustand';
import { Character, Message, Location } from './types';
import { locations } from './data/locations';

interface GameState {
  character: Character;
  currentLocation: Location;
  messages: Message[];
  addMessage: (text: string, sender: 'player' | 'dm') => void;
  updateCharacter: (updates: Partial<Character>) => void;
  moveToLocation: (locationId: string) => void;
  processCommand: (command: string) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  character: {
    name: 'Adventurer',
    class: 'Warrior',
    level: 1,
    hp: 100,
    maxHp: 100,
    mp: 50,
    maxMp: 50,
    strength: 15,
    dexterity: 12,
    intelligence: 10,
    inventory: ['Health Potion', 'Rusty Sword', 'Leather Armor'],
  },
  currentLocation: locations['entrance-hall'],
  messages: [
    {
      id: '1',
      text: 'You stand in the Entrance Hall of an ancient dungeon. Mysterious runes cover the weathered stone walls, their faint glow providing just enough light to see. What exits do you see?',
      sender: 'dm',
      timestamp: Date.now(),
    },
  ],
  addMessage: (text, sender) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: Math.random().toString(36).substring(7),
          text,
          sender,
          timestamp: Date.now(),
        },
      ],
    })),
  updateCharacter: (updates) =>
    set((state) => ({
      character: { ...state.character, ...updates },
    })),
  moveToLocation: (locationId) => {
    const newLocation = locations[locationId];
    if (newLocation) {
      set({ currentLocation: newLocation });
      const { addMessage } = get();
      addMessage(`You move to ${newLocation.name}.`, 'dm');
      addMessage(newLocation.description, 'dm');
      
      // Describe what's in the room
      const roomContents = [];
      if (newLocation.items && newLocation.items.length > 0) {
        roomContents.push(`You see: ${newLocation.items.join(', ')}`);
      }
      if (newLocation.enemies && newLocation.enemies.length > 0) {
        roomContents.push(`Beware! You spot: ${newLocation.enemies.join(', ')}`);
      }
      if (roomContents.length > 0) {
        addMessage(roomContents.join('\n'), 'dm');
      }

      // Describe exits
      const exitDescriptions = newLocation.exits.map(
        exit => `To the ${exit.direction}: ${exit.description}`
      );
      addMessage(`Available exits:\n${exitDescriptions.join('\n')}`, 'dm');
    }
  },
  processCommand: (command) => {
    const { currentLocation, addMessage, moveToLocation } = get();
    const normalizedCommand = command.toLowerCase().trim();

    // Handle movement commands
    if (normalizedCommand.startsWith('go ') || normalizedCommand.startsWith('move ')) {
      const direction = normalizedCommand.split(' ')[1];
      const exit = currentLocation.exits.find(
        e => e.direction.toLowerCase() === direction
      );

      if (exit) {
        moveToLocation(exit.leadsTo);
      } else {
        addMessage(`You cannot go ${direction} from here.`, 'dm');
      }
      return;
    }

    // Handle look command
    if (normalizedCommand === 'look' || normalizedCommand === 'examine') {
      addMessage(currentLocation.description, 'dm');
      if (currentLocation.items && currentLocation.items.length > 0) {
        addMessage(`You see: ${currentLocation.items.join(', ')}`, 'dm');
      }
      return;
    }

    // Handle exits command
    if (normalizedCommand === 'exits') {
      const exitDescriptions = currentLocation.exits.map(
        exit => `To the ${exit.direction}: ${exit.description}`
      );
      addMessage(`Available exits:\n${exitDescriptions.join('\n')}`, 'dm');
      return;
    }

    // Default response for unrecognized commands
    addMessage("I don't understand that command. Try 'go [direction]', 'look', or 'exits'.", 'dm');
  },
}));
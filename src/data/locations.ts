export const locations = {
  'entrance-hall': {
    id: 'entrance-hall',
    name: 'Entrance Hall',
    description: 'A dimly lit hall with ancient stone walls covered in mysterious runes. Dust motes dance in the few rays of light that pierce through the cracks above.',
    environment: 'Underground Structure',
    danger: 'safe' as const,
    exits: [
      {
        direction: 'north',
        description: 'A grand archway leads to what appears to be a library',
        leadsTo: 'ancient-library'
      },
      {
        direction: 'east',
        description: 'A narrow corridor extends into darkness',
        leadsTo: 'dark-corridor'
      }
    ],
    items: ['Unlit Torch']
  },
  'ancient-library': {
    id: 'ancient-library',
    name: 'Ancient Library',
    description: 'Towering bookshelves line the walls, filled with ancient tomes. The air is thick with the musty smell of old parchment.',
    environment: 'Library',
    danger: 'caution' as const,
    exits: [
      {
        direction: 'south',
        description: 'The archway leads back to the entrance hall',
        leadsTo: 'entrance-hall'
      },
      {
        direction: 'west',
        description: 'A secret passage behind a bookshelf',
        leadsTo: 'hidden-study'
      }
    ],
    items: ['Mysterious Scroll', 'Dusty Book'],
    enemies: ['Hostile Living Book']
  },
  'dark-corridor': {
    id: 'dark-corridor',
    name: 'Dark Corridor',
    description: 'A long, narrow corridor stretches into darkness. Water drips somewhere in the distance, creating an eerie echo.',
    environment: 'Corridor',
    danger: 'dangerous' as const,
    exits: [
      {
        direction: 'west',
        description: 'Return to the entrance hall',
        leadsTo: 'entrance-hall'
      },
      {
        direction: 'north',
        description: 'A heavy wooden door',
        leadsTo: 'treasure-room'
      }
    ],
    enemies: ['Shadow Lurker']
  },
  'hidden-study': {
    id: 'hidden-study',
    name: 'Hidden Study',
    description: 'A cozy room filled with strange artifacts and magical implements. A crystal ball glows softly on a central desk.',
    environment: 'Study',
    danger: 'safe' as const,
    exits: [
      {
        direction: 'east',
        description: 'Back through the secret passage to the library',
        leadsTo: 'ancient-library'
      }
    ],
    items: ['Crystal Ball', 'Magic Wand']
  },
  'treasure-room': {
    id: 'treasure-room',
    name: 'Treasure Room',
    description: 'Golden light fills this chamber from an unknown source. Chests and valuable artifacts line the walls.',
    environment: 'Vault',
    danger: 'dangerous' as const,
    exits: [
      {
        direction: 'south',
        description: 'Back to the dark corridor',
        leadsTo: 'dark-corridor'
      }
    ],
    items: ['Golden Chalice', 'Ancient Coin'],
    enemies: ['Guardian Golem']
  }
};
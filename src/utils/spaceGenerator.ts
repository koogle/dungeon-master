import { Location, Exit } from '../types';

const environments = [
  'Dungeon',
  'Cave',
  'Crypt',
  'Temple',
  'Library',
  'Laboratory',
  'Chamber',
  'Hall',
  'Sanctum',
  'Vault'
] as const;

const adjectives = [
  'Ancient',
  'Dark',
  'Mysterious',
  'Haunted',
  'Forgotten',
  'Sacred',
  'Hidden',
  'Cursed',
  'Ethereal',
  'Arcane'
] as const;

const features = [
  'with towering pillars of stone',
  'filled with mysterious artifacts',
  'where shadows dance in the corners',
  'covered in glowing runes',
  'with walls that whisper ancient secrets',
  'shrouded in magical mist',
  'lined with strange symbols',
  'where echoes of the past linger',
  'bathed in an otherworldly light',
  'decorated with intricate carvings'
];

const items = [
  'Ancient Scroll',
  'Mysterious Potion',
  'Enchanted Gem',
  'Runic Tablet',
  'Crystal Shard',
  'Magic Orb',
  'Cursed Amulet',
  'Golden Artifact',
  'Sacred Relic',
  'Ethereal Fragment'
];

const enemies = [
  'Shadow Wraith',
  'Ancient Guardian',
  'Cursed Spirit',
  'Dark Sentinel',
  'Ethereal Beast',
  'Corrupted Construct',
  'Spectral Knight',
  'Void Creature',
  'Eldritch Horror',
  'Arcane Golem'
];

const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const generateLocationId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

const generateDescription = (environment: string, adjective: string): string => {
  const feature = getRandomElement(features);
  return `A ${adjective.toLowerCase()} ${environment.toLowerCase()} ${feature}. ${
    Math.random() > 0.5
      ? 'The air feels thick with ancient magic.'
      : 'An eerie silence fills the space.'
  }`;
};

const generateDanger = (): Location['danger'] => {
  const chance = Math.random();
  if (chance < 0.3) return 'safe';
  if (chance < 0.7) return 'caution';
  return 'dangerous';
};

const generateItems = (): string[] => {
  const numItems = Math.floor(Math.random() * 3);
  const locationItems: string[] = [];
  for (let i = 0; i < numItems; i++) {
    locationItems.push(getRandomElement(items));
  }
  return locationItems;
};

const generateEnemies = (danger: Location['danger']): string[] => {
  if (danger === 'safe') return [];
  const numEnemies = danger === 'caution' ? 1 : Math.floor(Math.random() * 2) + 1;
  const locationEnemies: string[] = [];
  for (let i = 0; i < numEnemies; i++) {
    locationEnemies.push(getRandomElement(enemies));
  }
  return locationEnemies;
};

export const generateLocation = (existingExits: Exit[] = []): Location => {
  const id = generateLocationId();
  const environment = getRandomElement(environments);
  const adjective = getRandomElement(adjectives);
  const danger = generateDanger();

  const location: Location = {
    id,
    name: `${adjective} ${environment}`,
    description: generateDescription(environment, adjective),
    environment: environment,
    danger,
    exits: existingExits,
    items: generateItems(),
    enemies: generateEnemies(danger),
  };

  return location;
};
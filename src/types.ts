export interface Character {
  name: string;
  class: string;
  level: number;
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  strength: number;
  dexterity: number;
  intelligence: number;
  inventory: string[];
}

export interface Exit {
  direction: string;
  description: string;
  leadsTo: string;
}

export interface Location {
  id: string;
  name: string;
  description: string;
  environment: string;
  danger: 'safe' | 'caution' | 'dangerous';
  exits: Exit[];
  items?: string[];
  enemies?: string[];
}

export interface Message {
  id: string;
  text: string;
  sender: 'player' | 'dm';
  timestamp: number;
}
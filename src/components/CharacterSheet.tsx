import React from 'react';
import { Shield, Sword, Brain, Heart, Zap } from 'lucide-react';
import { useGameStore } from '../store';

export const CharacterSheet = () => {
  const character = useGameStore((state) => state.character);

  return (
    <div className="bg-stone-800 rounded-lg p-6 text-white">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-amber-400">{character.name}</h2>
        <p className="text-stone-400">Level {character.level} {character.class}</p>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Heart className="text-red-500" size={20} />
            <div className="w-full bg-stone-700 rounded-full h-2">
              <div 
                className="bg-red-500 rounded-full h-2"
                style={{ width: `${(character.hp / character.maxHp) * 100}%` }}
              />
            </div>
            <span className="text-sm">{character.hp}/{character.maxHp}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Zap className="text-blue-400" size={20} />
            <div className="w-full bg-stone-700 rounded-full h-2">
              <div 
                className="bg-blue-400 rounded-full h-2"
                style={{ width: `${(character.mp / character.maxMp) * 100}%` }}
              />
            </div>
            <span className="text-sm">{character.mp}/{character.maxMp}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <Sword className="text-red-400" size={16} />
            <span className="text-sm">STR: {character.strength}</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="text-green-400" size={16} />
            <span className="text-sm">DEX: {character.dexterity}</span>
          </div>
          <div className="flex items-center gap-2">
            <Brain className="text-purple-400" size={16} />
            <span className="text-sm">INT: {character.intelligence}</span>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-stone-400 mb-2">Inventory</h3>
          <div className="bg-stone-900 rounded p-2">
            <ul className="text-sm space-y-1">
              {character.inventory.map((item, index) => (
                <li key={index} className="text-stone-300">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
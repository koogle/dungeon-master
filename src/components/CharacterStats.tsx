import React from 'react';
import { useGameStore } from '../store';

export const CharacterStats = () => {
  const character = useGameStore((state) => state.character);

  const StatBar = ({ current, max, label }: { current: number; max: number; label: string }) => (
    <div className="mb-2">
      <div className="flex justify-between text-xs mb-1">
        <span>{label}</span>
        <span>{current}/{max}</span>
      </div>
      <div className="w-full bg-gray-900 h-1">
        <div
          className="bg-gray-200 h-1"
          style={{ width: `${(current / max) * 100}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="border border-gray-800 p-4">
      <div className="mb-4">
        <h2 className="font-mono text-lg mb-1">{character.name}</h2>
        <p className="text-xs text-gray-500">Level {character.level} {character.class}</p>
      </div>

      <div className="space-y-4">
        <div>
          <StatBar current={character.hp} max={character.maxHp} label="HP" />
          <StatBar current={character.mp} max={character.maxMp} label="MP" />
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="border border-gray-800 p-2">
            <div className="text-gray-500">STR</div>
            <div className="font-mono">{character.strength}</div>
          </div>
          <div className="border border-gray-800 p-2">
            <div className="text-gray-500">DEX</div>
            <div className="font-mono">{character.dexterity}</div>
          </div>
          <div className="border border-gray-800 p-2">
            <div className="text-gray-500">INT</div>
            <div className="font-mono">{character.intelligence}</div>
          </div>
        </div>

        <div>
          <h3 className="text-xs text-gray-500 mb-2">Inventory</h3>
          <div className="border border-gray-800 p-2">
            <ul className="text-xs space-y-1">
              {character.inventory.map((item, index) => (
                <li key={index} className="font-mono">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
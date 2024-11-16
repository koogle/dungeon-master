import React from 'react';
import { GameInterface } from './components/GameInterface';
import { LocationInfo } from './components/LocationInfo';
import { CharacterStats } from './components/CharacterStats';

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="container mx-auto py-6 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-6">
          <section className="h-[600px]">
            <GameInterface />
          </section>
          
          <aside className="space-y-6">
            <LocationInfo />
            <CharacterStats />
          </aside>
        </div>
      </main>
    </div>
  );
}

export default App;
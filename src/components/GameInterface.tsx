import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useGameStore } from '../store';

export const GameInterface = () => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messages = useGameStore((state) => state.messages);
  const addMessage = useGameStore((state) => state.addMessage);
  const processCommand = useGameStore((state) => state.processCommand);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    addMessage(input, 'player');
    processCommand(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full border border-gray-800">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'player' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] p-3 ${
                message.sender === 'player'
                  ? 'border border-gray-800'
                  : 'bg-gray-900'
              }`}
            >
              {message.sender === 'dm' && (
                <div className="text-xs text-gray-500 mb-1">Dungeon Master</div>
              )}
              <p className="text-sm font-mono whitespace-pre-wrap">{message.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-800 p-4">
        <div className="text-xs text-gray-500 mb-2">
          Commands: go [direction], look, exits
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What would you like to do?"
            className="flex-1 bg-transparent border border-gray-800 px-4 py-2 text-sm font-mono focus:outline-none focus:border-gray-600"
          />
          <button
            type="submit"
            className="border border-gray-800 px-4 py-2 hover:bg-gray-900 transition-colors"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
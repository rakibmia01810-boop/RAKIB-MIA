import React from 'react';
import { ImageIcon } from './icons/ImageIcon.tsx';

export const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/60 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <ImageIcon className="h-8 w-8 text-sky-400" />
            <h1 className="text-2xl font-bold ml-3 bg-gradient-to-r from-sky-400 to-indigo-500 text-transparent bg-clip-text">
              Merch Mockup Generator
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};
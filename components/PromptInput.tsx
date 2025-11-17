
import React from 'react';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const PromptInput: React.FC<PromptInputProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-col h-full">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g., A black coffee mug with the logo on it."
        className="w-full flex-grow p-3 bg-slate-900/70 border border-slate-600 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-200 resize-none text-slate-200"
        rows={6}
      />
      <p className="text-xs text-slate-500 mt-2">
        Be descriptive! Mention colors, product types, and styles for best results.
      </p>
    </div>
  );
};

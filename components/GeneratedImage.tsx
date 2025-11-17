import React from 'react';
import { Spinner } from './Spinner.tsx';
import { Button } from './Button.tsx';
import { DownloadIcon } from './icons/DownloadIcon.tsx';
import { ImageIcon } from './icons/ImageIcon.tsx';

interface GeneratedImageProps {
  isLoading: boolean;
  imageUrl: string | null;
  prompt: string;
  error: string | null;
}

export const GeneratedImage: React.FC<GeneratedImageProps> = ({ isLoading, imageUrl, prompt, error }) => {
  const downloadImage = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'merch-mockup.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-slate-400">
          <Spinner />
          <p className="mt-4 text-lg">Generating your masterpiece...</p>
          <p className="text-sm text-slate-500">This can take a few moments.</p>
        </div>
      );
    }

    if (error) {
        return (
          <div className="flex flex-col items-center justify-center h-full text-center text-red-400 bg-red-900/20 rounded-lg p-4">
            <p className="font-semibold">An Error Occurred</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        );
    }

    if (imageUrl) {
      return (
        <div className="flex flex-col h-full">
          <div className="relative group flex-grow">
            <img
              src={imageUrl}
              alt={prompt}
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
          <Button onClick={downloadImage} className="mt-4 w-full sm:w-auto sm:self-center">
            <DownloadIcon className="w-5 h-5 mr-2" />
            Download Mockup
          </Button>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-500 border-2 border-dashed border-slate-700 rounded-lg p-8 text-center">
        <ImageIcon className="w-16 h-16 mb-4" />
        <h3 className="text-xl font-semibold text-slate-300">Your Mockup Will Appear Here</h3>
        <p className="mt-2 max-w-sm">Upload your logo, describe the product you want to see it on, and click "Generate Mockup" to start.</p>
      </div>
    );
  };

  return (
    <div className="w-full h-full min-h-[400px] lg:min-h-0 flex flex-col">
      {renderContent()}
    </div>
  );
};
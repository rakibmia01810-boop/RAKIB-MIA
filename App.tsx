
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { LogoUploader } from './components/LogoUploader';
import { PromptInput } from './components/PromptInput';
import { GeneratedImage } from './components/GeneratedImage';
import { Button } from './components/Button';
import { UploadIcon } from './components/icons/UploadIcon';
import { SparklesIcon } from './components/icons/SparklesIcon';
import { generateMockup } from './services/geminiService';
import type { UploadedFile } from './types';

export default function App() {
  const [logoFile, setLogoFile] = useState<UploadedFile | null>(null);
  const [prompt, setPrompt] = useState<string>('A photorealistic image of a person wearing a white t-shirt featuring the uploaded logo.');
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogoUpload = (file: UploadedFile | null) => {
    setLogoFile(file);
    setGeneratedImageUrl(null);
    setError(null);
  };

  const handleGenerateClick = useCallback(async () => {
    if (!logoFile || !prompt) {
      setError('Please upload a logo and enter a prompt.');
      return;
    }

    setIsLoading(true);
    setGeneratedImageUrl(null);
    setError(null);

    try {
      const imageUrl = await generateMockup(logoFile.base64, logoFile.mimeType, prompt);
      setGeneratedImageUrl(imageUrl);
    } catch (e) {
      console.error(e);
      setError('Failed to generate mockup. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [logoFile, prompt]);

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-200 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/3 flex flex-col space-y-6">
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg">
            <h2 className="text-xl font-semibold text-sky-400 mb-4 flex items-center">
              <UploadIcon className="w-6 h-6 mr-2" />
              1. Upload Your Logo
            </h2>
            <LogoUploader onLogoUpload={handleLogoUpload} />
          </div>

          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg flex-grow flex flex-col">
            <h2 className="text-xl font-semibold text-sky-400 mb-4 flex items-center">
              <SparklesIcon className="w-6 h-6 mr-2" />
              2. Describe the Mockup
            </h2>
            <PromptInput value={prompt} onChange={setPrompt} />
            <Button
              onClick={handleGenerateClick}
              disabled={!logoFile || !prompt || isLoading}
              className="mt-6 w-full"
            >
              {isLoading ? 'Generating...' : 'Generate Mockup'}
            </Button>
          </div>
        </div>

        <div className="w-full lg:w-2/3 flex flex-col">
           <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg flex-grow">
              <GeneratedImage
                isLoading={isLoading}
                imageUrl={generatedImageUrl}
                prompt={prompt}
                error={error}
              />
           </div>
        </div>
      </main>
      <footer className="text-center p-4 text-slate-500 text-sm">
        <p>Powered by Gemini. Create amazing merchandise mockups in seconds.</p>
      </footer>
    </div>
  );
}

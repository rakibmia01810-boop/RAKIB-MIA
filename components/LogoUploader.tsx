
import React, { useState, useCallback } from 'react';
import { fileToBase64 } from '../utils/fileUtils';
import type { UploadedFile } from '../types';
import { UploadCloudIcon } from './icons/UploadCloudIcon';
import { XIcon } from './icons/XIcon';

interface LogoUploaderProps {
  onLogoUpload: (file: UploadedFile | null) => void;
}

export const LogoUploader: React.FC<LogoUploaderProps> = ({ onLogoUpload }) => {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = useCallback(async (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        try {
          const { base64, mimeType } = await fileToBase64(file);
          const previewUrl = URL.createObjectURL(file);
          const newFile = { file, previewUrl, base64, mimeType };
          setUploadedFile(newFile);
          onLogoUpload(newFile);
        } catch (error) {
          console.error("Error processing file:", error);
          onLogoUpload(null);
        }
      }
    }
  }, [onLogoUpload]);

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  };

  const handleRemoveImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (uploadedFile) {
      URL.revokeObjectURL(uploadedFile.previewUrl);
    }
    setUploadedFile(null);
    onLogoUpload(null);
  };

  if (uploadedFile) {
    return (
      <div className="relative group">
        <img
          src={uploadedFile.previewUrl}
          alt="Logo preview"
          className="w-full h-auto rounded-lg object-contain max-h-64 border-2 border-slate-600"
        />
        <button
          onClick={handleRemoveImage}
          className="absolute top-2 right-2 p-1.5 bg-slate-900/70 rounded-full text-slate-300 hover:bg-red-500/80 hover:text-white transition-all duration-200 opacity-0 group-hover:opacity-100"
          aria-label="Remove logo"
        >
          <XIcon className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <label
      className={`flex justify-center w-full h-48 px-4 transition bg-slate-800 border-2 ${isDragging ? 'border-sky-400' : 'border-slate-600'} border-dashed rounded-md appearance-none cursor-pointer hover:border-slate-500 focus:outline-none`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <span className="flex flex-col items-center justify-center space-y-2 text-slate-400">
        <UploadCloudIcon className="w-10 h-10"/>
        <span className="font-medium">
          <span className="text-sky-400">Click to upload</span> or drag and drop
        </span>
        <span className="text-xs">PNG, JPG, WEBP (transparent recommended)</span>
      </span>
      <input
        type="file"
        name="file_upload"
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
        onChange={(e) => handleFileChange(e.target.files)}
      />
    </label>
  );
};

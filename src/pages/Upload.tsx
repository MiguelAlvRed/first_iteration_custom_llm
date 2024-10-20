import React, { useState } from 'react';
import { Upload as UploadIcon } from 'lucide-react';

const Upload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement file upload and URL processing logic
    console.log('File:', file);
    console.log('URL:', url);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Upload Resources</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-2">
            Upload PDF
          </label>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadIcon className="w-10 h-10 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">PDF (MAX. 10MB)</p>
              </div>
              <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} accept=".pdf" />
            </label>
          </div>
          {file && <p className="mt-2 text-sm text-gray-500">Selected file: {file.name}</p>}
        </div>
        <div>
          <label htmlFor="url-input" className="block text-sm font-medium text-gray-700 mb-2">
            Web Resource URL
          </label>
          <input
            type="url"
            id="url-input"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://example.com/resource"
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Upload Resource
        </button>
      </form>
    </div>
  );
};

export default Upload;
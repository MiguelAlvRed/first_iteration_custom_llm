import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Welcome to CRO & Retention Assistant</h1>
      <p className="text-lg mb-4">
        This application helps you optimize your mobile app's conversion rates and improve user retention using AI-powered insights.
      </p>
      <ul className="list-disc list-inside space-y-2 mb-6">
        <li>Upload PDFs and web resources about CRO and retention strategies</li>
        <li>Manage and organize your knowledge base</li>
        <li>Chat with an AI assistant to get personalized recommendations</li>
      </ul>
      <p className="text-lg">
        Get started by uploading your first resource or exploring the existing knowledge base!
      </p>
    </div>
  );
};

export default Home;
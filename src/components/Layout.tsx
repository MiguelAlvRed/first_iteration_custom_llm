import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Upload, Book, MessageSquare } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <nav className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">CRO & Retention</h1>
        </div>
        <ul className="space-y-2 p-4">
          <li>
            <Link to="/" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
              <Home size={20} />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/upload" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
              <Upload size={20} />
              <span>Upload</span>
            </Link>
          </li>
          <li>
            <Link to="/resources" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
              <Book size={20} />
              <span>Resources</span>
            </Link>
          </li>
          <li>
            <Link to="/chat" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
              <MessageSquare size={20} />
              <span>Chat</span>
            </Link>
          </li>
        </ul>
      </nav>
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;
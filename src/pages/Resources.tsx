import React, { useState } from 'react';
import { File, Globe, Trash2 } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'web';
  createdAt: string;
}

const Resources: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([
    { id: '1', title: 'CRO Best Practices', type: 'pdf', createdAt: '2023-04-15' },
    { id: '2', title: 'User Retention Strategies', type: 'web', createdAt: '2023-04-16' },
  ]);

  const handleDelete = (id: string) => {
    // TODO: Implement delete functionality
    setResources(resources.filter(resource => resource.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Resources</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Added</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {resources.map((resource) => (
              <tr key={resource.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {resource.type === 'pdf' ? (
                    <File className="w-5 h-5 text-red-500" />
                  ) : (
                    <Globe className="w-5 h-5 text-blue-500" />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{resource.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{resource.createdAt}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleDelete(resource.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Resources;
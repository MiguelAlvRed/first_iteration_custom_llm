import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: input.trim(),
        sender: 'user',
      };
      setMessages([...messages, newMessage]);
      setInput('');
      // TODO: Implement AI response logic
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: 'This is a placeholder AI response. Implement actual AI integration here.',
          sender: 'ai',
        };
        setMessages((prevMessages) => [...prevMessages, aiResponse]);
      }, 1000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col">
      <h1 className="text-3xl font-bold mb-6">Chat with AI Assistant</h1>
      <div className="flex-1 bg-white shadow-md rounded-lg p-4 mb-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${
              message.sender === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block p-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default Chat;
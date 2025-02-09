import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchFormProps {
  onSearch: (location: string, breed: string) => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const [breed, setBreed] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(location, breed);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Enter location (city, state)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div className="flex-1">
          <input
            type="text"
            placeholder="Enter dog breed (optional)"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <Search size={20} />
          Search
        </button>
      </div>
    </form>
  );
};
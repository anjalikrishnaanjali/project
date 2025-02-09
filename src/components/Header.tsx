import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Dog, LogIn, UserPlus, User } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [user] = useState(supabase.auth.getUser());

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <Dog className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Lost Pets Finder</h1>
          </Link>

          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by location or breed..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </form>

          <div className="flex items-center gap-4">
            {user ? (
              <Link
                to="/profile"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
              >
                <User size={20} />
                <span>Profile</span>
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
                >
                  <LogIn size={20} />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  <UserPlus size={20} />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
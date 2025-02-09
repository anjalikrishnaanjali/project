import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { PetCard } from './PetCard';
import type { Database } from '../types/supabase';

type Post = Database['public']['Tables']['posts']['Row'];

export const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const query = searchParams.get('q') || '';

  useEffect(() => {
    const searchPosts = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .or(`breed.ilike.%${query}%,location.ilike.%${query}%`)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPosts(data || []);
      } catch (error) {
        console.error('Error searching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    searchPosts();
  }, [query]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">
        Search Results for "{query}"
      </h2>
      {posts.length === 0 ? (
        <p className="text-center text-gray-600 py-8">
          No results found. Try a different search term.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PetCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};
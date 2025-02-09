import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { PetCard } from './PetCard';
import type { Database } from '../types/supabase';

type Post = Database['public']['Tables']['posts']['Row'];
type Profile = Database['public']['Tables']['profiles']['Row'];

export const Profile: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileData) {
        setProfile(profileData);
        
        const { data: postsData } = await supabase
          .from('posts')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        setPosts(postsData || []);
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-2xl">
            {profile.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{profile.username}</h2>
            {profile.full_name && (
              <p className="text-gray-600">{profile.full_name}</p>
            )}
            <p className="text-sm text-gray-500 mt-1">
              {posts.length} posts · {profile.points} points
            </p>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-6">Your Posts</h3>
      {posts.length === 0 ? (
        <p className="text-center text-gray-600 py-8">
          You haven't created any posts yet.
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
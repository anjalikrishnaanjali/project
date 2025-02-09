import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { MessageCircle, Heart, Share2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/supabase';

type Post = Database['public']['Tables']['posts']['Row'];
type Profile = Database['public']['Tables']['profiles']['Row'];

interface PetCardProps {
  post: Post;
}

export const PetCard: React.FC<PetCardProps> = ({ post }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', post.user_id)
        .single();
      
      if (data) setProfile(data);
    };

    const fetchComments = async () => {
      const { data } = await supabase
        .from('comments')
        .select('*, profiles(username)')
        .eq('post_id', post.id)
        .order('created_at', { ascending: true });
      
      if (data) setComments(data);
    };

    fetchProfile();
    fetchComments();
  }, [post.user_id, post.id]);

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            {profile?.username?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold">{profile?.username}</p>
            <p className="text-sm text-gray-500">{post.location}</p>
          </div>
        </div>
      </div>

      <img
        src={post.image_url}
        alt={post.pet_name || 'Lost pet'}
        className="w-full aspect-square object-cover"
      />

      <div className="p-4">
        <div className="flex gap-4 mb-4">
          <button className="text-gray-600 hover:text-red-500">
            <Heart size={24} />
          </button>
          <button className="text-gray-600 hover:text-blue-500">
            <MessageCircle size={24} />
          </button>
          <button className="text-gray-600 hover:text-green-500">
            <Share2 size={24} />
          </button>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">
            {post.pet_name || 'Unknown'} - {post.breed}
          </h3>
          <p className="text-gray-600">{post.description}</p>
          <p className="text-sm text-gray-500 mt-2">
            {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
          </p>
        </div>

        {comments.length > 0 && (
          <div className="border-t pt-4">
            <h4 className="font-semibold mb-2">Comments</h4>
            {comments.map((comment) => (
              <div key={comment.id} className="mb-2">
                <span className="font-medium">{comment.profiles.username}</span>{' '}
                <span className="text-gray-600">{comment.content}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
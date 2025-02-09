export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          full_name: string | null
          avatar_url: string | null
          points: number
          created_at: string
        }
        Insert: {
          id: string
          username: string
          full_name?: string | null
          avatar_url?: string | null
          points?: number
          created_at?: string
        }
        Update: {
          id?: string
          username?: string
          full_name?: string | null
          avatar_url?: string | null
          points?: number
          created_at?: string
        }
      }
      posts: {
        Row: {
          id: string
          user_id: string
          pet_name: string | null
          breed: string | null
          location: string
          description: string | null
          image_url: string
          status: 'lost' | 'found'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          pet_name?: string | null
          breed?: string | null
          location: string
          description?: string | null
          image_url: string
          status?: 'lost' | 'found'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          pet_name?: string | null
          breed?: string | null
          location?: string
          description?: string | null
          image_url?: string
          status?: 'lost' | 'found'
          created_at?: string
        }
      }
      comments: {
        Row: {
          id: string
          post_id: string
          user_id: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          post_id: string
          user_id: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          user_id?: string
          content?: string
          created_at?: string
        }
      }
      found_reports: {
        Row: {
          id: string
          post_id: string
          finder_id: string
          owner_id: string
          created_at: string
        }
        Insert: {
          id?: string
          post_id: string
          finder_id: string
          owner_id: string
          created_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          finder_id?: string
          owner_id?: string
          created_at?: string
        }
      }
    }
  }
}
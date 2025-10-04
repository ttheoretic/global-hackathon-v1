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
          email: string
          full_name: string | null
          avatar_url: string | null
          company_name: string | null
          role: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          company_name?: string | null
          role?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          company_name?: string | null
          role?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      feedback_sources: {
        Row: {
          id: string
          user_id: string
          name: string
          type: 'app_store' | 'google_play' | 'website' | 'social_media' | 'survey' | 'email' | 'other'
          url: string | null
          api_key: string | null
          config: Json | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          type: 'app_store' | 'google_play' | 'website' | 'social_media' | 'survey' | 'email' | 'other'
          url?: string | null
          api_key?: string | null
          config?: Json | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          type?: 'app_store' | 'google_play' | 'website' | 'social_media' | 'survey' | 'email' | 'other'
          url?: string | null
          api_key?: string | null
          config?: Json | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      feedback_items: {
        Row: {
          id: string
          user_id: string
          source_id: string
          title: string
          content: string
          rating: number | null
          sentiment: 'positive' | 'negative' | 'neutral' | null
          category: string | null
          tags: string[] | null
          metadata: Json | null
          created_at: string
          updated_at: string
          source_created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          source_id: string
          title: string
          content: string
          rating?: number | null
          sentiment?: 'positive' | 'negative' | 'neutral' | null
          category?: string | null
          tags?: string[] | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
          source_created_at: string
        }
        Update: {
          id?: string
          user_id?: string
          source_id?: string
          title?: string
          content?: string
          rating?: number | null
          sentiment?: 'positive' | 'negative' | 'neutral' | null
          category?: string | null
          tags?: string[] | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
          source_created_at?: string
        }
      }
      ai_analyses: {
        Row: {
          id: string
          user_id: string
          feedback_items: string[]
          analysis_type: 'summary' | 'sentiment' | 'categorization' | 'insights'
          result: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          feedback_items: string[]
          analysis_type: 'summary' | 'sentiment' | 'categorization' | 'insights'
          result: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          feedback_items?: string[]
          analysis_type?: 'summary' | 'sentiment' | 'categorization' | 'insights'
          result?: Json
          created_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          plan: 'free' | 'pro' | 'enterprise'
          status: 'active' | 'canceled' | 'past_due'
          current_period_start: string
          current_period_end: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plan: 'free' | 'pro' | 'enterprise'
          status?: 'active' | 'canceled' | 'past_due'
          current_period_start: string
          current_period_end: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plan?: 'free' | 'pro' | 'enterprise'
          status?: 'active' | 'canceled' | 'past_due'
          current_period_start?: string
          current_period_end?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

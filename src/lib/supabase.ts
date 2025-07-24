// Supabase functionality temporarily disabled
// import { createClient } from '@supabase/supabase-js'

// Dummy Supabase configuration to prevent errors
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Supabase client creation disabled
// if (!supabaseUrl || !supabaseAnonKey) {
//   throw new Error('Missing Supabase environment variables. Please check your .env.local file.')
// }

// export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
//   auth: {
//     autoRefreshToken: true,
//     persistSession: true,
//     detectSessionInUrl: true
//   }
// })

// Dummy export to prevent import errors
export const supabase = null;

// Client data interface
export interface ClientData {
  id?: string;
  user_id: string;
  client_id: string;
  first_name: string;
  last_name: string;
  mobile_number: string;
  business_email: string;
  business_name: string;
  signature_url?: string;
  privacy_policy: boolean;
  terms_conditions: boolean;
  support_addendum: boolean;
  is_onboarding_complete: boolean;
  status: string;
  submission_date: string;
  updated_at: string;
}

export interface ClientProject {
  id?: string
  client_id: string
  project_name: string
  project_description?: string
  project_status?: 'planning' | 'in_progress' | 'review' | 'completed' | 'on_hold'
  start_date?: string
  end_date?: string
  budget?: number
  created_at?: string
  updated_at?: string
}

export interface SupportTicket {
  id?: string
  client_id: string
  ticket_number: string
  subject: string
  description: string
  priority?: 'low' | 'medium' | 'high' | 'urgent'
  status?: 'open' | 'in_progress' | 'resolved' | 'closed'
  created_at?: string
  updated_at?: string
  resolved_at?: string
}

// Helper functions for authentication
export const signInWithGoogle = async () => {
  console.log('Supabase functionality disabled');
  return { data: null, error: new Error('Supabase disabled') };
}

export const signInWithGitHub = async () => {
  console.log('Supabase functionality disabled');
  return { data: null, error: new Error('Supabase disabled') };
}

export const signInWithEmail = async (email: string, password: string) => {
  console.log('Supabase functionality disabled');
  return { data: null, error: new Error('Supabase disabled') };
}

export const signUpWithEmail = async (email: string, password: string, userData?: any) => {
  console.log('Supabase functionality disabled');
  return { data: null, error: new Error('Supabase disabled') };
}

export const signOut = async () => {
  console.log('Supabase functionality disabled');
  return { error: null };
}

export const getCurrentUser = async () => {
  console.log('Supabase functionality disabled');
  return { user: null, error: new Error('Supabase disabled') };
}

export const getCurrentSession = async () => {
  console.log('Supabase functionality disabled');
  return { session: null, error: new Error('Supabase disabled') };
}

// Helper functions for client data
export const insertClientData = async (clientData: Omit<ClientData, 'id' | 'client_id' | 'submission_date' | 'updated_at' | 'is_onboarding_complete'>) => {
  console.log('Supabase functionality disabled');
  return { data: null, error: new Error('Supabase disabled') };
}

export const updateClientData = async (id: string, updates: Partial<ClientData>) => {
  console.log('Supabase functionality disabled');
  return { data: null, error: new Error('Supabase disabled') };
}

export const getClientData = async (userId: string) => {
  console.log('Supabase functionality disabled');
  return { data: null, error: new Error('Supabase disabled') };
}

export const getAllClients = async () => {
  console.log('Supabase functionality disabled');
  return { data: null, error: new Error('Supabase disabled') };
}

// Helper function to check if user is admin
export const isUserAdmin = async () => {
  console.log('Supabase functionality disabled');
  return false;
}

// Storage helper for signature uploads
export const uploadSignature = async (file: File, userId: string) => {
  console.log('Supabase functionality disabled');
  return { data: null, error: new Error('Supabase disabled') };
} 
import { createClient } from '@supabase/supabase-js'

// Supabase configuration using environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.')
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Database types for TypeScript
export interface ClientData {
  id?: string
  user_id?: string
  client_id: string
  first_name: string
  last_name: string
  mobile_number: string
  business_email: string
  business_name: string
  signature_url?: string
  privacy_policy: boolean
  terms_conditions: boolean
  support_addendum: boolean
  submission_date?: string
  updated_at?: string
  is_onboarding_complete?: boolean
  status?: 'pending' | 'approved' | 'rejected' | 'inactive'
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
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/client-onboarding`
    }
  })
  return { data, error }
}

export const signInWithGitHub = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${window.location.origin}/client-onboarding`
    }
  })
  return { data, error }
}

export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  return { data, error }
}

export const signUpWithEmail = async (email: string, password: string, userData?: any) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData,
      emailRedirectTo: `${window.location.origin}/client-onboarding`
    }
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}

export const getCurrentSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession()
  return { session, error }
}

// Helper functions for client data
export const insertClientData = async (clientData: ClientData) => {
  const { data, error } = await supabase
    .from('clients')
    .insert(clientData)
    .select()
    .single()
  
  return { data, error }
}

export const updateClientData = async (id: string, updates: Partial<ClientData>) => {
  const { data, error } = await supabase
    .from('clients')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  
  return { data, error }
}

export const getClientData = async (userId: string) => {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('user_id', userId)
    .single()
  
  return { data, error }
}

export const getAllClients = async () => {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('submission_date', { ascending: false })
  
  return { data, error }
}

// Helper function to check if user is admin
export const isUserAdmin = async () => {
  const { user } = await getCurrentUser()
  if (!user) return false
  
  return user.user_metadata?.role === 'admin' || 
         (user as any).raw_user_meta_data?.role === 'admin'
}

// Storage helper for signature uploads
export const uploadSignature = async (file: File, userId: string) => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}-${Date.now()}.${fileExt}`
  const filePath = `signatures/${fileName}`

  const { data, error } = await supabase.storage
    .from('client-signatures')
    .upload(filePath, file)

  if (error) return { data: null, error }

  const { data: { publicUrl } } = supabase.storage
    .from('client-signatures')
    .getPublicUrl(filePath)

  return { data: { path: filePath, url: publicUrl }, error: null }
} 
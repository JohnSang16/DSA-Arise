import { supabase } from './supabase'

export async function signUp(email, password) {
  return supabase.auth.signUp({ email, password })
}

export async function signIn(email, password) {
  return supabase.auth.signInWithPassword({ email, password })
}

export async function signOut() {
  return supabase.auth.signOut()
}

export async function getSession() {
  return supabase.auth.getSession()
}

export async function saveProgress(userId, stage, level, hp) {
  return supabase
    .from('user_progress')
    .upsert(
      { user_id: userId, current_stage: stage, current_level: level, hp, updated_at: new Date().toISOString() },
      { onConflict: 'user_id' }
    )
}

export async function loadProgress(userId) {
  return supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .single()
}

// Email/password auth backed by Supabase.

import type { User as SupabaseUser } from '@supabase/supabase-js'
import { supabase } from './supabase'

export type User = { id: string; email: string }

export const MIN_PASSWORD_LENGTH = 6

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function toUser(u: SupabaseUser): User {
  return { id: u.id, email: u.email ?? '' }
}

/** The signed-in user from the stored session, or null. */
export async function currentUser(): Promise<User | null> {
  const { data, error } = await supabase.auth.getSession()
  console.log('[supabase] getSession', { data, error })
  return data.session ? toUser(data.session.user) : null
}

/** Calls back whenever the user signs in, signs out, or the session refreshes. */
export function onAuthChange(cb: (user: User | null) => void) {
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    console.log('[supabase] onAuthStateChange', event, session)
    cb(session ? toUser(session.user) : null)
  })
  return () => data.subscription.unsubscribe()
}

/**
 * Creates an account. Returns the user when signed in right away, or null when
 * the project requires email confirmation first (no session yet).
 */
export async function register(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
    options: { emailRedirectTo: window.location.origin },
  })
  console.log('[supabase] signUp', { data, error })
  if (error) throw new Error(error.message)

  // With email confirmation on, Supabase doesn't reveal existing accounts as
  // an error; it returns a user with no identities instead.
  if (data.user && data.user.identities?.length === 0) {
    throw new Error('An account with this email already exists.')
  }
  return data.session ? toUser(data.session.user) : null
}

export async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  })
  console.log('[supabase] signInWithPassword', { data, error })
  if (error) {
    throw new Error(
      error.code === 'invalid_credentials'
        ? 'Incorrect email or password.'
        : error.message,
    )
  }
  return toUser(data.user)
}

export async function logout() {
  const { error } = await supabase.auth.signOut()
  console.log('[supabase] signOut', { error })
}

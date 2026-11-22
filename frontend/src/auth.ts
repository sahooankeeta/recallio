// Email/password auth backed by the FastAPI backend (JWT access + refresh tokens).

export type User = { id: string; email: string }

export const MIN_PASSWORD_LENGTH = 6

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/** The signed-in user, restored from the refresh-token cookie, or null. */
export async function currentUser(): Promise<User | null> {
  // TODO: POST /auth/refresh; 200 → store access token, return user; 401 → null.
  return null
}

/** Calls back whenever the user signs in or out. Returns an unsubscribe function. */
export function onAuthChange(cb: (user: User | null) => void): () => void {
  // TODO: add cb to a listener set; return a function that removes it.
  void cb
  return () => {}
}

export async function register(email: string, password: string): Promise<User> {
  // TODO: POST /auth/register, store access token, notify listeners.
  void email
  void password
  throw new Error('Not implemented')
}

export async function login(email: string, password: string): Promise<User> {
  // TODO: POST /auth/login, store access token, notify listeners.
  void email
  void password
  throw new Error('Not implemented')
}

export async function logout(): Promise<void> {
  // TODO: POST /auth/logout, clear access token, notify listeners.
}

/** A valid access token for backend API calls, refreshed when it's about to expire. */
export async function getAccessToken(): Promise<string> {
  // TODO: return in-memory token if not near expiry, else refresh (single in-flight call).
  throw new Error('Not implemented')
}

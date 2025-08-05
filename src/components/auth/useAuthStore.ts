import { create } from 'zustand'

interface AuthState {
  email: string | null
  setEmail: (email: string) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  email: null,
  setEmail: (email) => set({ email }),
}))

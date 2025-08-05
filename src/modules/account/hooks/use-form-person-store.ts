'use client'
import { create } from 'zustand'

interface FormPersonStore {
  isDirty: boolean
  setIsDirty: (isDirty: boolean) => void
}

export const useFormPersonStore = create<FormPersonStore>((set) => ({
  isDirty: false,
  setIsDirty: (isDirty: boolean) => set({ isDirty }),
}))

export const useFormStore = create<FormPersonStore>((set) => ({
  isDirty: false,
  setIsDirty: (isDirty: boolean) => set({ isDirty }),
}))

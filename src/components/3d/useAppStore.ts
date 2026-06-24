import { create } from 'zustand'

interface AppStore {
  activeSection: string
  setActiveSection: (section: string) => void
  isDragging: boolean
  setIsDragging: (v: boolean) => void
}

const useAppStore = create<AppStore>((set) => ({
  activeSection: 'hero',
  setActiveSection: (section) => set({ activeSection: section }),
  isDragging: false,
  setIsDragging: (v) => set({ isDragging: v }),
}))

export default useAppStore

import { create } from 'zustand'

interface State {
  isSideMenuOpen: boolean,
  isMiniCartOpen: boolean,
}

type Action = {
  openSideMenu: () => void,
  closeSideMenu: () => void,

  miniCartToggle: () => void
}

export const useUIStore = create<State & Action>()((set) => ({
  isSideMenuOpen: false,
  isMiniCartOpen: false,

  openSideMenu: () => set({ isSideMenuOpen: true }),
  closeSideMenu: () => set({ isSideMenuOpen: false }),

  miniCartToggle: () => set((state) => ({ isMiniCartOpen: !state.isMiniCartOpen })),
}))
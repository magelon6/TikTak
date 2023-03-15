import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

const authStore = (set: any) => ({
  userProfile: null,

  addUser: (user: any) => set({userProfile: user}),
});

const useAuthStore = create(
  persist(
    authStore,
    {
      name: 'auth',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useAuthStore;
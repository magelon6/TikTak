import { PORT } from '@/globals';
import axios from 'axios';
import { client } from 'utils/client';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

const authStore = (set: any) => ({
  userProfile: null,
  allUsers: [],

  addUser: (user: any) => set({userProfile: user}),
  removeUser: () => set({userProfile: null}),

  fetchAllUsers: async () => {
    const response = await axios.get(`${PORT}/api/users`);
    set({ allUsers: response.data })
  }
  
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
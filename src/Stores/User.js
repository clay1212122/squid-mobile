import { create } from 'zustand'

export const UserStore = create((set)=> ({
    user:{},
    logged:false,
    setUser: (user)=> set(()=> ({user: user})),
    setLogged: (value) => set(() => ({ logged: value })),
}))
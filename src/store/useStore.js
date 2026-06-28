import { create } from 'zustand'
import { supabase } from '../lib/supabase'

const useStore = create((set, get) => ({
  user: null, profile: null, loading: true,
  init: async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (session?.user) { set({ user: session.user }); await get().fetchProfile(session.user.id) }
    set({ loading: false })
    supabase.auth.onAuthStateChange(async (_e, session) => {
      set({ user: session?.user || null })
      if (session?.user) await get().fetchProfile(session.user.id)
      else set({ profile: null })
    })
  },
  fetchProfile: async (id) => {
    const { data } = await supabase.from('profiles').select('*').eq('id', id).single()
    if (data) set({ profile: data })
  },
  signOut: async () => { await supabase.auth.signOut(); set({ user: null, profile: null }) }
}))
export default useStore

import { create } from 'zustand'
import { Api } from '../../api/api'
import { Stats } from '../../api/memory/respone/Stats'

interface IUseMemoryStore {
  data: Stats | null;
  fetch: () => void;
}

export const useMemoryStore = create<IUseMemoryStore>(set => ({
  data: null,
  fetch: async () => {
    const response = await Api.memory.getTick()
    set({ data: response })
  }
}))

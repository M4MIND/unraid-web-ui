import { create } from 'zustand'
import { Api } from '../../api/api'
import {Stat} from '../../api/memory/memory.api'

interface IUseMemoryStore {
  data: Stat | null;
  fetch: () => void;
}

export const useMemoryStore = create<IUseMemoryStore>(set => ({
  data: null,
  fetch: async () => {
    const response = await Api.memory.getTick()
    set({ data: response })
  }
}))

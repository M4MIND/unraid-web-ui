import { create } from 'zustand'
import { Api } from '../../api/api'
import {Stat} from '../../api/memory/memory.api'

interface IUseMemoryStore {
  data: Stat[];
  fetch: () => void;
}

export const useMemoryHistoryStore = create<IUseMemoryStore>(set => ({
  data: [],
  fetch: async () => {
    const response = await Api.memory.getHistory()

    set({ data: response })
  }
}))

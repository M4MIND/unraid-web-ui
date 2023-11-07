import { create } from 'zustand'
import {ApiCpuData} from '../../api/cpu/api.cpu'
import {Api} from '../../api/api'

interface CpuStore {
  data: ApiCpuData | null;
  fetch: () => void;
}

export const useCpuStore = create<CpuStore>()(set => ({
  data: null,
  fetch: async () => {
    const response = await Api.cpu.tick()
    set({ data: response })
  }
}))

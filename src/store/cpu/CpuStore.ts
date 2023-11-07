import { create } from 'zustand'
import { Api } from '../../../../api/api'
import { ApiCpuData } from '../../../../api/cpu/api.cpu'

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

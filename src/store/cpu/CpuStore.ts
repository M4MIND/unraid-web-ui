import {create} from 'zustand'
import {ApiCpuData, InfoStat} from '../../api/cpu/api.cpu'
import {Api} from '../../api/api'
import {message} from 'antd'

interface CpuState {
  info: InfoStat[] | null;
  infoLoading: boolean;

  data: ApiCpuData | null;
}

interface CpuActions {
  fetchInfo: () => void;
  fetch: () => void;

}

export const useCpuStore = create<CpuState & CpuActions>()(set => ({
  info: null,
  infoLoading: true,
  data: null,

  fetchInfo: async () => {
    set({infoLoading: true})
    try {
      const response = await Api.cpu.getCpuInfo()
      set({info: response})
    } catch (e) {
      message.error('Cannot fetch cpu info')
    }finally {
      set({infoLoading: false})
    }

  },

  fetch: async () => {
    const response = await Api.cpu.getTick()
    set({data: response})
  }
}))

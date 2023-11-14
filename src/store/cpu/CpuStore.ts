import {create} from 'zustand'
import {Api} from '../../api/api'
import {message} from 'antd'
import { DashboardUpdater } from '../../service/updater/DasboardUpdater'
import { ApiCpuHistory } from '../../api/cpu/response/CpuHistory'
import { CpuInfo } from '../../api/cpu/response/CpuInfo'

interface CpuState {
  info: CpuInfo[] | null;
  infoLoading: boolean;

  data: ApiCpuHistory | null;
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

DashboardUpdater.subscribe('cpu-data', data => useCpuStore.setState({data: data as unknown as ApiCpuHistory}))

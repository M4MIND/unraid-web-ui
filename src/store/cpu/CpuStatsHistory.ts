import { create } from 'zustand'
import { ApiCpu } from '../../api/cpu/api.cpu'
import {Api} from '../../api/api'
import {UtilDate} from '../../utils/UtilDate'
import { ApiCpuHistory } from '../../api/cpu/response/CpuHistory'

const filter = ['idle', 'steal', 'nice', 'irq', 'softirq', 'guestnice']

interface PreparedData {
  value: number;
  date: string;
  group: string;
}

interface State {
  data: PreparedData[];
  loaded: boolean;
  fetchAll: () => void;
  fetchTick: () => void;
}

const prepareData = (data: ApiCpuHistory): PreparedData[] => {
  const date = UtilDate.ConvertUtcToHMS(data.time)

  return Object.keys(data.average['cpu'])
    .filter(v => !filter.includes(v))
    .map(v => ({
      value: Number(data.average['cpu'][v]),
      date,
      group: v
    }))
}

export const useCpuStatsHistory = create<State>((setState, getState) => ({
  data: [],
  loaded: false,
  fetchAll: async () => {
    const response = await Api.cpu.getHistory()

    const normalize = response
      .filter(v => v.average !== null)
      .map(v => prepareData(v))
      .flat()

    setState({ loaded: true })

    setState({ data: normalize })
  },
  fetchTick: async () => {
    const response = await ApiCpu.getTick()
    const data = getState().data

    data.push(...prepareData(response))

    setState({ loaded: true })

    setState({ data })
  }
}))

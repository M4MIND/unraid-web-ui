import { create } from 'zustand'
import {UtilDate} from '../../utils/UtilDate'
import { ApiCpuHistory } from '../../api/cpu/response/CpuHistory'
import {WebsocketTopics} from '../../websocket/WebsocketTopics'
import {BaseWebsocketStore} from '../BaseWebsocketStore'

const filter = ['idle', 'steal', 'nice', 'irq', 'softirq', 'guestnice']

interface PreparedData {
  value: number;
  date: string;
  group: string;
}

interface Store extends BaseWebsocketStore{
  data: PreparedData[];
  subscribe: () => void;
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

export const useCpuStatsHistory = create<Store>((setState, getState) => ({
  data: [],
  loading: true,
  subscribe: () => {
    WebsocketTopics.subscribe<ApiCpuHistory[]>('stats-cpu-once', m => {
      const normalize = m
        .filter(v => v.average !== null)
        .map(v => prepareData(v))
        .flat()

      setState({ data: normalize })

      WebsocketTopics.subscribe<ApiCpuHistory>('stats-cpu-tick', m => {
        const data = getState().data

        data.push(...prepareData(m))

        setState({ data })
      })
    })
    setState({ loading: false })
  },
  unsubscribe:() => {
    WebsocketTopics.unsubscribe('stats-cpu-once').unsubscribe('stats-cpu-tick')
    setState({data: [], loading: true})
  }
}))

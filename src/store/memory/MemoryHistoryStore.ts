import { create } from 'zustand'
import { Api } from '../../api/api'
import { UtilDate } from '../../utils/UtilDate'
import {Stats} from '../../api/memory/respone/Stats'

interface History {
  value: number;
  group: string;
  date: string;
}

interface IUseMemoryStore {
  data: History[];
  fetch: () => void;
  tick: () => void;
}

const convert = (v: Stats) => {
  const date = UtilDate.ConvertUtcToHMS(v.time)

  return [
    {
      value: v.stats.memfree,
      group: 'memfree',
      date
    },
    {
      value: v.stats.realfree,
      group: 'realfree',
      date
    },
    {
      value: v.stats.buffers,
      group: 'buffers',
      date
    },
    {
      value: v.stats.cached,
      group: 'cached',
      date
    }
  ]
}

export const useMemoryHistoryStore = create<IUseMemoryStore>((setState, getState) => ({
  data: [],
  fetch: async () => {
    const response = await Api.memory.getHistory()

    const tmp: History[] = response
      .map(v => convert(v))
      .flat()
    setState({ data: tmp })
  },
  tick: async () => {
    const response = await Api.memory.getTick()

    const data = getState().data

    data.push(...convert(response))

    setState({data})
  }
}))

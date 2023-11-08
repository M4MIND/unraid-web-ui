import { create } from 'zustand'
import { Api } from '../../api/api'
import { ApiDisksHistoryData } from '../../api/disks/api.disks'
import { UtilDate } from '../../utils/UtilDate'

interface Store {
  data: History;
  disks: string[];
  loaded: boolean;
  selected: string;
  fetch: () => void;
  tick: () => void;
  setSelected: (v: string) => void;
}

interface History {
  [index: string]: { value: number; date: string; group: string }[];
}

export const prepareData = (data: ApiDisksHistoryData[]): History => {
  const temp: History = {}
  data.map(v => {
    const date = UtilDate.ConvertUtcToHMS(v.Time)

    Object.values(v.Avg).map(d => {
      if (temp[d.name] === undefined) {
        temp[d.name] = []
      }

      temp[d.name].push(
        {
          value: -d.readbytes,
          date,
          group: 'readbytes'
        },
        {
          value: d.writebytes,
          date,
          group: 'writebytes'
        }
      )
    })
  })

  return temp
}

export const useDisksHistoryStore = create<Store>((setState, getState) => ({
  data: {},
  disks: [],
  selected: '',
  interfaces: [],
  loaded: false,
  setSelected: (v: string) => {
    setState({ selected: v })
  },
  fetch: async () => {
    const response = await Api.disks.getHistory()

    const history = prepareData(response)

    setState({ data: history })
    setState({ disks: Object.keys(history).sort() })
    setState({ selected: Object.keys(history).sort()[0] })
    setState({ loaded: true })
  },

  tick: async () => {
    const response = await Api.disks.getTick()
    const data = getState().data
    const prep = prepareData([response])

    Object.keys(data).map(k => {
      data[k].push(...prep[k])
    })

    setState({ data })
  }
}))

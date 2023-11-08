import { create } from 'zustand'
import { UtilDate } from '../../utils/UtilDate'
import { Api } from '../../api/api'

interface History {
  [index: string]: {
    value: number;
    group: string;
    date: string;
  }[];
}
interface Store {
  data: History;
  loaded: boolean;
  selected: string;
  interfaces: string[];
  fetch: () => void;
  fetchTick: () => void;
  changeSelected: (v: string) => void;
}

export const useNetworkHistoryStore = create<Store>((setState, getState) => ({
  data: {},
  interfaces: [],
  selected: '',
  loaded: false,
  fetch: async () => {
    const response = await Api.network.getHistory()

    setState({ loaded: true })

    const temp: History = {}

    response.map(v => {
      const date = UtilDate.ConvertUtcToHMS(v.Time)

      return Object.keys(v.Avg ?? {}).map(k => {
        if (temp[k] === undefined) {
          temp[k] = []
        }

        temp[k].push(
          {
            date,
            value: v.Avg[k].rxbytes,
            group: 'rxbytes'
          },
          {
            date,
            value: -v.Avg[k].txbytes,
            group: 'txbytes'
          }
        )
      })
    })

    setState({ interfaces: Object.keys(response[0].Avg) })
    if (getState().selected === '')
    {setState({ selected: Object.keys(response[0].Avg)[0] })}
    setState({ data: temp })
  },

  fetchTick: async () => {
    const response = await Api.network.getTick()
    const temp = getState().data

    const date = UtilDate.ConvertUtcToHMS(response.Time)
    Object.keys(response.Avg).map(k => {
      if (temp[k] === undefined) {
        temp[k] = []
      }
      temp[k].push(
        {
          date,
          value: response.Avg[k].rxbytes,
          group: 'rxbytes'
        },
        {
          date,
          value: -response.Avg[k].txbytes,
          group: 'txbytes'
        }
      )
    })

    setState({ data: temp })
  },
  changeSelected: (v: string) => {
    setState({ selected: v })
  }
}))

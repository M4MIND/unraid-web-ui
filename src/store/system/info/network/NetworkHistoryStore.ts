import {create} from 'zustand'
import {Api} from '../../../../api/api'
import {NetworkData} from '../../../../api/network/network.api'

interface Store {
  data: NetworkData[];
  selected: string;
  interfaces: string[];
  fetch: () => void;
  changeSelected: (v: string) => void;
}

export const useNetworkHistoryStore = create<Store>((setState, getState) => ({
  data: [],
  interfaces: [],
  selected: '',
  fetch: async () => {
    const response = await Api.network.getHistory()
    setState({data: response})
    setState({interfaces: Object.keys(response[0])})
    const selected = getState().selected
    if (selected === '') {
      setState({selected: Object.keys(response[0])[0]})
    } else {
      setState({selected: ''})
    }
  },
  changeSelected: (v: string) => {
    setState({selected: v})
  }
}))

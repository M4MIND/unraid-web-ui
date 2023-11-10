import {create} from 'zustand'
import {BaseApiStore} from '../BaseApiStore'
import {Mdcmdstats} from '../../api/raid/response/Mdcmdstats'
import {Api} from '../../api/api'

interface Store extends BaseApiStore {
  data: Mdcmdstats | null
}

export const useRaidMdcmdStore = create<Store>((setState, getState, store) => ({
  data: null,
  loading: true,
  fetch: async () => {
    const response = await Api.raid.getMdcmdStat()
    setState({data: response})
    setState({loading: false})
  }
}))

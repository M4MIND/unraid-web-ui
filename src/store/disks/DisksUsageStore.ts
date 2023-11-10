import {create} from 'zustand'
import {BaseApiStore} from '../BaseApiStore'
import {Api} from '../../api/api'
import {BlockDevicesAll} from '../../api/disks/response/BlockDevicesAll'

interface Store extends BaseApiStore {
  data: BlockDevicesAll | null
}
export const useDiskUsageStore = create<Store>((setState, getState, store) => ({
  data: null,
  loading: true,
  fetch: async () => {
    const response = await Api.disks.getUsage()

    setState({data: response})
    setState({loading: false})
  }
}))

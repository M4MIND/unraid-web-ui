import {create} from 'zustand'
import {BaseApiStore} from '../BaseApiStore'
import {Api} from '../../api/api'

interface Store extends BaseApiStore {
  data: StoreData[]
  arraySize: number,
  arrayUsed: number,
}

interface StoreData {
  model: string
  size: number
  name: string
  used: number
  uuid: string
  mount: string
  utilization: number
}

export const useRaidInfo = create<Store>((setState, getState, store) => ({
  data: [],
  loading: true,
  arraySize: 0,
  arrayUsed: 0,
  fetch: async () => {
    const [mdcmd, lsblk ] = await Promise.all([Api.raid.getMdcmdStat(), Api.disks.getLsblk()])
    let arraySize = 0
    let arrayUsed = 0

    const p: StoreData[] = mdcmd.Stats.map(v => {
      const findModelInfo = lsblk.blockdevices.find(k => k.kname === v.RdevName)
      const findMdInfo = lsblk.blockdevices.find(k => k.kname === v.DiskName)

      if (findModelInfo && findMdInfo) {
        const prepare: StoreData = {
          model: findModelInfo.model ?? 'Unknown',
          size: findModelInfo.size,
          name: findModelInfo.name,
          used: findMdInfo.fsused ?? 0,
          uuid: findModelInfo.ptuuid ??  findMdInfo.ptuuid ?? 'Unknown',
          mount: findMdInfo.mountpoint ?? 'Unknown',
          utilization: Number((((findMdInfo.fsused ?? 1) / findModelInfo.size) * 100).toFixed(2))
        }

        arraySize += prepare.size
        arrayUsed += prepare.used

        return prepare
      }
    }).filter(v => v !== undefined)

    setState({data: p})
    setState({loading: false})
    setState({arraySize})
    setState({arrayUsed})
  }
}))

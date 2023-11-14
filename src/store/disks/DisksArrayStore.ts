import { create } from 'zustand'
import { BaseApiStore } from '../BaseApiStore'
import { ArrayInfo } from '../../api/disks/response/ArrayInfo'
import { Api } from '../../api/api'
import {WebsocketTopics} from '../../websocket/WebsocketTopics'

interface Store extends BaseApiStore {
  data: ArrayInfo | null;
}

export const useDisksArrayStore = create<Store>(setState => ({
  data: null,
  loading: true,

  fetch: async () => {
    setState({ data: await Api.disks.getArrayInfo() })
    setState({ loading: false })
  }
}))

WebsocketTopics.subscribe<ArrayInfo>('array-info', message => {
  useDisksArrayStore.getState().data = message
  useDisksArrayStore.getState().loading = false
})

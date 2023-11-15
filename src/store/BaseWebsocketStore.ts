export interface BaseWebsocketStore {
  loading: boolean,
  subscribe: () => void,
  unsubscribe: () => void,
}

export interface BaseApiStore {
  loading: boolean,
  fetch: () => Promise<void>;
}

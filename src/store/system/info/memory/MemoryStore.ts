import { create } from "zustand";
import axiosClient from "../../../../utils/Axios";

export interface Root {
  active: number;
  buffers: number;
  cached: number;
  commitlimit: number;
  committed_as: number;
  dirty: number;
  inactive: number;
  mapped: number;
  memfree: number;
  memtotal: number;
  memused: number;
  realfree: number;
  slab: number;
  swapcached: number;
  swapfree: number;
  swaptotal: number;
  swapused: number;
  writeback: number;
}
interface IUseMemoryStore {
  data: Root | null;
  fetch: () => void;
}

const useMemoryStore = create<IUseMemoryStore>((set) => ({
  data: null,
  fetch: async () => {
    const response = await axiosClient.get("/system/info/memory");
    set({ data: response.data });
  },
}));

export default useMemoryStore;

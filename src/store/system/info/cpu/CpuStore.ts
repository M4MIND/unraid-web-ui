import axios from "axios";
import { create } from "zustand";
import axiosClient from "../../../../utils/Axios";

export interface CpuUtilization {
  guest: number;
  guestnice: number;
  idle: number;
  iowait: number;
  irq: number;
  nice: number;
  softirq: number;
  steal: number;
  system: number;
  total: number;
  user: number;
}

export interface CpuData {
  avg: { [index: string]: CpuUtilization };
}

interface CpuStore {
  data: CpuData | null;
  fetch: () => void;
}

const useCpuStore = create<CpuStore>()((set) => ({
  data: null,
  fetch: async () => {
    const response = await axiosClient.get("/system/info/cpu");
    set({ data: response.data });
  },
}));
export default useCpuStore;

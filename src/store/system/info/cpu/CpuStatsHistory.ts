import axiosClient from "../../../../utils/Axios";
import { create } from "zustand";
import { CpuData, CpuUtilization } from "./CpuStore";

interface State {
  data: { [index: string]: CpuUtilization }[] | null;
  fetch: () => void;
}

const useCpuStatsHistory = create<State>((set) => ({
  data: null,
  fetch: async () => {
    const response = await axiosClient.get("/system/info/cpu/stat");

    set({ data: response.data });
  },
}));

export default useCpuStatsHistory;

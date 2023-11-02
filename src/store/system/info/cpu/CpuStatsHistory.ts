import { create } from "zustand";
import { CpuData, CpuUtilization } from "./CpuStore";
import { Api } from "../../../../service/api";

interface Data {
  [index: string]: CpuUtilization;
}

interface State {
  data: Data[];
  fetch: () => void;
}

const useCpuStatsHistory = create<State>((set) => ({
  data: [],
  fetch: async () => {
    const response = await Api.get<Data[]>("v1/cpu/history");

    set({ data: response.data });
  },
}));

export default useCpuStatsHistory;

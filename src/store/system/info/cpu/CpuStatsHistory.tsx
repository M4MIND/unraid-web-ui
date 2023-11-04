import { create } from "zustand";
import { ApiCpu, ApiCpuData } from "../../../../service/api/cpu/api.cpu";
import UtilDate from "../../../../utils/UtilDate";

const filter = ["idle", "steal", "nice", "irq", "softirq", "guestnice"];

interface PreparedData {
  value: number;
  date: string;
  group: string;
}

interface State {
  data: PreparedData[];
  loaded: boolean;
  fetchAll: () => void;
  fetchTick: () => void;
}

const prepareData = (data: ApiCpuData): PreparedData[] => {
  const date = UtilDate.ConvertUtcToHMS(data.Time);
  return Object.keys(data.Avg["cpu"])
    .filter((v) => filter.indexOf(v) < 0)
    .map((v) => {
      return {
        value: Number(data.Avg["cpu"][v]),
        date: date,
        group: v,
      };
    });
};

const useCpuStatsHistory = create<State>((setState, getState) => ({
  data: [],
  loaded: false,
  fetchAll: async () => {
    const response = await ApiCpu.History();

    const normalize = response.data
      .filter((v) => v.Avg !== null)
      .map((v, k) => {
        return prepareData(v);
      })
      .flat();

    setState({ loaded: true });

    setState({ data: normalize });
  },
  fetchTick: async () => {
    const response = await ApiCpu.Tick();
    const data = getState().data;

    data.push(...prepareData(response.data));

    setState({ loaded: true });

    setState({ data: data });
  },
}));

export default useCpuStatsHistory;

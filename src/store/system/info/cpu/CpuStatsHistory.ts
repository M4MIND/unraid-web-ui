import {create} from "zustand";
import {CpuData, CpuUtilization} from "./CpuStore";
import {Api} from "../../../../service/api";

interface Data {
    Avg: {
        guest: number
        guestnice: number
        idle: number
        iowait: number
        irq: number
        nice: number
        softirq: number
        steal: number
        system: number
        total: number
        user: number
    }[],
    Time: string
}

interface State {
    data: Data[];
    fetch: () => void;
}

const useCpuStatsHistory = create<State>((set) => ({
    data: [],
    fetch: async () => {
        const response = await Api.get<Data[]>("v1/cpu/history");

        set({data: response.data});
    },
}));

export default useCpuStatsHistory;

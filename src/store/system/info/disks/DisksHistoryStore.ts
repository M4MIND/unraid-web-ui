import { create } from "zustand";
import { Api } from "../../../../service/api";

interface Data {
  Time: string;
  Avg: {
    major: number;
    minor: number;
    name: string;
    readios: number;
    readmerges: number;
    readbytes: number;
    writeios: number;
    writemerges: number;
    writebytes: number;
    inflight: number;
    ioticks: number;
    timeinqueue: number;
  }[];
}
interface Store {
  data: Data[];
  disks: string[];
  fetch: () => void;
}

const useDisksHistoryStore = create<Store>((setState, getState) => ({
  data: [],
  disks: [],
  interfaces: [],
  fetch: async () => {
    const response = await Api.get<Data[]>("v1/disks/history");

    setState({ disks: response.data[0].Avg.map((v) => v.name) });
    setState({ data: response.data });
  },
}));

export default useDisksHistoryStore;

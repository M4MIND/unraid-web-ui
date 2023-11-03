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
  selected: string;
  fetch: () => void;
  tick: () => void;
  setSelected: (v: string) => void;
}

const useDisksHistoryStore = create<Store>((setState, getState) => ({
  data: [],
  disks: [],
  selected: "",
  interfaces: [],
  setSelected: (v: string) => {
    setState({ selected: v });
  },
  fetch: async () => {
    const response = await Api.get<Data[]>("v1/disks/history");

    const disks = response.data[0].Avg.map((v) => v.name).sort();

    if (getState().selected === "") {
      setState({ selected: disks[0] });
    }

    setState({ disks: disks });
    setState({ data: response.data });
  },

  tick: async () => {
    const response = await Api.get<Data>("v1/disks/history/tick");

    const disks = response.data.Avg.map((v) => v.name).sort();

    if (getState().selected === "") {
      setState({ selected: disks[0] });
    }

    const data = getState().data;
    data.push(response.data);

    if (data.length > 60) {
      data.shift();
    }

    setState({ data: data });
  },
}));

export default useDisksHistoryStore;

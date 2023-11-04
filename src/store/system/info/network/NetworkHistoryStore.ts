import { create } from "zustand";
import { Api } from "../../../../service/api/api";

interface Store {
  data: Data[];
  selected: string;
  interfaces: string[];
  fetch: () => void;
  changeSelected: (v: string) => void;
}

interface Data {
  [index: string]: InterfaceState;
}

interface InterfaceState {
  rxbytes: number;
  rxcompr: number;
  rxdrop: number;
  rxerrs: number;
  rxfifo: number;
  rxframe: number;
  rxmulti: number;
  rxpkts: number;
  txbytes: number;
  txcarr: number;
  txcolls: number;
  txcompr: number;
  txdrop: number;
  txerrs: number;
  txfifo: number;
  txpkts: number;
}

const useNetworkHistoryStore = create<Store>((setState, getState) => ({
  data: [],
  interfaces: [],
  selected: "",
  fetch: async () => {
    const response = await Api.get<Data[]>("v1/network/history");
    setState({ data: response.data });
    setState({ interfaces: Object.keys(response.data[0]) });
    getState().selected === ""
      ? setState({ selected: Object.keys(response.data[0])[0] })
      : "";
  },
  changeSelected: (v: string) => {
    setState({ selected: v });
  },
}));

export default useNetworkHistoryStore;

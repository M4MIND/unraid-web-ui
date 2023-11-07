import { create } from "zustand";
import { Api } from "../../service/api/api";
import ApiNetwork from "../../service/api/network/api.network";
import UtilDate from "../../utils/UtilDate";

interface History {
  [index: string]: {
    value: number;
    group: string;
    date: string;
  }[];
}
interface Store {
  data: History;
  loaded: boolean;
  selected: string;
  interfaces: string[];
  fetch: () => void;
  fetchTick: () => void;
  changeSelected: (v: string) => void;
}

const useNetworkHistoryStore = create<Store>((setState, getState) => ({
  data: {},
  interfaces: [],
  selected: "",
  loaded: false,
  fetch: async () => {
    const response = (await ApiNetwork.GetHistory()).data;

    const temp: History = {};

    response.map((v) => {
      const date = UtilDate.ConvertUtcToHMS(v.Time);
      return Object.keys(v.Avg).map((k) => {
        if (temp[k] === undefined) temp[k] = [];

        temp[k].push(
          {
            date: date,
            value: v.Avg[k].rxbytes,
            group: "rxbytes",
          },
          {
            date: date,
            value: -v.Avg[k].txbytes,
            group: "txbytes",
          },
        );
      });
    });

    setState({ interfaces: Object.keys(response[0].Avg) });
    if (getState().selected === "")
      setState({ selected: Object.keys(response[0].Avg)[0] });
    setState({ data: temp });
    setState({ loaded: true });
  },

  fetchTick: async () => {
    const response = (await ApiNetwork.GetTick()).data;
    const temp = getState().data;

    const date = UtilDate.ConvertUtcToHMS(response.Time);
    Object.keys(response.Avg).map((k) => {
      if (temp[k] === undefined) temp[k] = [];
      temp[k].push(
        {
          date: date,
          value: response.Avg[k].rxbytes,
          group: "rxbytes",
        },
        {
          date: date,
          value: -response.Avg[k].txbytes,
          group: "txbytes",
        },
      );
    });

    setState({ data: temp });
  },
  changeSelected: (v: string) => {
    setState({ selected: v });
  },
}));

export default useNetworkHistoryStore;

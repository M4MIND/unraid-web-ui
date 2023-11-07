import { create } from "zustand";
import { Api } from "../../service/api/api";
import ApiDisks, { ApiDisksHistoryData } from "../../service/api/gpu/api.disks";
import UtilDate from "../../utils/UtilDate";

interface Store {
  data: History;
  disks: string[];
  loaded: boolean;
  selected: string;
  fetch: () => void;
  tick: () => void;
  setSelected: (v: string) => void;
}

interface History {
  [index: string]: { value: number; date: string; group: string }[];
}

const prepareData = (data: ApiDisksHistoryData[]): History => {
  const temp: History = {};
  data.map((v) => {
    const date = UtilDate.ConvertUtcToHMS(v.Time);

    Object.values(v.Avg).map((d) => {
      if (temp[d.name] === undefined) {
        temp[d.name] = [];
      }

      temp[d.name].push(
        {
          value: -d.readbytes,
          date: date,
          group: "readbytes",
        },
        {
          value: d.writebytes,
          date: date,
          group: "writebytes",
        },
      );
    });
  });

  return temp;
};

const useDisksHistoryStore = create<Store>((setState, getState) => ({
  data: {},
  disks: [],
  selected: "",
  interfaces: [],
  loaded: false,
  setSelected: (v: string) => {
    setState({ selected: v });
  },
  fetch: async () => {
    const response = await ApiDisks.GetHistory();

    const history = prepareData(response.data);

    setState({ data: history });
    setState({ disks: Object.keys(history).sort() });
    setState({ selected: Object.keys(history).sort()[0] });
    setState({ loaded: true });
  },

  tick: async () => {
    const response = await ApiDisks.GetTick();
    const data = getState().data;
    const prep = prepareData([response.data]);

    Object.keys(data).map((k) => {
      data[k].push(...prep[k]);
    });

    setState({ data: data });
  },
}));

export default useDisksHistoryStore;

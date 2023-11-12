import { create } from "zustand";
import { BaseApiStore } from "../BaseApiStore";
import { ArrayInfo } from "../../api/disks/response/ArrayInfo";
import { Api } from "../../api/api";

interface Store extends BaseApiStore {
  data: ArrayInfo | null;
}

export const useDisksArrayStore = create<Store>((setState, getState, store) => {
  return {
    data: null,
    loading: true,

    fetch: async () => {
      setState({ data: await Api.disks.getArrayInfo() });
      setState({ loading: false });
    },
  };
});

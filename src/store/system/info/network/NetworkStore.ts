import axios from "axios";
import { create } from "zustand";
import axiosClient from "../../../../utils/Axios";

interface NetworkStore {}

const useNetworkStore = create((state) => ({
  fetch: () => {
    const response = axiosClient.get("/system/info/network");
  },
}));

export default useNetworkStore;

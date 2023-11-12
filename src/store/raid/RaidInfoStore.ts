import { create } from "zustand";
import { BaseApiStore } from "../BaseApiStore";
import { Api } from "../../api/api";
import { b } from "vitest/dist/reporters-5f784f42";

interface Store extends BaseApiStore {
  data: StoreData[];
  arraySize: number;
  arrayUsed: number;
}

interface StoreData {
  model: string;
  size: number;
  name: string;
  used: number;
  uuid: string;
  mount: string;
  utilization: number;
  isHdd: boolean;
}

export const useRaidInfo = create<Store>((setState, getState, store) => ({
  data: [],
  loading: true,
  arraySize: 0,
  arrayUsed: 0,
  fetch: async () => {
    const [mdcmd, lsblk] = await Promise.all([
      Api.raid.getMdcmdStat(),
      Api.disks.getLsblk(),
    ]);
    let arraySize = 0;
    let arrayUsed = 0;

    const p: StoreData[] = mdcmd.Stats.map((v) => {
      const findLsblkInfo = lsblk.blockdevices.find(
        (k) => k.kname === v.RdevName,
      );
      const findMdInfo = lsblk.blockdevices.find((k) => k.kname === v.DiskName);

      if (findLsblkInfo && findMdInfo) {
        const prepare: StoreData = {
          model: findLsblkInfo.model ?? "Unknown",
          size: findLsblkInfo.size,
          name: findLsblkInfo.name,
          used: findMdInfo.fsused ?? 0,
          uuid: findLsblkInfo.ptuuid ?? findMdInfo.ptuuid ?? "Unknown",
          mount: findMdInfo.mountpoint ?? "Unknown",
          utilization: Number(
            (((findMdInfo.fsused ?? 1) / findLsblkInfo.size) * 100).toFixed(2),
          ),
          isHdd: findLsblkInfo.rota,
        };

        arraySize += prepare.size;
        arrayUsed += prepare.used;

        return prepare;
      }
    }).filter((v) => v !== undefined);

    setState({ data: p });
    setState({ loading: false });
    setState({ arraySize });
    setState({ arrayUsed });
  },
}));

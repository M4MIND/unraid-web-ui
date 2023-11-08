export interface ApiCpuHistory {
  average: CpuAvg;
  time: string;
}

interface CpuAvg {
  [index: string | 'cpu']: {
    [index: string]: number;
    guest: number;
    guestnice: number;
    idle: number;
    iowait: number;
    irq: number;
    nice: number;
    softirq: number;
    steal: number;
    system: number;
    total: number;
    user: number;
  };
}

export interface Device {
  DiskId: string;
  DiskSizeBytes: number;
  DiskState: number;
  RdevName: string;
  DiskUsedPercent: number;
  DiskUsedBytes: number;
  Temperature: number;
  IsHdd: boolean;
  Mount: string;
}

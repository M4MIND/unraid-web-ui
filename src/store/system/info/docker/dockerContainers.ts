import { create } from "zustand";
import { Api } from "../../../../service/api";

export interface Container {
  Id: string;
  Names: string[];
  Image: string;
  ImageID: string;
  Command: string;
  Created: number;
  Ports: Port[];
  Labels: Labels;
  State: string;
  Status: string;
  HostConfig: HostConfig;
  NetworkSettings: NetworkSettings;
  Mounts: Mount[];
}

export interface Port {
  IP?: string;
  PrivatePort: number;
  PublicPort?: number;
  Type: string;
}

export interface Labels {
  [index: string]: string;
}

export interface HostConfig {
  NetworkMode: string;
}

export interface NetworkSettings {
  Networks: Networks;
}

export interface Networks {
  bridge?: Bridge;
  openvpn?: Openvpn;
  br0?: Br0;
  host?: Host;
}

export interface Bridge {
  IPAMConfig: any;
  Links: any;
  Aliases: any;
  NetworkID: string;
  EndpointID: string;
  Gateway: string;
  IPAddress: string;
  IPPrefixLen: number;
  IPv6Gateway: string;
  GlobalIPv6Address: string;
  GlobalIPv6PrefixLen: number;
  MacAddress: string;
  DriverOpts: any;
}

export interface Openvpn {
  IPAMConfig?: Ipamconfig;
  Links: any;
  Aliases: any;
  NetworkID: string;
  EndpointID: string;
  Gateway: string;
  IPAddress: string;
  IPPrefixLen: number;
  IPv6Gateway: string;
  GlobalIPv6Address: string;
  GlobalIPv6PrefixLen: number;
  MacAddress: string;
  DriverOpts: any;
}

export interface Ipamconfig {
  IPv4Address: string;
}

export interface Br0 {
  IPAMConfig: Ipamconfig2;
  Links: any;
  Aliases: any;
  NetworkID: string;
  EndpointID: string;
  Gateway: string;
  IPAddress: string;
  IPPrefixLen: number;
  IPv6Gateway: string;
  GlobalIPv6Address: string;
  GlobalIPv6PrefixLen: number;
  MacAddress: string;
  DriverOpts: any;
}

export interface Ipamconfig2 {
  test: string;
}

export interface Host {
  IPAMConfig: any;
  Links: any;
  Aliases: any;
  NetworkID: string;
  EndpointID: string;
  Gateway: string;
  IPAddress: string;
  IPPrefixLen: number;
  IPv6Gateway: string;
  GlobalIPv6Address: string;
  GlobalIPv6PrefixLen: number;
  MacAddress: string;
  DriverOpts: any;
}

export interface Mount {
  Type: string;
  Source: string;
  Destination: string;
  Mode: string;
  RW: boolean;
  Propagation: string;
  Name?: string;
  Driver?: string;
}

interface DockerContainersStore {
  data: Container[];
  fetch: () => void;
}

const useDockerContainersStore = create<DockerContainersStore>((set) => ({
  data: [],
  fetch: async () => {
    const response = await Api.get<Container[]>(
      "/system/info/docker/containers",
    );

    set({ data: response.data });
  },
}));

export default useDockerContainersStore;

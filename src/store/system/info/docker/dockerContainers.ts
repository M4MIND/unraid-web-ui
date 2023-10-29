import { create } from "zustand";
import axiosClient from "../../../../utils/Axios";

export interface Root {
  containers: Container[];
}

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
  "com.docker.compose.config-hash"?: string;
  "com.docker.compose.container-number"?: string;
  "com.docker.compose.depends_on"?: string;
  "com.docker.compose.image"?: string;
  "com.docker.compose.oneoff"?: string;
  "com.docker.compose.project"?: string;
  "com.docker.compose.project.config_files"?: string;
  "com.docker.compose.project.working_dir"?: string;
  "com.docker.compose.replace"?: string;
  "com.docker.compose.service"?: string;
  "com.docker.compose.version"?: string;
  maintainer?: string;
  "org.opencontainers.image.created"?: string;
  "org.opencontainers.image.revision"?: string;
  "org.opencontainers.image.source"?: string;
  "org.opencontainers.image.title"?: string;
  "org.opencontainers.image.url"?: string;
  "org.opencontainers.image.vendor"?: string;
  "org.opencontainers.image.version"?: string;
  build_version?: string;
  "org.opencontainers.image.authors"?: string;
  "org.opencontainers.image.description"?: string;
  "org.opencontainers.image.documentation"?: string;
  "org.opencontainers.image.licenses"?: string;
  "org.opencontainers.image.ref.name"?: string;
  "net.unraid.docker.icon"?: string;
  "net.unraid.docker.managed"?: string;
  "net.unraid.docker.webui"?: string;
  "org.label-schema.description"?: string;
  "org.label-schema.name"?: string;
  "org.label-schema.schema-version"?: string;
  "org.label-schema.vcs-url"?: string;
  "org.label-schema.version"?: string;
  "com.docker.desktop.extension.api.version"?: string;
  "com.docker.desktop.extension.icon"?: string;
  "com.docker.extension.additional-urls"?: string;
  "com.docker.extension.detailed-description"?: string;
  "com.docker.extension.publisher-url"?: string;
  "com.docker.extension.screenshots"?: string;
  "io.portainer.server"?: string;
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
  data: Root | null;
  fetch: () => void;
}

const useDockerContainersStore = create<DockerContainersStore>((set) => ({
  data: null,
  fetch: async () => {
    const response = await axiosClient.get("/system/info/docker/containers");

    set({ data: response.data });
  },
}));

export default useDockerContainersStore;

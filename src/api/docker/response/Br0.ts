/* eslint-disable @typescript-eslint/no-explicit-any */
import {Ipamconfig2} from './Ipamconfig2'

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

/* eslint-disable */
import {Ipamconfig} from './Ipamconfig'

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

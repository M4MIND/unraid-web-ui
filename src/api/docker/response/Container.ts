import { HostConfig } from './HostConfig'
import { Labels } from './Labels'
import { NetworkSettings } from './NetworkSettings'
import {Port} from './Port'
import {Mount} from './Mount'

export interface DockerContainer {
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

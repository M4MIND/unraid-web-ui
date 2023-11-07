import {Bridge} from './Bridge'
import {Openvpn} from './Openvpn'
import {Br0} from './Br0'
import {Host} from './Host'

export interface Networks {
  bridge?: Bridge;
  openvpn?: Openvpn;
  br0?: Br0;
  host?: Host;
}

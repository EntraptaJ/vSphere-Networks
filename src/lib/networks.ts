// src/lib/networks.ts
import Shell from 'node-powershell';
import { readJSON } from 'fs-extra';
import { File, Network } from '../types';
import { run } from './run';

export async function loadFile(path: string): Promise<File> {
  return readJSON(path);
}

export async function createNetworks(
  ps: Shell,
  { networks, host, vSwitch }: File
): Promise<void> {
  for (const { name, vlan } of networks)
    await run(
      ps,
      `Get-VirtualSwitch -VMhost ${host} -Name ${vSwitch} | New-VirtualPortGroup -Name ${name} -VlanId ${vlan}`
    );
}

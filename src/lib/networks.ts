// src/lib/networks.ts
import Shell from 'node-powershell';
import { readJSON } from 'fs-extra';
import { File } from '../types';
import { run } from './run';

export async function loadFile(path: string): Promise<File> {
  return readJSON(path);
}

async function vSwitchExists(
  ps: Shell,
  host: string,
  name: string,
): Promise<boolean> {
  // Get all vSwitches with the requested name
  const result = await run(
    ps,
    `Get-VirtualSwitch -VMhost "${host}" -Name "${name}" -ErrorAction Ignore`,
  );

  // Return if the length of networks in more then zero.
  return result.length > 0;
}

export async function createNetworks(
  ps: Shell,
  { networks, host, vSwitch }: File,
): Promise<void> {
  const exists = await vSwitchExists(ps, host, vSwitch);

  // If vSwitch doesn't already exist then we create it
  if (exists === false) {
    await run(ps, `New-VirtualSwitch -VMhost "${host}" -Name "${vSwitch}"`);
  }

  for (const { name, vlan } of networks) {
    // Get the vSwitch and create a port group
    await run(
      ps,
      `Get-VirtualSwitch -VMhost "${host}" -Name "${vSwitch}" | New-VirtualPortGroup -Name "${name}" -VlanId ${vlan}`,
    );
  }
}

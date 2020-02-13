// src/types.ts
export interface Network {
  name: string;
  vlan: number;
}

export interface File {
  host: string;
  vSwitch: string;
  networks: Network[];
}

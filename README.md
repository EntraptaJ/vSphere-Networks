# vSphere Networks

## Usage

** Environment Variables **

| Variable | Description      |
| :------- | ---------------- |
| `URL`    | vCenter URL      |
| `USER`   | vCenter Username |
| `PASS`   | vCenter Password |

## Networks.json

Networks.json is a json file containing the networks to be created on the host
For an example see `networks.json`

## Running

With your `networks.json` file in the directory run the following command with the correct credentials

```bash
docker run -it -e URL=vcsa.example.com  -e USERNAME=Administrator@vsphere.local  -e PASSWORD=password -v $PWD/networks.json:/app/networks.json  docker.pkg.github.com/kristianfjones/vsphere-networks/vcenter-network:latest
```

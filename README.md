# Create Networks Scripts


## Usage
** Environment Variables **

| Variable | Description |
| :--- | --- |
| `URL`  | vCenter URL |
| `USER` | vCenter Username |
| `PASS` | vCenter Password |

## Networks.json
Networks.json is a json file containing the networks to be created on the host
For an example see `networks.json`

## Running
With your `networks.json` file in the directory run the following command with the correct credentials
```bash
docker run -it -e URL=vcsa.example.com  -e USER=Administrator@vsphere.local  -e PASS=password -v $PWD/networks.json:/app/networks.json  docker.pkg.github.com/kristianfjones/vcenter-networks/vcenter-network:latest
```
// src/index.ts
import Shell from 'node-powershell';
import { run } from './lib/run';
import { loadFile, createNetworks } from './lib/networks';

const URL = process.env['URL'];
const username = process.env['USER']
const password = process.env['PASS'];

async function start(): Promise<void> {
  // Initialize
  const ps = new Shell({
    executionPolicy: 'Bypass',
    noProfile: true
  });

  await run(ps, 'Set-PowerCLIConfiguration -InvalidCertificateAction Ignore -Confirm:$false')
  await run(ps, `Connect-VIServer -Server ${URL} -Protocol https -Username ${username} -Password ${password}`);
  const file = await loadFile('networks.json')
  await createNetworks(ps, file)
  await ps.dispose()
}

start()
// src/index.ts
import Shell from 'node-powershell';
import { run } from './lib/run';
import { loadFile, createNetworks } from './lib/networks';

if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv') as typeof import('dotenv');
  dotenv.config();
}

const URL = process.env['URL'];
const username = process.env['USERNAME'];
const password = process.env['PASSWORD'];

async function start(): Promise<void> {
  // Initialize
  const ps = new Shell({
    executionPolicy: 'Bypass',
    noProfile: true,
  });

  // Allow invalid or self signed certificates
  await run(
    ps,
    'Set-PowerCLIConfiguration -InvalidCertificateAction Ignore -Confirm:$false',
  );

  // Connect to the vSphere API
  await run(
    ps,
    `Connect-VIServer -Server ${URL} -Protocol https -Username ${username} -Password ${password}`,
  );

  // Load JSON Networks.json file
  const file = await loadFile('networks.json');

  // Create all networks
  await createNetworks(ps, file);

  // Dispose of created powershell session
  await ps.dispose();
}

start();

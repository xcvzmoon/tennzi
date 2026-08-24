import { consola } from 'consola';
import * as v from 'valibot';

const portSchema = v.optional(v.pipe(v.string(), v.regex(/^\d+$/), v.transform(Number)));
const nuxtPort = v.parse(portSchema, Bun.env.NUXT_PORT) ?? 3000;

const availablePort = findAvailablePort(nuxtPort);

if (availablePort !== nuxtPort) {
  consola.info(`Port ${nuxtPort} is busy, using port ${availablePort}`);
}

const tauriConfig = JSON.stringify({
  build: {
    devUrl: `http://localhost:${availablePort}`,
    beforeDevCommand: `bun run nuxt:dev --port ${availablePort}`,
  },
});

const tauri = Bun.spawn(['tauri', 'dev', '--config', tauriConfig], {
  cwd: Bun.fileURLToPath(new URL('..', import.meta.url)),
  stdio: ['inherit', 'inherit', 'inherit'],
});

process.on('SIGINT', () => {
  tauri.kill();
});

process.on('SIGTERM', () => {
  tauri.kill();
});

process.exitCode = await tauri.exited;

function isPortAvailable(port: number): boolean {
  try {
    const listener = Bun.listen({
      hostname: '0.0.0.0',
      port,
      socket: {
        data() {},
      },
    });

    listener.stop();

    return true;
  } catch {
    return false;
  }
}

function findAvailablePort(startPort: number): number {
  for (let port = startPort; port < startPort + 100; port++) {
    if (isPortAvailable(port)) {
      return port;
    }
  }

  throw new Error(`No available port found in range ${startPort}-${startPort + 99}`);
}

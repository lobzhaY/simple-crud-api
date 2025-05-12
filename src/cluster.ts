import cluster from 'node:cluster';
import  os  from 'node:os';
import  http  from 'node:http';
import { IncomingMessage, ServerResponse } from "node:http";
import path from 'node:path';

const CLUSTER_PORT = Number(process.env.PORT ?? 4000);
const WORKERS_COUNT = os.cpus().length;

let currentWorker = 1;
const workerPorts = []; 

const loadBalancer = async (req: IncomingMessage, res: ServerResponse) => {
  const workerPort = CLUSTER_PORT + currentWorker;
  currentWorker = currentWorker % (WORKERS_COUNT - 1) + 1; 

  const options = {
    hostname: 'localhost',
    port: workerPort,
    path: req.url,
    method: req.method,
    headers: req.headers
  };

  const proxyRequest = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode ?? 500, proxyRes.headers);
    proxyRes.pipe(res);
  });

  req.pipe(proxyRequest);
}

if (cluster.isMaster) {
  // Мастер-процесс запускает рабочие процессы
  for (let i = 1; i < WORKERS_COUNT; i++) {
    const worker = cluster.fork({ PORT: CLUSTER_PORT + i });
    workerPorts.push(CLUSTER_PORT + i);

    worker.on('exit', () => {
      console.log(`Worker ${worker.process.pid} died`);
    });
  }

  // Запускаем балансировщик нагрузки
  http.createServer(loadBalancer).listen(CLUSTER_PORT, () => {
    console.log(`Load balancer listening on port ${CLUSTER_PORT}`);
  });

} else {
  import(path.resolve(__dirname, 'worker.js')).then(() => {
    console.log(`Worker started on process ${process.pid}`);
  }).catch(err => console.error('Error loading worker', err));
}
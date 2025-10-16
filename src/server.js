import http from 'http'
import { routes } from './routes.js';
import { json } from './middlewares/json.js';

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find(route => {
    return route.method === method && route.path === url;
  })

  if (! route) {
    return res.writeHead(404).end();
  }

  return route.handler(req, res)
})

server.listen(3333)
console.log('Server running on port 3333')
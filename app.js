import Fastify from 'fastify';
import dotenv from 'dotenv';
import { pool } from './src/infra/db.js';
import { registerModules } from './src/modules/index.js';

dotenv.config();

const server = Fastify();


server.get('/health', (request, reply) => {
    return reply.send({ Health: 'Servidor funcionando' });
});

server.setNotFoundHandler(async (request, reply) => {
    return reply.send('Essa rota não existe');
})

await registerModules(server, pool);

server.listen({
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 3333,
})
.catch((err) => {
    console.error(err);
    process.exit(1);
});
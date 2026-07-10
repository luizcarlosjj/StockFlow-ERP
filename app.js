import Fastify from 'fastify';
import dotenv from 'dotenv';
import { pool } from './src/infra/db.js';
import { ProductRepositoryPostgres } from './src/repositories/product-repository.js';
import { registerProductRoutes } from './src/routes/products.js';

dotenv.config();

const server = Fastify();
const repo = new ProductRepositoryPostgres(pool);


server.get('/health', (request, reply) => {
    return reply.send({ Health: 'Servidor funcionando' });
});

server.setNotFoundHandler(async (request, reply) => {
    return reply.send('Essa rota não existe');
})

await registerProductRoutes(server, repo);

server.listen({
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 3333,
})
.catch((err) => {
    console.error(err);
    process.exit(1);
});
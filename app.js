import http from 'http';
import { fastify } from 'fastify';

const server = fastify();

server.get('/health', (reply) => {
    return reply.code(200).header('Content-Type', 'application/json; charset=utf-8').send({Health: 'Servidor funcionando'})
})

server.setNotFoundHandler(async (reply) => {
    return reply.code(404).type('text/plain').send('Essa rota não existe');
})

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333,
})
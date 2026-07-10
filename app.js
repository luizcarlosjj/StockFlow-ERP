import { fastify } from 'fastify';

const server = fastify();

server.get('/health', (request, reply) => {
    return reply.send({ Health: 'Servidor funcionando'});
})

server.setNotFoundHandler(async (request, reply) => {
    return reply.send('Essa rota não existe');
})

server.listen({
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 3333,
})
.catch((err) => {
    console.error(err);
    process.exit(1);
});
import { 
    createClient,
    listClients,
    getClientById,
    updateClient, 
    deleteClient,
} from '../usecases/clienteUseCases.js';

export async function registerClientRoutes(server, repo) {
    server.get('/clients', async (req, reply) => {
    const clients = await listClients(repo, req.query.search);
    return reply.send(clients);
    });

    // Busca produto por id
    server.get('/clients/:id', async (req, reply) => {
    const clients = await getClientById(repo, req.params.id);
    if (!clients) return reply.status(404).send({ error: 'Not found' });
    return reply.send(clients);
    });

    // Cria novo produto
    server.post('/clients', async (req, reply) => {
    try {
        const created = await createClient(repo, req.body);
        return reply.status(201).send(created);
    } catch (err) {
        return reply.status(400).send({ error: err.message });
    }
    });

    // Atualiza produto existente
    server.put('/clients/:id', async (req, reply) => {
    try {
        const updated = await updateClient(repo, req.params.id, req.body);
        if (!updated) return reply.status(404).send({ error: 'Not found' });
        return reply.send(updated);
    } catch (err) {
        return reply.status(400).send({ error: err.message });
    }
    });

    // Remove produto
    server.delete('/clients/:id', async (req, reply) => {
    const ok = await deleteClient(repo, req.params.id);
    if (!ok) return reply.status(404).send({ error: 'Not found' });
    return reply.status(204).send();
    });
}
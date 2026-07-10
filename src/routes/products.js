// Rotas HTTP para Products: adaptam requisições HTTP para os use-cases
import {
  createProduct,
  listProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../usecases/productUseCases.js';

export async function registerProductRoutes(server, repo) {
  // Lista produtos (opcionalmente por busca)
  server.get('/products', async (req, reply) => {
    const products = await listProducts(repo, req.query.search);
    return reply.send(products);
  });

  // Busca produto por id
  server.get('/products/:id', async (req, reply) => {
    const product = await getProductById(repo, req.params.id);
    if (!product) return reply.status(404).send({ error: 'Not found' });
    return reply.send(product);
  });

  // Cria novo produto
  server.post('/products', async (req, reply) => {
    try {
      const created = await createProduct(repo, req.body);
      return reply.status(201).send(created);
    } catch (err) {
      return reply.status(400).send({ error: err.message });
    }
  });

  // Atualiza produto existente
  server.put('/products/:id', async (req, reply) => {
    try {
      const updated = await updateProduct(repo, req.params.id, req.body);
      if (!updated) return reply.status(404).send({ error: 'Not found' });
      return reply.send(updated);
    } catch (err) {
      return reply.status(400).send({ error: err.message });
    }
  });

  // Remove produto
  server.delete('/products/:id', async (req, reply) => {
    const ok = await deleteProduct(repo, req.params.id);
    if (!ok) return reply.status(404).send({ error: 'Not found' });
    return reply.status(204).send();
  });
}

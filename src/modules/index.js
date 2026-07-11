import { ProductRepositoryPostgres } from '../repositories/product-repository.js';
import { registerProductRoutes } from '../routes/products.js';
import { ClientRepositoryPostgres } from '../repositories/client-repository.js';
import { registerClientRoutes } from '../routes/clients.js';

export async function registerModules(server, pool) {
  const modules = [
    {
      repo: new ProductRepositoryPostgres(pool),
      registerRoutes: registerProductRoutes,
    },
    {
      repo: new ClientRepositoryPostgres(pool),
      registerRoutes: registerClientRoutes,
    },
  ];

  for (const module of modules) {
    await module.registerRoutes(server, module.repo);
  }
}

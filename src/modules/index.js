import { ProductRepositoryPostgres } from '../repositories/product-repository.js';
import { registerProductRoutes } from '../routes/products.js';
import { ClientRepositoryPostgres } from '../repositories/client-repository.js';
import { registerClientRoutes } from '../routes/clients.js';
import { StockRepositoryPostgres } from '../repositories/stock-repository.js';
import { registerEstoqueRoutes } from '../routes/estoque.js';

export async function registerModules(server, pool) {
  // Repositórios são singletons compartilhados: o módulo de estoque
  // reutiliza a MESMA instância de productRepo (integração entre módulos)
  const productRepo = new ProductRepositoryPostgres(pool);
  const clientRepo = new ClientRepositoryPostgres(pool);
  const stockRepo = new StockRepositoryPostgres(pool);

  await registerProductRoutes(server, productRepo);
  await registerClientRoutes(server, clientRepo);
  await registerEstoqueRoutes(server, { productRepo, stockRepo });
}

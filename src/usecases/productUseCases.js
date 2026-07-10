import { Product } from '../entities/product.js';

// Cria produto: valida via `Product`, define data de criação e persiste
export async function createProduct(repo, input) {
  const now = new Date().toISOString();
  const product = new Product({ ...input, criadoem: now, atualizadoem: null });
  const id = await repo.create(product.toRecord());
  return { id, ...product.toRecord() };
}

// Lista produtos, opcionalmente com busca por nome
export async function listProducts(repo, search) {
  return repo.list(search);
}

// Obtém produto por id
export async function getProductById(repo, id) {
  return repo.findById(id);
}

// Atualiza produto: mescla alterações, valida e persiste `atualizadoem`
export async function updateProduct(repo, id, input) {
  const existing = await repo.findById(id);
  if (!existing) return null;
  const merged = { ...existing, ...input, atualizadoem: new Date().toISOString() };
  const product = new Product(merged);
  await repo.update(id, product.toRecord());
  return product.toRecord();
}

// Remove por id
export async function deleteProduct(repo, id) {
  const existing = await repo.findById(id);
  if (!existing) return false;
  await repo.delete(id);
  return true;
}

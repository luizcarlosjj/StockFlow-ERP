import { Client } from '../entities/client.js';

export async function createClient(repo, input) {
    const now = new Date().toISOString();
    const client = new Client({ ...input, criadoem: now, atualizadoEm: null});
    const id = await repo.create(client.toRecord());
    return { id, ...client.toRecord()};
}


// Lista clientes, com opcional de busca por nome
export async function listClients(repo, search) {
    return repo.list(search);
}

// obtem cliente por id 
export async function getClientById(repo, id) {
    return repo.findById(id);
}

export async function updateClient(repo, id, input) {
  const existing = await repo.findById(id);
  if (!existing) return null;
  const merged = { ...existing, ...input, atualizadoem: new Date().toISOString() };
  const client = new Client(merged);
  await repo.update(id, client.toRecord());
  return client.toRecord();
}

// Remove por id
export async function deleteClient(repo, id) {
  const existing = await repo.findById(id);
  if (!existing) return false;
  await repo.delete(id);
  return true;
}


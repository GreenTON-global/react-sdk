import { API_URL } from '../constants/api-url';
import { Tree } from '../types/api/Tree';

async function getAll(): Promise<Tree[]> {
  return await fetch(`${API_URL}/catalog`)
    .then(res => res.json())
    .then(res => res as Tree[])
    .catch(() => []);
}

async function getById(id: number): Promise<Tree | null> {
  return await fetch(`${API_URL}/catalog/${id}`, {
    method: 'GET',
  })
    .then(res => res.json())
    .then(res => res as Tree)
    .catch(() => null);
}

export const catalog = {
  getAll,
  getById,
};

import { API_URL } from '../constants/api-url';
import { TreeWithOrganization } from '../types/api/Tree';

async function getAll() {
  return await fetch(`${API_URL}/catalog`)
    .then(res => res.json())
    .then(res => res as TreeWithOrganization[]);
}

async function getById(id: number) {
  return await fetch(`${API_URL}/catalog/${id}`, {
    method: 'GET',
  })
    .then(res => res.json())
    .then(res => res as TreeWithOrganization);
}

export const catalog = {
  getAll,
  getById,
};

import { API_URL } from '../constants/api-url';
import { NFT } from '../types/api/NFT';

async function getByOwner(address: string): Promise<NFT[]> {
  return await fetch(`${API_URL}/nfts/by-wallet/${address}`, {
    method: 'GET',
  })
    .then(res => res.json())
    .then(res => res as NFT[])
    .catch(() => []);
}

async function getById(id: number): Promise<NFT | null> {
  return await fetch(`${API_URL}/nfts/${id}`, {
    method: 'GET',
  })
    .then(res => res.json())
    .then(res => res as NFT)
    .catch(() => null);
}

interface NFTCreateDTO extends Partial<NFT> {}
async function create(data: NFTCreateDTO, ownerAddress: string) {
  return await fetch(`${API_URL}/nfts`, {
    method: 'POST',
    body: JSON.stringify({
      tree: data,
      ownerAddress,
    }),
  });
}

export const nft = {
  getByOwner,
  getById,
  create,
};

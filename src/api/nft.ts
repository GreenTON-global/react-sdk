import { API_URL } from '../constants/api-url';
import { NFT } from '../types/api/NFT';

async function getByOwner(address: string) {
  return await fetch(`${API_URL}/nfts/${address}`, {
    method: 'GET',
  })
    .then(res => res.json())
    .then(res => res as NFT[])
    .catch(() => []);
}

interface NFTCreateData extends Partial<NFT> {}

async function create(data: NFTCreateData, ownerAddress: string) {
  return await fetch('/api/orders', {
    method: 'POST',
    body: JSON.stringify({
      tree: data,
      ownerAddress,
    }),
  });
}

export const nft = {
  getByOwner,
  create,
};

import { Mint, NftCollection } from '../../contracts/NftCollection';
import { Address, OpenedContract, toNano } from '@ton/core';
import { CHAIN } from '@tonconnect/ui-react';

import { MintNftItemArgs } from '../../types/MintNftItemArgs';
import { useAsyncInitialize } from '../useAsyncInitialize';
import { useTonClient } from '../ton/useTonClient';
import { useTonConnect } from '../ton/useTonConnect';

export function useNftCollection(options: { address: string; testnetOnly: boolean }) {
  const { client } = useTonClient();
  const { wallet, sender, network } = useTonConnect();

  const nftCollection = useAsyncInitialize(async () => {
    if (!client) return;

    const contract = NftCollection.fromAddress(Address.parse(options.address));

    return client.open(contract) as OpenedContract<NftCollection>;
  }, [client]);

  return {
    mint: async ({ tree, value }: MintNftItemArgs) => {
      if (options.testnetOnly && network === CHAIN.MAINNET) {
        return;
      }

      // const message: Mint = {
      //   $$type: 'Mint',
      //   tree: {
      //     $$type: 'Tree',
      //     tree_type: tree.type,
      //     region: tree.region,
      //     organisation_name: tree.organizationName,
      //   },
      //   destination: Address.parse(wallet!),
      // };
      // return await nftCollection?.send(
      //   sender,
      //   {
      //     value: toNano(value),
      //   },
      //   message
      // );
    },
  };
}

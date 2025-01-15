import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import ModalAirdrop from './ModalAirdrop'; // Ensure to create these modal components
import ModalReceive from './ModalReceive';
import ModalSend from './ModalSend';
import { useCluster } from '../cluster/cluster-data-access';

export function AccountButtons({ address }: { address: PublicKey }) {
  const wallet = useWallet();
  const { cluster } = useCluster();
  const [showAirdropModal, setShowAirdropModal] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
return (
    <div>
      <ModalAirdrop hide={() => setShowAirdropModal(false)} address={address} show={showAirdropModal} />
      <ModalReceive address={address} show={showReceiveModal} hide={() => setShowReceiveModal(false)} />
      <ModalSend address={address} show={showSendModal} hide={() => setShowSendModal(false)} />
      <div className="space-x-2">
        <button
          disabled={cluster.network?.includes('mainnet')}
          className="btn btn-xs lg:btn-md btn-outline"
          onClick={() => setShowAirdropModal(true)}
        >
          Airdrop
        </button>
        <button
          disabled={wallet.publicKey?.toString() !== address.toString()}
          className="btn btn-xs lg:btn-md btn-outline"
          onClick={() => setShowSendModal(true)}
        >
          Send
        </button>
        <button className="btn btn-xs lg:btn-md btn-outline" onClick={() => setShowReceiveModal(true)}>
          Receive
        </button>
      </div>
    </div>
  );
}
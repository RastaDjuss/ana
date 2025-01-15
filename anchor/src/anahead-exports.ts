// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import AnaheadIDL from '../target/idl/anahead.json'
import type { Anahead } from '../target/types/anahead'

// Re-export the generated IDL and type
export { Anahead, AnaheadIDL }

// The programId is imported from the program IDL.
export const ANAHEAD_PROGRAM_ID = new PublicKey(AnaheadIDL.address)

// This is a helper function to get the Anahead Anchor program.
export function getAnaheadProgram(provider: AnchorProvider, address?: PublicKey) {
  return new Program({ ...AnaheadIDL, address: address ? address.toBase58() : AnaheadIDL.address } as Anahead, provider)
}

// This is a helper function to get the program ID for the Anahead program depending on the cluster.
export function getAnaheadProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Anahead program on devnet and testnet.
      return new PublicKey('coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF')
    case 'mainnet-beta':
    default:
      return ANAHEAD_PROGRAM_ID
  }
}

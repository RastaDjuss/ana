'use client'

import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useTransactionToast } from '../ui/ui-layout'

export function useGetBalance({ address }: { address: PublicKey }) {
  const { connection } = useConnection()
  return useQuery({
    queryKey: ['get-balance', { endpoint: connection.rpcEndpoint, address: address.toBase58() }],
    queryFn: () => connection.getBalance(address),
  })
}

export function useRequestAirdrop({ address }: { address: PublicKey }) {
  const { connection } = useConnection()
  const toast = useTransactionToast()
  
  return useMutation({
    mutationFn: async (amount: number) => {
      const signature = await connection.requestAirdrop(address, amount * LAMPORTS_PER_SOL)
      await connection.confirmTransaction(signature)
      return signature
    },
    onSuccess: (signature) => toast(signature),
  })
}

export function useGetTokenAccounts({ address }: { address: PublicKey }) {
  const { connection } = useConnection()
  
  return useQuery({
    queryKey: ['get-token-accounts', { endpoint: connection.rpcEndpoint, address: address.toBase58() }],
    queryFn: () => connection.getParsedTokenAccountsByOwner(address, { programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') }),
  })
}

export function useGetSignatures({ address }: { address: PublicKey }) {
  const { connection } = useConnection()
  
  return useQuery({
    queryKey: ['get-signatures', { endpoint: connection.rpcEndpoint, address: address.toBase58() }],
    queryFn: () => connection.getSignaturesForAddress(address),
  })
}

export function useTransferSol({ address }: { address: PublicKey }) {
  const { connection } = useConnection()
  const wallet = useWallet()
  const toast = useTransactionToast()
  
  return useMutation({
    mutationFn: async ({ destination, amount }: { destination: PublicKey; amount: number }) => {
      const tx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: address,
          toPubkey: destination,
          lamports: amount * LAMPORTS_PER_SOL,
        })
      )
      const signature = await wallet.sendTransaction(tx, connection)
      await connection.confirmTransaction(signature)
      return signature
    },
    onSuccess: (signature) => toast(signature),
  })
}

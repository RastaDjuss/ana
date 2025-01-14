'use client'

import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Transaction } from '@solana/web3.js'
import { useMutation } from '@tanstack/react-query'
import { useTransactionToast } from '../ui/ui-layout'

export function useCreatePost() {
  const { connection } = useConnection()
  const wallet = useWallet()
  const toast = useTransactionToast()
  
  return useMutation({
    mutationFn: async (content: string) => {
      const tx = new Transaction()
      const signature = await wallet.sendTransaction(tx, connection)
      await connection.confirmTransaction(signature)
      return { signature, content }
    },
    onSuccess: ({ signature }) => toast(signature),
  })
}

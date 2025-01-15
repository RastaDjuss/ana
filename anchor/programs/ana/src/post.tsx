import { Program, Idl, BN } from '@coral-xyz/anchor'
import { PublicKey } from '@solana/web3.js'

export interface PostState {
  author: PublicKey
  timestamp: BN
  content: string
}

export interface PostInstructions {
  createPost: (content: string) => Promise<string>
  updatePost: (content: string) => Promise<string>
  deletePost: () => Promise<string>
}

export type PostProgram = Program<Idl> & {
  account: {
    post: {
      fetch: (address: PublicKey) => Promise<PostState>
    }
  }
  methods: PostInstructions
}

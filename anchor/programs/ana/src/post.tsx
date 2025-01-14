import * as anchor from '@coral-xyz/anchor'
import { Program } from '@coral-xyz/anchor'
import { PublicKey } from '@solana/web3.js'

export namespace Post {
  export interface Account {
    author: PublicKey
    timestamp: anchor.BN
    content: string
  }

  export interface Program extends anchor.Program {
    account: {
      post: anchor.AccountClient<Account>
    }
    methods: {
      createPost(content: string): anchor.Methods<anchor.IdlTypes>
      updatePost(content: string): anchor.Methods<anchor.IdlTypes>
      deletePost(): anchor.Methods<anchor.IdlTypes>
    }
  }
}

export const POST_SEED = 'post'

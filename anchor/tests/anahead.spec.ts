import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {Anahead} from '../target/types/anahead'

describe('anahead', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Anahead as Program<Anahead>

  const anaheadKeypair = Keypair.generate()

  it('Initialize Anahead', async () => {
    await program.methods
      .initialize()
      .accounts({
        anahead: anaheadKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([anaheadKeypair])
      .rpc()

    const currentCount = await program.account.anahead.fetch(anaheadKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Anahead', async () => {
    await program.methods.increment().accounts({ anahead: anaheadKeypair.publicKey }).rpc()

    const currentCount = await program.account.anahead.fetch(anaheadKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Anahead Again', async () => {
    await program.methods.increment().accounts({ anahead: anaheadKeypair.publicKey }).rpc()

    const currentCount = await program.account.anahead.fetch(anaheadKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Anahead', async () => {
    await program.methods.decrement().accounts({ anahead: anaheadKeypair.publicKey }).rpc()

    const currentCount = await program.account.anahead.fetch(anaheadKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set anahead value', async () => {
    await program.methods.set(42).accounts({ anahead: anaheadKeypair.publicKey }).rpc()

    const currentCount = await program.account.anahead.fetch(anaheadKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the anahead account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        anahead: anaheadKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.anahead.fetchNullable(anaheadKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})

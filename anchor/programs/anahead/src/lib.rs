#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod anahead {
    use super::*;

  pub fn close(_ctx: Context<CloseAnahead>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.anahead.count = ctx.accounts.anahead.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.anahead.count = ctx.accounts.anahead.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeAnahead>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.anahead.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeAnahead<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Anahead::INIT_SPACE,
  payer = payer
  )]
  pub anahead: Account<'info, Anahead>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseAnahead<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub anahead: Account<'info, Anahead>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub anahead: Account<'info, Anahead>,
}

#[account]
#[derive(InitSpace)]
pub struct Anahead {
  count: u8,
}

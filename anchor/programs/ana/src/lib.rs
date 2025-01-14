/// Allows the use of `Result<_, Box<dyn std::error::Error>>` in the `ana` module, which can help simplify error handling.
#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod ana {
    use super::*;

    pub fn create_post(ctx: Context<CreatePost>, content: String) -> Result<()> {
      let post = &mut ctx.accounts.post;
      let author = &ctx.accounts.author;
      
      post.author = *author.key;
      post.content = content;
      post.water_likes = 0;
      post.timestamp = Clock::get()?.unix_timestamp;
      post.evaporation_rate = 1;

      Ok(())
    }
  pub fn close(_ctx: Context<CloseAna>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.ana.count = ctx.accounts.ana.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.ana.count = ctx.accounts.ana.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeAna>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.ana.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct CreatePost<'info> {
  #[account(mut)]
  pub author: Signer<'info>,
  #[account(
      init,
      payer = author,
      space = Post::SIZE
  )]
  pub post: Account<'info, Post>,
  pub system_program: Program<'info, System>,
}

pub struct InitializeAna<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Ana::INIT_SPACE,
  payer = payer
  )]
  pub ana: Account<'info, Ana>,
  pub system_program: Program<'info, System>,
  pub struct Post {
    pub author: Pubkey,
    pub content: String,
    pub water_likes: u64,
    pub timestamp: i64,
    pub evaporation_rate: u64,
}
}
#[derive(Accounts)]
pub struct CloseAna<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub ana: Account<'info, Ana>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub ana: Account<'info, Ana>,
}

#[account]
#[derive(InitSpace)]
pub struct Ana {
  count: u8,
}

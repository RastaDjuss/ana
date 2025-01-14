'use client'

import React, { useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { AppHero } from '../ui/ui-layout'
import { useCluster } from '../cluster/cluster-data-access'

export function PostFeature() {
  const { publicKey } = useWallet()
  const { cluster } = useCluster()
  const [content, setContent] = useState('')

  if (!publicKey) {
    return (
      <AppHero
        title="Social Feed"
        subtitle="Connect your wallet to start posting"
      />
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <AppHero
        title="Social Feed"
        subtitle={`Connected to cluster ${cluster.name}`}
      />
      <div className="flex flex-col gap-4 max-w-xl mx-auto">
        <textarea
          className="textarea textarea-bordered"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button 
          className="btn btn-primary"
          disabled={!content.length}
          onClick={() => {
            // TODO: Implement post creation
            console.log('Post content:', content)
            setContent('')
          }}
        >
          Post
        </button>
      </div>
    </div>
  )
}

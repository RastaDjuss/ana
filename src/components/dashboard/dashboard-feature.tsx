'use client'

import React from 'react'
import { AppHero } from '../ui/ui-layout'

const links: { label: string; href: string }[] = [
  { label: 'Solana Docs', href: 'https://docs.solana.com/' },
  { label: 'Solana Faucet', href: 'https://faucet.solana.com/' },
  { label: 'Solana Cookbook', href: 'https://solanacookbook.com/' },
  { label: 'Solana Stack Overflow', href: 'https://solana.stackexchange.com/' },
  { label: 'Solana Developers GitHub', href: 'https://github.com/solana-developers/' },
]

const DashboardFeature = () => {
  return React.createElement('div', null, [
    React.createElement(AppHero, { 
      title: "gm", 
      subtitle: "Say hi to your new Solana dApp." 
    }),
    React.createElement('div', { 
      className: "max-w-xl mx-auto py-6 sm:px-6 lg:px-8 text-center" 
    }, [
      React.createElement('div', { className: "space-y-2" }, [
        React.createElement('p', null, 'Here are some helpful links to get you started.'),
        links.map((link, index) => 
          React.createElement('div', { key: index },
            React.createElement('a', {
              href: link.href,
              className: "link",
              target: "_blank",
              rel: "noopener noreferrer"
            }, link.label)
          )
        )
      ])
    ])
  ])
}

export default DashboardFeature

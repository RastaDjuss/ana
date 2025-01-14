import React from 'react'
import { PostFeature } from '@/components/social/post-feature'

export default function SocialPage() {
  return React.createElement('div', null, [
    React.createElement('h1', null, 'Social Feed'),
    React.createElement(PostFeature)
  ])
}

'use client'

import dynamic from 'next/dynamic'

const AboutUs = dynamic(() => import('@/pages/AboutUs'), { ssr: false })

export default function AboutPage() {
  return <AboutUs />
}

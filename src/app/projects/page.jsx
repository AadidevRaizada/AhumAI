'use client'

import dynamic from 'next/dynamic'

const OurProjects = dynamic(() => import('@/pages/OurProjects'), { ssr: false })

export default function ProjectsPage() {
  return <OurProjects />
}

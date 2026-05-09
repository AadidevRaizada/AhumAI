'use client'

import dynamic from 'next/dynamic'

const OurProjects = dynamic(() => import('@/views/OurProjects'), { ssr: false })

export default function ProjectsPage() {
  return <OurProjects />
}

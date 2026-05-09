'use client'

import dynamic from 'next/dynamic'

const ContactUs = dynamic(() => import('@/pages/ContactUs'), { ssr: false })

export default function ContactPage() {
  return <ContactUs />
}

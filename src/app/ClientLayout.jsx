'use client'

import { lazy, Suspense } from 'react'
import Layout from '@/components/Layout'
import BackedByKiro from '@/components/BackedByKiro'

const GradualBlur = lazy(() => import('@/components/GradualBlur'))

function FooterBlur() {
  return (
    <Suspense fallback={null}>
      <GradualBlur
        target="page"
        position="bottom"
        height="5rem"
        strength={4}
        divCount={8}
        curve="bezier"
        exponential={true}
        opacity={1}
        zIndex={100}
      />
    </Suspense>
  )
}

export default function ClientLayout({ children }) {
  return (
    <Layout>
      {children}

      <BackedByKiro />

      <footer className="py-10 sm:py-14 border-t border-rust-line mt-16 sm:mt-20 relative z-[500] px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 mb-8">
            <h3 className="text-fog-gray text-sm font-medium">Quick Links</h3>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
              <a href="/" className="text-fog-gray hover:text-signal-amber transition-colors duration-[0.15s] ease-out text-sm">Home</a>
              <a href="/projects" className="text-fog-gray hover:text-signal-amber transition-colors duration-[0.15s] ease-out text-sm">Projects</a>
              <a href="/about" className="text-fog-gray hover:text-signal-amber transition-colors duration-[0.15s] ease-out text-sm">About Us</a>
              <a href="/contact" className="text-fog-gray hover:text-signal-amber transition-colors duration-[0.15s] ease-out text-sm">Contact</a>
            </div>
          </div>

          <p className="text-center text-fog-gray text-xs sm:text-sm">© 2025 AhumAI. All rights reserved.</p>
        </div>
      </footer>

      <FooterBlur />
    </Layout>
  )
}

import { Navbar } from '@/components/landingpage/Navbar'
import { Hero } from '@/components/landingpage/Home'
import { Features } from '@/components/landingpage/Features'
import { Services } from '@/components/landingpage/Services'
import { CTA } from '@/components/landingpage/CTA'
import { Footer } from '@/components/landingpage/Footer'

export default function LandingPage() {
  return (
    <main className='scroll-smooth'>
      <Navbar />
      <Hero />
      <Features />
      <Services />
      <CTA />
      <Footer />
    </main>
  )
}
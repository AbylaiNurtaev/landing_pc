import { CTAModalProvider } from './context/CTAModalContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import ForClubOwners from './components/ForClubOwners'
import Economy from './components/Economy'
import Transparency from './components/Transparency'
import PlatformUI from './components/PlatformUI'
import FAQ from './components/FAQ'
import CTAForm from './components/CTAForm'
import CTAFormModal from './components/CTAFormModal'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <CTAModalProvider>
      <Navbar />
      <main className="overflow-x-hidden">
        <Hero />
        <HowItWorks />
        <ForClubOwners />
        <Economy />
        <Transparency />
        <PlatformUI />
        <FAQ />
        <CTAForm />
      </main>
      <Footer />
      <ScrollToTop />
      <CTAFormModal />
    </CTAModalProvider>
  )
}

export default App

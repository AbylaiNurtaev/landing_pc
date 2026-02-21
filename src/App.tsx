import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import ForClubOwners from './components/ForClubOwners'
import Economy from './components/Economy'
import Transparency from './components/Transparency'
import PlatformUI from './components/PlatformUI'
import FAQ from './components/FAQ'
import CTAForm from './components/CTAForm'
import Footer from './components/Footer'

function App() {
  return (
    <>
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
    </>
  )
}

export default App

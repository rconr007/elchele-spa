import Scene from '@/components/scene'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-[#002D62] from-[0%] via-[#002D62] via-[40%] to-[#CE1126] to-[60%] relative overflow-hidden">
      <div className="absolute inset-0">
        <Scene />
      </div>
      <div className="relative z-10 container mx-auto px-4 py-4 flex flex-col vh-full vw-full pointer-events-none">
        <header className="flex justify-between items-center">
          <div className="text-white text-2xl font-bold">Chele</div>
          <Button variant="outline" className="pointer-events-auto">
            Connect Wallet
          </Button>
        </header>
        <div className="flex-grow flex items-end pb-20">
          <div className="max-w-2xl landing-caption">
            <h1 
              className="text-6xl font-semibold text-white mb-6 main-title" 
              style={{ 
                fontFamily: 'BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif'
              }}
            >
              Your Cryptocurrency Eco System
            </h1>
            <h2 
              className="text-xl text-white/80 mb-10" 
              style={{ 
                fontFamily: '"Cabin Variable", sans-serif',
                fontWeight: 300
              }}
            >
              Unlocking Crypto Wealth Together: A Shared Journey to Financial Freedom through Our Affordable ICO.
            </h2>
            <div className="flex gap-4 pointer-events-auto">
              <Button 
                className="bg-gradient-to-r from-[#002D62] to-[#CE1126] text-white hover:opacity-90 h-12 px-8 text-lg font-bold"
              >
                Get Started
              </Button>
              <Button 
                className="bg-gradient-to-r from-[#002D62] to-[#CE1126] text-white hover:opacity-90 h-12 px-8 text-lg font-bold"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

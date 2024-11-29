import Scene from '@/components/scene'
import { Button } from '@/components/ui/button'
import { Brand } from '@/components/brand'

export default function Home() {
  return (
    <main className="h-screen bg-gradient-to-r from-[#002D62] from-[0%] via-[#002D62] via-[40%] to-[#CE1126] to-[60%] relative overflow-hidden">
      <div className="absolute inset-0">
        <Scene />
      </div>
      <div className="relative z-10 h-[96vh] mx-auto px-8 flex flex-col justify-between pointer-events-none">
        <header className="flex justify-between items-center pt-8">
          <Brand />
          <Button variant="outline" className="pointer-events-auto">
            Connect Wallet
          </Button>
        </header>
        <div className="flex flex-col justify-end flex-grow mb-25">
          <div className="max-w-2xl landing-caption">
            <h1 
              className="text-7xl font-semibold text-white mb-8 main-title leading-tight" 
              style={{ 
                fontFamily: 'BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif'
              }}
            >
              Your Cryptocurrency Eco System
            </h1>
            <h2 
              className="text-2xl text-white/80 mb-12" 
              style={{ 
                fontFamily: '"Cabin Variable", sans-serif',
                fontWeight: 300
              }}
            >
              Unlocking Crypto Wealth Together: A Shared Journey to Financial Freedom through Our Affordable ICO.
            </h2>
            <div className="flex gap-6 pointer-events-auto">
              <Button 
                className="bg-gradient-to-r from-[#002D62] to-[#CE1126] text-white hover:opacity-90 h-14 px-10 text-lg font-bold"
              >
                Get Started
              </Button>
              <Button 
                className="bg-gradient-to-r from-[#002D62] to-[#CE1126] text-white hover:opacity-90 h-14 px-10 text-lg font-bold"
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

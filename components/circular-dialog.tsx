import { X } from 'lucide-react'
import { cn } from "@/lib/utils"

interface CircularDialogProps {
  title: string
  onClose: () => void
  children: React.ReactNode
}

export function CircularDialog({ title, onClose, children }: CircularDialogProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-black/50 absolute inset-0 animate-fade-in" onClick={onClose}></div>
      <div 
        className={cn(
          "rounded-full w-[800px] h-[800px] relative z-10 overflow-hidden flex flex-col bg-black/90 animate-dialog-expand",
          "border-[10px] border-[#B97A57]"
        )}
        style={{
          backgroundImage: 'url(/backgroundIndians.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="flex flex-col h-full px-32 py-24">
          <button
            onClick={onClose}
            className="absolute top-12 right-12 text-gray-300 hover:text-white transition-colors"
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
          <h2 className="text-3xl font-bold mb-8 text-center text-white" style={{ fontFamily: 'BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif' }}>{title}</h2>
          <div 
            className="overflow-y-auto flex-grow pr-8 text-[10px] leading-relaxed tracking-wide text-gray-200 max-w-[600px] mx-auto custom-scrollbar"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(255, 255, 255, 0.3) transparent',
              fontFamily: '"Cabin Variable", sans-serif'
            }}
          >
            <style jsx>{`
              .custom-scrollbar::-webkit-scrollbar {
                width: 2px;
              }
              .custom-scrollbar::-webkit-scrollbar-track {
                background: transparent;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background-color: rgba(255, 255, 255, 0.3);
                border-radius: 1px;
              }
            `}</style>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

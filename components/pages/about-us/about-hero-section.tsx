import { Navigation } from "@/components/layout/navigation"

export function AboutHeroSection() {
  return (
    <div className="relative bg-[#1e293b] min-h-[80vh] flex flex-col overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-in fade-in duration-1000"
        style={{
          backgroundImage: "url('/assets/images/hero-1.png')",
          filter: 'blur(10px)',
          transform: 'scale(1.1)',
        }}
      ></div>

      <div className="absolute inset-0 bg-[#151D3BCC]/100"></div>

      {/* Navigation */}
      <div className="relative z-50">
        <Navigation />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            About Us
          </h1>
        </div>
      </div>
    </div>
  )
}

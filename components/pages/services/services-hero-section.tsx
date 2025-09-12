import Image from "next/image"

export default function ServicesHeroSection() {
  return (
    <section className="relative bg-[#1e293b] min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Heavy Blur */}
      <div className="absolute inset-0 animate-in fade-in duration-1000">
        <Image
          src="/assets/images/hero-1.png"
          alt="Services background"
          fill
          className="object-cover scale-110 blur-[10px]"
          priority
        />
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-[#151D3BCC]/100"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          Services
        </h1>
      </div>
    </section>
  )
}

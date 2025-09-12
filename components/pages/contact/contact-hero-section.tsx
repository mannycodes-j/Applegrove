import Image from "next/image"

export function ContactHeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
       <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-in fade-in duration-1000"
        style={{
          backgroundImage: "url('/assets/images/hero-1.png')",
          filter: 'blur(10px)',
          transform: 'scale(1.1)',
        }}
      ></div>
        <div className="absolute inset-0 bg-[#151D3BCC]/100"></div>
      

      {/* Content */}
      <div className="relative z-10 text-center">
        <h1 className="text-6xl md:text-7xl font-bold text-white animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          Contact
        </h1>
      </div>
    </section>
  )
}

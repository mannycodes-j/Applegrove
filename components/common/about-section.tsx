import Image from "next/image"

export function AboutSection() {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Section - Text Content */}
        <div className="space-y-8">
          {/* Section Badge */}
          <div className="inline-flex">
            <span className="bg-[#F4AD20] text-white px-4 py-2 rounded-full text-sm font-medium">About Us</span>
          </div>

          {/* Two Column Text Layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left - Main Heading */}
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Strategic
                <br />
                advisory experts
              </h2>
            </div>

            {/* Right - Description */}
            <div>
              <p className="text-lg text-gray-600 leading-relaxed">
                AppleGrove Advisory helps businesses build, fund, and scale. We work with founders, capital providers,
                and institutions to turn ideas into successful ventures. Our approach blends venture-building expertise
                with transaction depth, delivering real results across sectors and markets.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section - Full Width Image */}
        <div className="relative">
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden">
            <Image
              src="/assets/images/about-us.png"
              alt="Strategic advisory meeting with diverse team of professionals"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

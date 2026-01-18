export function StrategicExpertsSection() {
  return (
    <section className="bg-[#151D3B] py-16 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Meeting Image */}
        <div className="mb-16">
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src="/assets/images/about-us.png"
              alt="Strategic advisory meeting with diverse team"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* About Us Badge */}
        <div className="mb-8">
          <span className="inline-block bg-[#f59e0b] text-white px-4 py-2 rounded-full text-sm font-medium">
            About Us
          </span>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Heading */}
          <div>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
              Strategic Advisory Experts
            </h2>
          </div>

          {/* Right Column - Description */}
          <div>
            <p className="text-lg text-white/90 leading-relaxed">
              Our work spans venture development, financing advisory, and
              strategic initiatives across sectors including energy, trade,
              housing, infrastructure, technology, and the creative economy.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

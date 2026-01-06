export function OurStorySection() {
  return (
    <section className="bg-[#151D3B] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Our Story Badge */}
        <div className="mb-8">
          <span className="inline-block bg-[#f59e0b] text-white px-4 py-2 rounded-full text-sm font-medium">
            Our Story
          </span>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Heading */}
          <div>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
              AppleGrove Advisory Helps Businesses Build, Fund, and Scale
            </h2>
          </div>

          {/* Right Column - Description */}
          <div>
            <p className="text-lg text-white/90 leading-relaxed">
              AppleGrove is a venture development and advisory platform working
              at the intersection of entrepreneurship, capital, and market
              expansion. We partner closely with founders, operators, and
              institutions to design scalable business models, structure
              financing strategies, and support execution across growth stages.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

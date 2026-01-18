import Image from "next/image"

const sectors = [
  {
    title: 'Technology Startups',
    description:
      'We guide technology startups through funding processes, strategic planning, market access, and operational excellence. We provide comprehensive planning, funding assistance, and operational optimization for sustainable growth and market success.',
    image: '/assets/images/sector-1.png',
  },
  {
    title: 'Real Estate and Construction',
    description:
      'We offer strategic real estate planning and construction project management. Our expertise helps navigate complex real estate strategies while optimizing operational and project efficiency.',
    image: '/assets/images/sector-2.png',
  },
  {
    title: 'Creative Economy',
    description:
      'We help creative enterprises leverage design, film, and music with talent development, business structuring, providing strategic guidance and growth support.',
    image: '/assets/images/sector-3.png',
  },
  {
    title: 'Energy',
    description:
      'We help energy companies/startups with projects in sustainable, sustainable energy finance, risk management, and partnerships.',
    image: '/assets/images/sector-4.png',
  },
  {
    title: 'Wealth Management',
    description: 'Our wealth management is dedicated to helping clients achieving their financial goals through personalized strategies and comprehensive solutions. We combine expert investment management, tax efficiency planning, and risk mitigation to preserve and grow your wealth. Our team is committed to building long term relationships based on trust, transparency and a deep understanding of each client’s unique needs.',
    image: '/assets/images/sector-5.jpg',
  },
]

export default function SectorsSection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-[#f59e0b] text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            Our Focus
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Sectors We Serve
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {sectors.map((sector, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-lg">
              <div className="aspect-[4/3] relative mb-4">
                <Image
                  src={sector.image || '/placeholder.svg'}
                  alt={sector.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {sector.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {sector.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Helping Ventures Build, Raise Capital, and Expand
            </h3>
          </div>
          <div>
            <p className="text-lg text-gray-600 leading-relaxed">
              We partner with startups, growth businesses, and institutions to
              provide the strategy, capital expertise, and execution needed to
              succeed. From building ventures to securing funding and entering
              new markets, our services are designed to deliver measurable
              results.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

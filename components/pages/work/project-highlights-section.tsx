import Image from 'next/image'

const projects = [
  {
    name: 'HerHomes — Venture Development (Housing & Financial Inclusion)',
    tag: 'Venture Development',
    description:
      'Internally developed product enabling credit‑led homeownership for working women through scalable community, automation and finance‑ready models.',
    image: '/assets/images/topProject-1.png',
  },
  {
    name: 'Alles Charis — Oil & Gas Financing Advisory',
    tag: 'Financing & Strategic Advisory',
    description:
      'Advised an Oil & Gas company on financing strategy and capital structuring, supporting engagement with lenders and capital partners to fund asset development and operational growth.',
    image: '/assets/images/topProject-2.png',
  },
  {
    name: 'VentureReg — Venture Development (Regulatory & Compliance Infrastructure)',
    tag: 'Venture Development',
    description:
      'Venture Reg is a multi‑jurisdictional compliance platform for businesses going global. AppleGrove provides business, financing, partnership and talent acquisition support to the business. ',
    image: '/assets/images/topProject-3.png',
  },
  {
    name: 'Firecrackers FC — Sports',
    tag: 'Strategic Initiatives & Ecosystem Plays',
    description:
      'Firecrackers Football Club is a grassroot football initiative positioned to unlock talent development and export from Africa. AppleGrove advised on the sustainable business model design, monetization pathways, investment and commercialization of the business. ',
    image: '/assets/images/topProject-5.png',
  },
  {
    name: 'Axis — Venture Development (Trade & Trade Finance Infrastructure)',
    tag: 'Venture Development & Venture Studio Projects',
    description:
      'Internally developed product focused on building infrastructure to support cross‑border trade and financing workflows within African and Asian Markets. ',
    image: '/assets/images/axis.jpg',
  },
]

export function ProjectHighlightsSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-[#f59e0b] text-white px-4 py-2 rounded-full text-sm font-medium mb-4 animate-in fade-in duration-500">
            Selected Work
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            Our top project highlights
          </h2>
        </div>

        {/* Project Cards */}
        <div className="space-y-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-100 border border-gray-200 rounded-[20px] p-8 w-full max-w-[1296px] h-[1100px] md:h-[616px] mx-auto hover:shadow-lg transition-all hover:scale-[1.01] animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${400 + index * 200}ms` }}
            >
              <div className="grid md:grid-cols-2 gap-8 items-center h-full">
                {/* Project Info */}
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="inline-block bg-[#f59e0b] text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                      {project.tag}
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-6">
                      {project.name}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {project.description}
                  </p>
                </div>

                {/* Project Image */}
                <div className="relative h-full min-h-[300px] group overflow-hidden rounded-lg">
                  <Image
                    src={project.image || '/placeholder.svg'}
                    alt={project.name}
                    fill
                    className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectHighlightsSection

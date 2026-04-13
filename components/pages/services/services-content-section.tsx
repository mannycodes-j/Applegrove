import Image from 'next/image'

const services = [
  {
    id: 'venture-development',
    title: 'Venture Development',
    description:
      'We co‑build ventures from early idea through execution. Our work spans business model design, market validation, operational structuring, and go‑to‑market execution ensuring companies are built to scale and ready for financing, partnerships, and expansion.',
    image: '/assets/images/servicesWhatwe.png',
    imagePosition: 'left',
    tags: [
      'Ideate-out ventures',
      'Strategic advisory',
      'Product & growth support',
      'Capital preparation',
    ],
  },
  {
    id: 'capital-advisory',
    title: 'Capital & Investment Advisory',
    description:
      'We advise businesses on capital strategy and financing pathways across sectors. Our work includes structuring debt, project, and hybrid financing solutions; preparing lender‑ and investor‑ready materials; and supporting negotiations with banks, funds, and alternative capital providers.',
    image: '/assets/images/capture.png',
    imagePosition: 'right',
    tags: [
      'Capital readiness',
      'Deal structuring',
      'Financial modeling',
      'Investor outreach & support',
    ],
  },
  {
    id: 'strategic-expansion',
    title: 'Strategic Expansion & Transaction Advisory',
    description:
      'We support businesses navigating expansion, partnerships, and complex transactions. Our advisory covers market entry planning, regulatory and operational structuring, partnership development, and transaction support across growth stages.',
    image: '/assets/images/strategic.png',
    imagePosition: 'left',
    tags: [
      'Market expansion',
      'M&A and compliance',
      'Due diligence',
      'Cross-border transaction partnerships',
    ],
  },
  {
    id: 'financing-strategic-advisory',
    title: 'Financing & Strategic Advisory',
    description:
      'We advise companies on financing strategy and capital structuring, supporting engagement with lenders and capital partners to fund asset development and operational growth.',
    image: '/assets/images/img hand.jpg',
    imagePosition: 'right',
    tags: [
      'Financing strategy',
      'Capital structuring',
      'Lender engagement',
      'Investor outreach',
    ],
  },
  /*{
    id: 'venture-development-studio-projects',
    title: 'Venture Development & Venture Studio Projects',
    description:
      'Axis — Venture Development (Trade & Financing Infrastructure) <br> Internally developed product focused on building infrastructure to support cross‑border trade and financing workflows within African and Asian Markets. <br><br> HerHomes — Venture Development (Housing & Financial Inclusion) <br> Internally developed product enabling credit‑led homeownership for working women through scalable community, automation and finance‑ready models. <br><br> VentureReg — Venture Development (Regulatory & Compliance Infrastructure) <br> Venture Reg is a multi‑jurisdictional compliance platform for businesses going global. AppleGrove provides business, financing, partnership and talent acquisition support to the business. ',
    image: '/assets/images/imhg.jpg',
    imagePosition: 'left',
    tags: [
      'Venture ideation',
      'Business model design',
      'Go-to-market strategy',
      'Operational structuring',
    ],
  },*/
]

export default function ServicesContentSection() {
  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-[#f59e0b] text-white text-sm font-medium rounded-full mb-6">
            Our Services
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            What We Do
          </h2>
        </div>

        {/* Services List */}
        <div className="space-y-24">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              {/* Image */}
              <div
                className={`${
                  service.imagePosition === 'right' ? 'lg:order-2' : ''
                }`}
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden">
                  <Image
                    src={service.image || '/placeholder.svg'}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div
                className={`${
                  service.imagePosition === 'right' ? 'lg:order-1' : ''
                }`}
              >
                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  {service.title}
                </h3>
                <p
                  className="text-lg text-gray-600 mb-8 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: service.description }}
                />

                {/* Service Tags */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-700 mb-4">
                    Key elements:
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {service.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-4 py-2 bg-[#151D3BB2]/20 border border-black text-gray-700 text-sm font-medium rounded-full hover:bg-gray-50 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

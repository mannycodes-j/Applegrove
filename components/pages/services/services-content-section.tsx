import Image from "next/image"

const services = [
  {
    id: "venture-development",
    title: "Venture Development",
    description:
      "We help you navigate the full spectrum of entrepreneurial ventures, as a trusted partner. Whether it's product design, market entry or business expansion, we provide comprehensive support to ensure success.",
    image: "/assets/images/servicesWhatwe.png",
    imagePosition: "left",
    tags: ["Ideate-out ventures", "Strategic advisory", "Product & growth support", "Capital preparation"],
  },
  {
    id: "capital-advisory",
    title: "Capital & Investment Advisory",
    description:
      "We make navigation smoother. Our work spans securing strategic investment support, and investor matchmaking. Making connections that will bring your vision to life.",
    image: "/assets/images/capture.png",
    imagePosition: "right",
    tags: ["Capital readiness", "Deal structuring", "Financial modeling", "Investor outreach & support"],
  },
  {
    id: "strategic-expansion",
    title: "Strategic Expansion & Transaction Advisory",
    description:
      "We define complexities and institutional navigating strategic growth, from market entry to cross-border partnerships. Our expertise ensures seamless expansion.",
    image: "/assets/images/strategic.png",
    imagePosition: "left",
    tags: ["Market expansion", "M&A and compliance", "Due diligence", "Cross-border transaction partnerships"],
  },
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
            What we do
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
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {service.description}
                </p>

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

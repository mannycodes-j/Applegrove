import { Lightbulb, Database, Earth } from "lucide-react"

const services = [
  {
    id: 1,
    icon: Lightbulb,
    title: "Venture Development",
    description:
      "We co-build and support businesses from idea to scale, providing strategic guidance and operational support.",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    id: 2,
    icon: Database,
    title: "Capital & Investment Advisory",
    description: "We make companies investable, helping ventures raise smart capital with clarity and confidence.",
    bgColor: "bg-green-50",
    iconColor: "text-green-500",
  },
  {
    id: 3,
    icon: Earth,
    title: "Strategic Expansion & Transaction Advisory",
    description:
      "We guide companies through complex growth opportunities including market entry, partnerships, and transactions.",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-500",
  },
]

export function ServicesSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Badge */}
        <div className="flex justify-center mb-6 animate-in fade-in duration-500">
          <span className="inline-flex items-center px-6 py-2 rounded-full text-sm font-medium text-white bg-[#F4AD20]">
            Our Services
          </span>
        </div>

        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          What we do
        </h2>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <div
                key={service.id}
                className={`p-8 rounded-2xl ${service.bgColor} transition-all duration-300 hover:scale-105 hover:shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700`}
                style={{ animationDelay: `${400 + index * 200}ms` }}
              >
                <div
                  className={`w-12 h-12 ${service.iconColor} mb-6 transition-transform duration-200 hover:scale-110`}
                >
                  <IconComponent size={48} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 leading-tight">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

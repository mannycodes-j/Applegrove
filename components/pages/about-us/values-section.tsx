import { Lightbulb, ShieldCheck, BadgeCheck } from 'lucide-react'

const values = [
  {
    icon: Lightbulb,
    title: 'Partnership First',
    description:
      "We don't just advise, we walk alongside our clients, shaping strategy and executing together.",
    bgColor: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    icon: ShieldCheck,
    title: 'Curiosity That Leads',
    description:
      'We challenge assumptions and explore bold ideas to unlock unexpected growth opportunities.',
    bgColor: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    icon: BadgeCheck,
    title: 'Results That Matter',
    description:
      'We focus on delivering meaningful impact, turning strategy into tangible, measurable outcomes.',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
]

export function ValuesSection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Badge */}
        <div className="flex justify-center mb-8">
          <span className="bg-[#f59e0b] text-white px-4 py-2 rounded-full text-sm font-medium">
            Our Values
          </span>
        </div>

        {/* Section Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
          What drives us
        </h2>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const IconComponent = value.icon
            return (
              <div
                key={index}
                className={`${value.bgColor} p-8 rounded-2xl `}
              >
                <div className="flex  mb-6 text-left">
                  <IconComponent className={`w-12 h-12 ${value.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {value.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

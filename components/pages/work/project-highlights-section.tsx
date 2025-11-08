import Image from 'next/image'

const projects = [
  {
    name: 'HerHomes',
    description:
      "Nigeria's first crowd-led platform helping working women buy homes through validated financing and best lending options.",
    image: '/assets/images/topProject-1.png',
  },
  {
    name: 'Alles Charis',
    description:
      'Alles Charis is an innovative line of credit platform specifically designed for oil and gas merchants. The solution streamlines access to working capital, enables seamless transaction processing, and provides robust inventory management tools. Our platform helps merchants optimize their cash flow and scale their operations efficiently in the dynamic energy sector.',
    image: '/assets/images/topProject-2.png',
  },
  {
    name: 'Venture Reg',
    description:
      'Venture reg is a compliance as a service start up and it involves strategic advisory and business setups and strategic partnership across international and intercontinental borders.',
    image: '/assets/images/topProject-3.png',
  },
  {
    name: 'Firecrackers Football Club',
    description:
      'An innovative multi-club football network advancing talent in youth development and talent exposure in Nigerian football.',
    image: '/assets/images/topProject-5.png',
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
              className="bg-gray-100 border border-gray-200 rounded-[20px] p-8 w-full max-w-[1296px] h-[850px] md:h-[616px] mx-auto hover:shadow-lg transition-all hover:scale-[1.01] animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${400 + index * 200}ms` }}
            >
              <div className="grid md:grid-cols-2 gap-8 items-center h-full">
                {/* Project Info */}
                <div className="flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">
                    {project.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {project.description}
                  </p>
                </div>

                {/* Project Image */}
                <div className="relative h-full min-h-[400px] group overflow-hidden rounded-lg">
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

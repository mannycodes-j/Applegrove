import Image from 'next/image'

const teamMembers = [
  {
    name: 'STEPHANIE ETIAKA',
    role: 'Managing Partner',
    image: '/assets/images/steph-pic.png',
    bgColor: 'bg-slate-700',
  },
  {
    name: 'EMEKA OSBOURNE',
    role: 'Executive Partner',
    image: '/assets/images/team-2.png',
    bgColor: 'bg-orange-400',
  },
  {
    name: 'TREASURE ALLI',
    role: 'Developer & IT',
    image: '/assets/images/treasure-pic.png',
    bgColor: 'bg-orange-400',
  },
  {
    name: 'OLONADE ADEOLUWA',
    role: 'Communications',
    image: '/assets/images/adeoluwa-pic.png',
    bgColor: 'bg-slate-800',
  },
  {
    name: 'OLAJIDE IFEOLUWA',
    role: 'Product Designer',
    image: '/assets/images/ifeoluwa-pic.png',
    bgColor: 'bg-slate-400',
  },
]

export function TeamSection() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-black mb-16">
          Meet The Team
        </h2>

        <div className="max-w-4xl mx-auto">
          {/* Top row - 2 members */}
          <div className="flex justify-center gap-8 md:gap-16 mb-12">
            {teamMembers.slice(0, 2).map((member, index) => (
              <div key={index} className="text-center">
                <div
                  className={`w-32 h-32 md:w-40 md:h-40 rounded-full ${member.bgColor} mx-auto mb-4 overflow-hidden`}
                >
                  <Image
                    src={member.image || '/placeholder.svg'}
                    alt={member.name}
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-black mb-1">
                  {member.name}
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  {member.role}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom row - 3 members */}
          <div className="grid grid-cols-2 md:flex md:justify-center gap-6 md:gap-12">
            {teamMembers.slice(2).map((member, index) => (
              <div
                key={index}
                className={`text-center ${
                  // make the 3rd item (index 2) span 2 columns on mobile so it centers
                  index === 2 ? 'col-span-2' : ''
                }`}
              >
                <div
                  className={`w-32 h-32 md:w-40 md:h-40 rounded-full ${member.bgColor} mx-auto mb-4 overflow-hidden`}
                >
                  <Image
                    src={member.image || '/placeholder.svg'}
                    alt={member.name}
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-black mb-1">
                  {member.name}
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

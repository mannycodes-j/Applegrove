import Image from 'next/image'

const teamMembers = [
  {
    name: 'Stephanie Etiaka',
    role: 'Managing Partner',
    image: '/assets/images/steph-pic.png',
    bgColor: 'bg-slate-700',
  },
  {
    name: 'Emeka Osbourne',
    role: 'Executive Partner',
    image: '/assets/images/team-2.png',
    bgColor: 'bg-orange-400',
  },
  {
    name: 'Adetoyese Arigbabuwo',
    role: 'IT',
    image: '/assets/images/adetoye-pic.png',
    bgColor: 'bg-orange-400',
  },
  {
    name: 'Olonade Adeoluwa',
    role: 'Communications',
    image: '/assets/images/adeoluwa-pic.png',
    bgColor: 'bg-slate-800',
  },
  {
    name: 'Okolie David',
    role: 'Finance',
    image: '/assets/images/okolie-pic.png',
    bgColor: 'bg-slate-400',
  },
]

export function TeamSection() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-black mb-16">
          Meet the Team
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
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            {teamMembers.slice(2).map((member, index) => (
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
        </div>
      </div>
    </section>
  )
}

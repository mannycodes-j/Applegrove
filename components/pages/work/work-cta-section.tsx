import { Button } from '@/components/ui/button'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

const ctaOptions = [
  {
    title: 'For Founders',
    description: 'Schedule a Venture or Capital Strategy Session',
    link: '/contact',
  },
  {
    title: 'For Institutions & Partners',
    description: 'Book a Strategy Consultation',
    link: '/contact',
  },
  {
    title: 'For Collaborators',
    description: 'Start a Conversation',
    link: '/contact',
  },
]

export default function WorkCTASection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Work Together?
          </h2>
          <p className="text-xl text-gray-300">
            Choose the option that best fits your needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {ctaOptions.map((option, index) => (
            <div
              key={index}
              className="bg-white/10 border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-colors duration-300 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {option.title}
                </h3>
                <p className="text-gray-300 mb-8">
                  {option.description}
                </p>
              </div>
              <Link href={option.link}>
                <Button
                  size="lg"
                  className="w-full bg-[#F4AD20] hover:bg-orange-600 text-black px-6 py-4 rounded-full text-base font-semibold hover:scale-105 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                >
                  Get Started
                  <ArrowUpRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

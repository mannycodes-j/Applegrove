import { Marquee } from "@/components/animations/marquee"
import { WHO_WE_WORK_WITH_DATA } from "@/lib/constants/who-we-work-with"
import Image from "next/image"

export function WhoWeWorkWithSection() {
  return (
    <section className="bg-slate-900 py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-[#F4AD20] text-white px-6 py-2 rounded-full text-sm font-medium mb-6">
            Our Services
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8">Who We Work With</h2>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {WHO_WE_WORK_WITH_DATA.categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 border border-[#F4AD20]/50 text-white rounded-[10px] text-sm font-medium hover:bg-white/10 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Marquee Images */}
        <Marquee className="py-8" speed="normal" pauseOnHover>
          <div className="flex gap-6 mr-6">
            {WHO_WE_WORK_WITH_DATA.images.map((image, index) => (
              <div key={index} className="relative flex-shrink-0" style={{ width: "403px", height: "576px" }}>
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover shadow-lg"
                  style={{ borderRadius: "20px", opacity: 1 }}
                />
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  )
}

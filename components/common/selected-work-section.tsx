"use client"

import Image from "next/image"
import { SELECTED_WORK } from "@/lib/constants/selected-work"

export function SelectedWorkSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-[#F4AD20] text-black text-sm font-medium rounded-full mb-6 animate-in fade-in duration-500">
            Selected Work
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-balance animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            Our top project highlights
          </h2>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SELECTED_WORK.projects.map((project, index) => (
            <div
              key={index}
              className="bg-[#151D3B0D] rounded-2xl p-6 md:w-[550px] w-full hover:shadow-xl transition-all duration-300 hover:scale-[1.02] animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${400 + index * 200}ms` }}
            >
              {/* Project Image */}
              <div className="mb-6 rounded-xl overflow-hidden bg-white group">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={300}
                  height={340}
                  className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Project Content */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h3>
                <p className="text-gray-600 leading-relaxed">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

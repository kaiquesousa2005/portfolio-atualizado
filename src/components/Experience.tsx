"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Calendar, MapPin, Building } from "lucide-react"

const experiences = [
  {
    type: "work",
    title: "Consultor de Vendas & Desenvolvedor",
    company: "MCar Veículos",
    location: "Fortaleza, CE",
    period: "2022 - Atual",
    description:
      "Atuo como consultor de vendas automotivas e desenvolvedor responsável pela criação de interfaces modernas e sistemas para a empresa.",
    skills: ["Vendas", "React", "Firebase", "Atendimento ao Cliente"],
  },
]

const education = [
  {
    type: "education",
    title: "Análise e Desenvolvimento de Sistemas",
    company: "UNIFOR - Universidade de Fortaleza",
    location: "Fortaleza, CE",
    period: "2023 - 2025",
    description:
      "Graduação focada em desenvolvimento de software, arquitetura de sistemas e lógica de programação com Java e JavaScript.",
    skills: ["Java", "JavaScript", "Arquitetura de Software", "Banco de Dados"],
  },
  {
    type: "education",
    title: "Desenvolvimento Web Full Stack",
    company: "Digital College",
    location: "Fortaleza, CE",
    period: "2023 - 2024",
    description: "Curso completo de desenvolvimento full stack cobrindo frontend, backend e banco de dados.",
    skills: ["HTML/CSS", "React", "Node.js", "PostgreSQL", "Git/GitHub"],
  },
  {
    type: "education",
    title: "JavaScript Full-Stack",
    company: "Youth Space",
    location: "Fortaleza, CE",
    period: "2024 - 2025",
    description: "Curso avançado de JavaScript com foco em programação orientada a objetos e frameworks modernos.",
    skills: ["JavaScript Avançado", "TypeScript", "React", "Node.js", "Vite"],
  },
  {
    type: "education",
    title: "Curso de Inglês Avançado",
    company: "Youth Space",
    location: "Fortaleza, CE",
    period: "2024 - 2026",
    description: "Inglês avançado com foco em fluência para crescimento profissional e oportunidades internacionais.",
    skills: ["Conversação", "Business English", "Technical Writing"],
  },
]

export default function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const allItems = [...experiences, ...education]

  return (
    <section id="experience" className="py-20 px-6 bg-gray-800" ref={ref}>
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Experiência & Formação
            </span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 to-purple-500"></div>

          <div className="space-y-12">
            {allItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative flex items-start space-x-8"
              >
                {/* Timeline Dot */}
                <div className="relative z-10">
                  <div className="w-4 h-4 bg-cyan-400 rounded-full border-4 border-gray-800"></div>
                </div>

                {/* Content Card */}
                <motion.div
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="flex-1 bg-gray-700 rounded-xl p-6 border border-gray-600 hover:border-cyan-400 transition-all"
                >
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-cyan-400">
                      <Building size={16} />
                      <span className="font-semibold">{item.company}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <MapPin size={14} />
                      <span className="text-sm">{item.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Calendar size={14} />
                      <span className="text-sm">{item.period}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">{item.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-gray-600 text-cyan-400 text-xs rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useMemo } from "react"

const technologies = [
  { name: "React", icon: "⚛️", color: "text-blue-400" },
  { name: "Next.js", icon: "▲", color: "text-white" },
  { name: "TypeScript", icon: "📘", color: "text-blue-500" },
  { name: "Node.js", icon: "🟢", color: "text-green-500" },
  { name: "PostgreSQL", icon: "🐘", color: "text-blue-600" },
  { name: "MySQL", icon: "🐬", color: "text-blue-600" },
  { name: "Firebase", icon: "🔥", color: "text-orange-500" },
  { name: "Tailwind", icon: "💨", color: "text-cyan-400" },
]

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Memoizar animações para evitar recálculos
  const techAnimations = useMemo(
    () =>
      technologies.map((_, index) => ({
        initial: { opacity: 0, scale: 0.8 },
        animate: inView ? { opacity: 1, scale: 1 } : {},
        transition: { duration: 0.4, delay: 0.6 + index * 0.05 },
      })),
    [inView],
  )

  return (
    <section id="about" className="py-20 px-6 bg-gray-800" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Sobre Mim
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-300 leading-relaxed">
              Sou <strong className="text-cyan-400">Kaique Marlon</strong>, desenvolvedor Full-Stack de Fortaleza-CE,
              formado em Análise e Desenvolvimento de Sistemas pela Unifor. Especializo-me em criar soluções digitais
              inovadoras com foco em automatização e experiência do usuário.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Além do desenvolvimento, tenho experiência em vendas automotivas e sou apaixonado em criar inovações
              tecnológicas que ajudam a melhorar a gestão de empresas, consequentemente, aumentando a produtividade e a
              eficiência dos negócios.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Sempre busco evoluir profissionalmente e me manter atualizado com as mais recentes tecnologias do mercado.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold text-cyan-400 mb-6">Tecnologias</h3>
            <div className="grid grid-cols-2 gap-4">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  {...techAnimations[index]}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="bg-gray-700 p-4 rounded-lg border border-gray-600 hover:border-cyan-400 transition-all cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{tech.icon}</span>
                    <span className={`font-semibold ${tech.color}`}>{tech.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

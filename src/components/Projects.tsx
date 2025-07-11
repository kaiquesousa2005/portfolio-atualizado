"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ExternalLink, Github, Monitor, Smartphone, Star, Calendar } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

const projects = [
  {
    id: 1,
    title: "MCAR Veículos - Site da Empresa",
    description:
      "Site completo para revenda de veículos com sistema de busca avançada, integração com banco de dados e interface responsiva.",
    desktopImage: "/images/site da loja print.png",
    mobileImage: "/images/site da loja mobile.png",
    technologies: ["TypeScript", "Firebase", "CSS", "Next.js"],
    liveUrl: "https://www.mcarveiculos.com",
    githubUrl: "https://github.com/kaiquesousa2005/SITE-MCARNOVO",
    featured: true,
    year: "2024",
    category: "E-commerce",
  },
  {
    id: 2,
    title: "Sistema de Gestão de Veículos",
    description:
      "Aplicação para controle financeiro de veículos com autenticação, relatórios em PDF e dashboard interativo.",
    desktopImage: "/images/sistema foto.png",
    mobileImage: "/images/sistema foto mobile.png",
    technologies: ["React", "Firebase", "PDF.js", "Automação de Recibos"],
    liveUrl: "Não pode ser divulgado",
    githubUrl: "#",
    featured: true,
    year: "2025",
    category: "Dashboard",
  },
  {
    id: 3,
    title: "Landing Page de Vendas para Evento",
    description: "Landing page otimizada para conversão com CTA e integração com Pixel do Meta.",
    desktopImage: "/images/landing page foto.png",
    mobileImage: "/images/landing page mobile.png",
    technologies: ["HTML", "CSS", "JavaScript", "Marketing Digital"],
    liveUrl: "https://shirleycaminha.com/",
    githubUrl: "https://github.com/kaiquesousa2005/shirley-evento",
    featured: false,
    year: "2024",
    category: "Landing Page",
  },
  {
    id: 4,
    title: "E-commerce de Sandalias",
    description:
      "E-commerce responsivo com catálogo de produtos, carrinho de compras e finalização de compra via WhatsApp.",
    desktopImage: "/images/site da manu desktop.png",
    mobileImage: "/images/site da manu.png",
    technologies: ["React", "CSS", "Responsividade", "Firebase"],
    liveUrl: "https://lojinha-de-sandalia.vercel.app/",
    githubUrl: "https://github.com/kaiquesousa2005/lojinha-de-sandalia",
    featured: true,
    year: "2025",
    category: "E-commerce",
  },
  {
    id: 5,
    title: "E-commerce de Acessórios",
    description:
      "Aplicação responsiva feita para gerar mais vendas online e mostrar o estoque atualizado da loja",
    desktopImage: "/images/site evilly.png",
    mobileImage: "/images/site evilly mobile.png",
    technologies: ["React", "Storage", "Firebase", "Tailwind"],
    liveUrl: "https://site-evy.vercel.app/",
    githubUrl: "https://github.com/kaiquesousa2005/site-evy",
    featured: false,
    year: "2025",
    category: "E-commerce",
  },
]

// Componente para o mockup do dispositivo
function DeviceMockup({
  type,
  image,
  alt,
  isActive,
  liveUrl,
}: {
  type: "desktop" | "mobile"
  image: string
  alt: string
  isActive: boolean
  liveUrl?: string
}) {
  if (type === "desktop") {
    return (
      <div
        className={`relative transition-all duration-300 ${isActive ? "scale-100 opacity-100" : "scale-95 opacity-60"}`}
      >
        {/* Desktop Frame - Muito maior */}
        <div className="bg-gray-800 rounded-t-lg p-2 md:p-3 border border-gray-600 w-64 sm:w-80 md:w-96">
          <div className="flex space-x-2 mb-3">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="bg-gray-700 rounded h-5 mb-3 flex items-center px-3">
            <div className="w-4 h-4 bg-gray-600 rounded mr-2"></div>
            <div className="text-xs text-gray-400">{liveUrl || "localhost:3000"}</div>
          </div>
        </div>
        <div className="relative h-40 sm:h-56 md:h-64 bg-gray-900 rounded-b-lg overflow-hidden border-x border-b border-gray-600 w-64 sm:w-80 md:w-96">
          <Image src={image || "/placeholder.svg"} alt={alt} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        {/* Desktop Stand */}
        <div className="flex justify-center mt-2">
          <div className="w-16 h-2 bg-gray-700 rounded-full"></div>
        </div>
        <div className="flex justify-center">
          <div className="w-24 h-3 bg-gray-800 rounded-b-lg"></div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`relative transition-all duration-300 ${isActive ? "scale-100 opacity-100" : "scale-95 opacity-60"}`}
    >
      {/* Mobile Frame - Mantém tamanho original */}
      <div className="bg-gray-800 rounded-3xl p-1.5 md:p-2 border border-gray-600 w-28 sm:w-32">
        <div className="bg-gray-900 rounded-2xl overflow-hidden">
          <div className="h-2 bg-gray-800 rounded-t-2xl flex justify-center items-center">
            <div className="w-8 h-1 bg-gray-600 rounded-full"></div>
          </div>
          <div className="relative h-48 sm:h-56">
            <Image src={image || "/placeholder.svg"} alt={alt} fill className="object-cover" />
          </div>
          <div className="h-4 bg-gray-800 rounded-b-2xl flex justify-center items-center">
            <div className="w-6 h-1 bg-gray-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Background animado
function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradiente animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20 animate-pulse"></div>

      {/* Círculos flutuantes */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-cyan-400/10 to-purple-500/10 blur-xl"
          style={{
            width: Math.random() * 300 + 100,
            height: Math.random() * 300 + 100,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      ))}

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
    </div>
  )
}

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [activeDevice, setActiveDevice] = useState<{ [key: number]: "desktop" | "mobile" }>({})

  const toggleDevice = (projectId: number) => {
    setActiveDevice((prev) => ({
      ...prev,
      [projectId]: prev[projectId] === "mobile" ? "desktop" : "mobile",
    }))
  }

  return (
    <section id="projects" className="relative py-32 px-6 bg-gray-900 overflow-hidden" ref={ref}>
      {/* Background animado */}
      <AnimatedBackground />

      <div className="relative z-10 container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-block mb-4"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <Star className="text-cyan-400 w-8 h-8" />
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-bold mb-8">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Meus Projetos
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Soluções digitais que combinam <span className="text-cyan-400 font-semibold">design moderno</span> com
            <span className="text-purple-400 font-semibold"> funcionalidade avançada</span>
          </p>

          <motion.div
            className="mt-8 flex justify-center space-x-8"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">5+</div>
              <div className="text-gray-400">Projetos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">100%</div>
              <div className="text-gray-400">Responsivo</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-400">2025</div>
              <div className="text-gray-400">Ano Ativo</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 100 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} flex flex-col lg:flex gap-12 items-center`}
            >
              {/* Project Info */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center space-x-4">
                  {project.featured && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      className="px-3 py-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-xs font-bold text-white"
                    >
                      DESTAQUE
                    </motion.div>
                  )}
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Calendar size={16} />
                    <span>{project.year}</span>
                  </div>
                  <div className="px-3 py-1 bg-gray-800 rounded-full text-xs text-cyan-400 border border-cyan-400/30">
                    {project.category}
                  </div>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-lg text-gray-300 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech) => (
                    <motion.span
                      key={tech}
                      whileHover={{ scale: 1.1 }}
                      className="px-4 py-2 bg-gray-800/50 backdrop-blur-sm text-cyan-400 text-sm rounded-lg border border-gray-700 hover:border-cyan-400/50 transition-all"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                <div className="flex space-x-6">
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={18} />
                    <span>Ver Projeto</span>
                  </motion.a>

                  {project.githubUrl !== "#" && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-6 py-3 border-2 border-gray-600 rounded-lg text-gray-300 hover:border-cyan-400 hover:text-cyan-400 transition-all"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={18} />
                      <span>Código</span>
                    </motion.a>
                  )}
                </div>
              </div>

              {/* Device Mockups */}
              <div className="flex-1 relative">
                <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-700/50">
                  {/* Device Toggle */}
                  <div className="flex justify-center mb-6">
                    <div className="flex bg-gray-800 rounded-lg p-0.5 md:p-1 border border-gray-600">
                      <button
                        onClick={() => toggleDevice(project.id)}
                        className={`flex items-center space-x-1 md:space-x-2 px-2 md:px-4 py-1.5 md:py-2 rounded-md transition-all text-xs md:text-sm ${
                          (activeDevice[project.id] || "desktop") === "desktop"
                            ? "bg-cyan-500 text-white"
                            : "text-gray-400 hover:text-white"
                        }`}
                      >
                        <Monitor size={14} className="md:w-4 md:h-4" />
                        <span>Desktop</span>
                      </button>
                      <button
                        onClick={() => toggleDevice(project.id)}
                        className={`flex items-center space-x-1 md:space-x-2 px-2 md:px-4 py-1.5 md:py-2 rounded-md transition-all text-xs md:text-sm ${
                          (activeDevice[project.id] || "desktop") === "mobile"
                            ? "bg-cyan-500 text-white"
                            : "text-gray-400 hover:text-white"
                        }`}
                      >
                        <Smartphone size={14} className="md:w-4 md:h-4" />
                        <span>Mobile</span>
                      </button>
                    </div>
                  </div>

                  {/* Device Display */}
                  <div className="flex justify-center items-end space-x-4 sm:space-x-8 min-h-[280px] sm:min-h-[300px]">
                    <DeviceMockup
                      type="desktop"
                      image={project.desktopImage}
                      alt={`${project.title} - Desktop`}
                      isActive={(activeDevice[project.id] || "desktop") === "desktop"}
                      liveUrl={project.liveUrl}
                    />
                    <DeviceMockup
                      type="mobile"
                      image={project.mobileImage}
                      alt={`${project.title} - Mobile`}
                      isActive={(activeDevice[project.id] || "desktop") === "mobile"}
                      liveUrl={project.liveUrl}
                    />
                  </div>

                  {/* Responsive Badge */}
                  <motion.div
                    className="absolute -top-3 -right-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  >
                    100% Responsivo
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-20 pt-16 border-t border-gray-700/50"
        >
          <h3 className="text-3xl font-bold text-white mb-4">Gostou do que viu?</h3>
          <p className="text-xl text-gray-300 mb-8">Vamos criar algo incrível juntos!</p>
          <motion.a
            href="#contact"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-white font-semibold text-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Iniciar Projeto</span>
            <ExternalLink size={20} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

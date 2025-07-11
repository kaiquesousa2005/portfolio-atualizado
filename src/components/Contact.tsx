"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Mail, Phone, MapPin, Github, Linkedin, Instagram } from "lucide-react"

const socialLinks = [
  {
    name: "WhatsApp",
    icon: Phone,
    url: "https://wa.me/+5585985818139",
    color: "hover:text-green-400",
  },
  {
    name: "Email",
    icon: Mail,
    url: "mailto:kaique.freire@hotmail.com",
    color: "hover:text-red-400",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/kaique-marlon-93a7ba272/",
    color: "hover:text-blue-400",
  },
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/kaiquesousa2005",
    color: "hover:text-gray-400",
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/_kaiquemsf/",
    color: "hover:text-pink-400",
  },
]

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="contact" className="py-20 px-6 bg-gray-900" ref={ref}>
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Vamos Conversar?
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Estou sempre aberto a novas oportunidades e projetos interessantes. Entre em contato comigo!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                  <MapPin className="text-cyan-400" size={20} />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Localização</h3>
                  <p className="text-gray-400">Fortaleza, Ceará - Brasil</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                  <Mail className="text-cyan-400" size={20} />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Email</h3>
                  <p className="text-gray-400">kaique.freire@hotmail.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                  <Phone className="text-cyan-400" size={20} />
                </div>
                <div>
                  <h3 className="text-white font-semibold">WhatsApp</h3>
                  <p className="text-gray-400">+55 (85) 98581-8139</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold text-white mb-8">Conecte-se Comigo</h3>
            <div className="grid grid-cols-3 gap-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-16 h-16 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 ${social.color} transition-all border border-gray-700 hover:border-cyan-400`}
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16 pt-8 border-t border-gray-700"
        >
          <p className="text-gray-400">© 2025 Kaique Marlon. Desenvolvido usando Next.js e TypeScript</p>
        </motion.div>
      </div>
    </section>
  )
}

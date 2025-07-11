"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial, Environment } from "@react-three/drei"
import { motion } from "framer-motion"
import Image from "next/image"
import InteractiveBackground from "@/components/InteractiveBackground"

function AnimatedSphere() {
  return (
    <Sphere visible args={[1, 100, 200]} scale={2}>
      <MeshDistortMaterial color="#00d4ff" attach="material" distort={0.3} speed={1.5} roughness={0} />
    </Sphere>
  )
}

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Interactive Background */}
      <InteractiveBackground />

      {/* 3D Background */}
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <Environment preset="night" />
            <AnimatedSphere />

            {/* Additional 3D Elements */}
            <mesh position={[-3, 2, -2]} rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[0.5, 0.5, 0.5]} />
              <meshStandardMaterial color="#ff00ff" wireframe />
            </mesh>

            <mesh position={[3, -2, -2]} rotation={[Math.PI / 4, 0, 0]}>
              <octahedronGeometry args={[0.7]} />
              <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.3} />
            </mesh>

            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <motion.div
            className="relative w-48 h-48 mx-auto mb-8"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src="/images/profile.jpg"
              alt="Kaique Marlon"
              fill
              className="rounded-full object-cover border-4 border-cyan-400 shadow-2xl"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-500/20 animate-pulse"></div>
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Desenvolvedor
          </span>
          <br />
          <span className="text-white">Full Stack</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
        >
          Criando experiências digitais incríveis com tecnologias modernas
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="space-x-4"
        >
          <motion.a
            href="#projects"
            className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-white font-semibold shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0, 212, 255, 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            Ver Projetos
          </motion.a>
          <motion.a
            href="#contact"
            className="inline-block px-8 py-4 border-2 border-cyan-400 rounded-full text-cyan-400 font-semibold hover:bg-cyan-400 hover:text-gray-900 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contato
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="w-1 h-3 bg-cyan-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

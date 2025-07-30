"use client"

import { Suspense, useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere, Float, Text, MeshDistortMaterial, Sparkles } from "@react-three/drei"
import { motion } from "framer-motion"
import Image from "next/image"
import type * as THREE from "three"

// Componente de partículas flutuantes customizadas
function FloatingGeometry({ position, geometry, color, speed = 1 }: any) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.3
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5
    }
  })

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        {geometry}
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} metalness={0.8} roughness={0.2} />
      </mesh>
    </Float>
  )
}

// Componente de anel de energia
function EnergyRing({ radius = 3, color = "#00d4ff" }) {
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.5
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
    }
  })

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[radius, 0.1, 8, 100]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.8} />
    </mesh>
  )
}

// Esfera central com distorção
function CentralSphere() {
  const sphereRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
      <Sphere ref={sphereRef} args={[1.5, 64, 64]} scale={1.2}>
        <MeshDistortMaterial
          color="#ff00ff"
          emissive="#ff00ff"
          emissiveIntensity={0.3}
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  )
}

// Texto 3D flutuante
function FloatingText() {
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <Text
        position={[0, 3, -2]}
        fontSize={0.8}
        color="#00d4ff"
        anchorX="center"
        anchorY="middle"
      >
        Desenvolvedor
        <meshStandardMaterial emissive="#00d4ff" emissiveIntensity={0.3} metalness={0.7} roughness={0.3} />
      </Text>
    </Float>
  )
}

// Partículas de energia
function EnergyParticles() {
  const particlesRef = useRef<THREE.Points>(null)

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(200 * 3)
    for (let i = 0; i < 200; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return positions
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particlesPosition, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#00ff88" size={0.1} sizeAttenuation={true} transparent opacity={0.8} />
    </points>
  )
}

// Cena 3D principal
function Scene3D() {
  return (
    <>
      {/* Iluminação dramática */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#00d4ff" />
      <pointLight position={[-10, -10, -10]} intensity={1.5} color="#ff00ff" />
      <pointLight position={[0, 0, 10]} intensity={1} color="#00ff88" />
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={2} color="#ffffff" castShadow />

      {/* Esfera central */}
      <CentralSphere />

      {/* Anéis de energia */}
      <EnergyRing radius={3} color="#00d4ff" />
      <EnergyRing radius={4} color="#ff00ff" />
      <EnergyRing radius={5} color="#00ff88" />

      {/* Geometrias flutuantes */}
      <FloatingGeometry
        position={[-4, 2, -3]}
        geometry={<boxGeometry args={[0.8, 0.8, 0.8]} />}
        color="#00d4ff"
        speed={1.2}
      />

      <FloatingGeometry
        position={[4, -2, -2]}
        geometry={<octahedronGeometry args={[0.6]} />}
        color="#ff00ff"
        speed={0.8}
      />

      <FloatingGeometry
        position={[-3, -3, -4]}
        geometry={<tetrahedronGeometry args={[0.7]} />}
        color="#00ff88"
        speed={1.5}
      />

      <FloatingGeometry
        position={[3, 3, -1]}
        geometry={<torusGeometry args={[0.5, 0.2, 8, 16]} />}
        color="#ffaa00"
        speed={0.9}
      />

      {/* Texto 3D */}
      <FloatingText />

      {/* Partículas de energia */}
      <EnergyParticles />

      {/* Sparkles para efeito extra */}
      <Sparkles count={100} scale={[20, 20, 20]} size={3} speed={0.4} color="#00d4ff" />

      {/* Controles suaves */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  )
}

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">

      {/* 3D Scene Futurística */}
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 0, 8], fov: 75 }} gl={{ antialias: true, alpha: true }} shadows>
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <motion.div
            className="relative w-48 h-48 mx-auto mb-8"
            whileHover={{ scale: 1.1, rotateY: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src="/images/profile.jpg"
              alt="Kaique Marlon"
              fill
              className="rounded-full object-cover border-4 border-cyan-400 shadow-2xl"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-500/20 animate-pulse"></div>

            {/* Anel de energia ao redor da foto */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-cyan-400"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-2 rounded-full border border-purple-400"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          <motion.span
            className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            Desenvolvedor
          </motion.span>
          <br />
          <motion.span
            className="text-white"
            animate={{
              textShadow: [
                "0 0 10px rgba(0, 212, 255, 0.5)",
                "0 0 20px rgba(255, 0, 255, 0.5)",
                "0 0 10px rgba(0, 212, 255, 0.5)",
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            Full Stack
          </motion.span>
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
            className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-white font-semibold shadow-lg relative overflow-hidden"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(0, 212, 255, 0.3)",
              y: -2,
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10">Ver Projetos</span>
          </motion.a>

          <motion.a
            href="#contact"
            className="inline-block px-8 py-4 border-2 border-cyan-400 rounded-full text-cyan-400 font-semibold hover:bg-cyan-400 hover:text-gray-900 transition-all relative overflow-hidden"
            whileHover={{
              scale: 1.05,
              y: -2,
              borderColor: "#ff00ff",
              color: "#ff00ff",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10">Contato</span>
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll Indicator Melhorado */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center relative"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="w-1 h-3 bg-cyan-400 rounded-full mt-2"
          />

          {/* Efeito de brilho */}
          <motion.div
            className="absolute inset-0 border-2 border-purple-400 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        </motion.div>
      </motion.div>

      {/* Efeitos de partículas CSS */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {Array.from({ length: 50 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${(i * 2) % 100}%`,
              top: `${(i * 3) % 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>
    </section>
  )
}

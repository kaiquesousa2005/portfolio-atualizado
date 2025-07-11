"use client"

import { useState, useEffect, Suspense, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Box, Sphere, Environment } from "@react-three/drei"
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing"
import * as THREE from "three"

function FloatingCube({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.5
    }
  })

  return (
    <Box ref={meshRef} position={position} args={[0.5, 0.5, 0.5]}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
    </Box>
  )
}

function Scene3D() {
  return (
    <>
      <Environment preset="night" />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#ff00ff" />

      <FloatingCube position={[-2, 0, 0]} color="#00d4ff" />
      <FloatingCube position={[2, 0, 0]} color="#ff00ff" />
      <FloatingCube position={[0, 2, 0]} color="#00ff88" />
      <FloatingCube position={[0, -2, 0]} color="#ffaa00" />

      <Sphere position={[0, 0, -3]} args={[1, 32, 32]}>
        <meshStandardMaterial color="#ffffff" wireframe emissive="#00d4ff" emissiveIntensity={0.2} />
      </Sphere>

      <EffectComposer>
        <Bloom intensity={1.5} luminanceThreshold={0.1} />
        <ChromaticAberration offset={new THREE.Vector2(0.002, 0.002)} />
      </EffectComposer>

      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
    </>
  )
}

// Componente para Matrix Rain que só renderiza no cliente
function MatrixRain() {
  const [mounted, setMounted] = useState(false)
  const [matrixData, setMatrixData] = useState<
    Array<{ id: number; delay: number; duration: number; content: string[] }>
  >([])

  useEffect(() => {
    setMounted(true)
    // Gerar dados do matrix uma única vez no cliente
    const data = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2,
      content: Array.from({ length: 10 }, () => (Math.random() > 0.5 ? "1" : "0")),
    }))
    setMatrixData(data)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="absolute inset-0 pointer-events-none opacity-20">
      {matrixData.map((item) => (
        <motion.div
          key={item.id}
          className="absolute text-green-400 font-mono text-xs"
          style={{ left: `${item.id * 5}%` }}
          animate={{
            y: [-100, window.innerHeight + 100],
          }}
          transition={{
            duration: item.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: item.delay,
          }}
        >
          {item.content.map((char, j) => (
            <div key={j}>{char}</div>
          ))}
        </motion.div>
      ))}
    </div>
  )
}

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setTimeout(() => setIsLoading(false), 1000)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center"
        >
          {/* 3D Scene */}
          <div className="w-full h-full absolute inset-0">
            <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
              <Suspense fallback={null}>
                <Scene3D />
              </Suspense>
            </Canvas>
          </div>

          {/* Loading UI */}
          <div className="relative z-10 text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }} className="mb-8">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                KAIQUE MARLON
              </h1>
              <p className="text-cyan-400 text-xl mt-2 font-mono">Full Stack Developer</p>
            </motion.div>

            {/* Loading Text - Usando HTML em vez de Text3D */}
            <motion.div
              className="mb-8"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 font-mono tracking-widest">LOADING...</h2>
            </motion.div>

            {/* Progress Bar */}
            <div className="w-80 h-2 bg-gray-800 rounded-full overflow-hidden border border-cyan-400">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            <motion.p
              className="text-cyan-400 mt-4 font-mono"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            >
              {progress}% Carregando experiência...
            </motion.p>
          </div>

          {/* Matrix Rain Effect - só renderiza no cliente */}
          <MatrixRain />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

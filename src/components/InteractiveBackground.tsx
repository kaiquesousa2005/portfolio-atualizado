"use client"

import { useCallback, useState, useEffect } from "react"
import Particles from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import type { Engine } from "@tsparticles/engine"

// Componente para o grid de código que só renderiza no cliente
function CodeGrid() {
  const [mounted, setMounted] = useState(false)
  const [codeElements, setCodeElements] = useState<string[]>([])

  useEffect(() => {
    setMounted(true)
    // Gerar elementos de código uma única vez no cliente
    const elements = Array.from({ length: 144 }, () => {
      const rand = Math.random()
      return rand > 0.7 ? "const" : rand > 0.5 ? "function" : "{}"
    })
    setCodeElements(elements)
  }, [])

  if (!mounted) {
    return null // Não renderiza nada no servidor
  }

  return (
    <div className="absolute inset-0 opacity-5">
      <div className="grid grid-cols-12 gap-4 h-full p-4 font-mono text-xs text-cyan-400">
        {codeElements.map((element, i) => (
          <div key={i} className="animate-pulse">
            {element}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function InteractiveBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  return (
    <div className="fixed inset-0 z-0">
      <Particles
        id="tsparticles"
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 200,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: {
                enable: true,
              },
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: ["#00d4ff", "#ff00ff", "#00ff88", "#ffaa00"],
            },
            links: {
              color: "#00d4ff",
              distance: 150,
              enable: true,
              opacity: 1,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
              },
              value: 80,
            },
            opacity: {
              value: 1.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
      <CodeGrid />
    </div>
  )
}

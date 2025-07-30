"use client"

import { Suspense } from "react"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Projects from "@/components/Projects"
import Experience from "@/components/Experience"
import Contact from "@/components/Contact"
import Navigation from "@/components/Navigation"
import LoadingScreen from "@/components/LoadingScreen"

export default function Home() {
  return (
    <main className="bg-gray-900 text-white overflow-x-hidden relative">
      <div className="relative z-10">
        <LoadingScreen />
        <Navigation />
        <Suspense fallback={<div>Loading...</div>}>
          <Hero />
          <About />
          <Projects />
          <Experience />
          <Contact />
        </Suspense>
      </div>
    </main>
  )
}

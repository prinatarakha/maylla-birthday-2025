"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"

const birthdayWishes = [
  `Mamihhhh selamaat #22 yaaaauh. Semoga sehat bahagia sukses selalu. Dilancarkan kuliah, kerja, dan kehidupannya. Selalu di lindungi Allah SWT dimanapun mamih beradaa🫶 Semoga selalu dikelelilingi orang baik dan setiap pilihan hidup mamih akan berdampak dan berguna baik buat mamih sendiri kedepannya, buat orang disekitar mamih, buat keluarga dan pasangan. Walaupun kita jauh semoga hati kita selaluh dekaaatth. Looveee my gemini twinzi♊️✨❤️‍🔥😘 
-vee`,
  `selamat ulang tahun mam yg ke 22 tahun semoga panjang umur sehat selalu bahagia selalu dan sukses dan semua yg di inginkan bisa tercapai Aminnn
-ale`,
  `HEYYY MAYLLOO!! IT'S YOUR BIRTHDAYY! SELAMAT ULANG TAHUN!! semoga panjang umur, dimudahkan segala urusannya, bahagia selaluu, semakin gacor berambisi GAS TERUS WANITA KARIRR! SEMANGAT TERUSS POKOKNYA I WISH U ALL THE GOOD THINGS IN LIFEE AMIINN. kangen sekalih denganmuu, ku tunggu di jakarta ya cantikk. LOVE U MAM I MITH UUU TOMAT ❤️❤️❤️ take care di canada maylloo peluk jauuh
-rilly`,
  `happy birthday maylla, semoga di tahun ke 22 ini makin banyak doa yang terwujud, sukses terus kedepan nya
-ravano`,
  `Happy 22nd my love wishing you all the bestt🤍
-zaza`,
  `Bebooo happy brothday sayang ku cinta. Im always proud of you, who you’ve become, dan semangat km menghadapi tantantangan yg ada. Thank you bebo udh memberikan kehangatan ke semua orang yg kamu temuin, ga hanya aku. Semoga hidup kamu penuh kehangatan dan cinta dari orang2 yg tepat ❤️. Semangat sayang i love u and ill see u soon!
-rakha`
]

export default function Component() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startY, setStartY] = useState(0)
  const [autoScroll, setAutoScroll] = useState(true)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isMouseMoving, setIsMouseMoving] = useState(false)
  const [ballPos, setBallPos] = useState({ x: 0, y: 0 })

  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const autoScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  // const mouseTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const animationRef = useRef<number>(0)

  // // Handle mouse movement for the green ball
  // const handleMouseMove = (e: MouseEvent) => {
  //   setMousePos({ x: e.clientX, y: e.clientY })
  //   setIsMouseMoving(true)

  //   // Clear existing timeout
  //   if (mouseTimeoutRef.current) {
  //     clearTimeout(mouseTimeoutRef.current)
  //   }

  //   // Set mouse as not moving after 2 seconds
  //   mouseTimeoutRef.current = setTimeout(() => {
  //     setIsMouseMoving(false)
  //   }, 2000)
  // }

  // Predetermined path animation
  useEffect(() => {
    if (isMouseMoving) return

    const animate = () => {
      const time = Date.now() * 0.001
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      const radiusX = 200
      const radiusY = 150

      setBallPos({
        x: centerX + Math.cos(time) * radiusX,
        y: centerY + Math.sin(time * 0.7) * radiusY,
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isMouseMoving])

  // Update ball position based on mouse or animation
  useEffect(() => {
    if (isMouseMoving) {
      setBallPos(mousePos)
    }
  }, [mousePos, isMouseMoving])

  // Add mouse move listener
  // useEffect(() => {
  //   window.addEventListener("mousemove", handleMouseMove)
  //   return () => {
  //     window.removeEventListener("mousemove", handleMouseMove)
  //     if (mouseTimeoutRef.current) {
  //       clearTimeout(mouseTimeoutRef.current)
  //     }
  //   }
  // }, [])

  // Handle mouse/touch down
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true)
    setAutoScroll(false)

    if (autoScrollTimeoutRef.current) {
      clearTimeout(autoScrollTimeoutRef.current)
    }

    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY
    setStartY(clientY)
  }

  // Handle mouse/touch move
  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return

    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY
    const deltaY = (startY - clientY) * 1.5 // Increase sensitivity

    setScrollPosition((prev) => prev + deltaY)
    setStartY(clientY)
  }

  // Handle mouse/touch up
  const handleDragEnd = () => {
    setIsDragging(false)

    autoScrollTimeoutRef.current = setTimeout(() => {
      setAutoScroll(true)
    }, 1000)
  }

  // Handle back to top button click
  const handleBackToTop = () => {
    setScrollPosition(0)
    setAutoScroll(false)
    
    if (autoScrollTimeoutRef.current) {
      clearTimeout(autoScrollTimeoutRef.current)
    }

    autoScrollTimeoutRef.current = setTimeout(() => {
      setAutoScroll(true)
    }, 1000)
  }

  // Auto-scroll effect
  useEffect(() => {
    if (!autoScroll) return

    const interval = setInterval(() => {
      setScrollPosition((prev) => prev + 1)
    }, 10)

    return () => clearInterval(interval)
  }, [autoScroll])

  // Apply scroll position to content
  useEffect(() => {
    if (!contentRef.current || !containerRef.current) return

    const contentHeight = contentRef.current.scrollHeight
    const containerHeight = containerRef.current.clientHeight
    const maxScroll = Math.max(0, contentHeight - containerHeight)

    // Clamp scroll position to valid range
    let clampedScrollPosition = scrollPosition
    if (scrollPosition > maxScroll) {
      clampedScrollPosition = 0 // Loop back to top
      setScrollPosition(0)
    } else if (scrollPosition < 0) {
      clampedScrollPosition = 0
      setScrollPosition(0)
    }

    contentRef.current.style.transform = `translateY(${-clampedScrollPosition}px)`
  }, [scrollPosition])

  return (
    <div
      className="min-h-screen bg-blue-400 overflow-hidden relative"
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
    >
      {/* Animated green ball */}
      {/* <div
        className="absolute w-96 h-96 rounded-full pointer-events-none transition-all duration-300 ease-out"
        style={{
          left: ballPos.x - 192,
          top: ballPos.y - 192,
          background:
            "radial-gradient(circle, rgba(34, 197, 94, 0.3) 0%, rgba(34, 197, 94, 0.1) 50%, transparent 100%)",
          filter: "blur(20px)",
          zIndex: 1,
        }}
      /> */}

      {/* Scrolling container */}
      <div ref={containerRef} className="relative h-screen overflow-hidden z-20">
        <div ref={contentRef} className="space-y-32 text-center px-8 pt-[100vh] pb-[100vh] max-w-4xl mx-auto md:px-16">
          {birthdayWishes.map((wish, index) => (
            <div
              key={index}
              className="flex flex-wrap space-y-2"
              style={{
                fontFamily: "'Circular', 'Spotify Circular', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                // fontWeight: 700,
              }}
            >
              {wish.split(" ").map((word, index) => (
                <div key={index} className="text-white text-5xl md:text-8xl font-bold whitespace-wrap hover:underline pr-4 md:pr-8">
                  {word}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Back to top button */}
      <button
        onClick={handleBackToTop}
        className="absolute top-4 right-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-3 transition-all duration-200 z-30 backdrop-blur-sm border border-white border-opacity-20"
        aria-label="Back to top"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m18 15-6-6-6 6"/>
        </svg>
      </button>

      {/* Drag indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm opacity-50 z-30 font-bold">
        Drag to scroll
      </div>
    </div>
  )
}

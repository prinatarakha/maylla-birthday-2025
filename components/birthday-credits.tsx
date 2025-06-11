"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import RestartButton from "./RestartButton"
import ScrollUpButton from "./ScrollUpButton"
import ScrollDownButton from "./ScrollDownButton"

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
  `Bebooo happy birthday sayang ku cinta! Im always proud of you, who you’ve become, dan semangat km menghadapi tantantangan yg ada 💪. Thank you bebo udh memberikan kehangatan ke semua orang yg kamu temuin 🤗🤗. Semoga hidup kamu penuh kehangatan dan cinta dari orang2 yg tepat ❤️. Semangat sayang i love u and ill see u soon!
-rakha`,
  `happy birthday maymayy, semoga panjang umur, bahagia dan sehat selaluu 🫶🏻🥳 wishing u lots of abundance and success so that all ur dreams cone true🤍 tetep ambis and study hard biar kita bisa wujudin bisnis impian kita 😚😚 jangan lupa undang aku ke wedding km pls #lancarsampehariH😋 may god bless u and walk with u always #geminitwin♊️ love u lots 🫶🏻✊🏻 
-nainai`
]

export default function Component() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startY, setStartY] = useState(0)
  const [autoScroll, setAutoScroll] = useState(true)

  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const autoScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const scrollAnimationRef = useRef<number>(0)

  // Cleanup scroll animation on unmount
  useEffect(() => {
    return () => {
      if (scrollAnimationRef.current) {
        cancelAnimationFrame(scrollAnimationRef.current)
      }
    }
  }, [])

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

  // Smooth scroll animation function
  const smoothScrollTo = (targetPosition: number) => {
    const startPosition = scrollPosition
    const distance = targetPosition - startPosition
    const duration = 500 // 500ms animation
    const startTime = Date.now()

    const animateScroll = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      
      const currentPosition = startPosition + (distance * easeOut)
      setScrollPosition(currentPosition)

      if (progress < 1) {
        scrollAnimationRef.current = requestAnimationFrame(animateScroll)
      }
    }

    // Cancel any existing scroll animation
    if (scrollAnimationRef.current) {
      cancelAnimationFrame(scrollAnimationRef.current)
    }

    scrollAnimationRef.current = requestAnimationFrame(animateScroll)
  }

  // Handle back to top button click
  const handleBackToTop = () => {
    smoothScrollTo(0)
    setAutoScroll(false)
    
    if (autoScrollTimeoutRef.current) {
      clearTimeout(autoScrollTimeoutRef.current)
    }

    autoScrollTimeoutRef.current = setTimeout(() => {
      setAutoScroll(true)
    }, 500)
  }

  // Handle scroll up button click
  const handleScrollUp = () => {
    const newPosition = scrollPosition - 300
    smoothScrollTo(newPosition)
    setAutoScroll(false)
    
    if (autoScrollTimeoutRef.current) {
      clearTimeout(autoScrollTimeoutRef.current)
    }

    autoScrollTimeoutRef.current = setTimeout(() => {
      setAutoScroll(true)
    }, 1000)
  }

  // Handle scroll down button click
  const handleScrollDown = () => {
    const newPosition = scrollPosition + 300
    smoothScrollTo(newPosition)
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
      clampedScrollPosition = maxScroll + scrollPosition
      setScrollPosition(clampedScrollPosition)
    }

    contentRef.current.style.transform = `translateY(${-clampedScrollPosition}px)`
  }, [scrollPosition])

  return (
    <div
      className="min-h-screen overflow-hidden relative bg-gradient-to-b from-blue-400 to-blue-300"
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
    >

      {/* Scrolling container */}
      <div ref={containerRef} className="relative h-screen overflow-hidden z-20">
        <div ref={contentRef} className="space-y-48 md:space-y-64 text-center px-8 pt-[100vh] pb-[100vh] max-w-4xl mx-auto md:px-16">
          {birthdayWishes.map((wish, index) => (
            <div
              key={index}
              className="flex flex-wrap"
              style={{
                fontFamily: "'Circular', 'Spotify Circular', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                // fontWeight: 700,
              }}
            >
              {wish.split(" ").map((word, index) => (
                <div key={index} className="text-white text-5xl md:text-8xl font-bold whitespace-wrap hover:underline pt-2 pr-4 md:pr-8 break-all text-left">
                  {word}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Control buttons */}
      <RestartButton 
        onClick={handleBackToTop}
        className="absolute top-1/2 right-4 transform -translate-y-28"
      />
      
      <ScrollUpButton 
        onClick={handleScrollUp}
        className="absolute top-1/2 right-4 transform -translate-y-12"
      />
      
      <ScrollDownButton 
        onClick={handleScrollDown}
        className="absolute top-1/2 right-4 transform translate-y-4"
      />

      {/* Drag indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm opacity-50 z-30 font-bold">
        Drag to scroll
      </div>
    </div>
  )
}

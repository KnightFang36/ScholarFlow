'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import Threads from '@/components/threads'

interface Ripple {
  id: number
  x: number
  y: number
}

interface MouseGradientStyle {
  left: string
  top: string
  opacity: number
}

export default function LandingHero() {
  const [mouseGradientStyle, setMouseGradientStyle] = useState<MouseGradientStyle>({
    left: '0px',
    top: '0px',
    opacity: 0,
  })
  const [ripples, setRipples] = useState<Ripple[]>([])
  const [scrolled, setScrolled] = useState(false)
  const [showThreads, setShowThreads] = useState(false)
  const floatingElementsRef = useRef<Element[]>([])

  // Word entrance animation
  useEffect(() => {
    const animateWords = () => {
      const wordElements = document.querySelectorAll<HTMLElement>('.word-animate')
      wordElements.forEach((word) => {
        const delay = Number.parseInt(word.getAttribute('data-delay') || '0', 10) || 0
        setTimeout(() => {
          if (word) word.style.animation = 'word-appear 0.8s ease-out forwards'
        }, delay)
      })
    }
    const timeoutId = setTimeout(animateWords, 500)
    return () => clearTimeout(timeoutId)
  }, [])

  // Reveal the Threads background only after the intro text has fully animated in
  useEffect(() => {
    const timeoutId = setTimeout(() => setShowThreads(true), 4200)
    return () => clearTimeout(timeoutId)
  }, [])

  // Start the metallic shine sweep on the headline once its words have fully appeared
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      document.querySelectorAll<HTMLElement>('.shiny-text').forEach((el) => {
        el.classList.add('shine-active')
      })
    }, 2200)
    return () => clearTimeout(timeoutId)
  }, [])

  // Mouse-follow gradient glow
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseGradientStyle({
        left: `${e.clientX}px`,
        top: `${e.clientY}px`,
        opacity: 1,
      })
    }
    const handleMouseLeave = () => {
      setMouseGradientStyle((prev) => ({ ...prev, opacity: 0 }))
    }
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // Click ripple effect
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newRipple: Ripple = { id: Date.now(), x: e.clientX, y: e.clientY }
      setRipples((prev) => [...prev, newRipple])
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== newRipple.id)), 1000)
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  // Word hover glow
  useEffect(() => {
    const wordElements = document.querySelectorAll<HTMLElement>('.word-animate')
    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement
      if (target) target.style.textShadow = '0 0 24px rgba(255, 255, 255, 0.7)'
    }
    const handleMouseLeave = (e: Event) => {
      const target = e.target as HTMLElement
      if (target) target.style.textShadow = 'none'
    }
    wordElements.forEach((word) => {
      word.addEventListener('mouseenter', handleMouseEnter)
      word.addEventListener('mouseleave', handleMouseLeave)
    })
    return () => {
      wordElements.forEach((word) => {
        if (word) {
          word.removeEventListener('mouseenter', handleMouseEnter)
          word.removeEventListener('mouseleave', handleMouseLeave)
        }
      })
    }
  }, [])

  // Floating particles — start on first scroll
  useEffect(() => {
    const elements = document.querySelectorAll('.floating-element-animate')
    floatingElementsRef.current = Array.from(elements)
    const handleScroll = () => {
      if (!scrolled) {
        setScrolled(true)
        floatingElementsRef.current.forEach((el, index) => {
          const htmlEl = el as HTMLElement
          setTimeout(
            () => {
              if (htmlEl) {
                htmlEl.style.animationPlayState = 'running'
                htmlEl.style.opacity = ''
              }
            },
            Number.parseFloat(htmlEl.style.animationDelay || '0') * 1000 + index * 100
          )
        })
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrolled])

  const pageStyles = `
    #mouse-gradient-react {
      position: fixed;
      pointer-events: none;
      border-radius: 9999px;
      background-image: radial-gradient(circle, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.03), transparent 70%);
      transform: translate(-50%, -50%);
      will-change: left, top, opacity;
      transition: left 70ms linear, top 70ms linear, opacity 300ms ease-out;
      z-index: 5;
    }
    .threads-layer {
      position: absolute;
      inset: 0;
      opacity: 0;
      transition: opacity 2.5s ease-out;
      z-index: 0;
    }
    .threads-layer.threads-visible {
      opacity: 0.55;
    }
    @keyframes word-appear { 0% { opacity: 0; transform: translateY(30px) scale(0.8); filter: blur(10px); } 50% { opacity: 0.8; transform: translateY(10px) scale(0.95); filter: blur(2px); } 100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); } }
    @keyframes grid-draw { 0% { stroke-dashoffset: 1000; opacity: 0; } 50% { opacity: 0.3; } 100% { stroke-dashoffset: 0; opacity: 0.12; } }
    @keyframes pulse-glow { 0%, 100% { opacity: 0.1; transform: scale(1); } 50% { opacity: 0.3; transform: scale(1.1); } }
    @keyframes shine-sweep { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
    .word-animate { display: inline-block; opacity: 0; margin: 0 0.15em; transition: color 0.3s ease, transform 0.3s ease; }
    .word-animate:hover { transform: translateY(-2px); }
    .shiny-text {
      background-image: linear-gradient(
        100deg,
        oklch(0.6 0 0) 0%,
        oklch(0.6 0 0) 40%,
        oklch(1 0 0) 50%,
        oklch(0.6 0 0) 60%,
        oklch(0.6 0 0) 100%
      );
      background-size: 250% 100%;
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      animation: shine-sweep 5s linear infinite;
      animation-play-state: paused;
    }
    .shiny-text.shine-active { animation-play-state: running; }
    .grid-line { stroke: oklch(1 0 0 / 12%); stroke-width: 0.5; opacity: 0; stroke-dasharray: 5 5; stroke-dashoffset: 1000; animation: grid-draw 2s ease-out forwards; }
    .detail-dot { fill: oklch(1 0 0 / 40%); opacity: 0; animation: pulse-glow 3s ease-in-out infinite; }
    .corner-element-animate { position: absolute; width: 40px; height: 40px; border: 1px solid oklch(1 0 0 / 14%); opacity: 0; animation: word-appear 1s ease-out forwards; }
    .text-decoration-animate { position: relative; }
    .text-decoration-animate::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 1px; background: linear-gradient(90deg, transparent, oklch(1 0 0 / 60%), transparent); animation: underline-grow 2s ease-out forwards; animation-delay: 2s; }
    @keyframes underline-grow { to { width: 100%; } }
    .floating-element-animate { position: absolute; width: 2px; height: 2px; background: oklch(1 0 0 / 60%); border-radius: 50%; opacity: 0; animation: float 4s ease-in-out infinite; animation-play-state: paused; }
    @keyframes float { 0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; } 25% { transform: translateY(-10px) translateX(5px); opacity: 0.6; } 50% { transform: translateY(-5px) translateX(-3px); opacity: 0.4; } 75% { transform: translateY(-15px) translateX(7px); opacity: 0.8; } }
    .ripple-effect { position: fixed; width: 4px; height: 4px; background: oklch(1 0 0 / 70%); border-radius: 50%; transform: translate(-50%, -50%); pointer-events: none; animation: pulse-glow 1s ease-out forwards; z-index: 9999; }
  `

  return (
    <>
      <style>{pageStyles}</style>
      <div className="min-h-screen bg-background text-foreground font-sans overflow-hidden relative">

        {/* Threads WebGL background — fades in once the headline finishes animating */}
        <div className={`threads-layer ${showThreads ? 'threads-visible' : ''}`}>
          <Threads color={[1, 1, 1]} amplitude={1.2} distance={0.2} enableMouseInteraction />
        </div>

        {/* Decorative grid background */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern id="scholarflow-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="oklch(1 0 0 / 5%)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#scholarflow-grid)" />
          <line x1="0" y1="20%" x2="100%" y2="20%" className="grid-line" style={{ animationDelay: '0.5s' }} />
          <line x1="0" y1="80%" x2="100%" y2="80%" className="grid-line" style={{ animationDelay: '1s' }} />
          <line x1="20%" y1="0" x2="20%" y2="100%" className="grid-line" style={{ animationDelay: '1.5s' }} />
          <line x1="80%" y1="0" x2="80%" y2="100%" className="grid-line" style={{ animationDelay: '2s' }} />
          <line x1="50%" y1="0" x2="50%" y2="100%" className="grid-line" style={{ animationDelay: '2.5s', opacity: 0.05 }} />
          <line x1="0" y1="50%" x2="100%" y2="50%" className="grid-line" style={{ animationDelay: '3s', opacity: 0.05 }} />
          <circle cx="20%" cy="20%" r="2" className="detail-dot" style={{ animationDelay: '3s' }} />
          <circle cx="80%" cy="20%" r="2" className="detail-dot" style={{ animationDelay: '3.2s' }} />
          <circle cx="20%" cy="80%" r="2" className="detail-dot" style={{ animationDelay: '3.4s' }} />
          <circle cx="80%" cy="80%" r="2" className="detail-dot" style={{ animationDelay: '3.6s' }} />
          <circle cx="50%" cy="50%" r="1.5" className="detail-dot" style={{ animationDelay: '4s' }} />
        </svg>

        {/* Corner accents */}
        <div className="corner-element-animate top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8" style={{ animationDelay: '4s' }}>
          <div className="absolute top-0 left-0 w-2 h-2 bg-primary opacity-30 rounded-full" />
        </div>
        <div className="corner-element-animate top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8" style={{ animationDelay: '4.2s' }}>
          <div className="absolute top-0 right-0 w-2 h-2 bg-primary opacity-30 rounded-full" />
        </div>
        <div className="corner-element-animate bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8" style={{ animationDelay: '4.4s' }}>
          <div className="absolute bottom-0 left-0 w-2 h-2 bg-primary opacity-30 rounded-full" />
        </div>
        <div className="corner-element-animate bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8" style={{ animationDelay: '4.6s' }}>
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-primary opacity-30 rounded-full" />
        </div>

        {/* Floating particles */}
        <div className="floating-element-animate" style={{ top: '25%', left: '15%', animationDelay: '0.5s' }} />
        <div className="floating-element-animate" style={{ top: '60%', left: '85%', animationDelay: '1s' }} />
        <div className="floating-element-animate" style={{ top: '40%', left: '10%', animationDelay: '1.5s' }} />
        <div className="floating-element-animate" style={{ top: '75%', left: '90%', animationDelay: '2s' }} />

        {/* Top nav */}
        <nav className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-8 md:px-12">
          <span className="text-sm font-mono font-semibold tracking-tight text-foreground">
            Scholar<span className="text-muted-foreground">Flow</span>
          </span>
          <div className="flex items-center gap-3">
            <Link
              href="/sign-in"
              className="text-xs sm:text-sm font-mono text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="text-xs sm:text-sm font-mono px-4 py-2 rounded-md border border-border text-foreground hover:border-foreground/40 transition-colors"
            >
              Get started
            </Link>
          </div>
        </nav>

        {/* Main content */}
        <div className="relative z-10 min-h-[calc(100vh-88px)] flex flex-col justify-between items-center px-6 py-10 sm:px-8 sm:py-12 md:px-16 md:py-16">
          <div className="text-center">
            <h2 className="text-xs sm:text-sm font-mono font-light text-muted-foreground uppercase tracking-[0.2em] opacity-80">
              <span className="word-animate" data-delay="0">
                Knowledge,
              </span>
              <span className="word-animate" data-delay="300">
                organized.
              </span>
            </h2>
            <div className="mt-4 w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-60 mx-auto" />
          </div>

          <div className="text-center max-w-5xl mx-auto relative">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight text-decoration-animate text-balance">
              <div className="mb-4 md:mb-6">
                <span className="word-animate shiny-text" data-delay="700">
                  Think
                </span>
                <span className="word-animate shiny-text" data-delay="850">
                  deeper,
                </span>
                <span className="word-animate shiny-text" data-delay="1000">
                  study
                </span>
                <span className="word-animate shiny-text" data-delay="1150">
                  smarter,
                </span>
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-thin text-muted-foreground leading-relaxed tracking-wide">
                <span className="word-animate" data-delay="1600">
                  with
                </span>
                <span className="word-animate" data-delay="1750">
                  an
                </span>
                <span className="word-animate" data-delay="1900">
                  AI
                </span>
                <span className="word-animate" data-delay="2050">
                  workspace
                </span>
                <span className="word-animate" data-delay="2200">
                  built
                </span>
                <span className="word-animate" data-delay="2350">
                  for
                </span>
                <span className="word-animate" data-delay="2500">
                  scholars.
                </span>
              </div>
            </h1>
            <div
              className="absolute -left-6 sm:-left-8 top-1/2 -translate-y-1/2 w-3 sm:w-4 h-px bg-border opacity-0"
              style={{ animation: 'word-appear 1s ease-out forwards', animationDelay: '3.2s' }}
            />
            <div
              className="absolute -right-6 sm:-right-8 top-1/2 -translate-y-1/2 w-3 sm:w-4 h-px bg-border opacity-0"
              style={{ animation: 'word-appear 1s ease-out forwards', animationDelay: '3.4s' }}
            />

            {/* Start your workspace — centered directly beneath the headline */}
            <div
              className="mt-10 opacity-0"
              style={{ animation: 'word-appear 1s ease-out forwards', animationDelay: '4s' }}
            >
              <Link
                href="/sign-up"
                className="inline-flex items-center gap-2 text-sm font-mono px-6 py-3 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Start your workspace
              </Link>
            </div>
          </div>

          <div className="text-center">
            <div className="mb-6 w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-60 mx-auto" />
            <h2 className="text-xs sm:text-sm font-mono font-light text-muted-foreground uppercase tracking-[0.2em] opacity-80">
              <span className="word-animate" data-delay="3000">
                Upload,
              </span>
              <span className="word-animate" data-delay="3200">
                ask,
              </span>
              <span className="word-animate" data-delay="3400">
                understand.
              </span>
            </h2>
          </div>
        </div>

        {/* Mouse-follow gradient */}
        <div
          id="mouse-gradient-react"
          className="w-60 h-60 blur-xl sm:w-80 sm:h-80 sm:blur-2xl md:w-96 md:h-96 md:blur-3xl"
          style={{
            left: mouseGradientStyle.left,
            top: mouseGradientStyle.top,
            opacity: mouseGradientStyle.opacity,
          }}
        />

        {/* Click ripples */}
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="ripple-effect"
            style={{ left: `${ripple.x}px`, top: `${ripple.y}px` }}
          />
        ))}
      </div>
    </>
  )
}

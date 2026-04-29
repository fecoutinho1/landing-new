"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Cube, CaretRight } from "@phosphor-icons/react/dist/ssr"

const CONFIGS = [
  {
    provider: "openai",
    model: "gpt-4o",
    detectPromptInjection: "true",
    anonymizePII: "true",
    blockSecrets: "true",
  },
  {
    provider: "anthropic",
    model: "claude-3-opus",
    detectPromptInjection: "true",
    anonymizePII: "true",
    blockSecrets: "true",
  },
  {
    provider: "azure",
    model: "gpt-4-turbo",
    detectPromptInjection: "true",
    anonymizePII: "false",
    blockSecrets: "true",
  },
  {
    provider: "cohere",
    model: "command-r-plus",
    detectPromptInjection: "true",
    anonymizePII: "true",
    blockSecrets: "false",
  },
  {
    provider: "google",
    model: "gemini-pro",
    detectPromptInjection: "true",
    anonymizePII: "true",
    blockSecrets: "true",
  },
]

export function TerminalDemo() {
  const [configIndex, setConfigIndex] = useState(0)
  const [typedChars, setTypedChars] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const animationRef = useRef<NodeJS.Timeout | null>(null)
  const cycleRef = useRef<NodeJS.Timeout | null>(null)
  const [bulletsVisible, setBulletsVisible] = useState([false, false, false])
  const bulletsSectionRef = useRef<HTMLDivElement>(null)
  const bulletsAnimatedRef = useRef(false)

  const config = CONFIGS[configIndex]

  // Build the full string we're typing
  const fullText = `${config.provider}|${config.model}|${config.detectPromptInjection}|${config.anonymizePII}|${config.blockSecrets}`
  const totalChars = fullText.length

  // Get displayed value for each field based on typedChars
  const getFieldValue = (fieldIndex: number): string => {
    const parts = fullText.split("|")
    let charsBefore = 0
    for (let i = 0; i < fieldIndex; i++) {
      charsBefore += parts[i].length + 1 // +1 for delimiter
    }
    const fieldStart = charsBefore
    const fieldEnd = charsBefore + parts[fieldIndex].length

    if (typedChars <= fieldStart) return ""
    if (typedChars >= fieldEnd) return parts[fieldIndex]
    return parts[fieldIndex].slice(0, typedChars - fieldStart)
  }

  const getCursorField = (): number => {
    const parts = fullText.split("|")
    let charsBefore = 0
    for (let i = 0; i < parts.length; i++) {
      const fieldEnd = charsBefore + parts[i].length
      if (typedChars <= fieldEnd) return i
      charsBefore = fieldEnd + 1
    }
    return -1
  }

  // Single typing effect
  useEffect(() => {
    if (isComplete) return

    if (typedChars < totalChars) {
      animationRef.current = setTimeout(
        () => {
          setTypedChars((prev) => prev + 1)
        },
        100 + Math.random() * 50,
      ) // 100-150ms per char
    } else {
      setIsComplete(true)
    }

    return () => {
      if (animationRef.current) clearTimeout(animationRef.current)
    }
  }, [typedChars, totalChars, isComplete])

  // Cycle to next config after completion
  useEffect(() => {
    if (!isComplete) return

    cycleRef.current = setTimeout(() => {
      setConfigIndex((prev) => (prev + 1) % CONFIGS.length)
      setTypedChars(0)
      setIsComplete(false)
    }, 3000) // Wait 3 seconds before cycling

    return () => {
      if (cycleRef.current) clearTimeout(cycleRef.current)
    }
  }, [isComplete])

  useEffect(() => {
    if (!bulletsSectionRef.current || bulletsAnimatedRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !bulletsAnimatedRef.current) {
            bulletsAnimatedRef.current = true
            // Stagger the bullet animations
            setTimeout(() => setBulletsVisible((prev) => [true, prev[1], prev[2]]), 0)
            setTimeout(() => setBulletsVisible((prev) => [prev[0], true, prev[2]]), 200)
            setTimeout(() => setBulletsVisible((prev) => [prev[0], prev[1], true]), 400)
          }
        })
      },
      { threshold: 0.3 },
    )

    observer.observe(bulletsSectionRef.current)
    return () => observer.disconnect()
  }, [])

  const cursorField = getCursorField()
  const showCursor = !isComplete

  const renderValue = (fieldIndex: number, isString = true) => {
    const value = getFieldValue(fieldIndex)
    const hasCursor = showCursor && cursorField === fieldIndex
    const colorClass = isString ? "text-[var(--color-accent-orange-600)]" : "text-[var(--color-accent-orange-700)]"

    return (
      <span className={colorClass}>
        {isString ? `"${value}"` : value}
        {hasCursor && (
          <span className="inline-block w-[2px] h-[1em] bg-[var(--color-accent-orange-500)] ml-px animate-pulse" />
        )}
      </span>
    )
  }

  return (
    <section className="py-24 border-t border-[var(--color-baltic-sea-200)]">
      <div className="mx-auto max-w-[1400px] px-2.5 sm:px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-20">
          {/* Code block - left */}
          <div className="flex-1">
            <div
              className="rounded-2xl border border-[var(--color-baltic-sea-200)] bg-[var(--color-baltic-sea-100)] overflow-hidden"
              style={{ boxShadow: "var(--bento-shadow)" }}
            >
              <div className="flex items-center justify-between border-b border-[var(--color-baltic-sea-200)] px-4 py-3 bg-white">
                <div className="flex items-center gap-3">
                  <Cube weight="fill" className="h-4 w-4 text-[var(--color-baltic-sea-500)]" />
                  <span className="text-xs text-[var(--color-baltic-sea-600)] font-mono">cleanpredict.config.ts</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {CONFIGS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        if (animationRef.current) clearTimeout(animationRef.current)
                        if (cycleRef.current) clearTimeout(cycleRef.current)
                        setConfigIndex(i)
                        setTypedChars(0)
                        setIsComplete(false)
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === configIndex
                          ? "w-4 bg-[var(--color-accent-orange-500)]"
                          : "w-1.5 bg-[var(--color-baltic-sea-300)] hover:bg-[var(--color-baltic-sea-400)]"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="p-5 font-mono text-sm overflow-x-auto bg-white">
                <pre className="text-[var(--color-baltic-sea-700)]">
                  <code>
                    <span className="text-[var(--color-baltic-sea-400)]">{"// Configure o Clean Predict"}</span>
                    {"\n"}
                    <span className="text-[var(--color-accent-orange-600)]">export default</span>{" "}
                    <span className="text-[var(--color-baltic-sea-900)]">createProxy</span>
                    {"({"}
                    {"\n"}
                    {"  "}
                    <span className="text-[var(--color-baltic-sea-700)]">provider</span>: {renderValue(0)},{"\n"}
                    {"  "}
                    <span className="text-[var(--color-baltic-sea-700)]">model</span>: {renderValue(1)},{"\n"}
                    {"  "}
                    <span className="text-[var(--color-baltic-sea-700)]">security</span>: {"{"}
                    {"\n"}
                    {"    "}
                    <span className="text-[var(--color-baltic-sea-700)]">detectPromptInjection</span>: {renderValue(2, false)},{"\n"}
                    {"    "}
                    <span className="text-[var(--color-baltic-sea-700)]">anonymizePII</span>: {renderValue(3, false)},{"\n"}
                    {"    "}
                    <span className="text-[var(--color-baltic-sea-700)]">blockSecrets</span>: {renderValue(4, false)},{"\n"}
                    {"  "}
                    {"}"},{"\n"}
                    {"})"}
                  </code>
                </pre>
              </div>
            </div>
          </div>

          {/* CTA content - right */}
          <div className="lg:max-w-md">
            <span className="text-sm font-medium text-[var(--color-accent-orange-600)] uppercase tracking-wider">
              Integração simples
            </span>
            <h2 className="mt-3 text-3xl font-bold text-[var(--color-baltic-sea-900)] md:text-4xl">
              Proteja suas chamadas em minutos
            </h2>
            <p className="mt-4 text-lg text-[var(--color-baltic-sea-500)]">
              Configure o proxy, escolha suas proteções e comece a usar. Uma linha de código é tudo que você precisa.
            </p>

            <div ref={bulletsSectionRef} className="mt-8 space-y-4">
              {["10.000 requisições grátis/mês", "Sem cartão de crédito", "Compatível com qualquer LLM"].map(
                (text, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 transition-all duration-500 ease-out"
                    style={{
                      opacity: bulletsVisible[index] ? 1 : 0,
                      transform: bulletsVisible[index] ? "translateX(0)" : "translateX(40px)",
                    }}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-accent-orange-100)] border border-[var(--color-accent-orange-300)]">
                      <CaretRight weight="bold" className="h-4 w-4 text-[var(--color-accent-orange-600)]" />
                    </div>
                    <span className="text-[var(--color-baltic-sea-700)]">{text}</span>
                  </div>
                ),
              )}
            </div>

            <div className="mt-10">
              <a href="/login">
                <Button
                  size="lg"
                  className="bg-[var(--color-accent-orange-500)] text-white hover:bg-[var(--color-accent-orange-600)] rounded-full h-12 px-6"
                >
                  Começar agora
                  <ArrowRight weight="bold" className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

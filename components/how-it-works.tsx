"use client"

import { useEffect, useRef, useState } from "react"
import { Code, GitBranch, Rocket } from "@phosphor-icons/react/dist/ssr"

const STEPS = [
  {
    icon: Code,
    number: "01",
    title: "Gere sua API Key",
    description: "Crie sua conta e gere uma API Key no painel. Leva menos de 1 minuto para começar.",
  },
  {
    icon: GitBranch,
    number: "02",
    title: "Configure o proxy",
    description: "Substitua a URL base do seu provedor de LLM pelo endpoint do Clean Predict. Uma linha de código.",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Envie para o LLM",
    description: "Suas requisições passam pelo Clean Predict primeiro, são protegidas e então enviadas ao modelo final.",
  },
]

export function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeStep, setActiveStep] = useState(-1)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isVisible) {
      STEPS.forEach((_, i) => {
        setTimeout(() => setActiveStep(i), 400 + i * 300)
      })
    }
  }, [isVisible])

  return (
    <section ref={ref} id="como-funciona" className="py-24 border-t border-[var(--color-baltic-sea-200)] overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-2.5 sm:px-6 lg:px-12">
        <div
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-12 blur-sm"}`}
        >
          <span className="text-sm font-medium text-[var(--color-accent-orange-400)] uppercase tracking-wider">
            Como funciona
          </span>
          <h2 className="mt-3 text-3xl font-bold text-[var(--color-baltic-sea-900)] md:text-4xl text-balance">
            Da integração à produção em minutos
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className={`relative transition-all duration-700 ease-out ${
                activeStep >= i ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-16 scale-95"
              }`}
            >
              {i < STEPS.length - 1 && (
                <div
                  className={`hidden md:block absolute top-10 left-[60%] h-px bg-gradient-to-r from-[var(--color-accent-orange-500)] to-transparent transition-all duration-1000 ease-out origin-left ${
                    activeStep > i ? "w-[80%] opacity-100" : "w-0 opacity-0"
                  }`}
                  style={{ transitionDelay: "200ms" }}
                />
              )}

              <div className="flex flex-col items-start">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`h-14 w-14 rounded-2xl bg-white border border-[var(--color-baltic-sea-200)] flex items-center justify-center transition-all duration-500 ${
                      activeStep >= i
                        ? "border-[var(--color-accent-orange-400)] shadow-[0_0_20px_-5px_var(--color-accent-orange-400)]"
                        : ""
                    }`}
                  >
                    <step.icon
                      weight="duotone"
                      className={`h-7 w-7 transition-colors duration-500 ${activeStep >= i ? "text-[var(--color-accent-orange-600)]" : "text-[var(--color-baltic-sea-400)]"}`}
                    />
                  </div>
                  <span
                    className={`text-5xl font-bold transition-all duration-500 ${
                      activeStep >= i ? "text-[var(--color-accent-orange-300)]" : "text-[var(--color-baltic-sea-200)]"
                    }`}
                  >
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-[var(--color-baltic-sea-900)] mb-2">{step.title}</h3>
                <p className="text-[var(--color-baltic-sea-500)]">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

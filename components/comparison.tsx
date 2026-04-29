"use client"

import { useEffect, useRef, useState } from "react"
import { Check, X, Minus } from "@phosphor-icons/react/dist/ssr"

const FEATURES = [
  { name: "Detecção de Injeção de Prompt", cleanpredict: true, manual: false, native: false },
  { name: "Anonimização de PII", cleanpredict: true, manual: "partial", native: false },
  { name: "Detecção de Secrets", cleanpredict: true, manual: "partial", native: false },
  { name: "Redução de Custo", cleanpredict: true, manual: false, native: "partial" },
  { name: "Segurança em Tempo Real", cleanpredict: true, manual: false, native: false },
  { name: "Auditoria de Compliance", cleanpredict: true, manual: "partial", native: false },
  { name: "Multi-provedor LLM", cleanpredict: true, manual: true, native: false },
  { name: "Orquestração Multi-agent", cleanpredict: true, manual: "partial", native: false },
]

function FeatureCell({ value, isVisible, delay }: { value: boolean | "partial"; isVisible: boolean; delay: number }) {
  const baseClasses = `transition-all duration-500 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"}`

  if (value === true) {
    return (
      <div className="flex justify-center">
        <div
          className={`h-6 w-6 rounded-full bg-[var(--color-accent-orange-100)] flex items-center justify-center ${baseClasses}`}
          style={{ transitionDelay: `${delay}ms` }}
        >
          <Check weight="bold" className="h-4 w-4 text-[var(--color-accent-orange-600)]" />
        </div>
      </div>
    )
  }
  if (value === "partial") {
    return (
      <div className="flex justify-center">
        <div
          className={`h-6 w-6 rounded-full bg-[var(--color-baltic-sea-100)] flex items-center justify-center ${baseClasses}`}
          style={{ transitionDelay: `${delay}ms` }}
        >
          <Minus weight="bold" className="h-4 w-4 text-[var(--color-baltic-sea-500)]" />
        </div>
      </div>
    )
  }
  return (
    <div className="flex justify-center">
      <div
        className={`h-6 w-6 rounded-full bg-[var(--color-baltic-sea-100)] flex items-center justify-center ${baseClasses}`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        <X weight="bold" className="h-4 w-4 text-[var(--color-baltic-sea-400)]" />
      </div>
    </div>
  )
}

export function Comparison() {
  const [isVisible, setIsVisible] = useState(false)
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

  return (
    <section ref={ref} className="py-24 border-t border-[var(--color-baltic-sea-200)] overflow-hidden">
      <div className="mx-auto max-w-[1000px] px-2.5 sm:px-6 lg:px-12">
        <div
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-12 blur-sm"}`}
        >
          <span className="text-sm font-medium text-[var(--color-accent-orange-400)] uppercase tracking-wider">
            Comparação
          </span>
          <h2 className="mt-3 text-3xl font-bold text-[var(--color-baltic-sea-900)] md:text-4xl text-balance">
            Por que times escolhem o Clean Predict
          </h2>
        </div>

        <div
          className={`rounded-2xl border border-[var(--color-baltic-sea-200)] bg-white overflow-hidden transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
          }`}
          style={{ boxShadow: "var(--bento-shadow)", transitionDelay: "200ms" }}
        >
          <div className="overflow-x-auto scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--color-baltic-sea-200)]">
                  <th className="text-left p-4 lg:p-6 text-sm font-medium text-[var(--color-baltic-sea-500)]">
                    Funcionalidade
                  </th>
                  <th className="p-4 lg:p-6 text-sm font-semibold text-[var(--color-accent-orange-600)]">Clean Predict</th>
                  <th className="p-4 lg:p-6 text-sm font-medium text-[var(--color-baltic-sea-500)]">Implementação Manual</th>
                  <th className="p-4 lg:p-6 text-sm font-medium text-[var(--color-baltic-sea-500)]">LLM Nativo</th>
                </tr>
              </thead>
              <tbody>
                {FEATURES.map((feature, i) => (
                  <tr
                    key={feature.name}
                    className={`border-b border-[var(--color-baltic-sea-100)] transition-all duration-500 ${
                      isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                    }`}
                    style={{ transitionDelay: `${300 + i * 60}ms` }}
                  >
                    <td className="p-4 lg:p-6 text-sm text-[var(--color-baltic-sea-700)]">{feature.name}</td>
                    <td className="p-4 lg:p-6">
                      <FeatureCell value={feature.cleanpredict} isVisible={isVisible} delay={400 + i * 60} />
                    </td>
                    <td className="p-4 lg:p-6">
                      <FeatureCell value={feature.manual} isVisible={isVisible} delay={450 + i * 60} />
                    </td>
                    <td className="p-4 lg:p-6">
                      <FeatureCell value={feature.native} isVisible={isVisible} delay={500 + i * 60} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

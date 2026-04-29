"use client"

import type React from "react"

import { BentoCard } from "./bento-card"
import {
  Lightning,
  Globe,
  ShieldCheck,
  Cpu,
  ChartLineUp,
  GitBranch,
  ArrowsOutCardinal,
} from "@phosphor-icons/react/dist/ssr"
import { useEffect, useRef, useState } from "react"

function AnimatedCard({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  direction?: "up" | "left" | "right"
  className?: string
}) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [delay])

  const translateClass = {
    up: "translate-y-8",
    left: "translate-x-8",
    right: "-translate-x-8",
  }[direction]

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className} ${
        isVisible ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${translateClass}`
      }`}
    >
      {children}
    </div>
  )
}

export function BentoGrid() {
  return (
    <section id="funcionalidades" className="py-24">
      {/* Section header */}
      <div className="mx-auto max-w-[1400px] px-2.5 sm:px-6 lg:px-12">
        <AnimatedCard delay={0} direction="up">
          <div className="mb-16 max-w-2xl">
            <span className="text-sm font-medium text-[var(--color-accent-orange-400)] uppercase tracking-wider">
              Funcionalidades
            </span>
            <h2 className="mt-3 text-3xl font-bold text-[var(--color-baltic-sea-900)] md:text-4xl">
              Proteção completa para suas aplicações de IA
            </h2>
            <p className="mt-4 text-lg text-[var(--color-baltic-sea-500)]">
              Um proxy transparente que adiciona segurança, compliance e controle de custos às suas integrações com LLMs.
            </p>
          </div>
        </AnimatedCard>

        {/* Staggered bento grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:auto-rows-[180px]">
          {/* Primary feature - tall left card */}
          <AnimatedCard delay={100} direction="left" className="min-h-[280px] md:min-h-0 md:col-span-4 md:row-span-2">
            <BentoCard className="flex flex-col h-full">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-accent-orange-100)]">
                <Lightning weight="duotone" className="h-6 w-6 text-[var(--color-accent-orange-600)]" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[var(--color-baltic-sea-900)]">Detecção de Injeção de Prompt</h3>
              <p className="mt-2 text-sm text-[var(--color-baltic-sea-500)] flex-1">
                Detecta e bloqueia prompts maliciosos em tempo real: jailbreaks, sobrescrita de instruções, injeções indiretas via RAG e conteúdo externo.
              </p>
              <div className="mt-auto pt-6 flex items-end gap-1">
                {[47, 52, 43, 48, 51, 45, 49, 44, 50, 46].map((val, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-[var(--color-accent-orange-400)]"
                    style={{ height: `${val}px` }}
                  />
                ))}
              </div>
            </BentoCard>
          </AnimatedCard>

          {/* Top right - vertical wide */}
          <AnimatedCard delay={200} direction="up" className="min-h-[160px] md:min-h-0 md:col-span-5">
            <BentoCard className="flex flex-col h-full">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-baltic-sea-100)]">
                <Globe weight="duotone" className="h-5 w-5 text-[var(--color-accent-orange-600)]" />
              </div>
              <h3 className="mt-3 text-base font-semibold text-[var(--color-baltic-sea-900)]">Anonimização de PII</h3>
              <p className="mt-1 text-sm text-[var(--color-baltic-sea-500)]">
                Substitui automaticamente nomes, CPFs, emails e cartões de crédito por tokens reversíveis antes de enviar ao LLM.
              </p>
            </BentoCard>
          </AnimatedCard>

          {/* Top far right - square with accent */}
          <AnimatedCard
            delay={300}
            direction="right"
            className="hidden md:block min-h-[160px] md:min-h-0 md:col-span-3"
          >
            <BentoCard className="flex flex-col items-center justify-center text-center h-full">
              <div className="text-4xl font-bold text-[var(--color-accent-orange-600)]">{`<20ms`}</div>
              <div className="mt-1 text-sm text-[var(--color-baltic-sea-500)]">de latência</div>
            </BentoCard>
          </AnimatedCard>

          {/* Middle row - medium card */}
          <AnimatedCard delay={400} direction="left" className="min-h-[160px] md:min-h-0 md:col-span-3">
            <BentoCard className="flex flex-col h-full">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-baltic-sea-100)]">
                <ShieldCheck weight="duotone" className="h-5 w-5 text-[var(--color-accent-orange-600)]" />
              </div>
              <h3 className="mt-3 text-base font-semibold text-[var(--color-baltic-sea-900)]">Detecção de Secrets</h3>
              <p className="mt-1 text-sm text-[var(--color-baltic-sea-500)]">
                Bloqueia vazamento de API keys, senhas e connection strings via análise de entropia.
              </p>
            </BentoCard>
          </AnimatedCard>

          {/* Middle - larger with GPU badge */}
          <AnimatedCard delay={500} direction="up" className="min-h-[160px] md:min-h-0 md:col-span-5">
            <BentoCard className="flex flex-col h-full">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-baltic-sea-100)]">
                  <Cpu weight="duotone" className="h-5 w-5 text-[var(--color-accent-orange-600)]" />
                </div>
                <span className="text-xs font-medium text-[var(--color-accent-orange-700)] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--color-accent-orange-100)] border border-[var(--color-accent-orange-300)]">
                  ROI
                </span>
              </div>
              <h3 className="mt-3 text-base font-semibold text-[var(--color-baltic-sea-900)]">
                Otimização de Custo
              </h3>
              <p className="mt-1 text-sm text-[var(--color-baltic-sea-500)]">
                Acompanhe consumo de tokens e custo por modelo, workspace e requisição. Identifique prompts caros e padrões de uso.
              </p>
            </BentoCard>
          </AnimatedCard>

          {/* Bottom section - spanning full width with 3 equal cards */}
          <AnimatedCard delay={600} direction="up" className="min-h-[160px] md:min-h-0 md:col-span-4">
            <BentoCard className="flex flex-col h-full">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-baltic-sea-100)]">
                <ChartLineUp weight="duotone" className="h-5 w-5 text-[var(--color-accent-orange-600)]" />
              </div>
              <h3 className="mt-3 text-base font-semibold text-[var(--color-baltic-sea-900)]">
                Auditoria de Compliance
              </h3>
              <p className="mt-1 text-sm text-[var(--color-baltic-sea-500)]">
                Cada requisição é registrada com contexto completo para revisões de LGPD, GDPR, HIPAA e SOC 2.
              </p>
            </BentoCard>
          </AnimatedCard>

          <AnimatedCard delay={700} direction="up" className="min-h-[160px] md:min-h-0 md:col-span-4">
            <BentoCard className="flex flex-col h-full">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-baltic-sea-100)]">
                <GitBranch weight="duotone" className="h-5 w-5 text-[var(--color-accent-orange-600)]" />
              </div>
              <h3 className="mt-3 text-base font-semibold text-[var(--color-baltic-sea-900)]">
                Integração Sem Código
              </h3>
              <p className="mt-1 text-sm text-[var(--color-baltic-sea-500)]">
                Mude uma URL. O Clean Predict funciona como proxy entre seu app e o LLM.
              </p>
            </BentoCard>
          </AnimatedCard>

          <AnimatedCard delay={800} direction="up" className="min-h-[160px] md:min-h-0 md:col-span-4">
            <BentoCard className="flex flex-col h-full">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-baltic-sea-100)]">
                <ArrowsOutCardinal weight="duotone" className="h-5 w-5 text-[var(--color-accent-orange-600)]" />
              </div>
              <h3 className="mt-3 text-base font-semibold text-[var(--color-baltic-sea-900)]">Multi-provedor</h3>
              <p className="mt-1 text-sm text-[var(--color-baltic-sea-500)]">
                Compatível com OpenAI, Anthropic, Azure, Cohere e qualquer provedor de LLM.
              </p>
            </BentoCard>
          </AnimatedCard>
        </div>
      </div>
    </section>
  )
}

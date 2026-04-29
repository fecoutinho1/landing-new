"use client"

import { useEffect, useRef, useState } from "react"
import { CaretDown } from "@phosphor-icons/react/dist/ssr"

const FAQS = [
  {
    question: "O que exatamente é o Clean Predict?",
    answer:
      "O Clean Predict é um proxy de segurança transparente que fica entre sua aplicação e qualquer provedor de LLM (OpenAI, Anthropic, Azure, Cohere, etc.). Cada requisição passa por ele em menos de 20ms: detectando injeção de prompt, anonimizando PII, bloqueando vazamento de secrets e registrando tudo para compliance.",
  },
  {
    question: "Como integro o Clean Predict?",
    answer:
      "Mude uma linha: substitua a URL base do seu provedor de LLM pelo endpoint do Clean Predict. Só isso. O proxy é totalmente compatível com os SDKs da OpenAI, Anthropic e Azure. A maioria dos times está em produção em menos de 30 minutos.",
  },
  {
    question: "Ele adiciona latência nas minhas chamadas ao LLM?",
    answer:
      "Nossa camada de inferência adiciona menos de 20ms no percentil 95. Para a maioria dos casos de uso com LLMs, onde a resposta do modelo leva centenas de milissegundos, esse overhead é imperceptível para os usuários finais.",
  },
  {
    question: "Que tipos de ataques ele detecta?",
    answer:
      "O Clean Predict detecta: injeção de prompt (direta e indireta), tentativas de jailbreak, consultas de exfiltração de dados e system prompt leakage. Também bloqueia secrets como API keys, senhas e connection strings usando análise de entropia e padrões regex.",
  },
  {
    question: "Meus dados são armazenados ou usados para treinamento?",
    answer:
      "Não. Os dados trafegados são criptografados e não é possível acessá-los. O PII é substituído por tokens reversíveis antes de sair do seu ambiente. Dados brutos nunca são armazenados em nossos servidores e não são usados para treinamento de modelos.",
  },
  {
    question: "Quais provedores de LLM são compatíveis?",
    answer:
      "O Clean Predict é compatível com qualquer provedor de LLM: OpenAI, Anthropic, Azure, Cohere, Google AI, modelos self-hosted e outros. Basta apontar para nosso endpoint e manter sua integração existente funcionando.",
  },
]

function FAQItem({
  question,
  answer,
  isOpen,
  onClick,
  delay,
  isVisible,
}: {
  question: string
  answer: string
  isOpen: boolean
  onClick: () => void
  delay: number
  isVisible: boolean
}) {
  return (
    <div
      className={`border-b border-[var(--color-baltic-sea-200)] transition-all duration-500 ${
        isVisible ? "opacity-100 translate-x-0" : `opacity-0 ${delay % 2 === 0 ? "-translate-x-8" : "translate-x-8"}`
      }`}
      style={{ transitionDelay: `${delay * 75 + 200}ms` }}
    >
      <button onClick={onClick} className="w-full flex items-center justify-between py-5 text-left group">
        <span className="font-medium text-[var(--color-baltic-sea-800)] group-hover:text-[var(--color-accent-orange-600)] transition-colors">
          {question}
        </span>
        <CaretDown
          weight="bold"
          className={`h-5 w-5 text-[var(--color-baltic-sea-400)] group-hover:text-[var(--color-accent-orange-600)] transition-all duration-300 ${isOpen ? "rotate-180 text-[var(--color-accent-orange-600)]" : ""}`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <p className="pb-5 text-[var(--color-baltic-sea-500)] leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  )
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
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
      <div className="mx-auto max-w-[800px] px-2.5 sm:px-6 lg:px-12">
        <div
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-12 blur-sm"}`}
        >
          <span className="text-sm font-medium text-[var(--color-accent-orange-400)] uppercase tracking-wider">FAQ</span>
          <h2 className="mt-3 text-3xl font-bold text-[var(--color-baltic-sea-900)] md:text-4xl">
            Perguntas frequentes
          </h2>
        </div>

        <div>
          {FAQS.map((faq, i) => (
            <FAQItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              delay={i}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, PaperPlaneTilt, FileText, CheckCircle } from "@phosphor-icons/react"
import { useEffect, useState, useRef } from "react"

const CHATBOT_SEQUENCE = {
  userMessage: "Analise esse documento",
  steps: [
    { text: "Lendo documento...", delay: 500 },
    { text: "Processando conteúdo...", delay: 600 },
    { text: "Consultando api.cleanpredict.com/v1/", delay: 700 },
    { text: "Camada de segurança...", delay: 500 },
    { text: "Otimizando custo na inferência...", delay: 600 },
    { text: "Construindo logs e camada de observabilidade...", delay: 700 },
    { text: "Gerando análise...", delay: 800 },
  ],
  statusPass: "Status: PASS",
  analysis: [
    { text: "Documento identificado: Contrato de Serviços", delay: 400 },
    { text: "Total de páginas: 12", delay: 300 },
    { text: "Cláusulas principais encontradas: 8", delay: 400 },
    { text: "Pontos de atenção: 3", delay: 400 },
    { text: "Prazo de vigência: 24 meses", delay: 300 },
    { text: "✓ Análise concluída em 2.1s", delay: 0 },
  ],
}

const GRID_ACTIVATION_MAP: Record<number, number[]> = {
  0: [5, 23, 47, 68, 92],
  1: [12, 31, 56, 78, 103],
  2: [115, 138, 167, 189, 215],
  3: [8, 45, 89, 134, 176],
  4: [3, 19, 42, 65, 88],
  5: [112, 139, 163, 186, 209],
  6: [17, 54, 97, 143, 188, 211, 237, 127, 152, 178, 201, 223, 234],
}

let animationStarted = false

export function HeroSection() {
  const [typedMessage, setTypedMessage] = useState("")
  const [showUserMessage, setShowUserMessage] = useState(false)
  const [visibleSteps, setVisibleSteps] = useState<number[]>([])
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [analysisOutputs, setAnalysisOutputs] = useState<string[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [activeCells, setActiveCells] = useState<Set<number>>(new Set())
  const [showStatusPass, setShowStatusPass] = useState(false)

  const timeoutsRef = useRef<NodeJS.Timeout[]>([])
  const intervalsRef = useRef<NodeJS.Timeout[]>([])

  useEffect(() => {
    if (animationStarted) return
    animationStarted = true

    const addTimeout = (fn: () => void, delay: number) => {
      const id = setTimeout(fn, delay)
      timeoutsRef.current.push(id)
      return id
    }

    const activateCellsForStep = (stepIndex: number) => {
      const cells = GRID_ACTIVATION_MAP[stepIndex] || []
      cells.forEach((cellIndex, i) => {
        addTimeout(() => {
          setActiveCells((prev) => new Set([...prev, cellIndex]))
        }, i * 60)
      })
    }

    // Type user message
    let charIndex = 0
    const typeMessage = () => {
      if (charIndex <= CHATBOT_SEQUENCE.userMessage.length) {
        setTypedMessage(CHATBOT_SEQUENCE.userMessage.slice(0, charIndex))
        charIndex++
        addTimeout(typeMessage, 60 + Math.random() * 40)
      } else {
        addTimeout(() => {
          setShowUserMessage(true)
          addTimeout(() => showSteps(0), 500)
        }, 300)
      }
    }

    const showSteps = (stepIndex: number) => {
      if (stepIndex < CHATBOT_SEQUENCE.steps.length) {
        setVisibleSteps((prev) => [...prev, stepIndex])
        activateCellsForStep(stepIndex)
        addTimeout(() => showSteps(stepIndex + 1), CHATBOT_SEQUENCE.steps[stepIndex].delay)
      } else {
        addTimeout(() => {
          setShowStatusPass(true)
          addTimeout(() => {
            setShowAnalysis(true)
            setIsProcessing(true)
            runAnalysisOutputs()
          }, 600)
        }, 500)
      }
    }

    const runAnalysisOutputs = () => {
      let outputIndex = 0
      const outputs = [...CHATBOT_SEQUENCE.analysis]

      const showOutput = () => {
        if (outputIndex < outputs.length) {
          const currentOutput = outputs[outputIndex]
          const currentDelay = currentOutput.delay
          setAnalysisOutputs((prev) => [...prev, currentOutput.text])
          outputIndex++
          if (outputIndex < outputs.length) {
            addTimeout(showOutput, currentDelay)
          } else {
            addTimeout(() => setIsProcessing(false), 300)
          }
        }
      }
      showOutput()
    }

    addTimeout(typeMessage, 800)

    return () => {
      timeoutsRef.current.forEach(clearTimeout)
      intervalsRef.current.forEach(clearInterval)
    }
  }, [])

  return (
    <section className="relative min-h-screen pb-12 overflow-hidden">
      <div className="absolute inset-0 -top-20 -left-20 -right-20 overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-10 sm:grid-cols-15 lg:grid-cols-20 gap-3 sm:gap-4 lg:gap-5 p-4 opacity-30">
          {[...Array(240)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-sm transition-all duration-700 ${
                activeCells.has(i)
                  ? "bg-[var(--color-accent-orange-500)] shadow-[0_0_30px_var(--color-accent-orange-500)]"
                  : "border border-[var(--color-baltic-sea-200)] bg-transparent"
              }`}
              style={{
                opacity: activeCells.has(i) ? 0.8 : 0.4,
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-2.5 sm:px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-20">
          {/* Left column - text content */}
          <div className="lg:max-w-xl lg:min-h-screen flex flex-col justify-center pt-24 lg:pt-20">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-baltic-sea-900)] leading-[1.1]">
              Governança para IA.
              <br />
              <span className="text-[var(--color-baltic-sea-900)]">Controle Total</span>
              <br />
              com Segurança.
            </h1>

            <p className="mt-6 text-lg text-[var(--color-baltic-sea-500)] max-w-md leading-relaxed">
              O Clean Predict fica entre o seu app e qualquer provedor de LLM. Detecta injeção de prompt, anonimiza dados pessoais, bloqueia vazamento de secrets e rastreia consumo de tokens em tempo real.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="/login">
                <Button
                  size="lg"
                  className="bg-[var(--color-accent-orange-500)] hover:bg-[var(--color-accent-orange-600)] text-white font-semibold px-6"
                >
                  Começar agora
                  <ArrowRight className="ml-2 h-4 w-4" weight="bold" />
                </Button>
              </a>
              <a href="/docs">
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-[var(--color-baltic-sea-600)] hover:text-[var(--color-baltic-sea-900)] hover:bg-[var(--color-baltic-sea-100)]"
                >
                  Ver documentação
                </Button>
              </a>
            </div>
          </div>

          {/* Right column - chatbot demo */}
          <div className="lg:flex-1 lg:max-w-2xl lg:min-h-screen flex flex-col items-center justify-center lg:pt-20">
            {/* Chatbot Interface */}
            <div className="w-full rounded-xl border border-[var(--color-baltic-sea-200)] bg-white overflow-hidden shadow-2xl">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--color-baltic-sea-200)] bg-white">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-[var(--color-baltic-sea-300)]" />
                  <div className="h-3 w-3 rounded-full bg-[var(--color-baltic-sea-300)]" />
                  <div className="h-3 w-3 rounded-full bg-[var(--color-baltic-sea-300)]" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-sm text-[var(--color-baltic-sea-700)] font-medium">chatbot</span>
                </div>
              </div>

              <div className="p-5 space-y-4 min-h-[400px]">
                {/* User message being typed */}
                {!showUserMessage && typedMessage && (
                  <div className="flex justify-end">
                    <div className="bg-[var(--color-baltic-sea-100)] text-[var(--color-baltic-sea-700)] px-4 py-2 rounded-2xl rounded-br-sm max-w-[80%] border border-[var(--color-baltic-sea-200)]">
                      <div className="flex items-center gap-2">
                        <FileText weight="bold" className="h-4 w-4 text-[var(--color-baltic-sea-500)]" />
                        <span className="text-sm">{typedMessage}</span>
                        <span className="inline-block w-0.5 h-4 bg-[var(--color-baltic-sea-400)] animate-pulse" />
                      </div>
                    </div>
                  </div>
                )}

                {/* User message sent */}
                {showUserMessage && (
                  <div className="flex justify-end animate-in fade-in duration-300">
                    <div className="bg-[var(--color-baltic-sea-100)] text-[var(--color-baltic-sea-700)] px-4 py-2 rounded-2xl rounded-br-sm max-w-[80%] border border-[var(--color-baltic-sea-200)]">
                      <div className="flex items-center gap-2">
                        <FileText weight="bold" className="h-4 w-4 text-[var(--color-baltic-sea-500)]" />
                        <span className="text-sm">{CHATBOT_SEQUENCE.userMessage}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bot processing steps */}
                {visibleSteps.length > 0 && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-[var(--color-baltic-sea-200)] px-4 py-3 rounded-2xl rounded-bl-sm max-w-[85%] shadow-sm">
                      <div className="space-y-2">
                        {visibleSteps.map((stepIndex) => (
                          <div
                            key={stepIndex}
                            className="flex items-center gap-2 text-[var(--color-baltic-sea-700)] animate-in fade-in slide-in-from-left-2 duration-300 text-sm font-mono"
                          >
                            {stepIndex < visibleSteps.length - 1 || showStatusPass ? (
                              <CheckCircle weight="fill" className="h-4 w-4 text-[var(--color-accent-orange-500)]" />
                            ) : (
                              <span className="inline-block h-4 w-4 border-2 border-[var(--color-accent-orange-500)] border-t-transparent rounded-full animate-spin" />
                            )}
                            <span className="text-[var(--color-baltic-sea-500)]">{CHATBOT_SEQUENCE.steps[stepIndex].text}</span>
                          </div>
                        ))}
                        {/* Status PASS */}
                        {showStatusPass && (
                          <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-2 duration-300 text-sm font-mono pt-1 border-t border-[var(--color-baltic-sea-100)] mt-2">
                            <CheckCircle weight="fill" className="h-4 w-4 text-green-500" />
                            <span className="text-green-600 font-semibold">{CHATBOT_SEQUENCE.statusPass}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Analysis results */}
                {showAnalysis && analysisOutputs.length > 0 && (
                  <div className="flex justify-start animate-in fade-in zoom-in-95 duration-500">
                    <div className="bg-white border border-[var(--color-baltic-sea-200)] px-4 py-4 rounded-2xl rounded-bl-sm max-w-[90%] shadow-sm">
                      <div className="flex items-center gap-2 text-xs text-[var(--color-baltic-sea-500)] mb-3 uppercase tracking-wider">
                        <FileText weight="bold" className="h-3 w-3" />
                        <span>Resultado da Análise</span>
                        {isProcessing && (
                          <span className="flex gap-0.5 ml-2">
                            <span
                              className="h-1 w-1 rounded-full bg-[var(--color-accent-orange-500)] animate-bounce"
                              style={{ animationDelay: "0ms" }}
                            />
                            <span
                              className="h-1 w-1 rounded-full bg-[var(--color-accent-orange-500)] animate-bounce"
                              style={{ animationDelay: "150ms" }}
                            />
                            <span
                              className="h-1 w-1 rounded-full bg-[var(--color-accent-orange-500)] animate-bounce"
                              style={{ animationDelay: "300ms" }}
                            />
                          </span>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        {analysisOutputs.map((output, i) => (
                          <div
                            key={i}
                            className={`text-sm animate-in fade-in slide-in-from-left-1 duration-200 ${
                              output.startsWith("✓")
                                ? "text-[var(--color-accent-orange-600)] font-medium"
                                : "text-[var(--color-baltic-sea-700)]"
                            }`}
                          >
                            {!output.startsWith("✓") && (
                              <span className="text-[var(--color-accent-orange-500)] mr-2">•</span>
                            )}
                            {output}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Input area */}
                <div className="pt-4 mt-auto">
                  <div className="flex items-center gap-2 bg-white border border-[var(--color-baltic-sea-200)] rounded-full px-4 py-2">
                    <input
                      type="text"
                      placeholder="Digite sua mensagem..."
                      className="flex-1 bg-transparent text-sm text-[var(--color-baltic-sea-700)] placeholder:text-[var(--color-baltic-sea-400)] outline-none"
                      disabled
                    />
                    <button className="h-8 w-8 rounded-full bg-[var(--color-accent-orange-500)] flex items-center justify-center hover:bg-[var(--color-accent-orange-600)] transition-colors">
                      <PaperPlaneTilt weight="fill" className="h-4 w-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

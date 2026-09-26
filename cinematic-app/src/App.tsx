import React, { useState, useEffect } from 'react';
import {
  Code2,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Menu,
  X,
  Sparkles,
  Layers,
  Compass,
  ArrowRight
} from 'lucide-react';
import { TUTORIAL_STAGES } from './data/tutorialData';
import { ThreeHeroCanvas } from './components/ThreeHeroCanvas';
import { CodeViewer } from './components/CodeViewer';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { GlossaryModal } from './components/GlossaryModal';

export const App: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>(() => {
    return JSON.parse(localStorage.getItem('poo_completed_steps') || '[]');
  });
  const [view, setView] = useState<'home' | 'step'>('home');
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeLine, setActiveLine] = useState<number | null>(null);

  const stage = TUTORIAL_STAGES[currentStepIndex];
  const progressPercent = Math.round((completedSteps.length / TUTORIAL_STAGES.length) * 100);

  useEffect(() => {
    localStorage.setItem('poo_completed_steps', JSON.stringify(completedSteps));
  }, [completedSteps]);

  const toggleStepCompletion = (id: number) => {
    setCompletedSteps((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    if (currentStepIndex < TUTORIAL_STAGES.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setView('home');
    }
  };

  const startTutorial = (index = 0) => {
    setCurrentStepIndex(index);
    setView('step');
    setIsSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col relative selection:bg-blue-600 selection:text-white">
      {/* Background Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none z-0 glow-mesh opacity-80" />

      {/* Header */}
      <header className="sticky top-0 z-40 h-16 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/80 px-4 md:px-8 flex items-center justify-between">
        <div
          onClick={() => setView('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Layers size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm md:text-base text-white tracking-tight">
                POO Master
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Java 21
              </span>
            </div>
            <p className="text-[11px] text-gray-400 hidden sm:block">
              Guia Cinematográfico Passo a Passo
            </p>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setView('home')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              view === 'home'
                ? 'bg-gray-800 text-white border border-gray-700'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Início
          </button>

          <button
            onClick={() => startTutorial(currentStepIndex)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              view === 'step'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Trilha de Código
          </button>

          <button
            onClick={() => setIsGlossaryOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-900 border border-gray-800 hover:border-gray-700 text-gray-300 hover:text-white transition-all"
          >
            <BookOpen size={14} className="text-blue-400" />
            <span className="hidden sm:inline">Glossário</span>
          </button>

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-300 hover:text-white lg:hidden"
          >
            {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Global Progress Line */}
      <div className="w-full h-1 bg-gray-900 sticky top-16 z-30 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main Layout */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto relative z-10">
        {/* Sidebar (Desktop & Mobile Drawer) */}
        <aside
          className={`fixed lg:sticky top-[68px] z-30 h-[calc(100vh-68px)] w-72 bg-gray-950/95 lg:bg-transparent backdrop-blur-2xl lg:backdrop-blur-none border-r border-gray-800/80 p-5 flex flex-col shrink-0 transition-transform duration-300 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Progress Card */}
          <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800/80 mb-5">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-300 mb-2">
              <span className="flex items-center gap-1.5">
                <Compass size={14} className="text-blue-400" />
                Progresso Geral
              </span>
              <span className="text-blue-400">{progressPercent}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-gray-800 overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 px-1">
            Etapas do Projeto
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto space-y-1.5 pr-1">
            {TUTORIAL_STAGES.map((s, index) => {
              const isCurrent = view === 'step' && currentStepIndex === index;
              const isDone = completedSteps.includes(s.id);
              return (
                <button
                  key={s.id}
                  onClick={() => startTutorial(index)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all text-left ${
                    isCurrent
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 font-semibold shadow-sm'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-gray-900/60 border border-transparent'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold border transition-colors ${
                      isDone
                        ? 'bg-emerald-500 text-white border-emerald-500'
                        : 'border-gray-700 text-gray-400'
                    }`}
                  >
                    {isDone ? '✓' : index + 1}
                  </div>
                  <span className="truncate flex-1">
                    {s.file.split('/').pop()}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-gray-800/80 text-[11px] text-gray-500">
            Projeto: <strong className="text-gray-400">Cassino Trufilho</strong>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 min-w-0 p-4 md:p-8 lg:p-10">
          {view === 'home' ? (
            /* HOME CINEMATOGRÁFICA */
            <div className="space-y-12 animate-in fade-in duration-300">
              {/* Hero 3D Section */}
              <div className="relative rounded-3xl overflow-hidden border border-gray-800 bg-gradient-to-b from-gray-900/80 to-gray-950/80 backdrop-blur-xl shadow-2xl grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
                <div className="lg:col-span-7 p-6 sm:p-10 md:p-12 flex flex-col justify-center space-y-6 z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold w-fit">
                    <Sparkles size={14} />
                    <span>Experiência Educativa Interativa</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                    Desvendando POO com um Cassino Real
                  </h1>

                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl">
                    Aprenda Programação Orientada a Objetos com analogias claras do dia a dia. Entenda o que cada classe, método e atributo faz, do modelo do apostador até o jogo completo de Blackjack.
                  </p>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      onClick={() => startTutorial(0)}
                      className="flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-600/30 transition-all hover:translate-y-[-2px]"
                    >
                      <span>Começar o Passo a Passo</span>
                      <ArrowRight size={16} />
                    </button>

                    <button
                      onClick={() => setIsGlossaryOpen(true)}
                      className="flex items-center gap-2 px-5 py-3.5 bg-gray-900/90 hover:bg-gray-800 text-gray-200 border border-gray-700/80 rounded-xl font-semibold text-sm transition-all"
                    >
                      <BookOpen size={16} className="text-blue-400" />
                      <span>Consultar Glossário</span>
                    </button>
                  </div>
                </div>

                {/* 3D Canvas Column */}
                <div className="lg:col-span-5 relative flex items-center justify-center min-h-[320px] bg-gradient-to-t from-gray-950 via-transparent to-transparent">
                  <ThreeHeroCanvas />
                </div>
              </div>

              {/* Pillars Grid */}
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-2.5">
                  <Code2 size={24} className="text-blue-400" />
                  <span>Conceitos que Você Vai Dominar na Prática:</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="card-cinematic p-6 rounded-2xl space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                      01
                    </div>
                    <h3 className="font-bold text-base text-white">Classes & Objetos</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Aprenda a diferença entre o molde (Classe) e a peça real na memória (Objeto) criando o apostador e as cartas.
                    </p>
                  </div>

                  <div className="card-cinematic p-6 rounded-2xl space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                      02
                    </div>
                    <h3 className="font-bold text-base text-white">Encapsulamento</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Proteja o saldo em dinheiro com cofres digitais, permitindo consulta e alteração apenas por métodos autorizados.
                    </p>
                  </div>

                  <div className="card-cinematic p-6 rounded-2xl space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                      03
                    </div>
                    <h3 className="font-bold text-base text-white">Fluxo & Regras</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Conecte módulos independentes: da validação de maioridade na portaria até o caixa de depósitos e saques.
                    </p>
                  </div>

                  <div className="card-cinematic p-6 rounded-2xl space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                      04
                    </div>
                    <h3 className="font-bold text-base text-white">Composição</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Descubra como construir sistemas complexos juntando peças menores, como a mesa de 21 que orquestra cartas e apostas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* STEP EXPLORER */
            <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl">
              {/* Header Info */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-bold text-blue-400 bg-blue-950/60 border border-blue-800/80 px-3 py-1 rounded-full">
                    {stage.orderBadge}
                  </span>
                  <span className="font-mono text-xs text-gray-400 bg-gray-900 border border-gray-800 px-3 py-1 rounded-lg">
                    {stage.file}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                  {stage.title}
                </h1>

                {/* POO Concept Tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {stage.pooConcepts.map((c, i) => (
                    <div
                      key={i}
                      title={c.desc}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-900 border border-gray-800 text-gray-300 hover:border-blue-500/50 hover:text-blue-300 transition-all cursor-default"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>{c.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* The "Why it exists" Card */}
              <div className="p-5 rounded-2xl bg-gray-900/50 border-l-4 border-l-blue-500 border border-gray-800/80 space-y-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <HelpCircle size={16} className="text-blue-400" />
                  <span>Por que essa estrutura existe? (O problema que ela resolve)</span>
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {stage.whyItExists}
                </p>
                <p className="text-xs text-gray-400 pt-1">
                  <strong>Momento da Criação:</strong> {stage.orderReason}
                </p>
              </div>

              {/* Interactive Code Viewer */}
              <CodeViewer
                code={stage.code}
                fileName={stage.file.split('/').pop() || ''}
                analogy={stage.analogy}
                activeLine={activeLine}
                onLineClick={(line) => setActiveLine(line)}
              />

              {/* Interactive Terminal Simulator */}
              <InteractiveTerminal stageId={stage.id} />

              {/* Line by line breakdown */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Code2 size={20} className="text-blue-400" />
                  <span>Explicação Linha a Linha</span>
                </h3>

                <div className="space-y-3">
                  {stage.lineExplanations.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-gray-900/40 border border-gray-800/80 hover:border-gray-700 transition-all space-y-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-blue-400 bg-blue-950/60 border border-blue-900/60 px-2.5 py-0.5 rounded">
                          {item.lines}
                        </span>
                      </div>
                      <div className="font-mono text-xs text-gray-200 bg-gray-950 p-2.5 rounded-lg border border-gray-800 overflow-x-auto">
                        {item.codeSnippet}
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary Takeaway */}
              <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-2">
                <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  <span>O que aprendemos nesta etapa:</span>
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {stage.summary}
                </p>
              </div>

              {/* Navigation Bar */}
              <div className="pt-6 border-t border-gray-800 flex items-center justify-between gap-4">
                <button
                  onClick={handlePrev}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 text-gray-300 hover:text-white font-semibold text-xs transition-all"
                >
                  <ChevronLeft size={16} />
                  <span>{currentStepIndex === 0 ? 'Início' : 'Etapa Anterior'}</span>
                </button>

                <button
                  onClick={() => toggleStepCompletion(stage.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all border ${
                    completedSteps.includes(stage.id)
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/20'
                      : 'bg-gray-900 text-gray-300 border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <CheckCircle2 size={16} />
                  <span>
                    {completedSteps.includes(stage.id) ? 'Concluída' : 'Marcar como Concluída'}
                  </span>
                </button>

                {currentStepIndex < TUTORIAL_STAGES.length - 1 ? (
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/30 transition-all"
                  >
                    <span>Próxima Etapa</span>
                    <ChevronRight size={16} />
                  </button>
                ) : (
                  <button
                    onClick={() => setIsGlossaryOpen(true)}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/30 transition-all"
                  >
                    <span>Ver Glossário</span>
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Glossary Modal */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />
    </div>
  );
};

export default App;

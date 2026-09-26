import React, { useState } from 'react';
import { Terminal, Play, RotateCcw } from 'lucide-react';

interface InteractiveTerminalProps {
  stageId: number;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({ stageId }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const stageSimulations: Record<number, string[]> = {
    1: [
      '> javac src/entrar/Usuario.java',
      '> Molde do Usuário compilado com sucesso na memória.',
      '> Usuario vitor = new Usuario("Vitor", "14141414", 2000-01-01, "9999", "123");',
      '> Saldo inicial verificado via getSaldo(): R$ 0',
      '> Objeto pronto para uso!'
    ],
    2: [
      '> Executando: Util.esperar(500);',
      '> Thread principal suspensa por 500ms...',
      '> Retomando execução com segurança!',
      '> Nenhuma exceção interrompeu o fluxo.'
    ],
    3: [
      '> java Main',
      '> BEM VINDO AO CASSINO TRUFILHO',
      '> Estamos te direcionando para o sistema de cadastro...',
      '> Instanciando objeto: new Cadastro();',
      '> Controle transferido com sucesso.'
    ],
    4: [
      '> Iniciando fluxo de cadastro interativo...',
      '> Insira seus dados para o cadastro:',
      '> Nome: Vitor | Idade calculada: 18 anos',
      '> Validação: verificaIdade() -> TRUE (Acesso autorizado)',
      '> Vitor, VOCÊ FOI CADASTRADO COM SUCESSO!',
      '> Redirecionando para SaldoMenu...'
    ],
    5: [
      '> ===== MENU =====',
      '> Saldo do Jogador: R$ 0',
      '> 1 - SACAR | 2 - DEPOSITAR | 3 - RESGATAR | 4 - JOGOS | 0 - SAIR',
      '> Opção escolhida: 2 (Depósito)',
      '> Aguardando entrada de valor...'
    ],
    6: [
      '> ======= DEPOSITO =======',
      '> Saldo anterior: R$ 0',
      '> Digite o valor de depósito: 500',
      '> Depósito confirmado! Saldo atualizado: R$ 500',
      '> Sincronizado com usuario.setSaldo(500);'
    ],
    7: [
      '> Criando carta física no baralho: new Carta("P", "AS", 11);',
      '> Invocando carta.mostrarCarta():',
      '┌─────────────┐',
      '│ AS          │',
      '│             │',
      '│      P      │',
      '│             │',
      '│          AS │',
      '└─────────────┘',
      '> Carta desenhada com sucesso no terminal!'
    ],
    8: [
      '> ======= CAÇA-NÍQUEL ======',
      '> Saldo disponível: R$ 500',
      '> Aposta realizada: R$ 50',
      '> Girando roletas: [ 3  3  3 ]',
      '> VOCÊ GANHOU! Prêmio multiplicado por 10x (+R$ 500)',
      '> Saldo final atualizado: R$ 950'
    ],
    9: [
      '> ======= BLACKJACK 21 ======',
      '> Entregando cartas...',
      '> Dealer: [ AS ] (Vale: 11)',
      '> Jogador: [ 10 ] [ AS ] (Vale: 21 - BLACKJACK!)',
      '> Vitória instantânea do apostador!',
      '> Saldo creditado com sucesso.'
    ]
  };

  const runSimulation = () => {
    setIsRunning(true);
    setLogs([]);
    const simulationLines = stageSimulations[stageId] || ['> Execução padrão finalizada.'];

    simulationLines.forEach((line, index) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, line]);
        if (index === simulationLines.length - 1) {
          setIsRunning(false);
        }
      }, (index + 1) * 350);
    });
  };

  return (
    <div className="rounded-xl overflow-hidden border border-gray-800 bg-gray-950 shadow-2xl font-mono text-xs">
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-900 border-b border-gray-800">
        <div className="flex items-center gap-2 text-gray-400">
          <Terminal size={14} className="text-blue-400" />
          <span className="font-semibold text-gray-300">Simulador de Terminal</span>
        </div>
        <button
          onClick={runSimulation}
          disabled={isRunning}
          className="flex items-center gap-1.5 px-3 py-1 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded text-xs font-semibold transition-all shadow-md shadow-blue-600/20"
        >
          {isRunning ? <RotateCcw size={12} className="animate-spin" /> : <Play size={12} />}
          <span>{isRunning ? 'Executando...' : 'Simular Execução'}</span>
        </button>
      </div>

      <div className="p-4 min-h-[140px] max-h-[220px] overflow-y-auto space-y-1.5 text-gray-300">
        {logs.length === 0 ? (
          <div className="text-gray-500 italic py-6 text-center">
            Clique em "Simular Execução" para ver o resultado prático deste código em ação.
          </div>
        ) : (
          logs.map((log, index) => (
            <div
              key={index}
              className={`leading-relaxed ${
                log.startsWith('┌') || log.startsWith('│') || log.startsWith('└')
                  ? 'text-amber-400 font-bold'
                  : log.includes('GANHOU') || log.includes('SUCESSO') || log.includes('TRUE')
                  ? 'text-emerald-400'
                  : 'text-gray-300'
              }`}
            >
              {log}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

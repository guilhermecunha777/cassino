import React, { useState } from 'react';
import { Copy, Check, FileCode, Lightbulb } from 'lucide-react';

interface CodeViewerProps {
  code: string;
  fileName: string;
  analogy: string;
  onLineClick?: (lineNumber: number) => void;
  activeLine?: number | null;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({
  code,
  fileName,
  analogy,
  onLineClick,
  activeLine
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'code' | 'analogy'>('code');

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Syntax highlighting helper
  const renderHighlightedLine = (line: string) => {
    let escaped = line
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    escaped = escaped.replace(/(\/\/.*$)/gm, '<span class="c-comment">$1</span>');
    escaped = escaped.replace(/(".*?")/g, '<span class="c-string">$1</span>');

    const keywords = [
      'package', 'import', 'public', 'private', 'protected', 'class', 
      'void', 'static', 'final', 'return', 'if', 'else', 'switch', 
      'case', 'break', 'default', 'do', 'while', 'for', 'new', 'try', 'catch', 'this'
    ];
    const kwRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
    escaped = escaped.replace(kwRegex, '<span class="c-keyword">$1</span>');

    const types = [
      'int', 'boolean', 'String', 'LocalDate', 'Period', 'DateTimeFormatter', 
      'Scanner', 'Random', 'ArrayList', 'Usuario', 'Cadastro', 'Login', 
      'SaldoMenu', 'Saque', 'Deposito', 'ResgatePresente', 'JogosMenu', 
      'CacaNiquel', 'Blackjack', 'Carta', 'Util', 'InterruptedException'
    ];
    const typeRegex = new RegExp(`\\b(${types.join('|')})\\b`, 'g');
    escaped = escaped.replace(typeRegex, '<span class="c-type">$1</span>');

    escaped = escaped.replace(/\b(\d+)\b/g, '<span class="c-number">$1</span>');

    return escaped;
  };

  const lines = code.trim().split('\n');

  return (
    <div className="rounded-xl overflow-hidden border border-gray-800 bg-gray-950/80 shadow-2xl backdrop-blur-md transition-all">
      {/* Tab Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-900/90 border-b border-gray-800/80">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'code'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/60'
            }`}
          >
            <FileCode size={14} />
            <span>{fileName}</span>
          </button>

          <button
            onClick={() => setActiveTab('analogy')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'analogy'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/20'
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/60'
            }`}
          >
            <Lightbulb size={14} />
            <span>Analogia do Dia a Dia</span>
          </button>
        </div>

        {activeTab === 'code' && (
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              copied
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-500/20'
                : 'bg-gray-800/80 text-gray-300 border-gray-700 hover:bg-gray-700/80 hover:text-white'
            }`}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? 'Copiado!' : 'Copiar'}</span>
          </button>
        )}
      </div>

      {/* Content */}
      {activeTab === 'code' ? (
        <div className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-gray-200">
          <table className="w-full border-collapse">
            <tbody>
              {lines.map((lineText, idx) => {
                const lineNum = idx + 1;
                const isSelected = activeLine === lineNum;
                return (
                  <tr
                    key={idx}
                    onClick={() => onLineClick && onLineClick(lineNum)}
                    className={`transition-colors cursor-pointer rounded ${
                      isSelected
                        ? 'bg-blue-900/40 border-l-2 border-blue-400'
                        : 'hover:bg-gray-900/60'
                    }`}
                  >
                    <td className="w-10 pr-4 text-right select-none text-gray-600 text-xs py-0.5">
                      {lineNum}
                    </td>
                    <td
                      className="py-0.5 whitespace-pre font-mono"
                      dangerouslySetInnerHTML={{ __html: renderHighlightedLine(lineText) }}
                    />
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-6 bg-gradient-to-br from-amber-950/20 to-gray-900/40 border-t border-amber-900/30">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
              <Lightbulb size={24} />
            </div>
            <div>
              <h4 className="text-base font-bold text-amber-300 mb-2">
                Como imaginar esta estrutura na vida real:
              </h4>
              <p className="text-gray-300 leading-relaxed text-sm">
                {analogy}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

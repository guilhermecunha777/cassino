import React, { useState } from 'react';
import { Search, X, BookOpen, Tag } from 'lucide-react';
import { GLOSSARY_ITEMS } from '../data/tutorialData';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!isOpen) return null;

  const categories = ['all', 'Conceito Básico', 'Segurança de Dados', 'Arquitetura', 'Sintaxe Java'];

  const filteredItems = GLOSSARY_ITEMS.filter((item) => {
    const matchesSearch =
      item.term.toLowerCase().includes(search.toLowerCase()) ||
      item.definition.toLowerCase().includes(search.toLowerCase()) ||
      item.example.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[85vh] flex flex-col bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-800 bg-gray-950/60">
          <div className="flex items-center gap-2.5 text-blue-400">
            <BookOpen size={20} />
            <h2 className="text-lg font-bold text-white">Glossário Interativo de POO</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search & Categories Filter */}
        <div className="p-4 border-b border-gray-800/80 bg-gray-900/40 space-y-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Buscar termo ou conceito (ex: Classe, Construtor, Encapsulamento)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-950 border border-gray-800 rounded-xl text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                    : 'bg-gray-800/80 text-gray-400 hover:bg-gray-700 hover:text-gray-200'
                }`}
              >
                {cat === 'all' ? 'Todos os Termos' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-gray-500 text-sm">
              Nenhum termo correspondente encontrado.
            </div>
          ) : (
            filteredItems.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-gray-950/60 border border-gray-800/80 hover:border-gray-700 transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-blue-400">{item.term}</h3>
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-gray-400 bg-gray-800/80 px-2.5 py-0.5 rounded-full border border-gray-700">
                    <Tag size={10} />
                    {item.category}
                  </span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">{item.definition}</p>
                <div className="p-2.5 rounded-lg bg-gray-900 border border-gray-800/70 text-xs font-mono text-gray-400">
                  <strong className="text-gray-300">Exemplo Prático:</strong> {item.example}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import {
  Building2,
  GraduationCap,
  FileCheck2,
  Banknote,
  PhoneCall,
  Bus,
  Languages,
} from 'lucide-react';
import { QUICK_PROMPTS, QuickPrompt } from '../data/collegeData';

interface QuickQuestionsProps {
  onSelectPrompt: (promptText: string) => void;
  isLoading: boolean;
}

export const QuickQuestions: React.FC<QuickQuestionsProps> = ({
  onSelectPrompt,
  isLoading,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2':
        return <Building2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />;
      case 'GraduationCap':
        return <GraduationCap className="w-3.5 h-3.5 text-amber-400 shrink-0" />;
      case 'FileText':
        return <FileCheck2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
      case 'Banknote':
        return <Banknote className="w-3.5 h-3.5 text-yellow-400 shrink-0" />;
      case 'PhoneCall':
        return <PhoneCall className="w-3.5 h-3.5 text-purple-400 shrink-0" />;
      case 'Bus':
        return <Bus className="w-3.5 h-3.5 text-cyan-400 shrink-0" />;
      case 'Languages':
        return <Languages className="w-3.5 h-3.5 text-rose-400 shrink-0" />;
      default:
        return <GraduationCap className="w-3.5 h-3.5 text-amber-400 shrink-0" />;
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <span>⚡ Quick Inquiries / உடனடி கேள்விகள்</span>
        </span>
        <span className="text-[11px] text-slate-500 hidden sm:inline">
          Tap any button to query KINGS AI
        </span>
      </div>

      {/* Horizontal scrolling pill row on mobile, clean flex wrap on desktop */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-700">
        {QUICK_PROMPTS.map((item: QuickPrompt) => (
          <button
            key={item.id}
            onClick={() => onSelectPrompt(item.prompt)}
            disabled={isLoading}
            className={`group shrink-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium border transition-all duration-200 active:scale-95 shadow-sm
              ${
                item.category === 'tamil'
                  ? 'bg-rose-950/30 hover:bg-rose-900/40 text-rose-200 border-rose-800/60 hover:border-rose-500'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border-slate-700 hover:border-amber-500/50 hover:text-white'
              }
              ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-amber-500/10'}
            `}
          >
            {getIcon(item.iconName)}
            <div className="flex flex-col text-left">
              <span className="leading-tight font-semibold">{item.label}</span>
              {item.labelTa && (
                <span className="text-[10px] text-slate-400 group-hover:text-slate-300 font-normal">
                  {item.labelTa}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

import React from 'react';
import { CollegeLogo } from './CollegeLogo';
import { Phone, BookOpen, ExternalLink, Sparkles } from 'lucide-react';
import { COLLEGE_DETAILS } from '../data/collegeData';

interface HeaderProps {
  onOpenDirectory: () => void;
  onSelectPrompt: (promptText: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenDirectory }) => {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md shadow-lg shadow-black/20">
      {/* Top micro notification bar */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-amber-950/80 px-4 py-1 text-center text-[11px] text-slate-300 border-b border-slate-800/60 hidden sm:flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-semibold text-amber-300">KINGS AI Portal</span>
          <span className="text-slate-500">|</span>
          <span>Anna University Affiliated • NAAC Accredited • AICTE Approved</span>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <span>Tamil & English Chat Supported</span>
          <span className="text-slate-600">•</span>
          <span className="text-amber-300/90 font-mono font-medium">TNEA Code: {COLLEGE_DETAILS.tneaCode}</span>
        </div>
      </div>

      {/* Main Header navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Left: Logo & Title */}
        <CollegeLogo size="md" />

        {/* Right Action buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Directory Modal Button */}
          <button
            onClick={onOpenDirectory}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition shadow-sm hover:text-white"
            title="Browse all departments, admissions guide, and campus details"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>College Directory</span>
          </button>

          {/* Direct Admission Helpline Button */}
          <a
            href={`tel:${COLLEGE_DETAILS.contacts.rawPhone}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md shadow-amber-950/30 transition transform active:scale-95"
            title="Call Admission Office directly"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Admissions:</span>
            <span className="font-mono">{COLLEGE_DETAILS.contacts.admissionPhone}</span>
          </a>

          {/* Official Website link */}
          <a
            href={COLLEGE_DETAILS.contacts.website}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition"
            title="Visit official website (kingsengg.edu.in)"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* AI Assistant Banner bar */}
      <div className="bg-slate-950/60 border-t border-slate-800/80 px-4 py-1.5 text-xs flex items-center justify-between overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1 text-amber-400 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>KINGS AI Chatbot</span>
          </div>
          <span className="text-slate-600">•</span>
          <span className="text-slate-300 hidden md:inline">
            Official Intelligent Assistant for Punalkulam Campus
          </span>
          <span className="text-slate-400 md:hidden">
            Instant Answers 24/7
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0 text-[11px] text-slate-400">
          <span className="px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700/60">
            English
          </span>
          <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
            தமிழ் (Tamil)
          </span>
          <span className="px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700/60 hidden sm:inline">
            Tanglish
          </span>
        </div>
      </div>
    </header>
  );
};

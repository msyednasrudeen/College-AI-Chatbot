import React, { useState } from 'react';
import { Copy, Check, Volume2, VolumeX, Bot, User, Sparkles } from 'lucide-react';

export interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  suggestedFollowUps?: string[];
}

interface ChatMessageProps {
  message: Message;
  onSelectPrompt?: (promptText: string) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onSelectPrompt }) => {
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const isBot = message.sender === 'bot';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    // Strip basic markdown syntax for speech
    const cleanText = message.text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/#{1,6}\s?/g, '')
      .replace(/- /g, '')
      .replace(/\[(.*?)\]\(.*?\)/g, '$1');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    // Check if text has Tamil characters
    const hasTamil = /[\u0B80-\u0BFF]/.test(cleanText);
    utterance.lang = hasTamil ? 'ta-IN' : 'en-IN';
    utterance.rate = 1.0;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  // Safe formatting helper for message text
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split('\n');

    return lines.map((line, lineIdx) => {
      const trimmed = line.trim();

      // Heading 3 or 4
      if (trimmed.startsWith('### ')) {
        return (
          <h4 key={lineIdx} className="text-sm font-bold text-amber-300 mt-2.5 mb-1">
            {trimmed.replace('### ', '')}
          </h4>
        );
      }
      if (trimmed.startsWith('## ')) {
        return (
          <h3 key={lineIdx} className="text-base font-bold text-amber-200 mt-3 mb-1.5">
            {trimmed.replace('## ', '')}
          </h3>
        );
      }

      // Bullet lists
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const content = trimmed.substring(2);
        return (
          <li key={lineIdx} className="ml-4 list-disc text-slate-200 my-0.5 leading-relaxed text-xs sm:text-sm">
            {formatInline(content)}
          </li>
        );
      }

      // Numbered lists
      const numberedMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
      if (numberedMatch) {
        return (
          <div key={lineIdx} className="flex gap-2 ml-1 my-1 text-xs sm:text-sm text-slate-200">
            <span className="font-semibold text-amber-400 font-mono">{numberedMatch[1]}.</span>
            <span className="leading-relaxed">{formatInline(numberedMatch[2])}</span>
          </div>
        );
      }

      // Empty line / spacer
      if (!trimmed) {
        return <div key={lineIdx} className="h-2" />;
      }

      // Standard paragraph line
      return (
        <p key={lineIdx} className="text-xs sm:text-sm text-slate-100 my-1 leading-relaxed">
          {formatInline(line)}
        </p>
      );
    });
  };

  // Format bold, italics, phone numbers, and URLs
  const formatInline = (text: string): React.ReactNode => {
    // Split by markdown bold **text**
    const parts = text.split(/(\*\*.*?\*\*)/g);

    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const boldContent = part.slice(2, -2);
        return (
          <strong key={index} className="font-semibold text-amber-300">
            {boldContent}
          </strong>
        );
      }

      // Parse inline links or phones if present
      // Match phone numbers like +91-6380989024 or 04362-282474
      const phoneRegex = /(\+91[- ]?\d{10}|\b\d{5}[- ]?\d{6}\b|\b04362[- ]?\d{6}\b)/g;
      if (phoneRegex.test(part)) {
        const subParts = part.split(phoneRegex);
        return subParts.map((sub, sIdx) => {
          if (phoneRegex.test(sub)) {
            const rawPhone = sub.replace(/[- ]/g, '');
            return (
              <a
                key={sIdx}
                href={`tel:${rawPhone}`}
                className="text-amber-400 hover:text-amber-300 font-mono underline decoration-amber-500/50 hover:decoration-amber-300"
              >
                {sub}
              </a>
            );
          }
          return sub;
        });
      }

      return part;
    });
  };

  return (
    <div className={`flex w-full gap-3 ${isBot ? 'justify-start' : 'justify-end'} my-3`}>
      {/* Bot Avatar */}
      {isBot && (
        <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 via-amber-600 to-blue-900 flex items-center justify-center shadow-md ring-2 ring-amber-500/30">
          <Bot className="w-4 h-4 text-slate-950 font-bold" />
        </div>
      )}

      {/* Bubble Container */}
      <div
        className={`max-w-[88%] sm:max-w-[78%] rounded-2xl px-4 py-3 shadow-md transition-all ${
          isBot
            ? 'bg-slate-800/90 border border-slate-700/80 text-slate-100 rounded-tl-sm'
            : 'bg-gradient-to-r from-blue-700 to-indigo-700 text-white border border-blue-600/50 rounded-tr-sm'
        }`}
      >
        {/* Header inside Bot Message */}
        {isBot && (
          <div className="flex items-center justify-between border-b border-slate-700/60 pb-1.5 mb-2 text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <Sparkles className="w-3 h-3" />
              <span>KINGS AI Assistant</span>
              <span className="text-slate-600">•</span>
              <span className="text-[10px] text-slate-400 font-normal">Punalkulam Campus</span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleSpeak}
                className="p-1 hover:text-white rounded hover:bg-slate-700/60 transition"
                title={isSpeaking ? 'Stop speaking' : 'Read aloud'}
              >
                {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={handleCopy}
                className="p-1 hover:text-white rounded hover:bg-slate-700/60 transition"
                title="Copy response"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        )}

        {/* Message Content */}
        <div className="space-y-0.5 break-words">
          {renderFormattedText(message.text)}
        </div>

        {/* Timestamp */}
        <div
          className={`mt-1.5 text-[10px] flex items-center justify-end ${
            isBot ? 'text-slate-500' : 'text-blue-200/80'
          }`}
        >
          <span>{message.timestamp}</span>
        </div>

        {/* Suggested follow-up prompt chips if provided */}
        {isBot && message.suggestedFollowUps && message.suggestedFollowUps.length > 0 && onSelectPrompt && (
          <div className="mt-3 pt-2 border-t border-slate-700/50">
            <div className="text-[10px] font-medium text-slate-400 mb-1.5">Suggested Next Questions:</div>
            <div className="flex flex-wrap gap-1.5">
              {message.suggestedFollowUps.map((promptText, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectPrompt(promptText)}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-700 text-amber-300/90 hover:text-amber-200 border border-slate-700/80 hover:border-amber-500/50 transition text-left"
                >
                  {promptText}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* User Avatar */}
      {!isBot && (
        <div className="shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shadow-md ring-2 ring-blue-500/30">
          <User className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  );
};

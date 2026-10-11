import React, { useState, useRef, useEffect } from 'react';
import { Send, Trash2, ArrowDown, Mic, MicOff, Sparkles, AlertCircle } from 'lucide-react';
import { ChatMessage, Message } from './ChatMessage';
import { QuickQuestions } from './QuickQuestions';
import { COLLEGE_DETAILS } from '../data/collegeData';

interface ChatInterfaceProps {
  onOpenDirectory: () => void;
  externalPrompt?: string | null;
  onClearExternalPrompt?: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  onOpenDirectory,
  externalPrompt,
  onClearExternalPrompt,
}) => {
  const initialBotMessage: Message = {
    id: 'msg-welcome',
    sender: 'bot',
    text: `Vanakkam & Welcome to **Kings College of Engineering (Autonomous)**, Punalkulam, Pudukkottai, Tamil Nadu!\n\nI am **KINGS AI**, your campus virtual guide. Ask me anything about our college in **English, தமிழ் (Tamil), or Tanglish**:\n\n- 🏛️ **Departments & Facilities:** B.Tech AI & DS, B.E. CSE, IT, ECE, EEE, Mechanical, Civil & S&H\n- 🎓 **Courses & Degrees:** UG (B.E./B.Tech) and PG (M.E./MBA)\n- 📝 **Admissions & TNEA Code:** Single-window counselling (Code: **3806**) & Management Quota\n- 💰 **Fees & Govt Scholarships:** 7.5% Govt school quota, First Graduate (FG), and Post-Matric waivers\n- 📞 **Helpline & Location:** Punalkulam (Thanjavur - Pudukkottai NH) • Phone: **+91-6380989024**\n\nHow can I help you today? You can select a quick button below or type your question.`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    suggestedFollowUps: [
      'What courses are offered for 2026 admissions?',
      'How do I apply under TNEA Code 3806?',
      'Is hostel and bus transport available?',
    ],
  };

  const [messages, setMessages] = useState<Message[]>([initialBotMessage]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showScrollBottom, setShowScrollBottom] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (externalPrompt) {
      handleSendMessage(externalPrompt);
      if (onClearExternalPrompt) {
        onClearExternalPrompt();
      }
    }
  }, [externalPrompt]);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const isScrolledUp = scrollHeight - scrollTop - clientHeight > 100;
    setShowScrollBottom(isScrolledUp);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || inputText).trim();
    if (!messageContent || isLoading) return;

    setErrorNotice(null);

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Build brief history for multi-turn context
      const historyPayload = messages.slice(-5).map((m) => ({
        role: m.sender === 'user' ? ('user' as const) : ('model' as const),
        text: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageContent,
          history: historyPayload,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.details || data.error || 'Server error occurred');
      }

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: data.reply || data.fallback || 'I could not generate an answer. Please contact +91-6380989024.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: unknown) {
      console.error('Chat error:', err);
      const errString = err instanceof Error ? err.message : 'Network error';
      setErrorNotice(`Could not connect to KINGS AI service: ${errString}`);

      const fallbackBotMessage: Message = {
        id: `bot-fallback-${Date.now()}`,
        sender: 'bot',
        text: `I apologize, I am temporarily unable to reach the AI server.\n\nFor official and instant queries regarding **Kings College of Engineering**:\n- 📞 **Admission Helpline:** [${COLLEGE_DETAILS.contacts.admissionPhone}](tel:${COLLEGE_DETAILS.contacts.rawPhone})\n- ✉️ **Email:** ${COLLEGE_DETAILS.contacts.email}\n- 🏛️ **Campus:** Punalkulam, Gandarvakottai Taluk, Pudukkottai District (TNEA Code: 3806)\n- 🌐 **Official Website:** [kingsengg.edu.in](${COLLEGE_DETAILS.contacts.website})`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackBotMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleClearChat = () => {
    setMessages([initialBotMessage]);
    setErrorNotice(null);
  };

  // Web Speech API Voice Dictation
  const handleToggleVoice = () => {
    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported on this browser. Try Chrome or Edge.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const recognition = new (SpeechRecognition as any)();
      recognition.lang = 'en-IN';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputText((prev) => (prev ? `${prev} ${transcript}` : transcript));
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      console.error('Speech recognition error:', e);
      setIsListening(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-112px)] max-w-5xl mx-auto w-full px-2 sm:px-4 pb-2">
      {/* College Quick Highlights Banner */}
      <div className="mb-2 mt-2 bg-gradient-to-r from-slate-900 via-blue-950/60 to-slate-900 border border-slate-800 rounded-xl p-2.5 sm:p-3 flex items-center justify-between gap-2 shadow-sm">
        <div className="flex items-center gap-2.5 text-xs text-slate-300 overflow-hidden">
          <span className="shrink-0 px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30 text-[11px]">
            Estd 2001
          </span>
          <span className="truncate">
            <strong className="text-white">Raj Educational Trust (RET)</strong> • TNEA Counselling Code:{' '}
            <span className="text-amber-400 font-mono font-bold">3806</span>
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenDirectory}
            className="text-xs text-amber-400 hover:text-amber-300 underline font-medium cursor-pointer"
          >
            All Courses & Info
          </button>
          <span className="text-slate-600">|</span>
          <button
            onClick={handleClearChat}
            className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1 transition"
            title="Reset conversation"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clear Chat</span>
          </button>
        </div>
      </div>

      {/* Quick Questions Pills */}
      <div className="mb-2 shrink-0">
        <QuickQuestions onSelectPrompt={(prompt) => handleSendMessage(prompt)} isLoading={isLoading} />
      </div>

      {/* Error alert if any */}
      {errorNotice && (
        <div className="mb-2 shrink-0 bg-rose-950/40 border border-rose-800/80 rounded-lg p-2 text-xs text-rose-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorNotice}</span>
          </div>
          <button onClick={() => setErrorNotice(null)} className="text-rose-400 hover:text-rose-200">
            Dismiss
          </button>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-1 sm:px-2 py-2 rounded-2xl bg-slate-900/40 border border-slate-800/60 shadow-inner scrollbar-thin scrollbar-thumb-slate-700 space-y-1"
      >
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg}
            onSelectPrompt={(prompt) => handleSendMessage(prompt)}
          />
        ))}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex items-center gap-3 my-3">
            <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-blue-900 flex items-center justify-center shadow-md animate-pulse">
              <Sparkles className="w-4 h-4 text-slate-950" />
            </div>
            <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl rounded-tl-sm px-4 py-2.5 text-xs text-slate-300 flex items-center gap-2 shadow-md">
              <span>KINGS AI is typing verified answer</span>
              <div className="flex gap-1 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Scroll to bottom button */}
      {showScrollBottom && (
        <button
          onClick={() => scrollToBottom('smooth')}
          className="self-center -mt-10 mb-2 z-10 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 rounded-full p-2 shadow-lg transition transform hover:scale-105"
          title="Scroll to bottom"
        >
          <ArrowDown className="w-4 h-4" />
        </button>
      )}

      {/* Input Area */}
      <div className="mt-2 shrink-0 bg-slate-900/90 border border-slate-800 rounded-2xl p-2 sm:p-2.5 shadow-xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          {/* Voice Input */}
          <button
            type="button"
            onClick={handleToggleVoice}
            className={`p-2 rounded-xl transition ${
              isListening
                ? 'bg-rose-600 text-white animate-pulse'
                : 'text-slate-400 hover:text-amber-400 hover:bg-slate-800'
            }`}
            title={isListening ? 'Stop listening' : 'Voice input (English/Tamil)'}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          {/* Text Input */}
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask anything about Kings College (English / தமிழ் / Tanglish)..."
            disabled={isLoading}
            className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className={`flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shadow-md active:scale-95 ${
              inputText.trim() && !isLoading
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 cursor-pointer shadow-amber-500/20'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
            }`}
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Language Tips bar */}
        <div className="mt-1.5 px-2 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1 flex-wrap">
            <span>Examples:</span>
            <button
              type="button"
              onClick={() => handleSendMessage('What is the eligibility for B.Tech AI & DS?')}
              className="text-slate-400 hover:text-amber-300 underline"
            >
              AI & DS Eligibility
            </button>
            <span className="text-slate-700">•</span>
            <button
              type="button"
              onClick={() => handleSendMessage('கல்லூரி கட்டணம் மற்றும் ஸ்காலர்ஷிப் விபரங்கள்')}
              className="text-slate-400 hover:text-amber-300 underline"
            >
              தமிழ் கட்டணம்
            </button>
            <span className="text-slate-700">•</span>
            <button
              type="button"
              onClick={() => handleSendMessage('Hostel food and bus timings sollunga')}
              className="text-slate-400 hover:text-amber-300 underline"
            >
              Hostel & Bus
            </button>
          </div>
          <span className="hidden md:inline font-mono text-[10px] text-slate-600">
            Press Enter to Send
          </span>
        </div>
      </div>
    </div>
  );
};

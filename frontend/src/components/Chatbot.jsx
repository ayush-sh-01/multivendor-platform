import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, RotateCcw, ShieldCheck, MapPin, Tag, ArrowUpRight, Bot } from 'lucide-react';
import { apiService } from '../services/api';

const QUICK_PROMPTS = [
  { label: '🏷️ Student Deals', query: 'How does student pricing and zero delivery fees work?' },
  { label: '📍 Campus Hand-Off', query: 'Where are the safe campus hand-off pickup locations?' },
  { label: '✨ Sell My Pieces', query: 'How do I upload and sell my vintage clothes?' },
  { label: '🛡️ Authenticity', query: 'How are luxury pieces peer-verified and condition-graded?' },
  { label: '🌱 Eco Impact', query: 'What is the sustainability and carbon impact of thrifting?' },
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "👋 **Welcome to ThriftCampus!** I'm your AI Concierge & Style Assistant.\n\nAsk me about archive collections, zero-carbon campus hand-offs, listing your wardrobe, or authenticity verification.",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleClearChat = () => {
    setMessages([
      {
        sender: 'bot',
        text: "✨ Conversation reset. How may I assist you with your collegiate fashion archive today?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleSend = async (messageText = null) => {
    const textToSend = typeof messageText === 'string' ? messageText : input;
    if (!textToSend || !textToSend.trim() || isLoading) return;

    const userMessage = textToSend.trim();
    const timeStamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => [...prev, { sender: 'user', text: userMessage, time: timeStamp }]);
    setInput('');
    setIsLoading(true);

    try {
      // Connects via unified apiService gateway (supports relative /api proxy + smart offline/cloud fallback)
      const botResponse = await apiService.askChatbot(userMessage);
      const responseTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: botResponse,
          time: responseTime
        }
      ]);
    } catch (error) {
      console.error("Chatbot communication error:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: "✨ I'm here to assist you! You can explore our verified student curators, zero-carbon pickup points, or sell your pieces anytime.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to render bold markdown and bullet lines cleanly
  const renderMessageContent = (content) => {
    const lines = content.split('\n');
    return lines.map((line, lIdx) => {
      if (!line.trim()) return <div key={lIdx} className="h-2" />;

      // Parse bold **text**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={lIdx} className="mb-1 last:mb-0 leading-relaxed text-sm">
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="text-[#FAF7F2] font-semibold">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {isOpen ? (
        <div className="bg-[#18261E]/95 backdrop-blur-2xl rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.6)] w-[90vw] sm:w-[410px] flex flex-col border border-[#BA9F7A]/40 overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-5" style={{ height: '540px' }}>
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[#203227] via-[#2C4234] to-[#18261E] px-4 py-3.5 border-b border-[#BA9F7A]/30 flex justify-between items-center relative">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#BA9F7A] to-[#8F4433] flex items-center justify-center text-[#18261E] shadow-md border border-[#F4EFE6]/40">
                  <Sparkles size={18} className="text-[#FAF7F2]" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#18261E] rounded-full animate-pulse"></span>
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h3 className="font-serif font-bold text-[#F4EFE6] text-base tracking-wide">Campus AI Concierge</h3>
                  <span className="text-[9px] bg-[#BA9F7A]/20 text-[#CDB696] px-1.5 py-0.5 rounded-full font-semibold border border-[#BA9F7A]/40">PRO</span>
                </div>
                <p className="text-[11px] text-[#F4EFE6]/70 flex items-center gap-1 font-mono">
                  <span>● Online</span>
                  <span className="text-[#BA9F7A]">• Zero-Carbon Style</span>
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={handleClearChat}
                title="Reset conversation"
                className="p-1.5 text-[#F4EFE6]/70 hover:text-[#BA9F7A] hover:bg-[#2C4234]/60 rounded-lg transition-colors"
              >
                <RotateCcw size={16} />
              </button>
              <button
                onClick={toggleChat}
                title="Close chat"
                className="p-1.5 text-[#F4EFE6]/70 hover:text-[#FAF7F2] hover:bg-[#8F4433]/40 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Quick Suggestion Chips */}
          <div className="px-3 py-2 bg-[#203227]/90 border-b border-[#BA9F7A]/20 flex gap-1.5 overflow-x-auto no-scrollbar scroll-smooth">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt.query)}
                disabled={isLoading}
                className="whitespace-nowrap px-2.5 py-1 text-[11px] bg-[#2C4234] hover:bg-[#BA9F7A] text-[#F4EFE6] hover:text-[#18261E] rounded-full border border-[#BA9F7A]/30 transition-all duration-200 flex items-center gap-1 shadow-sm shrink-0 font-medium active:scale-95 disabled:opacity-50"
              >
                {prompt.label}
              </button>
            ))}
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto bg-[#18261E]/90 flex flex-col space-y-3.5 scrollbar-thin scrollbar-thumb-[#BA9F7A]/40">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[85%] flex flex-col ${
                  msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
                }`}
              >
                <div
                  className={`p-3.5 rounded-2xl shadow-md ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-[#B56653] to-[#9E5442] text-[#FAF7F2] rounded-br-xs border border-[#F4EFE6]/20'
                      : 'bg-[#24362A] border border-[#BA9F7A]/30 text-[#F4EFE6] rounded-tl-xs'
                  }`}
                >
                  {renderMessageContent(msg.text)}
                </div>
                <span className="text-[10px] text-[#F4EFE6]/40 mt-1 px-1 font-mono">
                  {msg.time}
                </span>
              </div>
            ))}

            {/* Loading / Typing Indicator */}
            {isLoading && (
              <div className="self-start flex flex-col items-start max-w-[85%]">
                <div className="bg-[#24362A] border border-[#BA9F7A]/30 rounded-2xl rounded-tl-xs p-3.5 flex items-center space-x-2 shadow-sm">
                  <div className="w-2 h-2 bg-[#BA9F7A] rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-[#BA9F7A] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-[#BA9F7A] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <span className="text-[10px] text-[#BA9F7A]/80 mt-1 px-1">Stylist is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-[#203227] border-t border-[#BA9F7A]/30 flex items-center space-x-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about archives, hand-offs, selling..."
              className="flex-1 py-2.5 px-4 bg-[#18261E] border border-[#BA9F7A]/30 rounded-full focus:outline-none focus:border-[#BA9F7A] focus:ring-1 focus:ring-[#BA9F7A] text-[#F4EFE6] placeholder-[#F4EFE6]/40 text-sm transition-all"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-[#B56653] hover:bg-[#9E5442] text-[#FAF7F2] p-2.5 rounded-full transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center shadow-lg active:scale-95 shrink-0 border border-[#FAF7F2]/20"
              title="Send message"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      ) : (
        /* Floating Trigger Launcher Button */
        <button
          onClick={toggleChat}
          className="group relative flex items-center gap-2.5 bg-gradient-to-r from-[#203227] to-[#2C4234] hover:from-[#24362A] hover:to-[#35503F] text-[#F4EFE6] px-4 py-3 rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.5)] border border-[#BA9F7A]/50 hover:border-[#BA9F7A] transition-all duration-300 hover:scale-105 active:scale-95"
          aria-label="Open AI Concierge"
        >
          {/* Subtle Glow Ring */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#BA9F7A] to-[#B56653] rounded-full blur-xs opacity-50 group-hover:opacity-100 transition duration-300 -z-10 animate-pulse"></div>

          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#BA9F7A] to-[#8F4433] flex items-center justify-center text-[#18261E] shadow-sm">
            <Sparkles size={16} className="text-[#FAF7F2] group-hover:rotate-12 transition-transform" />
          </div>
          
          <div className="text-left flex flex-col">
            <span className="text-xs font-serif font-bold text-[#FAF7F2] tracking-wider uppercase">AI Concierge</span>
            <span className="text-[10px] text-[#BA9F7A] font-medium leading-none">Instant Campus Help</span>
          </div>

          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping ml-1"></span>
        </button>
      )}
    </div>
  );
};

export default Chatbot;


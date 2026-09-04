import React, { useState, useRef, useEffect } from 'react';
import { X, Send, RotateCcw } from 'lucide-react';
import { apiService } from '../services/api';
import { MicrophoneIcon } from './LineIcons';

const QUICK_PROMPTS = [
  { label: '🏷️ Campus Hand-Off', query: 'Where are the safe campus hand-off locations?' },
  { label: '🛡️ Authenticity Check', query: 'How are luxury pieces peer-verified and condition-graded?' },
  { label: '✨ List an Archive', query: 'How do I upload and sell my vintage clothes?' },
  { label: '👖 Raw Denim Care', query: 'What is the recommended care protocol for raw selvedge?' },
  { label: '🌱 Circular Impact', query: 'What is the carbon impact of university thrifting?' },
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "👋 **Welcome to the ThriftCampus Vault.** I'm your AI Concierge & Archival Stylist.\n\nAsk me about rare Japanese selvedge drops, condition grading, campus hand-offs, or listing your curated archive.",
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
        text: "✨ Conversation reset. How may I assist your archival wardrobe journey today?",
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
          text: "✨ I'm here to assist! You can explore our verified student curators, zero-carbon pickup zones, or list your rare pieces anytime.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessageContent = (content) => {
    const lines = content.split('\n');
    return lines.map((line, lIdx) => {
      if (!line.trim()) return <div key={lIdx} className="h-2" />;

      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={lIdx} className="mb-1 last:mb-0 leading-relaxed text-xs sm:text-sm">
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="font-bold">
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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen ? (
        /* Expanded Dark Luxury Chat Window */
        <div className="w-[360px] sm:w-[410px] h-[580px] max-h-[85vh] bg-[#161616] border border-[#D49A7A]/35 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden animate-fadeIn">
          
          {/* Header */}
          <div className="p-4 bg-[#2A0E14] border-b border-[#D49A7A]/25 flex items-center justify-between text-[#FAF7F2]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#161616] border border-[#D49A7A] flex items-center justify-center">
                <MicrophoneIcon className="w-4 h-4" color="#D49A7A" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif text-sm font-bold tracking-wide uppercase text-[#D49A7A]">
                    AI Concierge
                  </h3>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>
                <p className="text-[10px] font-sans text-[#DCDCDC]/70">Archival Stylist & Guide</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearChat}
                className="p-1.5 text-[#DCDCDC]/60 hover:text-[#D49A7A] rounded-full transition-colors"
                title="Reset Conversation"
              >
                <RotateCcw size={14} />
              </button>
              <button
                onClick={toggleChat}
                className="p-1.5 text-[#DCDCDC]/60 hover:text-[#D49A7A] rounded-full transition-colors"
                title="Minimize"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div className="p-2.5 bg-[#121212] border-b border-[#D49A7A]/15 overflow-x-auto flex gap-2 no-scrollbar">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt.query)}
                className="text-[10px] font-sans whitespace-nowrap bg-[#1F1F1F] hover:bg-[#2A0E14] border border-[#D49A7A]/25 hover:border-[#D49A7A] text-[#DCDCDC] px-3 py-1 rounded-full transition-all shrink-0 cursor-pointer"
              >
                {prompt.label}
              </button>
            ))}
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-dark-luxury-pattern">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-[#2A0E14] text-[#FAF7F2] border border-[#D49A7A]/30 rounded-br-xs'
                      : 'bg-[#F2EBE5] text-[#1F1713] border border-[#3D2E24]/20 rounded-bl-xs'
                  }`}
                >
                  {renderMessageContent(msg.text)}
                </div>
                <span className="text-[9px] text-[#A8A8A8] mt-1 px-1">
                  {msg.time} • {msg.sender === 'user' ? 'You' : 'Concierge'}
                </span>
              </div>
            ))}

            {isLoading && (
              <div className="self-start flex flex-col items-start max-w-[85%]">
                <div className="bg-[#F2EBE5] border border-[#3D2E24]/20 rounded-2xl rounded-bl-xs p-3 flex items-center space-x-2 shadow-sm">
                  <div className="w-1.5 h-1.5 bg-[#8C5F45] rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-[#8C5F45] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1.5 h-1.5 bg-[#8C5F45] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <span className="text-[9px] text-[#D49A7A] mt-1 px-1">Consulting archive archives...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-[#181818] border-t border-[#D49A7A]/20 flex items-center space-x-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about archives, Japanese selvedge..."
              className="flex-1 py-2.5 px-4 bg-[#121212] border border-[#D49A7A]/30 rounded-full focus:outline-none focus:border-[#D49A7A] text-[#DCDCDC] placeholder-[#A8A8A8] text-xs transition-all"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-[#D49A7A] hover:bg-[#E4B399] text-[#121212] p-2.5 rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center shadow-md active:scale-95 shrink-0"
              title="Send Message"
            >
              <Send size={14} />
            </button>
          </form>

        </div>
      ) : (
        /* ================= SPECIAL BUTTON: DARK BURGUNDY/BROWN PILL-SHAPED FLOATING ACTION BUTTON WITH MICROPHONE ICON ================= */
        <button
          onClick={toggleChat}
          className="group relative flex items-center gap-3 bg-[#2A0E14] hover:bg-[#38141C] text-[#FAF7F2] px-5 py-3.5 rounded-full shadow-[0_12px_35px_rgba(0,0,0,0.7)] border border-[#D49A7A]/50 hover:border-[#D49A7A] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Open AI Concierge"
        >
          {/* Subtle Rose Gold Glow Ring */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D49A7A] to-[#2A0E14] rounded-full blur-xs opacity-40 group-hover:opacity-80 transition duration-300 -z-10 animate-pulse"></div>

          {/* Small Microphone Icon */}
          <div className="w-7 h-7 rounded-full bg-[#161616] border border-[#D49A7A] flex items-center justify-center text-[#D49A7A] shadow-sm">
            <MicrophoneIcon className="w-4 h-4" color="#D49A7A" />
          </div>
          
          <div className="text-left flex flex-col pr-1">
            <span className="text-xs font-serif font-bold text-[#FAF7F2] tracking-wider uppercase">AI Concierge</span>
            <span className="text-[9px] text-[#D49A7A] font-sans tracking-wide">Archival Stylist</span>
          </div>

          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5"></span>
        </button>
      )}
    </div>
  );
};

export default Chatbot;

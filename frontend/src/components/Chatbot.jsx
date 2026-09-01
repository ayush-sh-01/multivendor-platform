import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi there! I am the platform AI assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      // Connects to our Spring Boot backend
      const response = await fetch('http://localhost:8080/api/chatbot/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [...prev, { sender: 'bot', text: data.response }]);
      } else {
        setMessages((prev) => [...prev, { sender: 'bot', text: 'Oops! I am having trouble connecting to the server.' }]);
      }
    } catch (error) {
      console.error("Error communicating with chatbot:", error);
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Sorry, the AI service is currently unavailable.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-2xl w-80 sm:w-96 flex flex-col border border-gray-200 overflow-hidden" style={{ height: '450px' }}>
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <MessageSquare size={20} />
              <h3 className="font-semibold">AI Assistant</h3>
            </div>
            <button onClick={toggleChat} className="text-white hover:text-gray-200 transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col space-y-3">
            {messages.map((msg, idx) => (
              <div key={idx} className={`max-w-[80%] rounded-lg p-3 ${msg.sender === 'user' ? 'bg-blue-600 text-white self-end rounded-br-none' : 'bg-white text-gray-800 border border-gray-200 self-start rounded-bl-none shadow-sm'}`}>
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="bg-white text-gray-800 border border-gray-200 self-start rounded-lg rounded-bl-none shadow-sm p-3 max-w-[80%] flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={sendMessage} className="p-3 bg-white border-t border-gray-200 flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 py-2 px-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors disabled:bg-gray-400 flex items-center justify-center"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={toggleChat}
          className="bg-blue-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-transform hover:scale-105 flex items-center space-x-2 animate-bounce"
        >
          <MessageSquare size={24} />
          <span className="font-semibold">AI Chat</span>
        </button>
      )}
    </div>
  );
};

export default Chatbot;

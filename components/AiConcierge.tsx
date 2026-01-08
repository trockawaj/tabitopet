// Fixed: Using default React import to ensure JSX.IntrinsicElements are properly resolved
import React from 'react';
import { getTravelAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';

const AiConcierge: React.FC = () => {
  // Fixed: Updated hooks to use standard React import
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    { role: 'model', text: 'こんにちは！南あわじ市の観光エキスパートです。ワンちゃんと一緒の旅行プランの相談や、おすすめのスポットについて何でも聞いてくださいね。' }
  ]);
  const [inputValue, setInputValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    const response = await getTravelAdvice(userText);
    
    setMessages(prev => [...prev, { 
      role: 'model', 
      text: response.text, 
      sources: response.sources 
    }]);
    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-100px)] flex flex-col p-4">
      <div className="bg-white rounded-2xl shadow-xl flex-grow flex flex-col overflow-hidden border border-slate-200">
        <div className="bg-gradient-to-r from-blue-600 to-emerald-600 p-4 text-white flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <i className="fas fa-robot text-xl"></i>
          </div>
          <div>
            <h3 className="font-bold">南あわじAIコンシェルジュ</h3>
            <p className="text-xs text-white/80">Google検索搭載・最新情報対応</p>
          </div>
        </div>

        <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-6 bg-slate-50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
              }`}>
                <div className="prose prose-sm whitespace-pre-wrap leading-relaxed">
                  {msg.text}
                </div>
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <p className="text-xs font-bold text-slate-400 mb-2">出典元:</p>
                    <div className="flex flex-wrap gap-2">
                      {msg.sources.map((src, sIdx) => (
                        <a 
                          key={sIdx} 
                          href={src.uri} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[10px] bg-slate-100 hover:bg-slate-200 text-blue-600 px-2 py-1 rounded-md flex items-center gap-1 transition-colors"
                        >
                          <i className="fas fa-external-link-alt"></i>
                          {src.title || 'ウェブサイト'}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none p-4 shadow-sm">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-slate-100 flex gap-2">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="「ペット連れでおすすめのランチは？」「渦潮のベストタイムは？」"
            className="flex-grow px-4 py-3 rounded-xl bg-slate-100 border-none focus:ring-2 focus:ring-blue-500 transition-all outline-none text-sm"
          />
          <button 
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white w-12 h-12 rounded-xl flex items-center justify-center transition-all disabled:opacity-50"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AiConcierge;
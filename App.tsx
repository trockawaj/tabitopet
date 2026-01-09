// Fixed: Using default React import to resolve JSX.IntrinsicElements issues
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SpotGrid, { mockSpots } from './components/SpotGrid';
import Footer from './components/Footer';
import SnsSection from './components/SnsSection';
import AiConcierge from './components/AiConcierge';
import { Spot } from './types';

// Category Definitions
type CategoryType = 'top' | 'dining' | 'accommodation' | 'cafe' | 'sightseeing' | 'nature' | 'sns' | 'ai';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CategoryType>('top');

  // Smooth scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab]);

  // Filter Logic
  const getFilteredSpots = (category: CategoryType): Spot[] => {
    switch (category) {
      case 'dining':
        return mockSpots.filter(s => s.category === 'restaurant');
      case 'accommodation':
        return mockSpots.filter(s => s.category === 'accommodation');
      case 'cafe':
        return mockSpots.filter(s => s.category === 'restaurant' && (
          s.description.includes('カフェ') ||
          s.description.includes('コーヒー') ||
          s.description.includes('スイーツ') ||
          s.name.toLowerCase().includes('cafe') ||
          s.name.includes('カフェ')
        ));
      case 'nature':
        return mockSpots.filter(s => s.category === 'sightseeing' && (
          s.description.includes('公園') ||
          s.description.includes('海') ||
          s.description.includes('山') ||
          s.description.includes('自然') ||
          s.description.includes('渦潮')
        ));
      case 'sightseeing':
        // Show all sightseeing spots (including nature, or exclude if desired) - showing all for now
        return mockSpots.filter(s => s.category === 'sightseeing');
      default:
        return mockSpots;
    }
  };

  const getCategoryTitle = (cat: CategoryType) => {
    switch (cat) {
      case 'dining': return '淡路島グルメ';
      case 'accommodation': return '宿泊施設';
      case 'cafe': return '島カフェ';
      case 'nature': return '自然・景勝地';
      case 'sightseeing': return '観光スポット';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Header
        activeTab={activeTab === 'sns' ? 'sns' : activeTab === 'ai' ? 'ai' : 'home'}
        setActiveTab={(tab) => {
          if (tab === 'home') setActiveTab('top');
          else if (tab === 'sns') setActiveTab('sns');
          else if (tab === 'ai') setActiveTab('ai');
        }}
      />

      <main className="flex-grow">
        {activeTab === 'top' && (
          <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 animate-fade-in-down">
            {/* Category Navigation Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              <button onClick={() => setActiveTab('dining')} className="group relative h-48 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                <img src="https://loremflickr.com/800/600/seafood,sushi" alt="Dining" className="w-full h-full object-cover brightness-75 group-hover:brightness-90 transition-all duration-700 rounded-3xl" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-black text-white tracking-widest drop-shadow-lg border-2 border-white/30 px-8 py-3 rounded-full backdrop-blur-sm bg-white/10 group-hover:bg-white/20 transition-all">飲食</span>
                </div>
              </button>

              <button onClick={() => setActiveTab('accommodation')} className="group relative h-48 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                <img src="https://loremflickr.com/800/600/resort,hotel" alt="Accommodation" className="w-full h-full object-cover brightness-75 group-hover:brightness-90 transition-all duration-700 rounded-3xl" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-black text-white tracking-widest drop-shadow-lg border-2 border-white/30 px-8 py-3 rounded-full backdrop-blur-sm bg-white/10 group-hover:bg-white/20 transition-all">宿泊</span>
                </div>
              </button>

              <button onClick={() => setActiveTab('cafe')} className="group relative h-48 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                <img src="https://loremflickr.com/800/600/cafe,coffee" alt="Cafe" className="w-full h-full object-cover brightness-75 group-hover:brightness-90 transition-all duration-700 rounded-3xl" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-black text-white tracking-widest drop-shadow-lg border-2 border-white/30 px-8 py-3 rounded-full backdrop-blur-sm bg-white/10 group-hover:bg-white/20 transition-all">カフェ</span>
                </div>
              </button>

              <button onClick={() => setActiveTab('sightseeing')} className="group relative h-48 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                <img src="https://loremflickr.com/800/600/shrine,japan" alt="Sightseeing" className="w-full h-full object-cover brightness-75 group-hover:brightness-90 transition-all duration-700 rounded-3xl" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-black text-white tracking-widest drop-shadow-lg border-2 border-white/30 px-8 py-3 rounded-full backdrop-blur-sm bg-white/10 group-hover:bg-white/20 transition-all">観光</span>
                </div>
              </button>

              <button onClick={() => setActiveTab('nature')} className="group relative h-48 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 md:col-span-2">
                <img src="https://loremflickr.com/1200/600/nature,ocean" alt="Nature" className="w-full h-full object-cover brightness-75 group-hover:brightness-90 transition-all duration-700 rounded-3xl" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-black text-white tracking-widest drop-shadow-lg border-2 border-white/30 px-8 py-3 rounded-full backdrop-blur-sm bg-white/10 group-hover:bg-white/20 transition-all">自然</span>
                </div>
              </button>
            </div>

            {/* T ROCK AWAJI Advertisement Banner */}
            <div className="mb-16 transform hover:scale-[1.02] transition-transform duration-300">
              <a href="https://t-rock-awaji.jp/" target="_blank" rel="noopener noreferrer" className="block relative rounded-3xl overflow-hidden shadow-2xl group border-4 border-orange-100">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/90 to-amber-500/90 mix-blend-multiply z-10"></div>
                <img src="https://loremflickr.com/1000/400/dog,run" alt="T ROCK AWAJI" className="w-full h-64 object-cover" />
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-6 text-center">
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-bold tracking-wider mb-4 border border-white/40">
                    <i className="fas fa-paw mr-2"></i>南あわじのペットリゾート
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black mb-4 drop-shadow-md">
                    ペットの預かり・一時預かりなら<br />
                    <span className="text-yellow-200">T ROCK AWAJI</span> へ
                  </h3>
                  <span className="bg-white text-orange-600 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-orange-50 transition-colors flex items-center gap-2">
                    詳しくはこちら <i className="fas fa-arrow-right"></i>
                  </span>
                </div>
              </a>
            </div>
          </div>
        )}

        {/* Detailed List View for Categories */}
        {['dining', 'accommodation', 'cafe', 'sightseeing', 'nature'].includes(activeTab) && (
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => setActiveTab('top')}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-orange-500 transition-colors"
              >
                <i className="fas fa-arrow-left"></i>
              </button>
              <h2 className="text-3xl font-black text-slate-800">{getCategoryTitle(activeTab)}</h2>
            </div>

            <SpotGrid spots={getFilteredSpots(activeTab)} />
          </div>
        )}

        {activeTab === 'sns' && <SnsSection />}
        {activeTab === 'ai' && <AiConcierge />}

      </main>

      <Footer />
    </div>
  );
};

export default App;
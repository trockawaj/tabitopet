// Fixed: Using default React import to resolve JSX.IntrinsicElements issues in this environment
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MapSection from './components/MapSection';
import SnsSection from './components/SnsSection';
import PetHotelSection from './components/PetHotelSection';
import SpotGrid from './components/SpotGrid';
import Footer from './components/Footer';
import AiConcierge from './components/AiConcierge';

// Fixed: Moving ReasonCard component above its usage in App
const ReasonCard: React.FC<{ icon: string, title: string, desc: string }> = ({ icon, title, desc }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100/50 hover:shadow-lg transition-all duration-300 group">
    <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center text-2xl mb-6 mx-auto group-hover:scale-110 transition-transform">
      <i className={`fas ${icon}`}></i>
    </div>
    <h3 className="text-xl font-bold mb-3 text-slate-800">{title}</h3>
    <p className="text-slate-500 leading-relaxed text-sm">{desc}</p>
  </div>
);

const App: React.FC = () => {
  // Fixed: Updated to React.useState to maintain compatibility with standard import
  const [activeTab, setActiveTab] = React.useState<'home' | 'map' | 'sns' | 'hotel' | 'ai' | 'spots'>('home');

  // Smooth scroll to sections when hash changes or state changes
  // Fixed: Updated to React.useEffect to maintain compatibility with standard import
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'map', 'sns', 'hotel', 'ai', 'spots'].includes(hash)) {
        setActiveTab(hash as any);
      } else if (hash === 'spots_all') {
        setActiveTab('spots');
      }
    };

    // Check initial hash
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-grow">
        {activeTab === 'home' && (
          <>
            <Hero onExplore={() => setActiveTab('map')} />
            <div className="max-w-7xl mx-auto px-6 py-20">
              <section className="mb-24 text-center">
                <div className="mb-4">
                  <span className="text-orange-500 font-bold text-xs tracking-[0.2em] uppercase bg-orange-50 px-3 py-1 rounded-full">The Best of Minami Awaji</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black mb-8 text-slate-800 tracking-tighter font-rounded">
                  南あわじが、<br className="md:hidden" />旅人に愛される理由
                </h2>
                <p className="text-lg text-slate-500 max-w-3xl mx-auto mb-16 leading-relaxed font-medium">
                  日本神話の始まりの地、淡路島。その南端に位置する南あわじ市は、<br className="hidden md:inline" />世界最大の渦潮、夕陽の美しい海岸、助極上の食が集まる楽園です。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <ReasonCard
                    icon="fa-ship"
                    title="世界最大の鳴門の渦潮"
                    desc="丸山漁港からも近い、大迫力の渦潮体験。観潮船でのクルーズは一生の思い出に。"
                  />
                  <ReasonCard
                    icon="fa-utensils"
                    title="御食国の美食"
                    desc="淡路島玉ねぎ、淡路牛、３年とらふぐ。T-ROCK AWAJI周辺にも名店が揃います。"
                  />
                  <ReasonCard
                    icon="fa-sun"
                    title="日本の夕陽百選"
                    desc="慶野松原の松林と瀬戸内海に沈む夕陽. 静かな漁港の黄昏時も格別です。"
                  />
                </div>
              </section>

              <SpotGrid limit={6} />
            </div>
            {/* Moved PetHotelSection to just above the Footer on the home page */}
            <div className="max-w-7xl mx-auto px-6 pb-20">
              <PetHotelSection />
            </div>
          </>
        )}

        {activeTab === 'map' && <MapSection />}

        {activeTab === 'sns' && <SnsSection />}

        {activeTab === 'spots' && (
          <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
            <SpotGrid />
          </div>
        )}

        {activeTab === 'hotel' && (
          <div className="max-w-6xl mx-auto px-6 py-20">
            <PetHotelSection expanded />
          </div>
        )}

        {activeTab === 'ai' && <AiConcierge />}
      </main>

      <Footer />
    </div>
  );
};

export default App;
// Fixed: Using default React import to ensure JSX.IntrinsicElements are properly resolved
import React from 'react';

interface HeroSpotInfoProps {
  title: string;
  desc: string;
  link: string;
}

const HeroSpotInfo: React.FC<HeroSpotInfoProps> = ({ title, desc, link }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="group block text-left border-l border-white/40 pl-6 py-2 hover:border-orange-400 transition-all duration-300"
  >
    <h3 className="font-rounded text-xl font-bold text-white mb-2 group-hover:text-orange-300 transition-colors flex items-center gap-2 shadow-sm">
      {title}
      <i className="fas fa-external-link-alt text-xs opacity-0 group-hover:opacity-100 transition-opacity"></i>
    </h3>
    <p className="text-xs text-white/90 leading-relaxed font-medium group-hover:text-white transition-colors">{desc}</p>
  </a>
);

const SnsTickerItem: React.FC<{ text: string, url: string }> = ({ text, url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="mx-8 text-white/90 font-bold text-sm flex items-center gap-2 whitespace-nowrap hover:text-orange-300 transition-colors"
  >
    <i className="fab fa-instagram text-orange-400"></i>
    {text}
  </a>
);

const Hero: React.FC<{ onExplore: () => void }> = ({ onExplore }) => {
  const tickerItems = [
    { text: "#南あわじ市", url: "https://www.instagram.com/explore/tags/南あわじ市/" },
    { text: "#淡路島観光", url: "https://www.instagram.com/explore/tags/淡路島観光/" },
    { text: "#うずしおクルーズ", url: "https://www.instagram.com/explore/tags/うずしおクルーズ/" },
    { text: "#慶野松原", url: "https://www.instagram.com/explore/tags/慶野松原/" },
    { text: "#淡路島たまねぎ", url: "https://www.instagram.com/explore/tags/淡路島たまねぎ/" },
    { text: "#TROCKAWAJI", url: "https://www.instagram.com/explore/tags/trockawaji/" },
    { text: "#ドッグラン", url: "https://www.instagram.com/explore/tags/ドッグラン/" },
    { text: "#愛犬と旅行", url: "https://www.instagram.com/explore/tags/愛犬と旅行/" },
    { text: "#淡路島グルメ", url: "https://www.instagram.com/explore/tags/淡路島グルメ/" },
    { text: "#夕陽百選", url: "https://www.instagram.com/explore/tags/夕陽百選/" }
  ];

  return (
    <section className="relative h-[90vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1596700813936-f0891d262b9f?auto=format&fit=crop&q=80&w=2000"
          alt="南あわじの絶景"
          className="w-full h-full object-cover brightness-[0.7] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-black/30"></div>
      </div>

      {/* SNS Ticker - Fixed below header */}
      <div className="absolute top-0 left-0 w-full z-20 bg-white/10 backdrop-blur-md border-b border-white/20 overflow-hidden py-3">
        <div className="animate-scroll-left flex items-center">
          {/* Duplicate for seamless loop */}
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => (
            <SnsTickerItem key={idx} text={item.text} url={item.url} />
          ))}
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl px-8 md:px-12 flex flex-col h-full justify-end pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-end">
          <div className="md:col-span-2">
            <div className="mb-8 overflow-hidden">
              <p className="text-orange-400 font-black tracking-[0.4em] uppercase text-xs mb-4 animate-fade-in drop-shadow-md">Experience the Unforgettable</p>
              <div className="h-[2px] w-12 bg-orange-400 mb-8 shadow-lg"></div>
              {/* Font changed to M PLUS Rounded 1c (font-rounded) with light weight */}
              <h1 className="font-rounded font-bold text-white text-4xl md:text-6xl mb-6 tracking-tight leading-tight drop-shadow-lg">
                南あわじで、<br />
                心ほどける旅を。
              </h1>
              <p className="font-rounded font-medium text-slate-100 text-lg md:text-xl max-w-2xl leading-relaxed drop-shadow-md tracking-wide">
                世界最大の渦潮、日本の夕陽百選に選ばれた松原。<br />
                そして豊かな大地が育む美食の数々。
              </p>
            </div>
            <button
              onClick={onExplore}
              className="group relative inline-flex items-center gap-4 bg-white/90 backdrop-blur text-slate-900 font-bold py-4 px-10 rounded-full shadow-2xl transition-all hover:bg-orange-500 hover:text-white text-lg hover:scale-105"
            >
              <span>南あわじを探索する</span>
              <i className="fas fa-arrow-right transition-transform group-hover:translate-x-1"></i>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-8 md:border-l md:border-white/20 md:pl-12 backdrop-blur-sm bg-black/10 rounded-xl p-6">
            <HeroSpotInfo
              title="鳴門の渦潮"
              desc="世界最大級、直径20mに達する大迫力の自然現象を間近で体感。"
              link="https://www.uzusio.com/"
            />
            <HeroSpotInfo
              title="慶野松原"
              desc="瀬戸内海に沈む、日本の夕陽百選。静寂と松林の美しさに包まれる。"
              link="https://www.city.minamiawaji.hyogo.jp/soshiki/shoukou/keinomatsubara.html"
            />
            <HeroSpotInfo
              title="淡路島グルメ"
              desc="淡路島たまねぎ、淡路牛、３年とらふぐ。御食国の美食がここに。"
              link="https://www.awajishima-kanko.jp/food/"
            />
          </div>
        </div>
      </div>

      {/* Decorative lines for sophistication */}
      <div className="absolute top-0 right-0 w-1/3 h-full border-l border-white/5 pointer-events-none"></div>

    </section>
  );
};

export default Hero;
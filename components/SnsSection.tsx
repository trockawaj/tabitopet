// Fixed: Using default React import to ensure JSX.IntrinsicElements are properly resolved
import React from 'react';

const SnsSection: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black text-slate-800 mb-4">SNS 南あわじ情報</h2>
        <p className="text-slate-500 max-w-2xl mx-auto">
          InstagramやX（旧Twitter）で話題の「いま」の南あわじをチェック。<br/>
          #南あわじ市 #淡路島観光 #TROCKAWAJI
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <SnsFeedCard 
            platform="instagram" 
            title="#南あわじ市" 
            desc="最新の映えスポットやカフェ情報が満載。"
            link="https://www.instagram.com/explore/tags/%E5%8D%97%E3%81%82%E3%82%8F%E3%81%98%E5%B8%82/"
        />
        <SnsFeedCard 
            platform="twitter" 
            title="リアルタイム情報" 
            desc="イベントの開催状況や混雑具合をチェック。"
            link="https://twitter.com/search?q=%23%E5%8D%97%E3%81%82%E3%82%8F%E3%81%98%E5%B8%82"
        />
        <SnsFeedCard 
            platform="facebook" 
            title="地域のニュース" 
            desc="地元のイベントやグルメフェスなど公式情報を。"
            link="https://www.facebook.com/minamiawaji.city/"
        />
      </div>

      <div className="mt-16 bg-slate-100 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-3xl text-orange-600 shadow-sm">
                <i className="fas fa-camera-retro"></i>
            </div>
            <div>
                <h4 className="text-2xl font-bold text-slate-800">あなたの旅をシェアしませんか？</h4>
                <p className="text-slate-500">T-ROCK AWAJIでの思い出をハッシュタグをつけて投稿しよう！</p>
            </div>
        </div>
        <button className="bg-orange-600 text-white font-bold py-4 px-8 rounded-full hover:bg-orange-700 transition-all flex items-center gap-2 shadow-lg">
            <i className="fab fa-instagram"></i>
            公式Instagramをフォロー
        </button>
      </div>
    </div>
  );
};

const SnsFeedCard: React.FC<{platform: string, title: string, desc: string, link: string}> = ({ platform, title, desc, link }) => (
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer"
      className="bg-white border border-slate-200 rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all group"
    >
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl mb-6 shadow-lg ${
            platform === 'instagram' ? 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600' :
            platform === 'twitter' ? 'bg-slate-900' : 'bg-blue-600'
        }`}>
            <i className={`fab fa-${platform}`}></i>
        </div>
        <h3 className="text-xl font-black text-slate-800 mb-3 group-hover:text-orange-600 transition-colors">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-6">{desc}</p>
        <div className="text-orange-600 font-bold text-sm flex items-center gap-2">
            コンテンツを見る <i className="fas fa-arrow-right"></i>
        </div>
    </a>
);

export default SnsSection;
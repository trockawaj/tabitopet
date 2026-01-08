// Fixed: Using default React import to ensure JSX.IntrinsicElements are properly resolved
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-900/50">
                <i className="fas fa-paw text-xl text-white"></i>
              </div>
              <span className="text-2xl font-black tracking-tighter">南あわじ <span className="text-orange-500">観光MAP</span></span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              南あわじ市の観光をもっと自由に, もっと便利に。
              T-ROCK AWAJIがプロデュースする, 愛犬家と旅人のためのポータルサイト。
            </p>
            <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center hover:bg-orange-600 transition-all text-xl">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center hover:bg-slate-800 transition-all text-xl">
                  <i className="fab fa-x-twitter"></i>
                </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-black mb-8 text-lg text-slate-100 tracking-widest uppercase">Navigation</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-bold">
              <li><a href="#" className="hover:text-orange-500 transition-colors">ホーム</a></li>
              <li><a href="#map" className="hover:text-orange-500 transition-colors">観光MAP</a></li>
              <li><a href="#sns" className="hover:text-orange-500 transition-colors">SNS最新情報</a></li>
              <li><a href="#hotel" className="hover:text-orange-500 transition-colors">ペットホテル T-ROCK AWAJI</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-black mb-8 text-lg text-slate-100 tracking-widest uppercase">Popular Spots</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-bold">
              <li>うずしおクルーズ</li>
              <li>丸山漁港</li>
              <li>慶野松原</li>
              <li>うずの丘 大鳴門橋記念館</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-black mb-8 text-lg text-slate-100 tracking-widest uppercase">Contact Hotel</h4>
            <div className="flex flex-col gap-6 text-slate-400 text-sm">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-orange-500">
                    <i className="fas fa-phone"></i>
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase text-slate-600">Call Us</p>
                    <span className="font-bold">0120-XXX-XXXX</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-orange-500">
                    <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase text-slate-600">Location</p>
                    <span className="font-bold">兵庫県南あわじ市阿那賀（丸山漁港すぐ）</span>
                </div>
              </div>
              <a href="https://www.t-rock-awaji.jp/" target="_blank" rel="noopener noreferrer" className="mt-4 bg-orange-600 text-white font-bold py-4 px-6 rounded-xl text-center hover:bg-orange-700 transition-all">
                公式サイトを開く
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-900 pt-12 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-600 font-black uppercase tracking-widest">
          <p>&copy; 2024 T-ROCK AWAJI x MINAMI-AWAJI TOURISM PARTNERS.</p>
          <div className="flex gap-8 mt-6 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
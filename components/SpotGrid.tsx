// Fixed: Using default React import to ensure JSX.IntrinsicElements are properly resolved
import React, { useState } from 'react';
import { Spot } from '../types';

interface SpotGridProps {
  limit?: number;
}

const mockSpots: Spot[] = [
  // Existing
  { id: '1', name: 'うずしおクルーズ', category: 'sightseeing', description: '世界最大の渦潮を間近で体感。観潮船「日本丸」「咸臨丸」で迫力の渦潮を。', imageUrl: 'https://picsum.photos/id/1011/500/350', petFriendly: false, location: { lat: 34.25, lng: 134.7 }, link: 'https://www.uzushio-cruise.com/' },
  { id: '2', name: '慶野松原', category: 'sightseeing', description: '約2.5km続く松原は圧巻。キャンプ場や海水浴場もあり, 散策に最適。', imageUrl: 'https://picsum.photos/id/1015/500/350', petFriendly: true, location: { lat: 34.34, lng: 134.74 }, link: 'https://www.city.minamiawaji.hyogo.jp/soshiki/shoukou/keinomatsubara.html' },
  { id: '3', name: '淡路ファームパーク イングランドの丘', category: 'sightseeing', description: 'コアラに会える農業公園。ペット同伴ルールについては要確認。', imageUrl: 'https://picsum.photos/id/1020/500/350', petFriendly: false, location: { lat: 34.32, lng: 134.82 }, link: 'https://www.england-hill.com/' },
  { id: '4', name: 'うずの丘 大鳴門橋記念館', category: 'sightseeing', description: '「たまねぎキャッチャー」で有名な複合施設。絶景レストランも。', imageUrl: 'https://picsum.photos/id/1025/500/350', petFriendly: true, location: { lat: 34.26, lng: 134.72 }, link: 'https://uzunokuni.com/' },
  { id: '5', name: '南あわじ温泉郷', category: 'accommodation', description: '鳴門海峡を望む温泉地。泉質豊かな数々の旅館が並びます。', imageUrl: 'https://picsum.photos/id/1030/500/350', petFriendly: false, location: { lat: 34.25, lng: 134.71 }, link: 'https://www.minamiawaji-onsen.com/' },
  { id: '6', name: '道の駅 うずしお', category: 'restaurant', description: 'あわじ島バーガーなど, 地元グルメの宝庫。大鳴門橋が目の前。', imageUrl: 'https://picsum.photos/id/1035/500/350', petFriendly: true, location: { lat: 34.24, lng: 134.69 }, link: 'https://eki.uzunokuni.com/' },

  // New
  { id: '7', name: 'おのころ島神社', category: 'sightseeing', description: '高さ21.7mの大鳥居は必見。国生み神話ゆかりのパワースポット。', imageUrl: 'https://picsum.photos/id/1040/500/350', petFriendly: true, location: { lat: 34.3, lng: 134.8 }, link: 'https://www.freedom.ne.jp/onokoro/' },
  { id: '8', name: '淡路人形座', category: 'sightseeing', description: '500年の歴史を誇る淡路人形浄瑠璃。伝統芸能の粋を感じる。', imageUrl: 'https://picsum.photos/id/1045/500/350', petFriendly: false, location: { lat: 34.2, lng: 134.7 }, link: 'https://awajiningyoza.com/' },
  { id: '9', name: 'じゃのひれアウトドアリゾート', category: 'sightseeing', description: 'イルカと触れ合える貴重なスポット。釣りやキャンプも楽しめる。', imageUrl: 'https://picsum.photos/id/1050/500/350', petFriendly: true, location: { lat: 34.23, lng: 134.68 }, link: 'http://janohire.co.jp/' },
  { id: '10', name: 'G.エルム', category: 'restaurant', description: '地元で愛されるジェラート店。濃厚な淡路島牛乳の風味が絶品。', imageUrl: 'https://picsum.photos/id/1055/500/350', petFriendly: false, location: { lat: 34.24, lng: 134.69 }, link: 'https://tabelog.com/hyogo/A2806/A280603/28003183/' },
  { id: '11', name: '灘黒岩水仙郷', category: 'sightseeing', description: '冬の風物詩。海に落ち込む急斜面に500万本の水仙が咲き誇る。', imageUrl: 'https://picsum.photos/id/1060/500/350', petFriendly: true, location: { lat: 34.18, lng: 134.85 }, link: 'https://www.city.minamiawaji.hyogo.jp/site/suisenkyou/' },
  { id: '12', name: '吹上浜', category: 'sightseeing', description: '白砂青松の美しい海岸。静かな時間を過ごしたい方におすすめ。', imageUrl: 'https://picsum.photos/id/1065/500/350', petFriendly: true, location: { lat: 34.22, lng: 134.65 }, link: 'https://www.awajishima-kanko.jp/manual/detail.php?bid=469' },
  { id: '13', name: '麺屋 蔵', category: 'restaurant', description: '淡路島ポークを使った絶品ラーメン。地元民にも人気の隠れた名店。', imageUrl: 'https://picsum.photos/id/1070/500/350', petFriendly: false, location: { lat: 34.3, lng: 134.75 }, link: 'https://tabelog.com/hyogo/' },
  { id: '14', name: 'カリコリゾート', category: 'sightseeing', description: '愛犬と一緒に楽しめる総合リゾート施設。ドッグランやフォトスポットが充実。', imageUrl: 'https://picsum.photos/id/1075/500/350', petFriendly: true, location: { lat: 34.3, lng: 134.7 }, link: 'https://kariko.jp/' },
  { id: '15', name: 'あわじ島アイスクリーム', category: 'restaurant', description: '素材にこだわった手作りアイス。季節限定のフレーバーも楽しみ。', imageUrl: 'https://picsum.photos/id/1080/500/350', petFriendly: false, location: { lat: 34.28, lng: 134.75 }, link: 'https://awajishima-ice.com/' }
];

const SpotGrid: React.FC<SpotGridProps> = ({ limit }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // If limit is set, we just show the first N items (Home page mode)
  // If limit is NOT set, we handle pagination (Spots page mode)

  const totalItems = mockSpots.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const displaySpots = limit
    ? mockSpots.slice(0, limit)
    : mockSpots.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSpotClick = (link?: string) => {
    if (link) {
      window.open(link, '_blank', 'noreferrer');
    }
  };

  return (
    // Changed background color to very light slate/white for modern feel
    <section id="spots" className="py-24 bg-white/50 backdrop-blur-sm rounded-[3rem] px-6 md:px-12 my-12 border border-slate-100/50 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-rounded font-bold mb-3 tracking-tighter text-slate-800">
            {limit ? "おすすめスポット" : "スポット一覧"}
          </h2>
          <p className="text-slate-500 font-medium">
            {limit ? "南あわじ市の必見スポットをピックアップしました。" : "南あわじの魅力を余すことなくご紹介します。"}
          </p>
        </div>

        {limit && (
          <a href="#spots_all" onClick={(e) => {
            e.preventDefault();
            window.location.hash = 'spots_all';
            // Note: logic in App.tsx needs to handle this hash
          }} className="text-orange-500 font-bold hover:underline flex items-center gap-2 group cursor-pointer bg-white px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-all">
            全てを見る <i className="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
          </a>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displaySpots.map(spot => (
          <div
            key={spot.id}
            onClick={() => handleSpotClick(spot.link)}
            className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 cursor-pointer flex flex-col h-full"
          >
            <div className="relative h-60 overflow-hidden">
              <img
                src={spot.imageUrl}
                alt={spot.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className={`
                    text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm backdrop-blur-md
                    ${spot.category === 'sightseeing' ? 'bg-blue-500/90 text-white' :
                    spot.category === 'accommodation' ? 'bg-purple-500/90 text-white' : 'bg-orange-500/90 text-white'}
                 `}>
                  {spot.category === 'sightseeing' ? '観光' : spot.category === 'accommodation' ? '宿泊' : 'グルメ'}
                </span>
                {spot.petFriendly && (
                  <span className="bg-green-500/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                    <i className="fas fa-paw mr-1"></i> ペットOK
                  </span>
                )}
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold mb-3 text-slate-800 group-hover:text-orange-500 transition-colors">{spot.name}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2 flex-grow">{spot.description}</p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                <span className="text-xs text-slate-400 font-medium flex items-center gap-1 group-hover:text-orange-400 transition-colors">
                  公式ページへ
                  <i className="fas fa-external-link-alt text-[10px]"></i>
                </span>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-orange-50 group-hover:text-orange-500 transition-colors">
                  <i className="fas fa-chevron-right text-xs"></i>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls (Only show when not limited) */}
      {!limit && totalPages > 1 && (
        <div className="mt-16 flex justify-center items-center gap-2">
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="w-10 h-10 rounded-full flex items-center justify-center border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <i className="fas fa-chevron-left"></i>
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`
                        w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all
                        ${currentPage === page
                  ? 'bg-orange-500 text-white shadow-md scale-110'
                  : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'}
                    `}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="w-10 h-10 rounded-full flex items-center justify-center border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}
    </section>
  );
};

export default SpotGrid;
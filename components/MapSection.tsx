// Fixed: Using default React import to ensure JSX.IntrinsicElements are properly resolved
import React from 'react';
import { Spot } from '../types';

// Fixed: Moved above MapSection to avoid hoisting issues
const FilterBtn: React.FC<{label: string, active: boolean, onClick: () => void}> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
      active ? 'bg-orange-600 text-white shadow-lg' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
    }`}
  >
    {label}
  </button>
);

const mockSpots: Spot[] = [
  { id: '1', name: 'うずしおクルーズ', category: 'sightseeing', description: '世界最大の渦潮を間近で体感。', imageUrl: 'https://picsum.photos/id/1011/400/300', petFriendly: false, location: { lat: 34.25, lng: 134.7 } },
  { id: '2', name: '慶野松原', category: 'sightseeing', description: '日本の夕陽百選にも選ばれた松林 and 砂浜。', imageUrl: 'https://picsum.photos/id/1015/400/300', petFriendly: true, location: { lat: 34.34, lng: 134.74 } },
  { id: '3', name: '淡路島牧場', category: 'sightseeing', description: '乳搾り体験や新鮮なソフトクリームを。', imageUrl: 'https://picsum.photos/id/1020/400/300', petFriendly: true, location: { lat: 34.32, lng: 134.82 } },
  { id: '4', name: '休暇村 南淡路', category: 'accommodation', description: '絶景の鳴門大橋を望む温泉宿。', imageUrl: 'https://picsum.photos/id/1025/400/300', petFriendly: false, location: { lat: 34.26, lng: 134.72 } },
  { id: '5', name: '福良マルシェ', category: 'restaurant', description: '地元の新鮮な野菜や魚介類が揃う市場。', imageUrl: 'https://picsum.photos/id/1030/400/300', petFriendly: true, location: { lat: 34.25, lng: 134.71 } },
  { id: '6', name: '丸山漁港', category: 'sightseeing', description: '静かな漁村の風景と釣りの名所。T-ROCK AWAJIのすぐそば。', imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=400', petFriendly: true, location: { lat: 34.28, lng: 134.68 } },
];

const MapSection: React.FC = () => {
  // Fixed: Updated to React.useState to maintain compatibility with standard import
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [selectedSpot, setSelectedSpot] = React.useState<Spot | null>(null);

  const filteredSpots = selectedCategory === 'all' 
    ? mockSpots 
    : mockSpots.filter(s => s.category === selectedCategory);

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-100px)] overflow-hidden">
      {/* Sidebar List */}
      <div className="w-full md:w-[400px] bg-white border-r border-slate-200 flex flex-col h-2/5 md:h-full shadow-2xl z-10">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
              <i className="fas fa-search-location text-orange-600"></i>
              スポットを探す
          </h2>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <FilterBtn label="全て" active={selectedCategory === 'all'} onClick={() => setSelectedCategory('all')} />
            <FilterBtn label="観光" active={selectedCategory === 'sightseeing'} onClick={() => setSelectedCategory('sightseeing')} />
            <FilterBtn label="宿泊" active={selectedCategory === 'accommodation'} onClick={() => setSelectedCategory('accommodation')} />
            <FilterBtn label="グルメ" active={selectedCategory === 'restaurant'} onClick={() => setSelectedCategory('restaurant')} />
          </div>
        </div>
        <div className="flex-grow overflow-y-auto">
          {filteredSpots.map(spot => (
            <div 
              key={spot.id} 
              onClick={() => setSelectedSpot(spot)}
              className={`p-6 border-b border-slate-50 cursor-pointer transition-all ${selectedSpot?.id === spot.id ? 'bg-orange-50 border-l-4 border-l-orange-500' : 'hover:bg-slate-50'}`}
            >
              <div className="flex gap-5">
                <img src={spot.imageUrl} alt={spot.name} className="w-24 h-24 rounded-2xl object-cover shadow-sm" />
                <div className="flex-grow">
                  <h3 className="font-black text-slate-800 text-lg mb-1">{spot.name}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-1">{spot.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map View Area */}
      <div className="flex-grow bg-slate-200 relative overflow-hidden">
        {/* 背景テクスチャ */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
           <i className="fas fa-map text-[40rem] text-slate-900"></i>
        </div>
        
        <div className="p-8 h-full flex flex-col items-center justify-center text-slate-400 text-center">
          <div className="animate-pulse flex flex-col items-center">
            <i className="fas fa-map-pin text-6xl text-orange-500/30 mb-4"></i>
            <p className="text-xl font-bold">インタラクティブマップ</p>
            <p className="text-sm">スポットを選択して詳細を表示</p>
          </div>
          
          {selectedSpot && (
            <div className="mt-12 bg-white p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white text-left max-w-md pointer-events-auto transform animate-scale-in">
              <div className="flex justify-between items-start mb-6">
                <div>
                    <span className="bg-orange-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-2 inline-block">Spot Details</span>
                    <h4 className="text-3xl font-black text-slate-900">{selectedSpot.name}</h4>
                </div>
                <button onClick={() => setSelectedSpot(null)} className="text-slate-300 hover:text-slate-500 text-2xl">
                    <i className="fas fa-times-circle"></i>
                </button>
              </div>
              <p className="text-slate-600 mb-8 leading-relaxed">{selectedSpot.description}</p>
              
              <div className="flex flex-col gap-3">
                <button className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-black transition-all shadow-xl">
                    詳細を見る
                </button>
                <a 
                  href="https://www.t-rock-awaji.jp/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-orange-600 text-white font-bold py-4 rounded-xl hover:bg-orange-700 transition-all text-center shadow-xl shadow-orange-100"
                >
                    T-ROCK AWAJI で預ける
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapSection;
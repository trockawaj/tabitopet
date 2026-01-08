// Fixed: Using default React import
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Spot } from '../types';

// Fix for default Leaflet marker icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom Icons
const createCustomIcon = (color: string, iconClass: string) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: ${color}; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
             <i class="${iconClass}" style="color: white; font-size: 14px;"></i>
           </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};

const icons = {
  sightseeing: createCustomIcon('#ea580c', 'fas fa-camera'),      // Orange-600
  accommodation: createCustomIcon('#8b5cf6', 'fas fa-bed'),       // Violet-500
  restaurant: createCustomIcon('#ef4444', 'fas fa-utensils'),     // Red-500
  default: createCustomIcon('#64748b', 'fas fa-map-marker-alt')   // Slate-500
};

// Component to handle map center changes
const MapUpdater: React.FC<{ center: [number, number], zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const FilterBtn: React.FC<{ label: string, active: boolean, onClick: () => void }> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${active ? 'bg-orange-600 text-white shadow-lg' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
      }`}
  >
    {label}
  </button>
);

const allSpots: Spot[] = [
  // Expanded Spot List for Map
  { id: '1', name: 'うずしおクルーズ', category: 'sightseeing', description: '世界最大の渦潮を間近で体感。観潮船「日本丸」「咸臨丸」で迫力の渦潮を。', imageUrl: 'https://picsum.photos/id/1011/400/300', petFriendly: false, location: { lat: 34.2407, lng: 134.7171 } },
  { id: '2', name: '慶野松原', category: 'sightseeing', description: '日本の夕陽百選にも選ばれた松林と砂浜。', imageUrl: 'https://picsum.photos/id/1015/400/300', petFriendly: true, location: { lat: 34.3315, lng: 134.7397 } },
  { id: '3', name: '淡路島牧場', category: 'sightseeing', description: '乳搾り体験や新鮮なソフトクリームを。', imageUrl: 'https://picsum.photos/id/1020/400/300', petFriendly: true, location: { lat: 34.3129, lng: 134.7877 } },
  { id: '4', name: 'うずの丘 大鳴門橋記念館', category: 'sightseeing', description: '「たまねぎキャッチャー」で有名な複合施設。', imageUrl: 'https://picsum.photos/id/1025/400/300', petFriendly: true, location: { lat: 34.2508, lng: 134.7115 } },
  { id: '5', name: '南あわじ温泉郷', category: 'accommodation', description: '鳴門海峡を望む温泉地。', imageUrl: 'https://picsum.photos/id/1030/400/300', petFriendly: false, location: { lat: 34.2435, lng: 134.7228 } },
  { id: '6', name: '道の駅 うずしお', category: 'restaurant', description: 'あわじ島バーガーなど, 地元グルメの宝庫。', imageUrl: 'https://picsum.photos/id/1035/400/300', petFriendly: true, location: { lat: 34.2370, lng: 134.6975 } },
  { id: '7', name: 'おのころ島神社', category: 'sightseeing', description: '高さ21.7mの大鳥居は必見。', imageUrl: 'https://picsum.photos/id/1040/400/300', petFriendly: true, location: { lat: 34.3015, lng: 134.7938 } },
  { id: '8', name: '淡路人形座', category: 'sightseeing', description: '500年の歴史を誇る淡路人形浄瑠璃。', imageUrl: 'https://picsum.photos/id/1045/400/300', petFriendly: false, location: { lat: 34.2405, lng: 134.7188 } },
  { id: '9', name: 'じゃのひれアウトドアリゾート', category: 'sightseeing', description: 'イルカと触れ合える貴重なスポット。', imageUrl: 'https://picsum.photos/id/1050/400/300', petFriendly: true, location: { lat: 34.2355, lng: 134.6853 } },
  { id: '10', name: '諭鶴羽神社', category: 'sightseeing', description: '淡路島最高峰、標高608mに鎮座する修験道の聖地。パワースポットとして有名。', imageUrl: 'https://images.unsplash.com/photo-1624891461427-1481c4ee8001?auto=format&fit=crop&q=80&w=400', petFriendly: true, location: { lat: 34.2346, lng: 134.8145 } },
  { id: '11', name: '沼島', category: 'sightseeing', description: '国生み神話ゆかりの島。「上立神岩」はハート型に見えると話題。', imageUrl: 'https://images.unsplash.com/photo-1549448893-68f7f57321e0?auto=format&fit=crop&q=80&w=400', petFriendly: true, location: { lat: 34.1720, lng: 134.8190 } },
  { id: '12', name: '淡路島モンキーセンター', category: 'sightseeing', description: '野生のニホンザル約350頭と触れ合える。仲の良いサルたちに癒やされます。', imageUrl: 'https://images.unsplash.com/photo-1543152632-42777421cb83?auto=format&fit=crop&q=80&w=400', petFriendly: false, location: { lat: 34.2451, lng: 134.8833 } },
  // User Added Spots
  { id: '13', name: 'G.エルム', category: 'restaurant', description: '地元で愛されるジェラート店。濃厚な淡路島牛乳の風味が絶品。', imageUrl: 'https://picsum.photos/id/1055/400/300', petFriendly: false, location: { lat: 34.24, lng: 134.69 } },
  { id: '14', name: '灘黒岩水仙郷', category: 'sightseeing', description: '冬の風物詩。海に落ち込む急斜面に500万本の水仙が咲き誇る。', imageUrl: 'https://picsum.photos/id/1060/400/300', petFriendly: true, location: { lat: 34.18, lng: 134.85 } },
  { id: '15', name: '吹上浜', category: 'sightseeing', description: '白砂青松の美しい海岸。静かな時間を過ごしたい方におすすめ。', imageUrl: 'https://picsum.photos/id/1065/400/300', petFriendly: true, location: { lat: 34.22, lng: 134.65 } },
  { id: '16', name: '麺屋 蔵', category: 'restaurant', description: '淡路島ポークを使った絶品ラーメン。地元民にも人気の隠れた名店。', imageUrl: 'https://loremflickr.com/400/300/ramen', petFriendly: false, location: { lat: 34.3, lng: 134.75 } },
  { id: '17', name: 'カリコリゾート', category: 'sightseeing', description: '愛犬と一緒に楽しめる総合リゾート施設。ドッグランやフォトスポットが充実。', imageUrl: 'https://loremflickr.com/400/300/resort,dog', petFriendly: true, location: { lat: 34.3, lng: 134.7 } },
  { id: '18', name: 'あわじ島アイスクリーム', category: 'restaurant', description: '素材にこだわった手作りアイス。季節限定のフレーバーも楽しみ。', imageUrl: 'https://loremflickr.com/400/300/icecream', petFriendly: false, location: { lat: 34.28, lng: 134.75 } },
  // User Added Spots
  { id: '19', name: '鼓亭', category: 'restaurant', description: '淡路島の手打ちうどんの名店。', imageUrl: 'https://www.tsuzumitei.com/wp-content/uploads/2015/10/top_slide_01.jpg', petFriendly: false, location: { lat: 34.2579689, lng: 134.7210083 } },
  { id: '20', name: 'Giro d\' Awaji', category: 'restaurant', description: '焙煎工房&淡路牛バール。', imageUrl: 'https://loremflickr.com/400/300/beef,steak', petFriendly: false, location: { lat: 34.2567098, lng: 134.7212335 } },
  { id: '21', name: '2965 Awajishima', category: 'restaurant', description: '南あわじのレストラン。', imageUrl: 'https://loremflickr.com/400/300/hamburger,cafe', petFriendly: false, location: { lat: 34.2555873, lng: 134.7222894 } },
  { id: '22', name: '野菜酒場なみなみ', category: 'restaurant', description: '淡路島の野菜を楽しめる居酒屋。', imageUrl: 'https://loremflickr.com/400/300/vegetables,izakaya', petFriendly: false, location: { lat: 34.2547688, lng: 134.7046047 } },
  { id: '23', name: 'ひらまつ食堂', category: 'restaurant', description: '地元の魚介を使った海鮮料理。', imageUrl: 'https://loremflickr.com/400/300/sashimi,seafood', petFriendly: false, location: { lat: 34.2524827, lng: 134.7086303 } },
  { id: '24', name: 'オンズ', category: 'restaurant', description: 'くつろげる居酒屋ダイナー。', imageUrl: 'https://loremflickr.com/400/300/diner,food', petFriendly: false, location: { lat: 34.255458, lng: 134.712982 } },
  { id: '25', name: 'まりも', category: 'restaurant', description: 'ラーメンとお好み焼きの人気店。', imageUrl: 'https://loremflickr.com/400/300/ramen', petFriendly: false, location: { lat: 34.2578884, lng: 134.7161151 } },
  { id: '26', name: 'あや (居酒屋)', category: 'restaurant', description: 'アットホームな居酒屋。', imageUrl: 'https://loremflickr.com/400/300/izakaya', petFriendly: false, location: { lat: 34.257794, lng: 134.717857 } },
  { id: '27', name: 'GURUDOG infinity', category: 'restaurant', description: '淡路島ホットドッグとバー。', imageUrl: 'https://loremflickr.com/400/300/hotdog', petFriendly: false, location: { lat: 34.2568412, lng: 134.7194611 } },
  { id: '28', name: 'B&T Viet Cafe', category: 'restaurant', description: '本格的なベトナム料理カフェ。', imageUrl: 'https://loremflickr.com/400/300/vietnamesefood', petFriendly: false, location: { lat: 34.256791, lng: 134.7193333 } },
  { id: '29', name: 'ぐりるエイト', category: 'restaurant', description: '鉄板焼ステーキ&シーフード。', imageUrl: 'https://www.eonet.ne.jp/~gurirueito/miya.gif', petFriendly: false, location: { lat: 34.2580064, lng: 134.7199986 } },
  { id: '30', name: '淡路島おむすび結結', category: 'restaurant', description: 'ふっくらとした淡路島おにぎり。', imageUrl: 'https://loremflickr.com/400/300/onigiri', petFriendly: false, location: { lat: 34.2582083, lng: 134.7205345 } },
  { id: '31', name: '海鮮料理 秀丸', category: 'restaurant', description: '新鮮な海鮮丼などが楽しめる。', imageUrl: 'https://loremflickr.com/400/300/sashimibowl', petFriendly: false, location: { lat: 34.2574963, lng: 134.7201547 } },
  { id: '32', name: '活魚料理 沖', category: 'restaurant', description: '活きのいい魚料理を提供。', imageUrl: 'https://loremflickr.com/400/300/freshfish', petFriendly: false, location: { lat: 34.257475, lng: 134.720193 } },
  // Additional User Spots
  { id: '33', name: 'なるみキッチン＆カフェ', category: 'restaurant', description: 'カジュアルに和食を楽しめるお店。', imageUrl: 'https://loremflickr.com/400/300/japanesefood,cafe', petFriendly: false, location: { lat: 34.288289, lng: 134.789239 } },
  { id: '34', name: '心鮮料理 万代', category: 'restaurant', description: '新鮮な魚介料理が自慢。', imageUrl: 'https://awaji-mandai.jp/wp-content/uploads/2022/10/main-scaled.jpg', petFriendly: false, location: { lat: 34.257887, lng: 134.723036 } },
  { id: '35', name: '小家の梵', category: 'restaurant', description: '焼き鳥が美味しい居酒屋。', imageUrl: 'https://loremflickr.com/400/300/yakitori', petFriendly: false, location: { lat: 34.2565498, lng: 134.7229201 } },
  { id: '36', name: '味処 とっくり', category: 'restaurant', description: '地元で人気の和風居酒屋。', imageUrl: 'https://loremflickr.com/400/300/izakaya', petFriendly: false, location: { lat: 34.2563543, lng: 134.7227722 } },
  { id: '37', name: '清中', category: 'restaurant', description: '新鮮なネタが揃う寿司店。', imageUrl: 'https://loremflickr.com/400/300/sushi', petFriendly: false, location: { lat: 34.2552683, lng: 134.7232015 } },
  { id: '38', name: '三富', category: 'restaurant', description: '地元の食材を使った料理店。', imageUrl: 'http://www.santomi-awj.com/teishoku.jpg', petFriendly: false, location: { lat: 34.271758, lng: 134.7403622 } },
  { id: '39', name: 'タヴェールナ ガットリベロ', category: 'restaurant', description: '本格的なイタリアンレストラン。', imageUrl: 'https://loremflickr.com/400/300/italianfood', petFriendly: false, location: { lat: 34.2694754, lng: 134.753792 } },
  { id: '40', name: '地魚･地野菜 旬', category: 'restaurant', description: '旬の地魚と野菜を味わえる和食店。', imageUrl: 'https://loremflickr.com/400/300/japanesefood', petFriendly: false, location: { lat: 34.2713325, lng: 134.758215 } },
];

const MapSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);

  // Default center: Minami Awaji
  const defaultCenter: [number, number] = [34.26, 134.73];
  const [mapCenter, setMapCenter] = useState<[number, number]>(defaultCenter);
  const [zoom, setZoom] = useState(12);

  const filteredSpots = selectedCategory === 'all'
    ? allSpots
    : allSpots.filter(s => s.category === selectedCategory);

  const handleSpotClick = (spot: Spot) => {
    setSelectedSpot(spot);
    setMapCenter([spot.location.lat, spot.location.lng]);
    setZoom(14);
  };

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-100px)] overflow-hidden">
      {/* Sidebar List */}
      <div className="w-full md:w-[400px] bg-white border-r border-slate-200 flex flex-col h-2/5 md:h-full shadow-2xl z-10">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {['all', 'sightseeing', 'accommodation', 'restaurant'].map(cat => (
              <FilterBtn
                key={cat}
                label={cat === 'all' ? '全て' : cat === 'sightseeing' ? '観光' : cat === 'accommodation' ? '宿泊' : 'グルメ'}
                active={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
              />
            ))}
          </div>
        </div>
        <div className="flex-grow overflow-y-auto">
          {filteredSpots.map(spot => (
            <div
              key={spot.id}
              onClick={() => handleSpotClick(spot)}
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
      <div className="flex-grow bg-slate-200 relative h-3/5 md:h-full">
        <MapContainer center={defaultCenter} zoom={12} scrollWheelZoom={true} className="w-full h-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapUpdater center={mapCenter} zoom={zoom} />

          {filteredSpots.map(spot => (
            <Marker
              key={spot.id}
              position={[spot.location.lat, spot.location.lng]}
              icon={icons[spot.category as keyof typeof icons] || icons.default}
              eventHandlers={{
                click: () => handleSpotClick(spot)
              }}
            >
              <Popup className="custom-popup">
                <div className="p-2 text-center">
                  <h3 className="font-bold text-slate-800 mb-2">{spot.name}</h3>
                  <img src={spot.imageUrl} alt={spot.name} className="w-full h-24 object-cover rounded-lg mb-2" />
                  <p className="text-xs text-slate-500 mb-2">{spot.description}</p>
                  <a href={`https://www.google.com/maps/search/?api=1&query=${spot.name}`} target="_blank" rel="noopener noreferrer" className="text-xs text-orange-600 font-bold hover:underline">
                    Google Mapsで見る <i className="fas fa-external-link-alt ml-1"></i>
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Floating Selection Details (Desktop) */}
        {selectedSpot && (
          <div className="hidden md:block absolute top-8 right-8 w-80 bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-2xl z-[1000] border border-white/50 animate-fade-in-down">
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedSpot(null); }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
            >
              <i className="fas fa-times"></i>
            </button>
            <span className="text-[10px] font-black uppercase tracking-widest text-orange-500 mb-2 block">Selected Spot</span>
            <h3 className="text-2xl font-black text-slate-800 mb-4">{selectedSpot.name}</h3>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">{selectedSpot.description}</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${selectedSpot.name}`}
              target="_blank"
              rel="noreferrer"
              className="block w-full text-center bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-black transition-all"
            >
              Google Mapsで開く
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapSection;
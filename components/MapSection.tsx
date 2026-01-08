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
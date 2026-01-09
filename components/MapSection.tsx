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
  { id: '4', name: 'うずの丘 大鳴門橋記念館', category: 'sightseeing', description: '「たまねぎキャッチャー」で有名な複合施設。', imageUrl: 'https://loremflickr.com/400/300/onion,bridge', petFriendly: true, location: { lat: 34.2547535, lng: 134.6846892 } },
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
  // Batch 3 User Spots
  { id: '41', name: 'TRATTORIA amarancia', category: 'restaurant', description: '本格的なイタリア料理を楽しめるトラットリア。', imageUrl: 'https://loremflickr.com/400/300/italian,pasta', petFriendly: false, location: { lat: 34.1923293, lng: 134.7319073 } },
  { id: '42', name: '海鮮炉端うの', category: 'restaurant', description: '新鮮な魚介を炉端焼きで。', imageUrl: 'https://loremflickr.com/400/300/seafood,grill', petFriendly: false, location: { lat: 34.2827878, lng: 134.7730747 } },
  { id: '43', name: 'あいご亭', category: 'restaurant', description: '地元で人気の定食屋さん。', imageUrl: 'https://loremflickr.com/400/300/teishoku,japanesefood', petFriendly: false, location: { lat: 34.2837868, lng: 134.7740427 } },
  { id: '44', name: '洋食屋さん 谷やんの店', category: 'restaurant', description: '昔ながらの洋食屋さん。', imageUrl: 'https://loremflickr.com/400/300/yoshoku,curry', petFriendly: false, location: { lat: 34.2868785, lng: 134.7729916 } },
  { id: '45', name: 'Kitchen Yocchi', category: 'restaurant', description: 'アットホームなキッチンカフェ。', imageUrl: 'https://loremflickr.com/400/300/cafe,lunch', petFriendly: false, location: { lat: 34.2887963, lng: 134.7799798 } },
  { id: '46', name: '和い和い', category: 'restaurant', description: 'みんなでワイワイ楽しめる居酒屋。', imageUrl: 'https://loremflickr.com/400/300/izakaya', petFriendly: false, location: { lat: 34.2904959, lng: 134.7801933 } },
  { id: '47', name: '鳴門屋', category: 'restaurant', description: '地元で愛されるカジュアルな和食店。', imageUrl: 'https://loremflickr.com/400/300/japanesefood', petFriendly: false, location: { lat: 34.2999514, lng: 134.7727686 } },
  { id: '48', name: 'ベトナム ビストロ Onion', category: 'restaurant', description: '本格ベトナム料理と淡路島玉ねぎのコラボ。', imageUrl: 'https://loremflickr.com/400/300/vietnamesefood,pho', petFriendly: false, location: { lat: 34.3013659, lng: 134.7524744 } },
  { id: '49', name: '玉ねぎ倉庫跡地 志知カフェ', category: 'restaurant', description: '倉庫をリノベーションしたお洒落カフェ。', imageUrl: 'https://loremflickr.com/400/300/cafe,renovation', petFriendly: false, location: { lat: 34.3001385, lng: 134.7832684 } },
  { id: '50', name: 'ファーマーズキッチン', category: 'restaurant', description: '地元の農産物をふんだんに使ったキッチン。', imageUrl: 'https://loremflickr.com/400/300/vegetables,kitchen', petFriendly: false, location: { lat: 34.3122647, lng: 134.796554 } },
  { id: '51', name: '喜久', category: 'restaurant', description: '落ち着いた雰囲気の和食店。', imageUrl: 'https://loremflickr.com/400/300/japanesefood,kaiseki', petFriendly: false, location: { lat: 34.3221605, lng: 134.7728011 } },
  { id: '52', name: '木村SHOKUDO', category: 'restaurant', description: '地元で愛される食堂。', imageUrl: 'https://loremflickr.com/400/300/shokudo,lunch', petFriendly: false, location: { lat: 34.3271174, lng: 134.7474254 } },
  { id: '53', name: 'みなと食堂Porto', category: 'restaurant', description: '港の近くにあるモダンな居酒屋。', imageUrl: 'https://loremflickr.com/400/300/izakaya,port', petFriendly: false, location: { lat: 34.3241833, lng: 134.7354536 } },
  { id: '54', name: '淡路島さと味', category: 'restaurant', description: '淡路島の海の幸を堪能できるお店。', imageUrl: 'https://loremflickr.com/400/300/sashimi,seafood', petFriendly: false, location: { lat: 34.3269554, lng: 134.7317982 } },
  { id: '55', name: 'かまたに鮮魚店 海鮮', category: 'restaurant', description: '鮮魚店直営の新鮮な海鮮料理。', imageUrl: 'https://loremflickr.com/400/300/freshfish,sashimi', petFriendly: false, location: { lat: 34.3267222, lng: 134.7301139 } },
  { id: '56', name: 'Pizzeria e Trattoria まるみ食堂', category: 'restaurant', description: '本格的なピッツァとイタリアン。', imageUrl: 'https://loremflickr.com/400/300/pizza,italian', petFriendly: false, location: { lat: 34.2932738, lng: 134.6605772 } },
  { id: '57', name: '淡路島南PA (上り) フードコート', category: 'restaurant', description: '高速道路PA内の便利なフードコート。', imageUrl: 'https://loremflickr.com/400/300/foodcourt,udon', petFriendly: false, location: { lat: 34.2598445, lng: 134.6818266 } },
  { id: '58', name: '淡路島オニオンキッチン うずの丘店', category: 'restaurant', description: '絶品あわじ島バーガーが味わえる。', imageUrl: 'https://loremflickr.com/400/300/hamburger', petFriendly: false, location: { lat: 34.2544819, lng: 134.6850049 } },
  { id: '59', name: '淡路島南PA (下り) フードコート', category: 'restaurant', description: 'ドライブの休憩に最適。', imageUrl: 'https://loremflickr.com/400/300/ramen,curry', petFriendly: false, location: { lat: 34.2595315, lng: 134.6856259 } },
  { id: '60', name: '季節料理松本', category: 'restaurant', description: '旬の素材を生かした日本料理。', imageUrl: 'https://loremflickr.com/400/300/kaiseki,japanesefood', petFriendly: false, location: { lat: 34.3193113, lng: 134.6914284 } },
  { id: '61', name: '津井の屋台', category: 'restaurant', description: '地元ならではの屋台グルメ。', imageUrl: 'https://loremflickr.com/400/300/yatai,food', petFriendly: false, location: { lat: 34.3188282, lng: 134.6917218 } },
  { id: '62', name: 'KARIKO RESORT ベーカリーカフェ ミサキ', category: 'restaurant', description: '絶景を楽しめるベーカリーカフェ。', imageUrl: 'https://loremflickr.com/400/300/bakery,cafe', petFriendly: true, location: { lat: 34.329753, lng: 134.6866047 } },
  { id: '63', name: 'cafe SPARK', category: 'restaurant', description: 'サイクリストにも人気のカフェ。', imageUrl: 'https://loremflickr.com/400/300/bicycle,cafe', petFriendly: false, location: { lat: 34.3341899, lng: 134.7331789 } },
  { id: '64', name: '小料理 なかお', category: 'restaurant', description: '丁寧に作られた小料理を味わえる。', imageUrl: 'https://loremflickr.com/400/300/cooking,japanesefood', petFriendly: false, location: { lat: 34.3012032, lng: 134.7661422 } },
  // Batch 4 User Spots
  { id: '65', name: '若人の広場公園', category: 'sightseeing', description: '戦没学徒を追悼する公園。建築家・丹下健三氏の設計。', imageUrl: 'https://loremflickr.com/400/300/park,monument', petFriendly: true, location: { lat: 34.2334032, lng: 134.7120699 } },
  { id: '66', name: '淡路島 トトロ', category: 'sightseeing', description: 'まるでトトロのような形をした木。フォトスポットとして人気。', imageUrl: 'https://loremflickr.com/400/300/tree,nature', petFriendly: true, location: { lat: 34.2395639, lng: 134.7110889 } },
  { id: '67', name: '緑の道しるべ 阿那賀公園', category: 'sightseeing', description: '海沿いの美しい公園。散歩や休憩に最適。', imageUrl: 'https://loremflickr.com/400/300/park,sea', petFriendly: true, location: { lat: 34.2827809, lng: 134.6618133 } },
  { id: '68', name: '養宜館跡', category: 'sightseeing', description: '淡路島の歴史を感じる館跡。', imageUrl: 'https://loremflickr.com/400/300/ruins,history', petFriendly: true, location: { lat: 34.3051789, lng: 134.7951258 } },
  { id: '69', name: '叶堂城跡', category: 'sightseeing', description: '室町時代の山城跡。眺望が良い。', imageUrl: 'https://loremflickr.com/400/300/castle,ruins', petFriendly: true, location: { lat: 34.3275595, lng: 134.7333415 } },
  { id: '70', name: '慶野松原プロポーズ街道', category: 'sightseeing', description: '夕陽が美しいロマンチックな散歩道。恋人たちの聖地。', imageUrl: 'https://loremflickr.com/400/300/sunset,road', petFriendly: true, location: { lat: 34.3392707, lng: 134.7356946 } },
  { id: '71', name: '慶野公園', category: 'sightseeing', description: '慶野松原に隣接する公園。松林と海を楽しめる。', imageUrl: 'https://loremflickr.com/400/300/park,pine', petFriendly: true, location: { lat: 34.3481569, lng: 134.7404489 } },
  // Batch 5 Accommodation Spots (Chunk 1)
  { id: '72', name: '貸別荘うみそら', category: 'accommodation', description: '海と空を感じる貸別荘。プライベートな時間を。', imageUrl: 'https://loremflickr.com/400/300/villa,ocean', petFriendly: true, location: { lat: 34.2204901, lng: 134.8243995 } },
  { id: '73', name: 'アグリミュージアムNADA', category: 'accommodation', description: '農業体験もできる宿泊施設。自然を満喫。', imageUrl: 'https://loremflickr.com/400/300/farm,hotel', petFriendly: false, location: { lat: 34.2093286, lng: 134.8141071 } },
  { id: '74', name: 'La maison du sud d\'awaji', category: 'accommodation', description: '南仏プロヴァンス風の貸別荘。', imageUrl: 'https://loremflickr.com/400/300/provence,villa', petFriendly: false, location: { lat: 34.2084278, lng: 134.8146033 } },
  { id: '75', name: '料理民宿 オレンジ荘', category: 'accommodation', description: '新鮮な魚介料理が自慢の民宿。', imageUrl: 'https://loremflickr.com/400/300/ryokan,sashimi', petFriendly: false, location: { lat: 34.209062, lng: 134.81038 } },
  { id: '76', name: 'WORKHOBBY淡路島', category: 'accommodation', description: 'ワーケーションにも最適な宿泊施設。', imageUrl: 'https://loremflickr.com/400/300/workcation,hotel', petFriendly: false, location: { lat: 34.2018955, lng: 134.7977618 } },
  { id: '77', name: 'VILLA RESFEEL', category: 'accommodation', description: 'リゾート感あふれるヴィラでリラックス。', imageUrl: 'https://loremflickr.com/400/300/resort,villa', petFriendly: false, location: { lat: 34.2013223, lng: 134.776934 } },
  { id: '78', name: 'hugging nature house', category: 'accommodation', description: '自然と調和した心地よい滞在。', imageUrl: 'https://loremflickr.com/400/300/nature,house', petFriendly: true, location: { lat: 34.1960373, lng: 134.7355295 } },
  { id: '79', name: 'ハクナマタタ', category: 'accommodation', description: 'アットホームな雰囲気の宿。', imageUrl: 'https://loremflickr.com/400/300/guesthouse,cozy', petFriendly: false, location: { lat: 34.2027159, lng: 134.739866 } },
  { id: '80', name: 'ペンションkimiハウス', category: 'accommodation', description: '素敵なオーナーが迎えるペンション。', imageUrl: 'https://loremflickr.com/400/300/pension,house', petFriendly: false, location: { lat: 34.2153907, lng: 134.7229211 } },
  { id: '81', name: 'AMA TERRASSE', category: 'accommodation', description: '絶景テラスがある宿泊施設。', imageUrl: 'https://loremflickr.com/400/300/terrace,view', petFriendly: false, location: { lat: 34.218306, lng: 134.725844 } },
  { id: '82', name: 'のびのび日和', category: 'accommodation', description: 'のんびりと過ごせる癒やしの宿。', imageUrl: 'https://loremflickr.com/400/300/relax,room', petFriendly: false, location: { lat: 34.2134407, lng: 134.7311868 } },
  { id: '83', name: 'ホテルニューアワジ プラザ淡路島', category: 'accommodation', description: '鳴門海峡を一望できる絶景ホテル。温泉も充実。', imageUrl: 'https://loremflickr.com/400/300/resort,hotel', petFriendly: false, location: { lat: 34.2263169, lng: 134.7048804 } },
  { id: '84', name: 'ホテルニューアワジ プラザ淡路島 別邸蒼空', category: 'accommodation', description: 'ラグジュアリーな空間で過ごす特別な休日。', imageUrl: 'https://loremflickr.com/400/300/luxury,suite', petFriendly: false, location: { lat: 34.2262496, lng: 134.7045504 } },
  { id: '85', name: 'グランドームオルオル', category: 'accommodation', description: 'ドーム型テントでのグランピング体験。', imageUrl: 'https://loremflickr.com/400/300/glamping,dome', petFriendly: false, location: { lat: 34.3074046, lng: 134.8307646 } },
  { id: '86', name: 'Awajishima dog stay. YAGI', category: 'accommodation', description: '愛犬と一緒に泊まれる宿。', imageUrl: 'https://loremflickr.com/400/300/dog,pet', petFriendly: true, location: { lat: 34.2956672, lng: 134.7868604 } },
  { id: '87', name: 'アワジ花ホテル', category: 'accommodation', description: 'ビジネスや観光に便利なホテル。', imageUrl: 'https://loremflickr.com/400/300/hotel,room', petFriendly: false, location: { lat: 34.2856612, lng: 134.7766223 } },
  { id: '88', name: 'Mikoto House', category: 'accommodation', description: '落ち着いた雰囲気の貸別荘。', imageUrl: 'https://loremflickr.com/400/300/house,modern', petFriendly: false, location: { lat: 34.2589987, lng: 134.7375753 } },
  { id: '89', name: '和風&ラン', category: 'accommodation', description: '和の趣を感じる宿。', imageUrl: 'https://loremflickr.com/400/300/japanese,room', petFriendly: false, location: { lat: 34.2503881, lng: 134.7230288 } },
  { id: '90', name: '淡路島 海上ホテル', category: 'accommodation', description: '海の上に建つような絶景ホテル。', imageUrl: 'https://loremflickr.com/400/300/hotel,ocean', petFriendly: false, location: { lat: 34.2493337, lng: 134.7218217 } },
  { id: '91', name: 'クボタ民宿', category: 'accommodation', description: '温かいおもてなしの民宿。', imageUrl: 'https://loremflickr.com/400/300/minshuku,home', petFriendly: false, location: { lat: 34.2555438, lng: 134.7220645 } },
  { id: '92', name: 'フェアフィールド･バイ･マリオット･兵庫淡路島福良', category: 'accommodation', description: '道の駅に隣接するスタイリッシュなホテル。', imageUrl: 'https://loremflickr.com/400/300/marriott,modern', petFriendly: false, location: { lat: 34.2569107, lng: 134.7221847 } },
  { id: '93', name: '長尾屋', category: 'accommodation', description: '歴史ある老舗旅館。', imageUrl: 'https://loremflickr.com/400/300/ryokan,classic', petFriendly: false, location: { lat: 34.258005, lng: 134.718312 } },
  { id: '94', name: '加美屋リゾート淡路 波枕うずしお', category: 'accommodation', description: '海を近くに感じるリゾート宿。', imageUrl: 'https://loremflickr.com/400/300/resort,sea', petFriendly: false, location: { lat: 34.2561237, lng: 134.7143161 } },
  { id: '95', name: 'Private stay Peaceful', category: 'accommodation', description: '一棟貸しのプライベート空間。', imageUrl: 'https://loremflickr.com/400/300/private,house', petFriendly: false, location: { lat: 34.2588011, lng: 134.7095078 } },
  // Batch 5 Accommodation Spots (Chunk 2)
  { id: '96', name: 'とみ栄荘', category: 'accommodation', description: '地元で愛されるアットホームな民宿。', imageUrl: 'https://loremflickr.com/400/300/minshuku,friendly', petFriendly: false, location: { lat: 34.2507905, lng: 134.7073412 } },
  { id: '97', name: '淡路島C-Side｜Hill Top Terrace', category: 'accommodation', description: '高台から海を見下ろす絶景テラス。', imageUrl: 'https://loremflickr.com/400/300/terrace,view', petFriendly: false, location: { lat: 34.2556828, lng: 134.7022469 } },
  { id: '98', name: '淡路島C-Side ｜ Tail Up', category: 'accommodation', description: 'スタイリッシュな内装が魅力の宿。', imageUrl: 'https://loremflickr.com/400/300/stylish,interior', petFriendly: false, location: { lat: 34.2555327, lng: 134.7038052 } },
  { id: '99', name: '淡路島C-Side｜Marine Terrace', category: 'accommodation', description: '海を間近に感じるマリンテラス。', imageUrl: 'https://loremflickr.com/400/300/marine,terrace', petFriendly: false, location: { lat: 34.2556094, lng: 134.7045035 } },
  { id: '100', name: 'Awajishima Marine View', category: 'accommodation', description: 'パノラマビューを楽しめる宿。', imageUrl: 'https://loremflickr.com/400/300/panorama,ocean', petFriendly: false, location: { lat: 34.2552945, lng: 134.7045917 } },
  { id: '101', name: '淡路島C-Side Sky Arena', category: 'accommodation', description: '広々とした空間で開放的な滞在を。', imageUrl: 'https://loremflickr.com/400/300/sky,arena', petFriendly: false, location: { lat: 34.2551769, lng: 134.7039911 } },
  { id: '102', name: '瀬登', category: 'accommodation', description: '静かな海辺の宿。', imageUrl: 'https://loremflickr.com/400/300/sea,inn', petFriendly: false, location: { lat: 34.2545772, lng: 134.7053104 } },
  { id: '103', name: 'Villa LUAR', category: 'accommodation', description: 'モダンで快適なヴィラ。', imageUrl: 'https://loremflickr.com/400/300/modern,villa', petFriendly: false, location: { lat: 34.2539968, lng: 134.7051416 } },
  { id: '104', name: 'designer\'s villa EDGE', category: 'accommodation', description: '洗練されたデザインのヴィラ。', imageUrl: 'https://loremflickr.com/400/300/design,architecture', petFriendly: false, location: { lat: 34.253525, lng: 134.7046804 } },
  { id: '105', name: '休暇村南淡路', category: 'accommodation', description: '自然に囲まれたリゾートホテル。天文台もあり。', imageUrl: 'https://loremflickr.com/400/300/resort,nature', petFriendly: false, location: { lat: 34.2456763, lng: 134.7047732 } },
  { id: '106', name: '料理民宿 浜福', category: 'accommodation', description: '福良湾の新鮮な魚介を堪能できる宿。', imageUrl: 'https://loremflickr.com/400/300/seafood,ryokan', petFriendly: false, location: { lat: 34.2487957, lng: 134.7032553 } },
  { id: '107', name: 'Grand Mercure Awaji Island Resort & Spa', category: 'accommodation', description: '国際的なブランドホテルで優雅なひとときを。', imageUrl: 'https://loremflickr.com/400/300/resort,spa', petFriendly: false, location: { lat: 34.2474905, lng: 134.6990194 } },
  { id: '108', name: '料理民宿 ふじ本', category: 'accommodation', description: '心温まる手料理が人気の民宿。', imageUrl: 'https://loremflickr.com/400/300/homecooking,ryokan', petFriendly: false, location: { lat: 34.250916, lng: 134.684584 } },
  { id: '109', name: 'かるも荘', category: 'accommodation', description: '静かな環境でくつろげる宿。', imageUrl: 'https://loremflickr.com/400/300/quiet,inn', petFriendly: false, location: { lat: 34.247585, lng: 134.686812 } },
  { id: '110', name: '観潮荘', category: 'accommodation', description: 'うずしおに近い絶好のロケーション。', imageUrl: 'https://loremflickr.com/400/300/uzushio,hotel', petFriendly: false, location: { lat: 34.2591726, lng: 134.6747446 } },
  { id: '111', name: '大潮荘', category: 'accommodation', description: '潮騒が聞こえる海辺の宿。', imageUrl: 'https://loremflickr.com/400/300/ocean,sound', petFriendly: false, location: { lat: 34.2578136, lng: 134.6757441 } },
  { id: '112', name: 'しら波荘', category: 'accommodation', description: '美しい白波を望む宿。', imageUrl: 'https://loremflickr.com/400/300/wave,ocean', petFriendly: false, location: { lat: 34.2578621, lng: 134.6764832 } },
  { id: '113', name: 'いび', category: 'accommodation', description: '伊毘港近くの便利な宿。', imageUrl: 'https://loremflickr.com/400/300/port,inn', petFriendly: false, location: { lat: 34.2576256, lng: 134.6760864 } },
  { id: '114', name: 'AZホテル Inn 南あわじ', category: 'accommodation', description: '1組限定の貸切ホテル。', imageUrl: 'https://loremflickr.com/400/300/private,hotel', petFriendly: false, location: { lat: 34.2712404, lng: 134.6722844 } },
  { id: '115', name: '旅館 若潮', category: 'accommodation', description: '若狭の海を満喫できる旅館。', imageUrl: 'https://loremflickr.com/400/300/japanese,sea', petFriendly: false, location: { lat: 34.2731767, lng: 134.6693969 } },
  { id: '116', name: 'ホテルアナガ', category: 'accommodation', description: '優雅な時間を過ごせるオーベルジュリゾート。', imageUrl: 'https://loremflickr.com/400/300/auberge,resort', petFriendly: false, location: { lat: 34.2717229, lng: 134.6650499 } },
  { id: '117', name: 'うずしお温泉 うめ丸', category: 'accommodation', description: 'うずしお温泉と鯛料理が自慢の宿。', imageUrl: 'https://loremflickr.com/400/300/onsen,tai', petFriendly: false, location: { lat: 34.27383, lng: 134.666398 } },
  { id: '118', name: '坂口荘', category: 'accommodation', description: '家庭的な雰囲気の民宿。', imageUrl: 'https://loremflickr.com/400/300/homey,minshuku', petFriendly: false, location: { lat: 34.2766707, lng: 134.6627585 } },
  { id: '119', name: '活魚料理うずしお温泉 寿荘', category: 'accommodation', description: '活魚料理とうずしお温泉を楽しめる。', imageUrl: 'https://loremflickr.com/400/300/onsen,freshfish', petFriendly: false, location: { lat: 34.2859497, lng: 134.6633453 } },
  // Batch 5 Accommodation Spots (Chunk 3)
  { id: '120', name: '松竹館', category: 'accommodation', description: 'ビジネスや長期滞在にも最適。', imageUrl: 'https://loremflickr.com/400/300/business,hotel', petFriendly: false, location: { lat: 34.2877663, lng: 134.6635841 } },
  { id: '121', name: 'うおざき荘', category: 'accommodation', description: '釣り客にも人気の宿。', imageUrl: 'https://loremflickr.com/400/300/fishing,inn', petFriendly: false, location: { lat: 34.289331, lng: 134.663219 } },
  { id: '122', name: '南海荘', category: 'accommodation', description: 'うずしお温泉を楽しめる宿。', imageUrl: 'https://loremflickr.com/400/300/onsen,ryokan', petFriendly: false, location: { lat: 34.2902164, lng: 134.6628706 } },
  { id: '123', name: '繁栄荘', category: 'accommodation', description: 'アットホームで心安らぐ宿。', imageUrl: 'https://loremflickr.com/400/300/cozy,inn', petFriendly: false, location: { lat: 34.2914954, lng: 134.6622101 } },
  { id: '124', name: 'みわ荘', category: 'accommodation', description: '地元の食材を使った料理が自慢。', imageUrl: 'https://loremflickr.com/400/300/food,ryokan', petFriendly: false, location: { lat: 34.293986, lng: 134.658672 } },
  { id: '125', name: 'いづみ丸', category: 'accommodation', description: '漁師宿ならではの新鮮な魚料理。', imageUrl: 'https://loremflickr.com/400/300/fisherman,inn', petFriendly: false, location: { lat: 34.293402, lng: 134.656339 } },
  { id: '126', name: 'seaside resort minamiawaji', category: 'accommodation', description: '海辺で過ごすプライベートリゾート。', imageUrl: 'https://loremflickr.com/400/300/resort,private', petFriendly: false, location: { lat: 34.2973339, lng: 134.6628426 } },
  { id: '127', name: '＋S Villaxury', category: 'accommodation', description: 'ワンランク上のラグジュアリーヴィラ。', imageUrl: 'https://loremflickr.com/400/300/luxury,villa', petFriendly: false, location: { lat: 34.2977194, lng: 134.6631697 } },
  { id: '128', name: '淡路島の貸別荘 パラン', category: 'accommodation', description: 'おしゃれな貸別荘で快適な滞在。', imageUrl: 'https://loremflickr.com/400/300/stylish,cottage', petFriendly: false, location: { lat: 34.3268889, lng: 134.6915603 } },
  { id: '129', name: 'AKESUKE', category: 'accommodation', description: '古民家をリノベーションした宿。', imageUrl: 'https://loremflickr.com/400/300/kominka,renovation', petFriendly: false, location: { lat: 34.3200156, lng: 134.7047525 } },
  { id: '130', name: 'ミナトノミナト', category: 'accommodation', description: '港町の風情を感じる貸別荘。', imageUrl: 'https://loremflickr.com/400/300/port,villa', petFriendly: false, location: { lat: 34.3265221, lng: 134.7295867 } },
  { id: '131', name: 'ミナトノミナト HANARE', category: 'accommodation', description: '隠れ家のような離れで静かな時間を。', imageUrl: 'https://loremflickr.com/400/300/hideout,villa', petFriendly: false, location: { lat: 34.325693, lng: 134.7305238 } },
  { id: '132', name: 'Le Blanche', category: 'accommodation', description: '白を基調とした美しい空間。', imageUrl: 'https://loremflickr.com/400/300/white,interior', petFriendly: false, location: { lat: 34.3014723, lng: 134.7427963 } },
  { id: '133', name: 'Loco Village', category: 'accommodation', description: 'ハワイアンな雰囲気の貸別荘。', imageUrl: 'https://loremflickr.com/400/300/hawaii,villa', petFriendly: false, location: { lat: 34.3315548, lng: 134.7357985 } },
  { id: '134', name: '甍の家', category: 'accommodation', description: '淡路瓦の屋根が特徴的な宿。', imageUrl: 'https://loremflickr.com/400/300/roof,tile', petFriendly: false, location: { lat: 34.33423, lng: 134.7349008 } },
  { id: '135', name: '楽天ステイヴィラ 淡路', category: 'accommodation', description: 'モダンで設備充実のヴィラ。', imageUrl: 'https://loremflickr.com/400/300/stay,villa', petFriendly: false, location: { lat: 34.3348831, lng: 134.7335887 } },
  { id: '136', name: 'ホテルけひの海', category: 'accommodation', description: '慶野松原に佇むリゾートホテル。', imageUrl: 'https://loremflickr.com/400/300/resort,sunset', petFriendly: false, location: { lat: 34.3362379, lng: 134.733714 } },
  { id: '137', name: 'Awajiけいの倶楽部', category: 'accommodation', description: '合宿や研修にも利用できる施設。', imageUrl: 'https://loremflickr.com/400/300/club,training', petFriendly: false, location: { lat: 34.3360465, lng: 134.7343179 } },
  { id: '138', name: 'あわじ浜離宮', category: 'accommodation', description: 'クラシカルな雰囲気が漂うホテル。', imageUrl: 'https://loremflickr.com/400/300/classic,hotel', petFriendly: false, location: { lat: 34.3370017, lng: 134.7342033 } },
  { id: '139', name: 'あわじ浜離宮 別荘 鐸海', category: 'accommodation', description: '全室露天風呂付きの贅沢な別荘。', imageUrl: 'https://loremflickr.com/400/300/onsen,luxury', petFriendly: false, location: { lat: 34.3377644, lng: 134.7345894 } },
  { id: '140', name: '慶和荘', category: 'accommodation', description: 'アットホームなおもてなしの宿。', imageUrl: 'https://loremflickr.com/400/300/hospitality,inn', petFriendly: false, location: { lat: 34.341451, lng: 134.739588 } },
  { id: '141', name: '淡路荘', category: 'accommodation', description: '昔ながらの落ち着いた旅館。', imageUrl: 'https://loremflickr.com/400/300/traditional,ryokan', petFriendly: false, location: { lat: 34.345637, lng: 134.739888 } },
  { id: '142', name: '正治荘', category: 'accommodation', description: '心のこもったサービスが魅力。', imageUrl: 'https://loremflickr.com/400/300/service,inn', petFriendly: false, location: { lat: 34.3466214, lng: 134.7424842 } },
  { id: '143', name: 'ヴィラオルティージャ', category: 'accommodation', description: 'イタリアンテイストのヴィラ。', imageUrl: 'https://loremflickr.com/400/300/italian,villa', petFriendly: false, location: { lat: 34.3485563, lng: 134.7398462 } },
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
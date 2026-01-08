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
  { id: '5', name: '南あわじ温泉郷', category: 'accommodation', description: '鳴門海峡を望む温泉地。泉質豊かな数々の旅館が並びます。', imageUrl: 'https://picsum.photos/id/1030/500/350', petFriendly: false, location: { lat: 34.25, lng: 134.71 }, link: 'http://minamiawaji-onsen.com/' },
  { id: '6', name: '道の駅 うずしお', category: 'restaurant', description: 'あわじ島バーガーなど, 地元グルメの宝庫。大鳴門橋が目の前。', imageUrl: 'https://picsum.photos/id/1035/500/350', petFriendly: true, location: { lat: 34.24, lng: 134.69 }, link: 'https://eki.uzunokuni.com/' },

  // New
  { id: '7', name: 'おのころ島神社', category: 'sightseeing', description: '高さ21.7mの大鳥居は必見。国生み神話ゆかりのパワースポット。', imageUrl: 'https://picsum.photos/id/1040/500/350', petFriendly: true, location: { lat: 34.3, lng: 134.8 }, link: 'https://www.freedom.ne.jp/onokoro/' },
  { id: '8', name: '淡路人形座', category: 'sightseeing', description: '500年の歴史を誇る淡路人形浄瑠璃。伝統芸能の粋を感じる。', imageUrl: 'https://picsum.photos/id/1045/500/350', petFriendly: false, location: { lat: 34.2, lng: 134.7 }, link: 'https://awajiningyoza.com/' },
  { id: '9', name: 'じゃのひれアウトドアリゾート', category: 'sightseeing', description: 'イルカと触れ合える貴重なスポット。', imageUrl: 'https://picsum.photos/id/1050/500/350', petFriendly: true, location: { lat: 34.2355, lng: 134.6853 }, link: 'https://janohire.co.jp/' },
  { id: '10', name: '諭鶴羽神社', category: 'sightseeing', description: '淡路島最高峰、修験道の聖地。', imageUrl: 'https://images.unsplash.com/photo-1624891461427-1481c4ee8001?auto=format&fit=crop&q=80&w=400', petFriendly: true, location: { lat: 34.2346, lng: 134.8145 }, link: 'https://yuzuruha-jinja.jp/' },
  { id: '11', name: '沼島', category: 'sightseeing', description: '国生み神話ゆかりの島。「上立神岩」は必見。', imageUrl: 'https://images.unsplash.com/photo-1549448893-68f7f57321e0?auto=format&fit=crop&q=80&w=400', petFriendly: true, location: { lat: 34.1720, lng: 134.8190 }, link: 'http://nushima-yoshijin.jp/' },
  { id: '12', name: '淡路島モンキーセンター', category: 'sightseeing', description: '野生のニホンザルと触れ合える。', imageUrl: 'https://images.unsplash.com/photo-1543152632-42777421cb83?auto=format&fit=crop&q=80&w=400', petFriendly: false, location: { lat: 34.2451, lng: 134.8833 }, link: 'https://monkey-center.jp/' },
  { id: '13', name: 'G.エルム', category: 'restaurant', description: '地元で愛されるジェラート店。濃厚な淡路島牛乳の風味が絶品。', imageUrl: 'https://picsum.photos/id/1055/500/350', petFriendly: false, location: { lat: 34.24, lng: 134.69 }, link: 'https://tabelog.com/hyogo/A2806/A280603/28003183/' },
  { id: '14', name: '灘黒岩水仙郷', category: 'sightseeing', description: '冬の風物詩。海に落ち込む急斜面に500万本の水仙が咲き誇る。', imageUrl: 'https://picsum.photos/id/1060/500/350', petFriendly: true, location: { lat: 34.18, lng: 134.85 }, link: 'https://www.city.minamiawaji.hyogo.jp/site/suisenkyou/' },
  { id: '15', name: '吹上浜', category: 'sightseeing', description: '白砂青松の美しい海岸。静かな時間を過ごしたい方におすすめ。', imageUrl: 'https://picsum.photos/id/1065/500/350', petFriendly: true, location: { lat: 34.22, lng: 134.65 }, link: 'https://www.awajishima-kanko.jp/manual/detail.php?bid=469' },
  { id: '16', name: '麺屋 蔵', category: 'restaurant', description: '淡路島ポークを使った絶品ラーメン。地元民にも人気の隠れた名店。', imageUrl: 'https://loremflickr.com/500/350/ramen', petFriendly: false, location: { lat: 34.3, lng: 134.75 }, link: 'https://tabelog.com/hyogo/' },
  { id: '17', name: 'カリコリゾート', category: 'sightseeing', description: '愛犬と一緒に楽しめる総合リゾート施設。ドッグランやフォトスポットが充実。', imageUrl: 'https://loremflickr.com/500/350/resort,dog', petFriendly: true, location: { lat: 34.3, lng: 134.7 }, link: 'https://kariko.jp/' },
  { id: '18', name: 'あわじ島アイスクリーム', category: 'restaurant', description: '素材にこだわった手作りアイス。季節限定のフレーバーも楽しみ。', imageUrl: 'https://loremflickr.com/500/350/icecream', petFriendly: false, location: { lat: 34.28, lng: 134.75 }, link: 'https://awajishima-ice.com/' },
  // User Added Spots
  { id: '19', name: '鼓亭', category: 'restaurant', description: '淡路島の手打ちうどんの名店。', imageUrl: 'https://www.tsuzumitei.com/wp-content/uploads/2015/10/top_slide_01.jpg', petFriendly: false, location: { lat: 34.2579689, lng: 134.7210083 }, link: 'https://www.google.com/maps/place/%E9%BC%93%E4%BA%AD/@34.2570628,134.7171275,17z/data=!4m11!1m3!2m2!1z6aOy6aOf5bqX!6e5!3m6!1s0x35535f8b6ca3438d:0xa62b0ac58478e02a!8m2!3d34.2579689!4d134.7210083!15sCgnpo7Lpo5_lupdaDCIK6aOy6aOfIOW6l5IBEHVkb25fbm9vZGxlX3Nob3CaASNDaFpEU1VoTk1HOW5TMFZKUTBGblRVUkJiVGwyVEVwUkVBReABAPoBBAgAECQ!16s%2Fg%2F1td1gtdz?authuser=0&entry=ttu&g_ep=EgoyMDI2MDEwNC4wIKXMDSoASAFQAw%3D%3D' },
  { id: '20', name: 'Giro d\' Awaji', category: 'restaurant', description: '焙煎工房&淡路牛バール。', imageUrl: 'https://loremflickr.com/500/350/beef,steak', petFriendly: false, location: { lat: 34.2567098, lng: 134.7212335 }, link: 'https://www.google.com/maps/place/%E7%84%99%E7%85%8E%E5%B7%A5%E6%88%BF%26%E6%B7%A1%E8%B7%AF%E7%89%9B%E3%83%90%E3%83%BC%E3%83%AB+Giro+d\'+\'Awaji%EF%BC%88%E3%82%B8%E3%83%AD%E3%83%BB%E3%83%87%E3%83%BB%E3%82%A2%E3%83%AF%E3%82%B8%EF%BC%89/@34.2570628,134.7171275,17z/data=!3m1!5s0x35535f8c828b0a83:0xdb5c00b71313b0cc!4m11!1m3!2m2!1z6aOy6aOf5bqX!6e5!3m6!1s0x35535fe448f821d5:0x28e2832736ee800e!8m2!3d34.2567098!4d134.7212335!15sCgnpo7Lpo5_lupdaDCIK6aOy6aOfIOW6l5IBBGNhZmWaASNDaFpEU1VoTk1HOW5TMFZKUTBGblNVUm9jV0pmUjJGQkVBReABAPoBBAgNECY!16s%2Fg%2F1pp2vmz_j?authuser=0&entry=ttu&g_ep=EgoyMDI2MDEwNC4wIKXMDSoASAFQAw%3D%3D' },
  { id: '21', name: '2965 Awajishima', category: 'restaurant', description: '南あわじのレストラン。', imageUrl: 'https://loremflickr.com/500/350/hamburger,cafe', petFriendly: false, location: { lat: 34.2555873, lng: 134.7222894 }, link: 'https://www.google.com/maps/place/2965+Awajishima/@34.2570628,134.7171275,17z/data=!4m11!1m3!2m2!1z6aOy6aOf5bqX!6e5!3m6!1s0x35535fe3a6d0cc9d:0xb49a8a6b6f27f7d6!8m2!3d34.2555873!4d134.7222894!15sCgnpo7Lpo5_lupdaDCIK6aOy6aOfIOW6l5IBCnJlc3RhdXJhbnSaASNDaFpEU1VoTk1HOW5TMFZKUTBGblNVUnFNR1JVUVVwQkVBReABAPoBBAgAEBM!16s%2Fg%2F11t5f2pgvn?authuser=0&entry=ttu&g_ep=EgoyMDI2MDEwNC4wIKXMDSoASAFQAw%3D%3D' },
  { id: '22', name: '野菜酒場なみなみ', category: 'restaurant', description: '淡路島の野菜を楽しめる居酒屋。', imageUrl: 'https://loremflickr.com/500/350/vegetables,izakaya', petFriendly: false, location: { lat: 34.2547688, lng: 134.7046047 }, link: 'https://www.google.com/maps/place/%E9%87%8E%E8%8F%9C%E9%85%92%E6%86%BE%E3%81%AA%E3%81%BF%E3%81%AA%E3%81%BF/@34.254769,134.6776667,14z' },
  { id: '23', name: 'ひらまつ食堂', category: 'restaurant', description: '地元の魚介を使った海鮮料理。', imageUrl: 'https://loremflickr.com/500/350/sashimi,seafood', petFriendly: false, location: { lat: 34.2524827, lng: 134.7086303 }, link: 'https://www.google.com/maps/place/%E3%81%B2%E3%82%89%E3%81%BE%E3%81%A4%E9%A3%9F%E5%A0%82/@34.254769,134.6776667,14z' },
  { id: '24', name: 'オンズ', category: 'restaurant', description: 'くつろげる居酒屋ダイナー。', imageUrl: 'https://loremflickr.com/500/350/diner,food', petFriendly: false, location: { lat: 34.255458, lng: 134.712982 }, link: 'https://www.google.com/maps/place/%E3%82%AA%E3%83%B3%E3%82%BA/@34.2546547,134.6879235,14.5z' },
  { id: '25', name: 'まりも', category: 'restaurant', description: 'ラーメンとお好み焼きの人気店。', imageUrl: 'https://loremflickr.com/500/350/ramen', petFriendly: false, location: { lat: 34.2578884, lng: 134.7161151 }, link: 'https://www.google.com/maps/place/%E3%81%BE%E3%82%8A%E3%82%82/@34.2538107,134.7017018,15.25z' },
  { id: '26', name: 'あや (居酒屋)', category: 'restaurant', description: 'アットホームな居酒屋。', imageUrl: 'https://loremflickr.com/500/350/izakaya', petFriendly: false, location: { lat: 34.257794, lng: 134.717857 }, link: 'https://www.google.com/maps/place/%E3%81%82%E3%82%84+(%E5%B1%85%E9%85%92%E5%B1%8B)/@34.2543256,134.704119,15.5z' },
  { id: '27', name: 'GURUDOG infinity', category: 'restaurant', description: '淡路島ホットドッグとバー。', imageUrl: 'https://loremflickr.com/500/350/hotdog', petFriendly: false, location: { lat: 34.2568412, lng: 134.7194611 }, link: 'https://www.google.com/maps/place/%E6%B7%A1%E8%B7%AF%E5%B3%B6%E3%83%9B%E3%83%83%E3%83%88%E3%83%89%E3%83%83%E3%82%B0GURUDOG%E2%9C%96%EF%B8%8FTHEBAR+infinity/@34.2543256,134.704119,15.5z' },
  { id: '28', name: 'B&T Viet Cafe', category: 'restaurant', description: '本格的なベトナム料理カフェ。', imageUrl: 'https://loremflickr.com/500/350/vietnamesefood', petFriendly: false, location: { lat: 34.256791, lng: 134.7193333 }, link: 'https://www.google.com/maps/place/B%26T+Viet+Cafe/@34.2535579,134.7107375,16.25z' },
  { id: '29', name: 'ぐりるエイト', category: 'restaurant', description: '鉄板焼ステーキ&シーフード。', imageUrl: 'https://www.eonet.ne.jp/~gurirueito/miya.gif', petFriendly: false, location: { lat: 34.2580064, lng: 134.7199986 }, link: 'https://www.google.com/maps/place/%E3%81%90%E3%82%8A%E3%82%8B%E3%82%A8%E3%82%A4%E3%83%88+%E9%89%84%E6%9D%BF%E7%84%BC+%E3%82%B9%E3%83%86%E3%83%BC%E3%82%AD%26%E3%82%B7%E3%83%BC%E3%83%95%E3%83%BC%E3%83%89/@34.2535579,134.7107375,16.25z' },
  { id: '30', name: '淡路島おむすび結結', category: 'restaurant', description: 'ふっくらとした淡路島おにぎり。', imageUrl: 'https://loremflickr.com/500/350/onigiri', petFriendly: false, location: { lat: 34.2582083, lng: 134.7205345 }, link: 'https://www.google.com/maps/place/%E6%B7%A1%E8%B7%AF%E5%B3%B6%E3%81%8A%E3%82%80%E3%81%99%E3%81%B3%E7%B5%90%E7%B5%90/@34.2535579,134.7107375,16.25z' },
  { id: '31', name: '海鮮料理 秀丸', category: 'restaurant', description: '新鮮な海鮮丼などが楽しめる。', imageUrl: 'https://loremflickr.com/500/350/sashimibowl', petFriendly: false, location: { lat: 34.2574963, lng: 134.7201547 }, link: 'https://www.google.com/maps/place/%E6%B5%B7%E9%AE%AE%E6%96%99%E7%90%86+%E7%A7%80%E4%B8%B8/@34.2572658,134.7180587,18.25z' },
  { id: '32', name: '活魚料理 沖', category: 'restaurant', description: '活きのいい魚料理を提供。', imageUrl: 'https://loremflickr.com/500/350/freshfish', petFriendly: false, location: { lat: 34.257475, lng: 134.720193 }, link: 'https://www.google.com/maps/place/%E6%B4%BB%E9%AD%9A%E6%96%99%E7%90%86+%E6%B2%96/@34.2572658,134.7180587,18.25z' },
  // Additional User Spots
  { id: '33', name: 'なるみキッチン＆カフェ', category: 'restaurant', description: 'カジュアルに和食を楽しめるお店。', imageUrl: 'https://loremflickr.com/500/350/japanesefood,cafe', petFriendly: false, location: { lat: 34.288289, lng: 134.789239 }, link: 'https://www.google.com/maps/place/%E3%81%AA%E3%82%8B%E3%81%BF%E3%82%AD%E3%83%83%E3%83%81%E3%83%B3%EF%BC%86%E3%82%AB%E3%83%95%E3%82%A7/@34.256656,134.7163906,16.5z' },
  { id: '34', name: '心鮮料理 万代', category: 'restaurant', description: '新鮮な魚介料理が自慢。', imageUrl: 'https://awaji-mandai.jp/wp-content/uploads/2022/10/main-scaled.jpg', petFriendly: false, location: { lat: 34.257887, lng: 134.723036 }, link: 'https://www.google.com/maps/place/%E5%BF%83%E9%AE%AE%E6%96%99%E7%90%86+%E4%B8%87%E4%BB%A3/@34.256656,134.7163906,16.5z' },
  { id: '35', name: '小家の梵', category: 'restaurant', description: '焼き鳥が美味しい居酒屋。', imageUrl: 'https://loremflickr.com/500/350/yakitori', petFriendly: false, location: { lat: 34.2565498, lng: 134.7229201 }, link: 'https://www.google.com/maps/place/%E5%B0%8F%E5%AE%B6%E3%81%AE%E6%A2%B5/@34.2564349,134.7198075,17.25z' },
  { id: '36', name: '味処 とっくり', category: 'restaurant', description: '地元で人気の和風居酒屋。', imageUrl: 'https://loremflickr.com/500/350/izakaya', petFriendly: false, location: { lat: 34.2563543, lng: 134.7227722 }, link: 'https://www.google.com/maps/place/%E5%91%B3%E5%87%A6+%E3%81%A8%E3%81%A3%E3%81%8F%E3%82%8A/@34.2564349,134.7198075,17.25z' },
  { id: '37', name: '清中', category: 'restaurant', description: '新鮮なネタが揃う寿司店。', imageUrl: 'https://loremflickr.com/500/350/sushi', petFriendly: false, location: { lat: 34.2552683, lng: 134.7232015 }, link: 'https://www.google.com/maps/place/%E6%B8%85%E4%B8%AD/@34.256241,134.7184813,17.25z' },
  { id: '38', name: '三富', category: 'restaurant', description: '地元の食材を使った料理店。', imageUrl: 'http://www.santomi-awj.com/teishoku.jpg', petFriendly: false, location: { lat: 34.271758, lng: 134.7403622 }, link: 'https://www.google.com/maps/place/%E4%B8%89%E5%AF%8C/@34.2564979,134.7026763,13z' },
  { id: '39', name: 'タヴェールナ ガットリベロ', category: 'restaurant', description: '本格的なイタリアンレストラン。', imageUrl: 'https://loremflickr.com/500/350/italianfood', petFriendly: false, location: { lat: 34.2694754, lng: 134.753792 }, link: 'https://www.google.com/maps/place/%E3%82%BF%E3%83%B4%E3%82%A7%E3%83%AB%E3%83%8A+%E3%82%AC%E3%83%83%E3%83%88%E3%83%89%E3%83%83%E3%83%99%E3%83%AD%EF%BC%88Taverna+Gattolibero%EF%BC%89/@34.271758,134.6682644,13z' },
  { id: '40', name: '地魚･地野菜 旬', category: 'restaurant', description: '旬の地魚と野菜を味わえる和食店。', imageUrl: 'https://loremflickr.com/500/350/japanesefood', petFriendly: false, location: { lat: 34.2713325, lng: 134.758215 }, link: 'https://www.google.com/maps/place/%E5%9C%B0%E9%AD%9A%EF%BD%A5%E5%9C%B0%E9%87%8E%E8%8F%9C+%E6%97%AC/@34.271758,134.6682644,13z' },
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
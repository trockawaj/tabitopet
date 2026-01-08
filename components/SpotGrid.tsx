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
  { id: '4', name: 'うずの丘 大鳴門橋記念館', category: 'sightseeing', description: '「たまねぎキャッチャー」で有名な複合施設。絶景レストランも。', imageUrl: 'https://loremflickr.com/500/350/onion,bridge', petFriendly: true, location: { lat: 34.2547535, lng: 134.6846892 }, link: 'https://www.google.com/maps/place/%E3%81%86%E3%81%9A%E3%81%AE%E4%B8%98+%E5%A4%A7%E9%B3%B4%E9%96%80%E6%A9%8B%E8%A8%98%E5%BF%B5%E9%A4%A8/@34.2467166,134.5612588,12z/data=!3m1!5s0x3553606972b7e163:0x2c9a87c0622c46b!4m10!1m2!2m1!1z6Kaz5YWJ!3m6!1s0x3553606972c60c1d:0x12f8132e755001f5!8m2!3d34.2547535!4d134.6846892!15sCgboprPlhYlaCCIG6Kaz5YWJkgESdG91cmlzdF9hdHRyYWN0aW9umgEkQ2hkRFNVaE5NRzluUzBWSlEwRm5UVVJCYW5WSWJWOVJSUkFC4AEA-gEECAAQIQ!16s%2Fg%2F1tf8qxxs?entry=ttu&g_ep=EgoyMDI2MDEwNi4wIKXMDSoASAFQAw%3D%3D' },
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
  // Batch 3 User Spots
  { id: '41', name: 'TRATTORIA amarancia', category: 'restaurant', description: '本格的なイタリア料理を楽しめるトラットリア。', imageUrl: 'https://loremflickr.com/500/350/italian,pasta', petFriendly: false, location: { lat: 34.1923293, lng: 134.7319073 }, link: 'https://www.google.com/maps/place/TRATTORIA+amarancia/@34.1923517,134.6808841,13z/data=!4m11!1m3!2m2!1z6aOy6aOf5bqX!6e5!3m6!1s0x35535f3d66e713f3:0x644eacaccc118491!8m2!3d34.1923293!4d134.7319073!15sCgnpo7Lpo5_lupdaDCIK6aOy6aOfIOW6l5IBCnJlc3RhdXJhbnSaASNDaFpEU1VoTk1HOW5TMFZKUTBGblNVTnVOVXN0WWtKbkVBReABAPoBBAgAEBY!16s%2Fg%2F11vyxmsmw5?entry=ttu&g_ep=EgoyMDI2MDEwNi4wIKXMDSoASAFQAw%3D%3D' },
  { id: '42', name: '海鮮炉端うの', category: 'restaurant', description: '新鮮な魚介を炉端焼きで。', imageUrl: 'https://loremflickr.com/500/350/seafood,grill', petFriendly: false, location: { lat: 34.2827878, lng: 134.7730747 }, link: 'https://www.google.com/maps/place/%E6%B5%B7%E9%AE%AE%E7%82%89%E7%AB%AF%E3%81%86%E3%81%AE/@34.2736961,134.7587737,14z/data=!4m11!1m3!2m2!1z6aOy6aOf5bqX!6e5!3m6!1s0x3554a1000c7693cb:0x457aaded03e3d151!8m2!3d34.2827878!4d134.7730747!15sCgnpo7Lpo5_lupdaDCIK6aOy6aOfIOW6l5IBE2phcGFuZXNlX3Jlc3RhdXJhbnSaASNDaFpEU1VoTk1HOW5TMFZKUTBGblRVTjNka3N5VEZCbkVBReABAPoBBAgAECU!16s%2Fg%2F11y4ybjpm6?entry=ttu&g_ep=EgoyMDI2MDEwNi4wIKXMDSoASAFQAw%3D%3D' },
  { id: '43', name: 'あいご亭', category: 'restaurant', description: '地元で人気の定食屋さん。', imageUrl: 'https://loremflickr.com/500/350/teishoku,japanesefood', petFriendly: false, location: { lat: 34.2837868, lng: 134.7740427 }, link: 'https://www.google.com/maps/place/%E3%81%82%E3%81%84%E3%81%94%E4%BA%AD/@34.2820285,134.7484117,14.5z/data=!4m11!1m3!2m2!1z6aOy6aOf5bqX!6e5!3m6!1s0x3554a17c30c56de7:0x1194989410b79428!8m2!3d34.2837868!4d134.7740427!15sCgnpo7Lpo5_lupdaDCIK6aOy6aOfIOW6l5IBE2phcGFuZXNlX3Jlc3RhdXJhbnSaASNDaFpEU1VoTk1HOW5TMFZKUTBGblNVTnNjamhUTkVsbkVBReABAPoBBQjAARAk!16s%2Fg%2F11p5nrtn_n?entry=ttu&g_ep=EgoyMDI2MDEwNi4wIKXMDSoASAFQAw%3D%3D' },
  { id: '44', name: '洋食屋さん 谷やんの店', category: 'restaurant', description: '昔ながらの洋食屋さん。', imageUrl: 'https://loremflickr.com/500/350/yoshoku,curry', petFriendly: false, location: { lat: 34.2868785, lng: 134.7729916 }, link: 'https://www.google.com/maps/place/%E6%B4%8B%E9%A3%9F%E5%B1%8B%E3%81%95%E3%82%93+%E8%B0%B7%E3%82%84%E3%82%93%E3%81%AE%E5%BA%97/@34.2820285,134.7484117,14.5z/data=!4m11!1m3!2m2!1z6aOy6aOf5bqX!6e5!3m6!1s0x3554a13464ac67b9:0x8b8546995a248c05!8m2!3d34.2868785!4d134.7729916!15sCgnpo7Lpo5_lupdaDCIK6aOy6aOfIOW6l5IBEndlc3Rlcm5fcmVzdGF1cmFudJoBJENoZERTVWhOTUc5blMwVkpRMEZuU1VSa0xXVm1kVGhSUlJBQuABAPoBBQihARAn!16s%2Fg%2F1tm08n6h?entry=ttu&g_ep=EgoyMDI2MDEwNi4wIKXMDSoASAFQAw%3D%3D' },
  { id: '45', name: 'Kitchen Yocchi', category: 'restaurant', description: 'アットホームなキッチンカフェ。', imageUrl: 'https://loremflickr.com/500/350/cafe,lunch', petFriendly: false, location: { lat: 34.2887963, lng: 134.7799798 }, link: 'https://www.google.com/maps/place/Kitchen+Yocchi/@34.2824155,134.759837,14.25z/data=!4m11!1m3!2m2!1z6aOy6aOf5bqX!6e5!3m6!1s0x3554a7d82caa67d1:0xc592faa4e25851c9!8m2!3d34.2887963!4d134.7799798!15sCgnpo7Lpo5_lupdaDCIK6aOy6aOfIOW6l5IBEndlc3Rlcm5fcmVzdGF1cmFudJoBJENoZERTVWhOTUc5blMwVkpRMEZuU1VOaWVWbHBSM0IzUlJBQuABAPoBBAgnECM!16s%2Fg%2F11rkg5cl5t?entry=ttu&g_ep=EgoyMDI2MDEwNi4wIKXMDSoASAFQAw%3D%3D' },
  { id: '46', name: '和い和い', category: 'restaurant', description: 'みんなでワイワイ楽しめる居酒屋。', imageUrl: 'https://loremflickr.com/500/350/izakaya', petFriendly: false, location: { lat: 34.2904959, lng: 134.7801933 }, link: 'https://www.google.com/maps/place/%E5%92%8C%E3%81%84%E5%92%8C%E3%81%84/@34.2824155,134.759837,14.25z/data=!4m11!1m3!2m2!1z6aOy6aOf5bqX!6e5!3m6!1s0x3554a76d32db07af:0x61712ad8a7712b5b!8m2!3d34.2904959!4d134.7801933!15sCgnpo7Lpo5_lupdaDCIK6aOy6aOfIOW6l5IBG2phcGFuZXNlX2l6YWtheWFfcmVzdGF1cmFudJoBRENpOURRVWxSUVVOdlpFTm9kSGxqUmpsdlQyMDVSVXhWTUhSbGEzQllWRVZTTldWWFZucGFSMVUwWlZock1HSlhZeEFC4AEA-gEECAAQJg!16s%2Fg%2F11vf5b35yg?entry=ttu&g_ep=EgoyMDI2MDEwNi4wIKXMDSoASAFQAw%3D%3D' },
  { id: '47', name: '鳴門屋', category: 'restaurant', description: '地元で愛されるカジュアルな和食店。', imageUrl: 'https://loremflickr.com/500/350/japanesefood', petFriendly: false, location: { lat: 34.2999514, lng: 134.7727686 }, link: 'https://www.google.com/maps/place/%E9%B3%B4%E9%96%80%E5%B1%8B/@34.2954792,134.7440193,13z/data=!4m11!1m3!2m2!1z6aOy6aOf5bqX!6e5!3m6!1s0x3554a15265ef8163:0x6019f52d01f0955c!8m2!3d34.2999514!4d134.7727686!15sCgnpo7Lpo5_lupdaDCIK6aOy6aOfIOW6l5IBIGNhc3VhbF9qYXBhbmVzZV9zdHlsZV9yZXN0YXVyYW50mgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVVJPYm1FeVdrbDNFQUXgAQD6AQUIjgEQJA!16s%2Fg%2F1tgm0pln?entry=ttu&g_ep=EgoyMDI2MDEwNi4wIKXMDSoASAFQAw%3D%3D' },
  { id: '48', name: 'ベトナム ビストロ Onion', category: 'restaurant', description: '本格ベトナム料理と淡路島玉ねぎのコラボ。', imageUrl: 'https://loremflickr.com/500/350/vietnamesefood,pho', petFriendly: false, location: { lat: 34.3013659, lng: 134.7524744 }, link: 'https://www.google.com/maps/place/%E3%83%99%E3%83%88%E3%83%8A%E3%83%A0+%E3%83%93%E3%82%B9%E3%83%88%E3%83%AD+Onion/@34.2999119,134.7007084,13z/data=!4m11!1m3!2m2!1z6aOy6aOf5bqX!6e5!3m6!1s0x3554a14af7cedc3d:0xc56537403873f0b4!8m2!3d34.3013659!4d134.7524744!15sCgnpo7Lpo5_lupdaDCIK6aOy6aOfIOW6l5IBFXZpZXRuYW1lc2VfcmVzdGF1cmFudJoBJENoZERTVWhOTUc5blMwVkpRMEZuVFVOSmVrbHhiM0ozUlJBQuABAPoBBQjeAhAn!16s%2Fg%2F11wfx14z2x?entry=ttu&g_ep=EgoyMDI2MDEwNi4wIKXMDSoASAFQAw%3D%3D' },
  { id: '49', name: '玉ねぎ倉庫跡地 志知カフェ', category: 'restaurant', description: '倉庫をリノベーションしたお洒落カフェ。', imageUrl: 'https://loremflickr.com/500/350/cafe,renovation', petFriendly: false, location: { lat: 34.3001385, lng: 134.7832684 }, link: 'https://www.google.com/maps/place/%E7%8E%89%E3%81%AD%E3%81%8E%E5%80%89%E5%BA%AB%E8%B7%A1%E5%9C%B0+%E5%BF%97%E7%9F%A5%E3%82%AB%E3%83%95%E3%82%A7/@34.2999119,134.7007084,13z/data=!4m11!1m3!2m2!1z6aOy6aOf5bqX!6e5!3m6!1s0x3554a10e76aaec3d:0x6fb6b53e1f23148a!8m2!3d34.3001385!4d134.7832684!15sCgnpo7Lpo5_lupdaDCIK6aOy6aOfIOW6l5IBBGNhZmWaASNDaFpEU1VoTk1HOW5TMFZKUTBGblRVUkpNaTFNYkZWUkVBReABAPoBBAgAEB0!16s%2Fg%2F12qgsy7cn?entry=ttu&g_ep=EgoyMDI2MDEwNi4wIKXMDSoASAFQAw%3D%3D' },
  { id: '50', name: 'ファーマーズキッチン', category: 'restaurant', description: '地元の農産物をふんだんに使ったキッチン。', imageUrl: 'https://loremflickr.com/500/350/vegetables,kitchen', petFriendly: false, location: { lat: 34.3122647, lng: 134.796554 }, link: 'https://www.google.com/maps/place/%E3%83%95%E3%82%A1%E3%83%BC%E3%83%9E%E3%83%BC%E3%82%BA%E3%82%AD%E3%83%83%E3%83%81%E3%83%B3/@34.2921991,134.6868016,12.25z/data=!4m11!1m3!2m2!1z6aOy6aOf5bqX!6e5!3m6!1s0x3554a43e5e2e6165:0xda0316a71f13c586!8m2!3d34.3122647!4d134.796554!15sCgnpo7Lpo5_lupdaDCIK6aOy6aOfIOW6l5IBCXNuYWNrX2JhcpoBI0NoWkRTVWhOTUc5blMwVlBabWcwTjBSMWMyTXljVU5uRUFF4AEA-gEECAoQIg!16s%2Fg%2F11f1rb0n92?entry=ttu&g_ep=EgoyMDI2MDEwNi4wIKXMDSoASAFQAw%3D%3D' },
  { id: '51', name: '喜久', category: 'restaurant', description: '落ち着いた雰囲気の和食店。', imageUrl: 'https://loremflickr.com/500/350/japanesefood,kaiseki', petFriendly: false, location: { lat: 34.3221605, lng: 134.7728011 }, link: 'https://www.google.com/maps/place/%E5%96%9C%E4%B9%85+%2F+%E3%90%82%E4%B9%85%EF%BC%88%E3%81%8D%E3%81%8F%EF%BC%89/@34.2921991,134.6868016,12.25z/data=!4m11!1m3!2m2!1z6aOy6aOf5bqX!6e5!3m6!1s0x3554a3f42e7413f9:0xcb6f0ffefc34c1d5!8m2!3d34.3221605!4d134.7728011!15sCgnpo7Lpo5_lupdaDCIK6aOy6aOfIOW6l5IBE2phcGFuZXNlX3Jlc3RhdXJhbnSaASRDaGREU1VoTk1HOW5TMFZKUTBGblNVTlBORnBVT0RsM1JSQULgAQD6AQQIABAY!16s%2Fg%2F1tflvqkw?entry=ttu&g_ep=EgoyMDI2MDEwNi4wIKXMDSoASAFQAw%3D%3D' },
  { id: '52', name: '木村SHOKUDO', category: 'restaurant', description: '地元で愛される食堂。', imageUrl: 'https://loremflickr.com/500/350/shokudo,lunch', petFriendly: false, location: { lat: 34.3271174, lng: 134.7474254 }, link: 'https://www.google.com/maps/place/%E6%9C%A8%E6%9D%91SHOKUDO/@34.3121984,134.7320679,13.75z/data=!4m11!1m3!2m2!1z6aOy6aOf5bqX!6e5!3m6!1s0x3554a3d07e2b1ea1:0x61ba125edb9e0ecb!8m2!3d34.3271174!4d134.7474254!15sCgnpo7Lpo5_lupdaDCIK6aOy6aOfIOW6l5IBE2phcGFuZXNlX3Jlc3RhdXJhbnSaAURDaTlEUVVsUlFVTnZaRU5vZEhsalJqbHZUMnN4ZEZkdVNYbGlhMlIzVWtoc1NHRXhXbXRQUjBaMlltdFdTRTF0WXhBQuABAPoBBAhWEBc!16s%2Fg%2F1tj7yt84?entry=ttu&g_ep=EgoyMDI2MDEwNi4wIKXMDSoASAFQAw%3D%3D' },
  { id: '53', name: 'みなと食堂Porto', category: 'restaurant', description: '港の近くにあるモダンな居酒屋。', imageUrl: 'https://loremflickr.com/500/350/izakaya,port', petFriendly: false, location: { lat: 34.3241833, lng: 134.7354536 }, link: 'https://www.google.com/maps/place/%E3%81%BF%E3%81%AA%E3%81%A8%E9%A3%9F%E5%A0%82Porto/@34.3246348,134.6915601,13.75z/data=!4m11!1m3!2m2!1z6aOy6aOf5bqX!6e5!3m6!1s0x3554a1fbdc583063:0xa3d61672d8f795ac!8m2!3d34.3241833!4d134.7354536!15sCgnpo7Lpo5_lupdaDCIK6aOy6aOfIOW6l5IBG21vcmRlcm5faXpha2F5YV9yZXN0YXVyYW50c5oBI0NoWkRTVWhOTUc5blMwVkpRMEZuU1VOd2FHTnlka2RuRUFF4AEA-gEECC4QIw!16s%2Fg%2F11ty4fc2bh?entry=ttu&g_ep=EgoyMDI2MDEwNi4wIKXMDSoASAFQAw%3D%3D' },
  { id: '54', name: '淡路島さと味', category: 'restaurant', description: '淡路島の海の幸を堪能できるお店。', imageUrl: 'https://loremflickr.com/500/350/sashimi,seafood', petFriendly: false, location: { lat: 34.3269554, lng: 134.7317982 }, link: 'https://www.google.com/maps/place/%E6%B7%A1%E8%B7%AF%E5%B3%B6%E3%81%95%E3%81%A8%E5%91%B3/@34.3246348,134.6915601,13.75z/data=!3m1!5s0x3554a1876efc367b:0x15c0c80a6e017b11!4m11!1m3!2m2!1z6aOy6aOf5bqX!6e5!3m6!1s0x3554a1876e4caa81:0x683f2f0fa758d35a!8m2!3d34.3269554!4d134.7317982!15sCgnpo7Lpo5_lupdaDCIK6aOy6aOfIOW6l5IBEnNlYWZvb2RfcmVzdGF1cmFudJoBJENoZERTVWhOTUc5blMwVkpRMEZuU1VNdE5ITXRjV2xSUlJBQuABAPoBBAgQECM!16s%2Fg%2F1tknh8nl?entry=ttu&g_ep=EgoyMDI2MDEwNi4wIKXMDSoASAFQAw%3D%3D' },
  { id: '55', name: 'かまたに鮮魚店 海鮮', category: 'restaurant', description: '鮮魚店直営の新鮮な海鮮料理。', imageUrl: 'https://loremflickr.com/500/350/freshfish,sashimi', petFriendly: false, location: { lat: 34.3267222, lng: 134.7301139 }, link: 'https://www.google.com/maps/place/%E3%81%8B%E3%81%BE%E3%81%9F%E3%81%AB%E9%AE%AE%E9%AD%9A%E5%BA%97+%E6%B5%B7%E9%AE%AE/@34.3246348,134.6915601,13.75z/data=!4m11!1m3!2m2!1z6aOy6aOf5bqX!6e5!3m6!1s0x3554a187b6f9b571:0x6bd58b741b32eac8!8m2!3d34.3267222!4d134.7301139!15sCgnpo7Lpo5_lupdaDCIK6aOy6aOfIOW6l5IBEnNlYWZvb2RfcmVzdGF1cmFudJoBJENoZERTVWhOTUc5blMwVkpRMEZuU1VOYU4xQlhPWFZSUlJBQuABAPoBBAgzECQ!16s%2Fg%2F1tg9kz5c?entry=ttu&g_ep=EgoyMDI2MDEwNi4wIKXMDSoASAFQAw%3D%3D' },
  { id: '56', name: 'Pizzeria e Trattoria まるみ食堂', category: 'restaurant', description: '本格的なピッツァとイタリアン。', imageUrl: 'https://loremflickr.com/500/350/pizza,italian', petFriendly: false, location: { lat: 34.2932738, lng: 134.6605772 }, link: 'https://www.google.com/maps/place/Pizzeria+e+Trattoria+%E3%81%BE%E3%82%8B%E3%81%BF%E9%A3%9F%E5%A0%82/@34.328133,134.5849475,12.75z/data=!4m11!1m3!2m2!1z6aOy6aOf5bqX!6e5!3m6!1s0x35549fdcfd3f40f1:0x4d4c400a67c19c6!8m2!3d34.2932738!4d134.6605772!15sCgnpo7Lpo5_lupdaDCIK6aOy6aOfIOW6l5IBEml0YWxpYW5fcmVzdGF1cmFudJoBI0NoWkRTVWhOTUc5blMwVkpRMEZuVFVSbk0wNURkbUZCRUFF4AEA-gEECA8QJw!16s%2Fg%2F11p67nf2vx?entry=ttu&g_ep=EgoyMDI2MDEwNi4wIKXMDSoASAFQAw%3D%3D' },
  { id: '57', name: '淡路島南PA (上り) フードコート', category: 'restaurant', description: '高速道路PA内の便利なフードコート。', imageUrl: 'https://loremflickr.com/500/350/foodcourt,udon', petFriendly: false, location: { lat: 34.2598445, lng: 134.6818266 }, link: 'https://www.google.com/maps/place/%E3%83%95%E3%83%BC%E3%83%89%E3%82%B3%E3%83%BC%E3%83%88+%E6%B7%A1%E8%B7%AF%E5%B3%B6%E5%8D%97PA+%EF%BC%88%E4%B8%8A%E3%82%8A%EF%BC%89/@34.2961388,134.6231216,13.25z/data=!4m11!1m3!2m2!1z6aOy6aOf5bqX!6e5!3m6!1s0x35536168b10b1261:0x48a5e135c92e1a81!8m2!3d34.2598445!4d134.6818266!15sCgnpo7Lpo5_lupdaDCIK6aOy6aOfIOW6l5IBCmZvb2RfY291cnSaASRDaGREU1VoTk1HOW5TMFZKUTBGblNVUXhPVXQ2Wm5sQlJSQULgAQD6AQQILRAn!16s%2Fg%2F11kpsmppvh?entry=ttu&g_ep=EgoyMDI2MDEwNi4wIKXMDSoASAFQAw%3D%3D' },
  { id: '58', name: '淡路島オニオンキッチン うずの丘店', category: 'restaurant', description: '絶品あわじ島バーガーが味わえる。', imageUrl: 'https://loremflickr.com/500/350/hamburger', petFriendly: false, location: { lat: 34.2544819, lng: 134.6850049 }, link: 'https://www.google.com/maps/place/%E3%81%82%E3%82%8F%E3%81%98%E5%B3%B6%E3%83%90%E3%83%BC%E3%82%AC%E3%83%BC+%E6%B7%A1%E8%B7%AF%E5%B3%B6%E3%82%AA%E3%83%8B%E3%82%AA%E3%83%B3%E3%82%AD%E3%83%83%E3%83%81%E3%83%B3+%E3%81%86%E3%81%9A%E3%81%AE%E4%B8%98%E5%BA%97/@34.2961388,134.6231216,13.25z/data=!3m1!5s0x3553606972b7e163:0x2c9a87c0622c46b!4m11!1m3!2m2!1z6aOy6aOf5bqX!6e5!3m6!1s0x35536069728553cb:0x3a485170b73749e!8m2!3d34.2544819!4d134.6850049!15sCgnpo7Lpo5_lupdaDCIK6aOy6aOfIOW6l5IBFGhhbWJ1cmdlcl9yZXN0YXVyYW50mgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVVJTTW1OMWMyVm5FQUXgAQD6AQUIggIQIA!16s%2Fg%2F11bwpttk_j?entry=ttu&g_ep=EgoyMDI2MDEwNi4wIKXMDSoASAFQAw%3D%3D' },
  { id: '59', name: '淡路島南PA (下り) フードコート', category: 'restaurant', description: 'ドライブの休憩に最適。', imageUrl: 'https://loremflickr.com/500/350/ramen,curry', petFriendly: false, location: { lat: 34.2595315, lng: 134.6856259 }, link: 'https://www.google.com/maps/place/%E3%83%95%E3%83%BC%E3%83%89%E3%82%B3%E3%83%BC%E3%83%88+%E6%B7%A1%E8%B7%AF%E5%B3%B6%E5%8D%97+PA+(%E4%B8%8B%E3%82%8A)/@34.2961388,134.6231216,13.25z/data=!4m11!1m3!2m2!1z6aOy6aOf5bqX!6e5!3m6!1s0x3553604028337a25:0x7e9dbc257e861813!8m2!3d34.2595315!4d134.6856259!15sCgnpo7Lpo5_lupdaDCIK6aOy6aOfIOW6l5IBCmZvb2RfY291cnSaASNDaFpEU1VoTk1HOW5TMFZPUzFwMGNHNXhhemg1Y2s5M0VBReABAPoBBAgUEBo!16s%2Fg%2F1tl8hjnl?entry=ttu&g_ep=EgoyMDI2MDEwNi4wIKXMDSoASAFQAw%3D%3D' },
  { id: '60', name: '季節料理松本', category: 'restaurant', description: '旬の素材を生かした日本料理。', imageUrl: 'https://loremflickr.com/500/350/kaiseki,japanesefood', petFriendly: false, location: { lat: 34.3193113, lng: 134.6914284 }, link: 'https://www.google.com/maps/place/%E5%AD%A3%E7%AF%80%E6%96%99%E7%90%86%E6%9D%BE%E6%9C%AC/@34.3040389,134.657152,14.25z/data=!4m11!1m3!2m2!1z6aOy6aOf5bqX!6e5!3m6!1s0x35549f655504197d:0x540b7a9159f63635!8m2!3d34.3193113!4d134.6914284!15sCgnpo7Lpo5_lupdaDCIK6aOy6aOfIOW6l5IBE2phcGFuZXNlX3Jlc3RhdXJhbnSaASNDaFpEU1VoTk1HOW5TMFZKUTBGblNVTlhlbTkxUmxCbkVBReABAPoBBQiXARAd!16s%2Fg%2F1tcxb0f3?entry=ttu&g_ep=EgoyMDI2MDEwNi4wIKXMDSoASAFQAw%3D%3D' },
  { id: '61', name: '津井の屋台', category: 'restaurant', description: '地元ならではの屋台グルメ。', imageUrl: 'https://loremflickr.com/500/350/yatai,food', petFriendly: false, location: { lat: 34.3188282, lng: 134.6917218 }, link: 'https://www.google.com/maps/place/%E6%B4%A5%E4%BA%95%E3%81%AE%E5%B1%8B%E5%8F%B0/@34.3040389,134.657152,14.25z/data=!4m11!1m3!2m2!1z6aOy6aOf5bqX!6e5!3m6!1s0x35549f0006a0e287:0xc51c59547f3cc34f!8m2!3d34.3188282!4d134.6917218!15sCgnpo7Lpo5_lupdaDCIK6aOy6aOfIOW6l5IBCnJlc3RhdXJhbnSaAURDaTlEUVVsUlFVTnZaRU5vZEhsalJqbHZUMnRrUkZOSGVHOWFXR3hUVG10ck5WTnRjSEpUYlhoelZHMW9NR1JZWXhBQuABAPoBBAhpEBQ!16s%2Fg%2F11y51f6s5c?entry=ttu&g_ep=EgoyMDI2MDEwNi4wIKXMDSoASAFQAw%3D%3D' },
  { id: '62', name: 'KARIKO RESORT ベーカリーカフェ ミサキ', category: 'restaurant', description: '絶景を楽しめるベーカリーカフェ。', imageUrl: 'https://loremflickr.com/500/350/bakery,cafe', petFriendly: true, location: { lat: 34.329753, lng: 134.6866047 }, link: 'https://www.google.com/maps/place/KARIKO+RESORT+%E3%83%99%E3%83%BC%E3%82%AB%E3%83%AA%E3%83%BC%E3%82%AB%E3%83%95%E3%82%A7+%E3%83%9F%E3%82%B5%E3%82%AD/@34.3040389,134.657152,14.25z/data=!4m10!1m3!2m2!1z6aOy6aOf5bqX!6e5!3m5!1s0x35549f803de6bc51:0x5b61d11af9f28edf!8m2!3d34.329753!4d134.6866047!16s%2Fg%2F11pxrpjc0f?entry=ttu&g_ep=EgoyMDI2MDEwNi4wIKXMDSoASAFQAw%3D%3D' },
  { id: '63', name: 'cafe SPARK', category: 'restaurant', description: 'サイクリストにも人気のカフェ。', imageUrl: 'https://loremflickr.com/500/350/bicycle,cafe', petFriendly: false, location: { lat: 34.3341899, lng: 134.7331789 }, link: 'https://www.google.com/maps/place/cafe+SPARK/@34.3727125,134.5639509,11.75z/data=!4m10!1m3!2m2!1z6aOy6aOf5bqX!6e5!3m5!1s0x3554a3fb0e59a6ef:0xe9fbb5440ff73bcc!8m2!3d34.3341899!4d134.7331789!16s%2Fg%2F11s5p5dv4d?entry=ttu&g_ep=EgoyMDI2MDEwNi4wIKXMDSoASAFQAw%3D%3D' },
  { id: '64', name: '小料理 なかお', category: 'restaurant', description: '丁寧に作られた小料理を味わえる。', imageUrl: 'https://loremflickr.com/500/350/cooking,japanesefood', petFriendly: false, location: { lat: 34.3012032, lng: 134.7661422 }, link: 'https://www.google.com/maps/place/%E5%B0%8F%E6%96%99%E7%90%86+%E3%81%AA%E3%81%8B%E3%81%8A/@34.3727125,134.5639509,11.75z/data=!4m10!1m3!2m2!1z6aOy6aOf5bqX!6e5!3m5!1s0x3554a1f025902159:0xf5e95cb924e1194b!8m2!3d34.3012032!4d134.7661422!16s%2Fg%2F11jp11qk7k?entry=ttu&g_ep=EgoyMDI2MDEwNi4wIKXMDSoASAFQAw%3D%3D' },
  // Batch 4 User Spots
  { id: '65', name: '若人の広場公園', category: 'sightseeing', description: '戦没学徒を追悼する公園。建築家・丹下健三氏の設計。', imageUrl: 'https://loremflickr.com/500/350/park,monument', petFriendly: true, location: { lat: 34.2334032, lng: 134.7120699 }, link: 'https://www.google.com/maps/place/%E8%8B%A5%E4%BA%BA%E3%81%AE%E5%BA%83%E5%A0%B4%E5%85%AC%E5%9C%92/@34.233377,134.5907845,12z/data=!4m10!1m2!2m1!1z6Kaz5YWJ!3m6!1s0x35535fcdcf73dfb1:0xd404499176035b28!8m2!3d34.2334032!4d134.7120699!15sCgboprPlhYlaCCIG6Kaz5YWJkgEEcGFya5oBJENoZERTVWhOTUc5blMwVkpRMEZuU1VOU2VIQkRSbDlSUlJBQuABAPoBBAgAEBg!16s%2Fg%2F1221mtmp?entry=ttu&g_ep=EgoyMDI2MDEwNi4wIKXMDSoASAFQAw%3D%3D' },
  { id: '66', name: '淡路島 トトロ', category: 'sightseeing', description: 'まるでトトロのような形をした木。フォトスポットとして人気。', imageUrl: 'https://loremflickr.com/500/350/tree,nature', petFriendly: true, location: { lat: 34.2395639, lng: 134.7110889 }, link: 'https://www.google.com/maps/place/%E6%B7%A1%E8%B7%AF%E5%B3%B6+%E3%83%88%E3%83%88%E3%83%AD/@34.233377,134.5907845,12z/data=!4m10!1m2!2m1!1z6Kaz5YWJ!3m6!1s0x35535f006a733f8d:0x6fb8b6f7202c4066!8m2!3d34.2395639!4d134.7110889!15sCgboprPlhYlaCCIG6Kaz5YWJkgESdG91cmlzdF9hdHRyYWN0aW9umgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVU5RY2t4SFFsVlJFQUXgAQD6AQQIABAZ!16s%2Fg%2F11wh9ctd_t?entry=ttu&g_ep=EgoyMDI2MDEwNi4wIKXMDSoASAFQAw%3D%3D' },
  { id: '67', name: '緑の道しるべ 阿那賀公園', category: 'sightseeing', description: '海沿いの美しい公園。散歩や休憩に最適。', imageUrl: 'https://loremflickr.com/500/350/park,sea', petFriendly: true, location: { lat: 34.2827809, lng: 134.6618133 }, link: 'https://www.google.com/maps/place/%E7%B7%91%E3%81%AE%E9%81%93%E3%81%97%E3%82%8B%E3%81%B9+%E9%98%BF%E9%82%A3%E8%B3%80%E5%85%AC%E5%9C%92/@34.2467166,134.5612588,12z/data=!4m10!1m2!2m1!1z6Kaz5YWJ!3m6!1s0x355361d3160c9d35:0x54700a49afe36c72!8m2!3d34.2827809!4d134.6618133!15sCgboprPlhYlaCCIG6Kaz5YWJkgEEcGFya5oBI0NoWkRTVWhOTUc5blMwVkpRMEZuU1VNM2EzVnRXV05CRUFF4AEA-gEECAAQJQ!16s%2Fg%2F11bxffj195?entry=ttu&g_ep=EgoyMDI2MDEwNi4wIKXMDSoASAFQAw%3D%3D' },
  { id: '68', name: '養宜館跡', category: 'sightseeing', description: '淡路島の歴史を感じる館跡。', imageUrl: 'https://loremflickr.com/500/350/ruins,history', petFriendly: true, location: { lat: 34.3051789, lng: 134.7951258 }, link: 'https://www.google.com/maps/place/%E9%A4%8A%E5%AE%9C%E9%A4%A8%E8%B7%A1/@34.2640265,134.6161904,12z/data=!4m10!1m2!2m1!1z6Kaz5YWJ!3m6!1s0x3554a4228eb99a6b:0x8f33e6794b862f5!8m2!3d34.3051789!4d134.7951258!15sCgboprPlhYlaCCIG6Kaz5YWJkgETaGlzdG9yaWNhbF9sYW5kbWFya5oBJENoZERTVWhOTUc5blMwVkpRMEZuU1VReVoxQklRelJCUlJBQuABAPoBBAgVEB8!16s%2Fg%2F11c1w39f5k?entry=ttu&g_ep=EgoyMDI2MDEwNi4wIKXMDSoASAFQAw%3D%3D' },
  { id: '69', name: '叶堂城跡', category: 'sightseeing', description: '室町時代の山城跡。眺望が良い。', imageUrl: 'https://loremflickr.com/500/350/castle,ruins', petFriendly: true, location: { lat: 34.3275595, lng: 134.7333415 }, link: 'https://www.google.com/maps/place/%E5%8F%B6%E5%A0%82%E5%9F%8E%E8%B7%A1/@34.290996,134.6638602,12.75z/data=!4m10!1m2!2m1!1z6Kaz5YWJ!3m6!1s0x3554a22aefed953d:0xa2ee91d829f503f1!8m2!3d34.3275595!4d134.7333415!15sCgboprPlhYlaCCIG6Kaz5YWJkgETaGlzdG9yaWNhbF9sYW5kbWFya5oBI0NoWkRTVWhOTUc5blMwVkpRMEZuU1VOc09HWTNaRlpuRUFF4AEA-gEECBMQGw!16s%2Fg%2F11cs4y9rl3?entry=ttu&g_ep=EgoyMDI2MDEwNi4wIKXMDSoASAFQAw%3D%3D' },
  { id: '70', name: '慶野松原プロポーズ街道', category: 'sightseeing', description: '夕陽が美しいロマンチックな散歩道。恋人たちの聖地。', imageUrl: 'https://loremflickr.com/500/350/sunset,road', petFriendly: true, location: { lat: 34.3392707, lng: 134.7356946 }, link: 'https://www.google.com/maps/place/%E6%85%B6%E9%87%8E%E6%9D%BE%E5%8E%9F%E3%83%97%E3%83%AD%E3%83%9D%E3%83%BC%E3%82%BA%E8%A1%97%E9%81%93/@34.290996,134.6638602,12.75z/data=!4m10!1m2!2m1!1z6Kaz5YWJ!3m6!1s0x3554a6b2400fb6e1:0x91bc85881fb2509d!8m2!3d34.3392707!4d134.7356946!15sCgboprPlhYlaCCIG6Kaz5YWJkgESdG91cmlzdF9hdHRyYWN0aW9umgEjQ2haRFNVaE5NRzluUzBWS2NVbDVkSFpoYjNGcUxXWm5FQUXgAQD6AQQIABAY!16s%2Fg%2F1hc8ld2zv?entry=ttu&g_ep=EgoyMDI2MDEwNi4wIKXMDSoASAFQAw%3D%3D' },
  { id: '71', name: '慶野公園', category: 'sightseeing', description: '慶野松原に隣接する公園。松林と海を楽しめる。', imageUrl: 'https://loremflickr.com/500/350/park,pine', petFriendly: true, location: { lat: 34.3481569, lng: 134.7404489 }, link: 'https://www.google.com/maps/place/%E6%85%B6%E9%87%8E%E5%85%AC%E5%9C%92/@34.290996,134.6638602,12.75z/data=!4m10!1m2!2m1!1z6Kaz5YWJ!3m6!1s0x3554a3b300269e65:0x13ff14241ffa419a!8m2!3d34.3481569!4d134.7404489!15sCgboprPlhYlaCCIG6Kaz5YWJkgEEcGFya5oBJENoZERTVWhOTUc5blMwVkpRMEZuU1VOMWNYTXlXbkYzUlJBQuABAPoBBAhNEB8!16s%2Fg%2F11ckvbsfqm?entry=ttu&g_ep=EgoyMDI2MDEwNi4wIKXMDSoASAFQAw%3D%3D' },
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
// Fixed: Using default React import to ensure JSX.IntrinsicElements are properly resolved
import React from 'react';

const FeatureItem: React.FC<{icon: string, title: string, desc: string}> = ({ icon, title, desc }) => (
  <div className="flex gap-4">
    <div className="text-orange-500 text-xl mt-1">
      <i className={`fas ${icon}`}></i>
    </div>
    <div>
      <h4 className="font-bold text-slate-800">{title}</h4>
      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
    </div>
  </div>
);

const Testimonial: React.FC<{text: string, author: string}> = ({ text, author }) => (
  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
    <div className="text-orange-300 mb-4">
      <i className="fas fa-quote-left text-2xl"></i>
    </div>
    <p className="text-slate-700 italic mb-4 leading-relaxed">"{text}"</p>
    <p className="text-sm font-bold text-slate-500">— {author}</p>
  </div>
);

interface PetHotelSectionProps {
  expanded?: boolean;
}

const PetHotelSection: React.FC<PetHotelSectionProps> = ({ expanded = false }) => {
  // Fixed: Updated hooks to use standard React import
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'お名前を入力してください';
    if (!formData.email) {
      newErrors.email = 'メールアドレスを入力してください';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '有効なメールアドレスを入力してください';
    }
    if (!formData.subject) newErrors.subject = '件名を入力してください';
    if (!formData.message) newErrors.message = 'メッセージを入力してください';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    
    // Simulate sending to pet-hotel@t-rock-awaji.jp
    console.log("Sending to: pet-hotel@t-rock-awaji.jp", formData);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrs = { ...prev };
        delete newErrs[name];
        return newErrs;
      });
    }
  };

  return (
    <section id="hotel-info" className={`bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-2xl ${expanded ? 'p-0' : 'mb-10'}`}>
      <div className="flex flex-col lg:flex-row">
        <div className={`lg:w-1/2 relative h-[400px] lg:h-auto overflow-hidden`}>
           <img 
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=1200" 
            alt="T-ROCK AWAJI Dog Run" 
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-1000"
           />
           <div className="absolute top-6 left-6 bg-slate-900/90 backdrop-blur-md text-white px-6 py-2 rounded-full text-xs font-black shadow-2xl flex items-center gap-2">
             <i className="fas fa-star text-orange-500"></i>
             南あわじ最大級のドッグラン併設
           </div>
        </div>
        
        <div className="lg:w-1/2 p-8 md:p-16 bg-gradient-to-br from-white to-slate-50">
          <div className="mb-4">
            <span className="text-orange-600 font-bold text-sm tracking-widest uppercase">Pet Hotel & Dog Run</span>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-4xl font-serif font-black text-slate-900 tracking-tighter">T-ROCK AWAJI</h2>
          </div>
          
          <p className="text-xl text-slate-600 mb-10 leading-relaxed font-light">
            丸山漁港すぐそば。南あわじの自然豊かな環境で, 愛犬に最高の休日を。 清潔な室内ホテルと, 広大なドッグランを完備しています。
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <FeatureItem icon="fa-clock" title="営業時間: 9:00 - 18:00" desc="当日の一時預かりから長期宿泊まで幅広く対応しています。" />
            <FeatureItem icon="fa-map-marker-alt" title="丸山漁港から車で1分" desc="鳴門海峡の絶景観光スポット, うずしおクルーズも至近。" />
            <FeatureItem icon="fa-shield-dog" title="安全・安心의 케어" desc="ドッグトレーナー監修の元, 一頭一頭に合わせたケアを行います。" />
            <FeatureItem icon="fa-running" title="大型ドッグラン完備" desc="宿泊中のワンちゃんは専用ランでのびのび運動可能です。" />
          </div>

          <div className="bg-white rounded-2xl p-8 mb-10 border border-slate-100 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <i className="fas fa-info-circle text-orange-500"></i>
                施設概要
            </h4>
            <ul className="text-sm text-slate-500 space-y-3 font-medium">
                <li className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-400">住所</span>
                  <span>兵庫県南あわじ市阿那賀（丸山漁港近く）</span>
                </li>
                <li className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-400">定休日</span>
                  <span>不定休（公式サイトをご確認ください）</span>
                </li>
                <li className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-400">サービス</span>
                  <span>ペットホテル、一時預かり、ドッグラン、トレーニング</span>
                </li>
            </ul>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <a 
              href="https://www.t-rock-awaji.jp/" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-900 hover:bg-black text-white font-bold py-5 px-10 rounded-full shadow-2xl transition-all flex items-center gap-3 text-lg"
            >
              公式サイトで予約
              <i className="fas fa-external-link-alt text-sm"></i>
            </a>
            <button 
              onClick={() => {
                const formElement = document.getElementById('inquiry-form');
                formElement?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white border-2 border-slate-200 text-slate-600 hover:border-orange-500 hover:text-orange-600 font-bold py-5 px-10 rounded-full transition-all text-lg"
            >
              お問い合わせ
            </button>
          </div>
        </div>
      </div>
      
      <div id="inquiry-form" className="bg-white p-8 md:p-16 border-t border-slate-100">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-serif font-black text-slate-800 mb-4 tracking-tighter">お問い合わせ・ご相談</h3>
            <p className="text-slate-500 font-medium">一時預かりのご予約や, 施設に関するご質問などお気軽にお送りください。</p>
          </div>

          {isSuccess ? (
            <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-3xl text-center animate-scale-in">
              <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-6">
                <i className="fas fa-check"></i>
              </div>
              <h4 className="text-2xl font-bold text-emerald-900 mb-2">送信完了いたしました</h4>
              <p className="text-emerald-700">内容を確認次第, pet-hotel@t-rock-awaji.jp より折り返しご連絡させていただきます。</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">お名前 <span className="text-orange-500">*</span></label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-5 py-4 rounded-2xl bg-slate-50 border ${errors.name ? 'border-red-400' : 'border-slate-100'} focus:ring-2 focus:ring-orange-500 transition-all outline-none font-medium`}
                    placeholder="例：淡路 太郎"
                  />
                  {errors.name && <p className="text-xs text-red-500 ml-1">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">メールアドレス <span className="text-orange-500">*</span></label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-5 py-4 rounded-2xl bg-slate-50 border ${errors.email ? 'border-red-400' : 'border-slate-100'} focus:ring-2 focus:ring-orange-500 transition-all outline-none font-medium`}
                    placeholder="example@mail.com"
                  />
                  {errors.email && <p className="text-xs text-red-500 ml-1">{errors.email}</p>}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">件名 <span className="text-orange-500">*</span></label>
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-5 py-4 rounded-2xl bg-slate-50 border ${errors.subject ? 'border-red-400' : 'border-slate-100'} focus:ring-2 focus:ring-orange-500 transition-all outline-none font-medium`}
                  placeholder="例：一時預かりの予約について"
                />
                {errors.subject && <p className="text-xs text-red-500 ml-1">{errors.subject}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">メッセージ <span className="text-orange-500">*</span></label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-5 py-4 rounded-2xl bg-slate-50 border ${errors.message ? 'border-red-400' : 'border-slate-100'} focus:ring-2 focus:ring-orange-500 transition-all outline-none resize-none font-medium`}
                  placeholder="ご質問やご要望をご入力ください..."
                ></textarea>
                {errors.message && <p className="text-xs text-red-500 ml-1">{errors.message}</p>}
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-5 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-circle-notch animate-spin"></i>
                    送信中...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i>
                    メッセージを送信する
                  </>
                )}
              </button>
              <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-4">
                Powered by T-ROCK AWAJI Support Team
              </p>
            </form>
          )}
        </div>
      </div>
      
      {expanded && (
        <div className="bg-white p-8 md:p-16 border-t border-orange-100">
          <h3 className="text-3xl font-serif font-black mb-12 text-center text-slate-800 tracking-tighter">T-ROCK AWAJI ギャラリー</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            <div className="aspect-square bg-slate-100 rounded-2xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" alt="Dog 1" />
            </div>
            <div className="aspect-square bg-slate-100 rounded-2xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" alt="Dog 2" />
            </div>
            <div className="aspect-square bg-slate-100 rounded-2xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" alt="Dog 3" />
            </div>
            <div className="aspect-square bg-slate-100 rounded-2xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" alt="Dog 4" />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold mb-8 text-center">利用者様の声</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Testimonial 
              text="丸山漁港に釣りに来る際, T-ROCKさんに預けました。スタッフさんがとても犬好きで安心です。" 
              author="A.H様（南あわじ市）" 
            />
            <Testimonial 
              text="ドッグランが本当に広くて, 旅行のついでに寄りました。ワンコも大満足の様子でした！" 
              author="S.T様（神戸市）" 
            />
            <Testimonial 
              text="一時預かりを利用して, 近くの美味しいお寿司屋さんへ。南あわじ観光の拠点に最高です。" 
              author="K.M様（大阪府）" 
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default PetHotelSection;
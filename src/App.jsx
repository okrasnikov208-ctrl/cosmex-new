import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-client';

// Инициализация базы данных через прокинутые ключи
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const translations = {
  UA: {
    title: "Торгівля за межами зірок",
    subtitle: "COSMEX — це соціальний маркетплейс, де дослідники купують, продають та спілкуються. Нове спорядження, знахідки, реальна спільнота.",
    launch: "Запустити безкоштовно",
    explore: "Оглянути маркет",
    feed: "Стрічка",
    market: "Маркет",
    used: "Вживане",
    new: "Новинки",
    deals: "Акції",
    chat: "Чат",
    join: "Приєднатися",
    login: "Увійти",
    placeholder_email: "Ваш Email",
    placeholder_pass: "Ваш Пароль",
    success_reg: "Успішно! Перевірте пошту або увійдіть.",
    error_reg: "Помилка реєстрації: "
  },
  EN: {
    title: "Trade beyond the stars",
    subtitle: "COSMEX is the social marketplace where explorers buy, sell and connect. New gear, used finds, real community.",
    launch: "Launch free",
    explore: "Explore market",
    feed: "Feed",
    market: "Market",
    used: "Used",
    new: "New",
    deals: "Deals",
    chat: "Chat",
    join: "Join free",
    login: "Sign in",
    placeholder_email: "Your Email",
    placeholder_pass: "Your Password",
    success_reg: "Success! Check your email or log in.",
    error_reg: "Registration error: "
  }
};

export default function App() {
  const [lang, setLang] = useState('UA');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authMessage, setAuthMessage] = useState('');
  const [products, setProducts] = useState([]);

  const t = translations[lang];

  // Загрузка товаров из нашего будущего API
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log("Ожидание бэкенд-данных..."));
  }, []);

  // Рабочая регистрация в Supabase Auth
  const handleSignUp = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setAuthMessage(`${t.error_reg} ${error.message}`);
    } else {
      setAuthMessage(t.success_reg);
    }
  };

  return (
    <div className="min-h-screen bg-[#080710] text-white font-sans relative overflow-x-hidden">
      {/* Фон космического пространства (images.jpg) */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none bg-cover bg-center"
        style={{ backgroundImage: "url('/images.jpg')" }}
      />

      {/* Шапка / Навигация */}
      <header className="relative z-10 max-w-7xl mx-auto px-6 py-4 flex items-center justify-between border-b border-white/10 bg-[#080710]/80 backdrop-blur-md">
        <div className="flex items-center space-x-8">
          <span className="text-2xl font-black tracking-wider text-purple-500">COSMEX</span>
          <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-white transition">{t.feed}</a>
            <a href="#" className="hover:text-white transition text-white">{t.market}</a>
            <a href="#" className="hover:text-white transition">{t.used}</a>
            <a href="#" className="hover:text-white transition">{t.new}</a>
            <a href="#" className="hover:text-white transition">{t.deals}</a>
            <a href="#" className="hover:text-white transition">{t.chat}</a>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          {/* Рабочий селектор языка */}
          <select 
            value={lang} 
            onChange={(e) => setLang(e.target.value)}
            className="bg-zinc-900 border border-white/20 rounded px-2 py-1 text-xs focus:outline-none"
          >
            <option value="UA">UA 🇺🇦</option>
            <option value="EN">EN 🇺🇸</option>
          </select>

          <button onClick={() => setShowAuthModal(true)} className="text-sm font-medium hover:text-purple-400 transition">
            {t.login}
          </button>
          <button onClick={() => setShowAuthModal(true)} className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition">
            {t.join}
          </button>
        </div>
      </header>

      {/* Главный блок Hero */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/30 px-3 py-1 rounded-full text-xs text-purple-400 mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span>Live — 12,400 explorers online</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-gradient-to-r from-white via-gray-200 to-purple-400 bg-clip-text text-transparent">
            {t.title}
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-lg leading-relaxed">
            {t.subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => setShowAuthModal(true)} className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-purple-600/30 transition">
              {t.launch}
            </button>
            <button className="bg-zinc-900 hover:bg-zinc-800 text-white border border-white/10 font-semibold px-8 py-4 rounded-xl transition">
              {t.explore}
            </button>
          </div>
        </div>

        {/* Интерактивный Астронавт */}
        <div className="relative flex justify-center">
          <div className="w-80 h-80 md:w-96 md:h-96 rounded-full border border-white/10 flex items-center justify-center p-4 relative animate-pulse">
            <img 
              src="/images.jpg" 
              alt="Astronaut" 
              className="w-full h-full object-cover rounded-full border-2 border-purple-500/50 shadow-2xl shadow-purple-500/20"
            />
          </div>
        </div>
      </main>

      {/* Сетка динамических товаров из бэкенда */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold mb-6 text-purple-400">Импортированные товары из маркетплейсов:</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {products.length === 0 ? (
            <div className="col-span-4 text-center py-10 border border-dashed border-white/10 rounded-xl text-gray-500">
              Товары обновляются крон-скриптом. Выполните первый импорт.
            </div>
          ) : (
            products.map((p) => (
              <div key={p.id} className="bg-zinc-950 border border-white/10 p-4 rounded-xl hover:border-purple-500/50 transition">
                <img src={p.image} alt={p.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                <span className="text-xs bg-purple-900/50 text-purple-300 px-2 py-0.5 rounded">{p.source}</span>
                <h3 className="font-semibold text-white mt-2 truncate">{p.title}</h3>
                <p className="text-purple-400 font-bold mt-1">${p.price}</p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Модальное окно Авторизации */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-white/10 p-8 rounded-2xl max-w-md w-full relative">
            <button onClick={() => { setShowAuthModal(false); setAuthMessage(''); }} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl">
              &times;
            </button>
            <h2 className="text-2xl font-black mb-6 text-center text-purple-400">COSMEX AUTH</h2>
            <form onSubmit={handleSignUp} className="space-y-4">
              <input 
                type="email" required placeholder={t.placeholder_email} value={email} onChange={e => setEmail(e.target.value)}
                className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
              />
              <input 
                type="password" required placeholder={t.placeholder_pass} value={password} onChange={e => setPassword(e.target.value)}
                className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
              />
              <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-xl font-bold transition">
                {t.join}
              </button>
            </form>
            {authMessage && <p className="text-center text-sm text-purple-300 mt-4">{authMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
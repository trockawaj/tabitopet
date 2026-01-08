// Fixed: Using default React import
import React, { useState, useEffect } from 'react';

interface HeaderProps {
  activeTab: 'home' | 'map' | 'sns' | 'hotel' | 'ai' | 'spots';
  setActiveTab: (tab: 'home' | 'map' | 'sns' | 'hotel' | 'ai' | 'spots') => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: 'fa-home' },
    { id: 'spots', label: 'Spots', icon: 'fa-map-marker-alt' },
    { id: 'map', label: 'Map', icon: 'fa-map' },
    { id: 'sns', label: 'SNS', icon: 'fa-hashtag' },
    { id: 'hotel', label: 'Pet Hotel', icon: 'fa-paw' },
    { id: 'ai', label: 'AI Concierge', icon: 'fa-robot' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b border-white/10
        ${isScrolled
          ? 'bg-white/80 backdrop-blur-md py-3 shadow-md text-slate-800'
          : 'bg-transparent py-6 text-white'}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setActiveTab('home')}
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isScrolled ? 'bg-orange-600 text-white' : 'bg-white text-orange-600'}`}>
            <i className="fas fa-torii-gate text-lg"></i>
          </div>
          <h1 className="text-2xl font-serif font-black tracking-tighter group-hover:opacity-80 transition-opacity">
            Minami Awaji
          </h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`
                relative px-5 py-2 rounded-full font-bold text-sm tracking-wide transition-all duration-300 flex items-center gap-2
                ${activeTab === item.id
                  ? (isScrolled ? 'text-orange-600 bg-orange-50' : 'text-slate-900 bg-white')
                  : 'hover:bg-white/10 hover:backdrop-blur-sm'}
              `}
            >
              {activeTab === item.id && <i className={`fas ${item.icon} text-xs`}></i>}
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-xl border-t border-white/10 p-4 flex flex-col gap-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id as any);
                setMobileMenuOpen(false);
              }}
              className={`
                w-full text-left px-6 py-4 rounded-xl font-bold transition-colors flex items-center gap-4
                ${activeTab === item.id
                  ? 'bg-orange-600 text-white'
                  : 'text-slate-300 hover:bg-white/5'}
              `}
            >
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-slate-400">
                <i className={`fas ${item.icon}`}></i>
              </span>
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
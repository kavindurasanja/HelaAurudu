import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Calendar, 
  Image as ImageIcon, 
  Music, 
  Home,
  Menu,
  X,
  Sparkles
} from 'lucide-react';

import NakathSeettuwa from './components/NakathSeettuwa';
import CardGenerator from './components/CardGenerator';
import SongGenerator from './components/SongGenerator';
import { cn } from './lib/utils';

type Tab = 'home' | 'nakath' | 'cards' | 'songs';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (activeTab === 'home') {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [activeTab]);

  const navItems = [
    { id: 'home', label: 'මුල් පිටුව', icon: Home },
    { id: 'nakath', label: 'නැකත් සීට්ටුව', icon: Calendar },
    { id: 'cards', label: 'සුභ පැතුම් පත්', icon: ImageIcon },
    { id: 'songs', label: 'ගීත නිර්මාණය', icon: Music },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-12 py-12"
          >
            <div className="relative inline-block">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 border-2 border-dashed border-avurudu-gold rounded-full opacity-30"
              />
              <h1 className="text-6xl md:text-8xl font-black text-avurudu-red drop-shadow-sm">
                හෙළ අවුරුදු
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-orange-900 max-w-2xl mx-auto font-medium leading-relaxed">
              සාමය සතුට පිරි සුභ අලුත් අවුරුද්දක් වේවා! <br/>
              <span className="text-sm text-gray-500 font-normal">Celebrate the Sinhala & Tamil New Year with traditional customs and AI creativity.</span>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto px-4">
              {[
                { id: 'nakath', title: 'නැකත් බලන්න', desc: 'සියලුම සුබ නැකත් වේලාවන්', icon: Calendar, color: 'bg-red-500' },
                { id: 'cards', title: 'සුභ පැතුම් යවන්න', desc: 'ලස්සන කාඩ්පත් සාදා බෙදාගන්න', icon: ImageIcon, color: 'bg-orange-500' },
                { id: 'songs', title: 'ගීත හදන්න', desc: 'AI මගින් අලුත් ගීත නිර්මාණය', icon: Music, color: 'bg-green-600' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as Tab)}
                  className="glass-card p-8 rounded-3xl hover:scale-105 transition-all group text-left"
                >
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg", item.color)}>
                    <item.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-avurudu-red transition-colors">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </button>
              ))}
            </div>
          </motion.div>
        );
      case 'nakath': return <NakathSeettuwa />;
      case 'cards': return <CardGenerator />;
      case 'songs': return <SongGenerator />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-b-0 rounded-none">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('home')}
          >
            <div className="w-10 h-10 bg-avurudu-red rounded-lg flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
              <Sparkles size={24} />
            </div>
            <span className="text-2xl font-black text-avurudu-red tracking-tight">HELA AVURUDU</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as Tab)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2",
                  activeTab === item.id 
                    ? "bg-avurudu-red text-white shadow-md" 
                    : "text-gray-600 hover:bg-orange-100"
                )}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 bg-white md:hidden pt-24 px-6"
          >
            <div className="space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as Tab);
                    setIsMenuOpen(false);
                  }}
                  className={cn(
                    "w-full p-5 rounded-2xl text-left font-bold text-xl flex items-center gap-4 transition-all",
                    activeTab === item.id 
                      ? "bg-avurudu-red text-white shadow-xl" 
                      : "bg-orange-50 text-gray-700"
                  )}
                >
                  <item.icon size={24} />
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-orange-200 bg-orange-100/30">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-4 mb-6">
            <div className="w-12 h-1 bg-avurudu-red rounded-full" />
            <div className="w-12 h-1 bg-avurudu-gold rounded-full" />
            <div className="w-12 h-1 bg-avurudu-green rounded-full" />
          </div>
          <p className="text-gray-500 font-medium">© 2026 හෙළ අවුරුදු - Hela Avurudu App</p>
          <p className="text-xs text-gray-400 mt-2 italic">සාමය සතුට පිරි සුභ අලුත් අවුරුද්දක් වේවා!</p>
        </div>
      </footer>
    </div>
  );
}


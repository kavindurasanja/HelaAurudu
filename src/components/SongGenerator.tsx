import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, Sparkles, Copy, Check, RefreshCw } from 'lucide-react';
import { generateAvuruduSong } from '../lib/gemini';

export default function SongGenerator() {
  const [theme, setTheme] = useState('');
  const [song, setSong] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!theme.trim()) return;
    setIsLoading(true);
    const result = await generateAvuruduSong(theme);
    setSong(result);
    setIsLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(song);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const themes = [
    "කොහාගේ නාදය (Sound of Koha)",
    "එරබදු මල් (Erabadu Flowers)",
    "අවුරුදු ක්‍රීඩා (Traditional Games)",
    "කිරි ඉතිරවීම (Boiling Milk)",
    "ගම සහ නෑගම් යාම (Village and Visiting)"
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-avurudu-red mb-2">අවුරුදු ගීත නිර්මාණය</h2>
        <p className="text-gray-600">AI තාක්ෂණයෙන් ඔබේම අවුරුදු ගීතයක් හෝ කවියක් සාදා ගන්න</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <div className="glass-card p-6 rounded-2xl space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">තේමාවක් තෝරන්න හෝ ඇතුළත් කරන්න</label>
            <div className="flex flex-wrap gap-2 mb-4">
              {themes.map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    theme === t 
                    ? "bg-avurudu-red text-white shadow-md" 
                    : "bg-orange-100 text-orange-800 hover:bg-orange-200"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="relative">
              <input
                type="text"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                placeholder="උදා: කොහාගේ නාදය සහ එරබදු මල්..."
                className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:ring-2 focus:ring-avurudu-red focus:border-transparent outline-none transition-all"
              />
              <Music className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading || !theme.trim()}
            className="w-full bg-avurudu-red text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {isLoading ? (
              <RefreshCw className="animate-spin" size={20} />
            ) : (
              <Sparkles className="group-hover:animate-pulse" size={20} />
            )}
            {isLoading ? 'නිර්මාණය කරමින්...' : 'ගීතය ජනනය කරන්න (Generate)'}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {song && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card p-8 rounded-2xl relative bg-white/90 border-avurudu-gold/30"
            >
              <button
                onClick={copyToClipboard}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
                title="Copy to clipboard"
              >
                {copied ? <Check className="text-green-500" size={20} /> : <Copy size={20} />}
              </button>
              
              <div className="prose prose-orange max-w-none">
                <div className="whitespace-pre-wrap text-lg leading-relaxed text-gray-800 font-sinhala text-center">
                  {song}
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <div className="flex gap-1">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-avurudu-gold animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

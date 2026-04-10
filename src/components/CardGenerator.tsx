import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { toPng } from 'html-to-image';
import { Download, Share2, Palette, Type } from 'lucide-react';
import { CARD_TEMPLATES } from '../constants';
import { cn } from '../lib/utils';

export default function CardGenerator() {
  const [name, setName] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(CARD_TEMPLATES[0]);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setIsGenerating(true);
    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true });
      const link = document.createElement('a');
      link.download = `avurudu-wish-${name || 'friend'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Oops, something went wrong!', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`සුභ අලුත් අවුරුද්දක් වේවා! 🌸✨\n\nමෙන්න මගෙන් ඔයාට අවුරුදු සුභ පැතුමක්: ${window.location.href}\n\n- ${name || 'ඔබේ මිතුරා'}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-avurudu-red mb-2">සුභ පැතුම් පත්</h2>
        <p className="text-gray-600">ඔබේ නම ඇතුළත් කර ලස්සන සුභ පැතුම් පතක් සාදා ගන්න</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Controls */}
        <div className="space-y-6 order-2 lg:order-1">
          <div className="glass-card p-6 rounded-2xl space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Type size={16} /> ඔබේ නම (Your Name)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="නම ඇතුළත් කරන්න..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-avurudu-red focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <Palette size={16} /> තේමාව තෝරන්න (Select Template)
              </label>
              <div className="grid grid-cols-3 gap-3">
                {CARD_TEMPLATES.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template)}
                    className={cn(
                      "relative aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all",
                      selectedTemplate.id === template.id ? "border-avurudu-red scale-105 shadow-lg" : "border-transparent opacity-70 hover:opacity-100"
                    )}
                  >
                    <img src={template.bg} alt={template.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <span className="text-[10px] text-white font-bold uppercase tracking-wider">{template.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleDownload}
              disabled={isGenerating}
              className="flex-1 bg-avurudu-red text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-colors shadow-lg disabled:opacity-50"
            >
              <Download size={20} />
              {isGenerating ? 'සාදමින්...' : 'බාගත කරන්න (Download)'}
            </button>
            <button
              onClick={handleWhatsAppShare}
              className="flex-1 bg-green-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-600 transition-colors shadow-lg"
            >
              <Share2 size={20} />
              WhatsApp Share
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="order-1 lg:order-2 flex justify-center">
          <div 
            ref={cardRef}
            className="relative w-full max-w-[350px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl"
          >
            <img 
              src={selectedTemplate.bg} 
              alt="Card Background" 
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
              style={{ backgroundColor: selectedTemplate.overlay }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                key={selectedTemplate.id}
                className="space-y-6"
              >
                <h3 className={cn("text-4xl font-bold leading-tight", selectedTemplate.textColor)}>
                  සුභ අලුත් අවුරුද්දක් වේවා!
                </h3>
                <div className="w-16 h-1 bg-avurudu-gold mx-auto rounded-full" />
                <p className={cn("text-lg font-medium opacity-90", selectedTemplate.textColor)}>
                  {name ? `මගෙන් ඔබට, \n ${name}` : 'ඔබ සැමට සාමය සතුට පිරි සුභ අලුත් අවුරුද්දක් වේවා!'}
                </p>
                <div className="pt-4">
                  <span className="text-4xl">🌸✨🪔</span>
                </div>
              </motion.div>
            </div>
            <div className="absolute bottom-4 right-4 opacity-30 text-[10px] text-white">
              Hela Avurudu App
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

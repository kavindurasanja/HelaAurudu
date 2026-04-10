import { motion } from 'motion/react';
import { NAKATH_TIMES } from '../constants';
import { Clock, Info } from 'lucide-react';

export default function NakathSeettuwa() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-avurudu-red mb-2">නැකත් සීට්ටුව</h2>
        <p className="text-gray-600">2026 සිංහල සහ දෙමළ අලුත් අවුරුදු චාරිත්‍ර වාරිත්‍ර</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {NAKATH_TIMES.map((nakath, index) => (
          <motion.div
            key={nakath.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6 rounded-2xl relative overflow-hidden group"
          >
            <div className={`absolute top-0 left-0 w-2 h-full ${nakath.color}`} />
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl ${nakath.color} text-white shadow-lg`}>
                <Clock size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{nakath.title}</h3>
                <p className="text-avurudu-red font-semibold mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-avurudu-red animate-pulse" />
                  {nakath.time}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {nakath.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-xl flex gap-3 items-start">
        <Info className="text-blue-500 shrink-0 mt-1" size={20} />
        <p className="text-sm text-blue-700">
          මෙම නැකත් වේලාවන් සාම්ප්‍රදායික ගණනය කිරීම් මත පදනම් වේ. ඔබගේ ප්‍රදේශයේ චාරිත්‍ර වාරිත්‍ර අනුව සුළු වෙනස්කම් තිබිය හැක.
        </p>
      </div>
    </div>
  );
}

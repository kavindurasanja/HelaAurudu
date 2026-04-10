export interface NakathTime {
  title: string;
  time: string;
  description: string;
  color: string;
}

export const NAKATH_TIMES: NakathTime[] = [
  {
    title: "අලුත් අවුරුදු උදාව (New Year Dawn)",
    time: "අප්‍රේල් 14 පූර්වභාග 08:42",
    description: "අප්‍රේල් මස 14 වන අඟහරුවාදා පූර්වභාග 08.42 ට සිංහල අවුරුදු උදාව සිදුවේ.",
    color: "bg-orange-500",
  },
  {
    title: "පුණ්‍ය කාලය (Punya Kalaya)",
    time: "අප්‍රේල් 14 පූර්වභාග 02:18 සිට අප්‍රේල් 14 අපරභාග 03:06 දක්වා",
    description: "ආගමික වතාවත්වල නිරත වීම සහ ආහාර පාන වලින් වැළකී සිටීම සුදුසුය.",
    color: "bg-yellow-500",
  },
  {
    title: "ආහාර පිසීම (Cooking)",
    time: "අප්‍රේල් 14 පූර්වභාග 09:06",
    description: "රතු පැහැති වස්ත්‍රයෙන් සැරසී නැගෙනහිර දිශාව බලා ලිප් බැඳ ගිනි මොලවා කිරි බතක් පිළියෙල කිරීම මැනවි.",
    color: "bg-red-500",
  },
  {
    title: "වැඩ ඇල්ලීම, ගනුදෙනු කිරීම සහ ආහාර අනුභවය",
    time: "අප්‍රේල් 14 පූර්වභාග 10:17",
    description: "රතු පැහැති වස්ත්‍රයෙන් සැරසී නැගෙනහිර දිශාව බලා වැඩ අල්ලා ගනුදෙනු කර ආහාර අනුභවය සිදු කිරීම මැනවි.",
    color: "bg-green-500",
  },
  {
    title: "හිසතෙල් ගෑම (Anointing Oil)",
    time: "අප්‍රේල් 15 පූර්වභාග 07:41",
    description: "කොළ පැහැති වස්ත්‍රයෙන් සැරසී නැගෙනහිර දිශාව බලා හිසට කොහොඹ පත් ද පයට ඉඹුල් පත් ද තබා හිසතෙල් ගෑම සිදු කළ යුතුය.",
    color: "bg-emerald-500",
  },
  {
    title: "රැකී රක්ෂා සඳහා පිටත්ව යාම (Leaving for Work)",
    time: "අප්‍රේල් 17 පූර්වභාග 06:22",
    description: "නිල් පැහැති වස්ත්‍රයෙන් සැරසී නැගෙනහිර දිශාව බලා රැකී රක්ෂා සඳහා පිටත්ව යාම මැනවි.",
    color: "bg-blue-500",
  },
];

export const CARD_TEMPLATES = [
  {
    id: 'traditional',
    name: 'Traditional',
    bg: 'https://picsum.photos/seed/avurudu1/800/1200',
    overlay: 'rgba(0,0,0,0.4)',
    textColor: 'text-white',
  },
  {
    id: 'modern',
    name: 'Modern Festive',
    bg: 'https://picsum.photos/seed/avurudu2/800/1200',
    overlay: 'rgba(255,255,255,0.2)',
    textColor: 'text-red-800',
  },
  {
    id: 'minimal',
    name: 'Minimalist',
    bg: 'https://picsum.photos/seed/avurudu3/800/1200',
    overlay: 'rgba(255,245,225,0.8)',
    textColor: 'text-orange-900',
  }
];

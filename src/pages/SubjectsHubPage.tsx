import React from 'react';
import {
  Rocket,
  Calculator,
  Atom,
  FlaskConical,
  Dna,
  Landmark,
  Globe,
  BookOpenText,
  Laptop,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { navigateToSubdomain } from '../utils/subdomain';

interface SubjectCardProps {
  id: string;
  title: string;
  paperCode: string;
  group: string;
  subdomain: string;
  icon: React.ReactNode;
  status: 'live' | 'coming_soon';
  chaptersCount?: number;
  description: string;
  topics: string[];
  features?: string[];
  accentColor: string;
}

export const SubjectsHubPage: React.FC = () => {
  const handleLaunchMaths = () => {
    navigateToSubdomain('maths');
  };

  const subjects: SubjectCardProps[] = [
    {
      id: 'maths',
      title: 'Mathematics',
      paperCode: 'Code 51',
      group: 'Group II Compulsory',
      subdomain: 'maths.suretysprint',
      icon: <Calculator className="w-6 h-6 text-white" />,
      status: 'live',
      chaptersCount: 25,
      description:
        'Complete CISCE ICSE Class 9 syllabus with procedural question generators, 3-step hint ladders, step-by-step worked solutions, and authentic 3-hour 80-mark mock papers.',
      topics: [
        'Pure Arithmetic (Rational & Irrational)',
        'Commercial Maths (Compound Interest)',
        'Algebra (Expansions, Factorisation, Equations, Indices, Logs)',
        'Geometry (Triangles, Theorems, Circles, Polygons)',
        'Statistics (Frequency Polygons, Mean & Median)',
        'Mensuration (Plane Figures, Solids)',
        'Trigonometry (Ratios & Right Triangles)',
        'Coordinate Geometry (Cartesian Plane, Lines, Distance)',
      ],
      features: [
        '25 Structured Chapters',
        'Procedural Number Generators',
        '3-Step Hint Ladder',
        '80-Mark CISCE Mock Exam',
        'Mistakes to Retry Tracker',
        '100% Offline PWA Ready',
      ],
      accentColor: 'from-blue-600 to-indigo-700',
    },
    {
      id: 'physics',
      title: 'Physics',
      paperCode: 'Science Paper 1 (Code 52)',
      group: 'Group II Science',
      subdomain: 'physics.suretysprint',
      icon: <Atom className="w-6 h-6 text-white" />,
      status: 'coming_soon',
      chaptersCount: 9,
      description:
        'Mechanics, heat, light, sound, and electricity with interactive ray diagrams, circuit solvers, numerical practice, and SI unit drillers.',
      topics: [
        'Measurements & Experimentation',
        'Motion in One Dimension',
        'Laws of Motion',
        'Pressure in Fluids & Archimedes Principle',
        'Heat and Energy',
        'Reflection of Light & Spherical Mirrors',
        'Propagation of Sound Waves',
        'Current Electricity & Magnetism',
      ],
      accentColor: 'from-cyan-600 to-blue-600',
    },
    {
      id: 'chemistry',
      title: 'Chemistry',
      paperCode: 'Science Paper 2 (Code 52)',
      group: 'Group II Science',
      subdomain: 'chemistry.suretysprint',
      icon: <FlaskConical className="w-6 h-6 text-white" />,
      status: 'coming_soon',
      chaptersCount: 8,
      description:
        'Chemical formulas, reaction balancing, valency tables, atomic structures, gas laws, and atmospheric pollution study guides.',
      topics: [
        'The Language of Chemistry',
        'Chemical Changes & Reactions',
        'Water & Solutions',
        'Atomic Structure & Chemical Bonding',
        'The Periodic Table',
        'Study of First Element: Hydrogen',
        'Atmospheric Pollution',
      ],
      accentColor: 'from-emerald-600 to-teal-700',
    },
    {
      id: 'biology',
      title: 'Biology',
      paperCode: 'Science Paper 3 (Code 52)',
      group: 'Group II Science',
      subdomain: 'biology.suretysprint',
      icon: <Dna className="w-6 h-6 text-white" />,
      status: 'coming_soon',
      chaptersCount: 15,
      description:
        'Plant and animal physiology, cell biology, labeled anatomical diagrams, genetics primers, and hygiene revision cards.',
      topics: [
        'Basic Biology (Cell & Tissues)',
        'Flowering Plants & Pollination',
        'Plant Physiology (Respiration & Transpiration)',
        'Diversity in Living Organisms & Economic Importance',
        'Human Anatomy: Digestive, Skeleton, Skin',
        'Respiratory System & Hygiene',
        'Waste Generation and Management',
      ],
      accentColor: 'from-green-600 to-emerald-700',
    },
    {
      id: 'history',
      title: 'History & Civics',
      paperCode: 'H.C.G. Paper 1 (Code 50)',
      group: 'Group I Compulsory',
      subdomain: 'history.suretysprint',
      icon: <Landmark className="w-6 h-6 text-white" />,
      status: 'coming_soon',
      chaptersCount: 16,
      description:
        'Interactive timeline drillers, constitutional articles, key parliamentary procedures, and source-based analytical questions.',
      topics: [
        'Our Constitution & Fundamental Rights',
        'Elections & Election Commission',
        'Local Self-Government (Rural & Urban)',
        'The Harappan Civilisation & Vedic Period',
        'Mauryan Empire & The Sangam Age',
        'Age of the Guptas & Medieval India',
        'The Renaissance, Reformation & Industrial Revolution',
      ],
      accentColor: 'from-amber-600 to-orange-700',
    },
    {
      id: 'geography',
      title: 'Geography',
      paperCode: 'H.C.G. Paper 2 (Code 50)',
      group: 'Group I Compulsory',
      subdomain: 'geography.suretysprint',
      icon: <Globe className="w-6 h-6 text-white" />,
      status: 'coming_soon',
      chaptersCount: 12,
      description:
        'Physical geography, Earth dynamics, climate regions, atmosphere layers, natural disasters, and topographic map reading modules.',
      topics: [
        'Earth as a Planet & Geographic Grid',
        'Rotation, Revolution & Structure of Earth',
        'Landforms, Rocks & Volcanoes',
        'Earthquakes & Weathering',
        'Hydrosphere (Tides & Currents)',
        'Atmosphere (Insolation, Pressure, Winds)',
        'Topographical Map Work (Four-Figure Grid)',
      ],
      accentColor: 'from-sky-600 to-teal-700',
    },
    {
      id: 'english',
      title: 'English Language & Literature',
      paperCode: 'English Papers 1 & 2 (Code 01)',
      group: 'Group I Compulsory',
      subdomain: 'english.suretysprint',
      icon: <BookOpenText className="w-6 h-6 text-white" />,
      status: 'coming_soon',
      chaptersCount: 14,
      description:
        'Julius Caesar scene-by-scene analysis, Treasure Chest poem explanations, story themes, comprehension passages, and ICSE letter formats.',
      topics: [
        'Grammar, Synthesis & Transformation of Sentences',
        'Formal & Informal Letters, Notices & Emails',
        'Julius Caesar by William Shakespeare (Acts I & II)',
        'Treasure Chest: Collection of Poems',
        'Treasure Chest: Collection of Short Stories',
        'Unseen Comprehension & Summary Writing',
      ],
      accentColor: 'from-purple-600 to-violet-700',
    },
    {
      id: 'computer',
      title: 'Computer Applications',
      paperCode: 'Group III Elective (Code 86)',
      group: 'Group III Elective',
      subdomain: 'computer.suretysprint',
      icon: <Laptop className="w-6 h-6 text-white" />,
      status: 'coming_soon',
      chaptersCount: 8,
      description:
        'Core Java fundamentals, OOP concepts, control structures, looping algorithms, pattern printing, and dry-run code analyzers.',
      topics: [
        'Introduction to Object-Oriented Programming',
        'Objects and Classes in Java',
        'Primitive Data Types & Type Casting',
        'Operators & Expressions in Java',
        'Input in Java (Scanner Class)',
        'Conditional Constructs (if-else, switch-case)',
        'Iterative Constructs (for, while, do-while)',
        'Nested Loops & Series Algorithms',
      ],
      accentColor: 'from-indigo-600 to-blue-800',
    },
    {
      id: 'commerce',
      title: 'Commercial Studies',
      paperCode: 'Group II Elective',
      group: 'Group II Elective',
      subdomain: 'commerce.suretysprint',
      icon: <TrendingUp className="w-6 h-6 text-white" />,
      status: 'coming_soon',
      chaptersCount: 6,
      description:
        'Commercial activities, business organization types, communication channels, accounting basics, and trade principles.',
      topics: [
        'Commercial & Non-Commercial Activities',
        'Business Organisations (Sole Trader, Partnership, Joint Stock)',
        'Communication in Commercial Organisations',
        'Accounting Basics & Financial Terms',
        'Banking and Finance Principles',
        'Marketing, Sales & Customer Care',
      ],
      accentColor: 'from-rose-600 to-pink-700',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-blue-100 selection:text-blue-900">
      {/* Top SuretySprint Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo & Main Domain Indicator */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-tr from-blue-700 to-indigo-600 rounded-xl text-white shadow-sm flex items-center justify-center">
              <Rocket className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-slate-900 text-lg sm:text-xl tracking-tight">
                  SuretySprint
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full font-mono">
                  ICSE Class 9
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                All Subjects Portal • CISCE 2026–27 / 2027–28
              </p>
            </div>
          </div>

          {/* Subdomain Router Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden lg:flex items-center gap-2 text-xs bg-slate-100/80 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-mono text-slate-700">suretysprint.com</span>
              <span className="text-slate-400">/</span>
              <span className="text-slate-500">Subjects Directory</span>
            </div>

            <button
              type="button"
              onClick={handleLaunchMaths}
              className="px-3.5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer group"
            >
              <Calculator className="w-4 h-4" />
              <span>Launch Maths App</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50/60 via-white to-slate-50 border-b border-slate-200/80 py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100/80 text-blue-800 rounded-full text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Dedicated Subdomains for Every ICSE Subject</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight max-w-3xl mx-auto leading-tight">
            Master ICSE Class 9 with <span className="text-blue-700">SuretySprint</span>
          </h1>

          <p className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Select a subject below to launch into your focused, syllabus-aligned practice
            subdomain. Complete with procedural question engines, step-by-step hint ladders, and
            authentic CISCE mock papers.
          </p>

          {/* Subdomain Architecture Pill */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-600 font-medium">
            <div className="px-3 py-1.5 bg-white rounded-lg border border-slate-200 shadow-2xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-400" />
              <span>Main Portal:</span>
              <strong className="font-mono text-slate-800">suretysprint.com</strong>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            <div
              onClick={handleLaunchMaths}
              className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 text-blue-800 shadow-2xs flex items-center gap-2 cursor-pointer transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Active Maths Subdomain:</span>
              <strong className="font-mono text-blue-900 underline decoration-blue-400">
                maths.suretysprint
              </strong>
            </div>
          </div>
        </div>
      </section>

      {/* Main Subjects Directory */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 flex-1 w-full space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <Layers className="w-6 h-6 text-blue-600" />
              <span>ICSE Class 9 Subjects Directory</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Click on an active subject to enter its dedicated practice subdomain
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-md">
              1 Live Now
            </span>
            <span className="px-2.5 py-1 bg-slate-200 text-slate-700 font-semibold rounded-md">
              8 Coming Soon
            </span>
          </div>
        </div>

        {/* Subjects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((sub) => {
            const isLive = sub.status === 'live';

            return (
              <div
                key={sub.id}
                className={`rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden relative ${
                  isLive
                    ? 'bg-white border-blue-300 shadow-lg ring-2 ring-blue-500/20 hover:shadow-xl hover:border-blue-400'
                    : 'bg-white/80 border-slate-200/90 shadow-2xs hover:border-slate-300 opacity-95'
                }`}
              >
                {/* Top Banner on Live Card */}
                {isLive && (
                  <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white px-4 py-1.5 text-xs font-bold flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>FULL 25 CHAPTERS READY</span>
                    </span>
                    <span className="font-mono text-[11px] bg-white/20 px-2 py-0.2 rounded-full">
                      maths.suretysprint
                    </span>
                  </div>
                )}

                <div className="p-5 sm:p-6 space-y-4 flex-1">
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-tr ${sub.accentColor} shadow-md`}
                    >
                      {sub.icon}
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      {isLive ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-100 text-emerald-800 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
                          <span>ACTIVE NOW</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>Coming Soon</span>
                        </span>
                      )}
                      <span className="text-[11px] font-mono font-semibold text-slate-400">
                        {sub.paperCode}
                      </span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                      {sub.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-400">{sub.group}</p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed">{sub.description}</p>

                  {/* Topics Preview */}
                  <div className="space-y-1.5 pt-1">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Syllabus Units & Topics:
                    </p>
                    <ul className="space-y-1">
                      {sub.topics.slice(0, 4).map((topic, i) => (
                        <li
                          key={i}
                          className="text-xs text-slate-600 flex items-start gap-1.5 line-clamp-1"
                        >
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                          <span>{topic}</span>
                        </li>
                      ))}
                      {sub.topics.length > 4 && (
                        <li className="text-[11px] text-blue-600 font-semibold pl-5">
                          + {sub.topics.length - 4} more units covered
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Highlights (if live) */}
                  {isLive && sub.features && (
                    <div className="pt-2 border-t border-slate-100">
                      <div className="grid grid-cols-2 gap-1.5">
                        {sub.features.slice(0, 4).map((feat, idx) => (
                          <div
                            key={idx}
                            className="text-[11px] text-slate-700 font-medium flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Action Footer */}
                <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 mt-auto">
                  {isLive ? (
                    <button
                      type="button"
                      onClick={handleLaunchMaths}
                      className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-700 to-indigo-600 hover:from-blue-800 hover:to-indigo-700 text-white text-xs sm:text-sm font-black rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Enter Mathematics ({sub.subdomain})</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="w-full py-2 px-3 bg-slate-100 rounded-xl text-center text-xs font-semibold text-slate-400 flex items-center justify-center gap-1.5 select-none">
                      <span>Under Active Development</span>
                      <span className="text-[10px] font-mono text-slate-400">({sub.subdomain})</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Highlights Grid */}
        <section className="mt-14 pt-10 border-t border-slate-200 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h3 className="text-xl font-black text-slate-900">
              Why SuretySprint for ICSE Revision?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Built specifically to bridge classroom concepts with CISCE examination criteria.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-2">
              <div className="p-2 bg-blue-100 text-blue-700 rounded-lg w-fit">
                <Smartphone className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">100% Offline PWA</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Add to Home Screen on your phone, tablet, or laptop. Practice anywhere with zero
                internet and bundled fonts.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-2">
              <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg w-fit">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Procedural Questions</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Unlimited question generation with fresh numbers and surds so you never run out of
                practice problems.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-2">
              <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg w-fit">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">3-Step Hint Ladders</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Clues reveal progressively: formula reminder first, then strategy setup, then full
                ICSE marking solutions.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-2">
              <div className="p-2 bg-rose-100 text-rose-700 rounded-lg w-fit">
                <Clock className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">80-Mark Mock Exams</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Strict 3-hour timer, compulsory Section A (40 marks) and Section B choice (4 of 7)
                matching CISCE boards.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Main Domain Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 text-center text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <div className="flex items-center justify-center gap-2 font-bold text-slate-800 text-sm">
            <Rocket className="w-4 h-4 text-blue-600" />
            <span>SuretySprint Learning Platform</span>
          </div>
          <p className="text-slate-400">
            Main Portal: <span className="font-mono text-slate-600">suretysprint.com</span> • Maths
            Subdomain: <span className="font-mono text-blue-600">maths.suretysprint</span>
          </p>
          <p className="text-[11px] text-slate-400">
            Aligned with the Council for the Indian School Certificate Examinations (CISCE)
            Curriculum
          </p>
        </div>
      </footer>
    </div>
  );
};

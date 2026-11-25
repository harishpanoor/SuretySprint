import React, { useState, useEffect } from 'react';
import { HomePage } from './pages/HomePage';
import { PracticePage } from './pages/PracticePage';
import { MistakesPage } from './pages/MistakesPage';
import { MockTestPage } from './pages/MockTestPage';
import { Storage } from './engine/storage';
import {
  GraduationCap,
  BookOpen,
  AlertTriangle,
  Clock,
  WifiOff,
  Sparkles,
} from 'lucide-react';

type NavTab = 'home' | 'practice' | 'mistakes' | 'mock';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [activeChapterId, setActiveChapterId] = useState<number>(1);
  const [mistakesCount, setMistakesCount] = useState<number>(0);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const updateMistakes = () => {
      const list = Storage.getMistakes();
      setMistakesCount(list.filter((m) => !m.mastered).length);
    };

    updateMistakes();
    window.addEventListener('mistakesUpdated', updateMistakes);
    window.addEventListener('storage', updateMistakes);
    const interval = setInterval(updateMistakes, 3000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('mistakesUpdated', updateMistakes);
      window.removeEventListener('storage', updateMistakes);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const list = Storage.getMistakes();
    setMistakesCount(list.filter((m) => !m.mastered).length);
  }, [currentTab]);

  const handleSelectChapter = (chId: number) => {
    setActiveChapterId(chId);
    setCurrentTab('practice');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-blue-100 selection:text-blue-900">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-6xl mx-auto px-2.5 sm:px-6 h-16 flex items-center justify-between gap-2">
          {/* Brand Logo */}
          <div
            onClick={() => setCurrentTab('home')}
            className="flex items-center gap-2 cursor-pointer select-none group shrink-0"
          >
            <div className="p-2 bg-gradient-to-tr from-blue-700 to-indigo-600 rounded-xl text-white shadow-sm group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 text-sm sm:text-base tracking-tight">
                  MathsMaster
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 bg-blue-100 text-blue-800 rounded font-mono hidden sm:inline">
                  ICSE 9
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium hidden sm:block">
                All 25 Chapters • Step-by-Step Practice
              </p>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setCurrentTab('home')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                currentTab === 'home'
                  ? 'bg-blue-50 text-blue-700 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Syllabus</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentTab('practice')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                currentTab === 'practice'
                  ? 'bg-blue-50 text-blue-700 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Practice</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentTab('mistakes')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 relative ${
                currentTab === 'mistakes'
                  ? 'bg-rose-50 text-rose-700 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              <span className="hidden sm:inline">Mistakes</span>
              {mistakesCount > 0 && (
                <span className="px-1.5 py-0.2 bg-rose-600 text-white text-[10px] font-black rounded-full">
                  {mistakesCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setCurrentTab('mock')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                currentTab === 'mock'
                  ? 'bg-indigo-50 text-indigo-700 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Clock className="w-4 h-4 text-indigo-600" />
              <span className="hidden sm:inline">Mock Test</span>
            </button>
          </nav>

          {/* Offline Ready Status */}
          <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-400 font-medium bg-slate-50 px-2.5 py-1 rounded-xl border border-slate-200/60">
            {!isOnline ? (
              <>
                <WifiOff className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-amber-600 font-semibold">Offline Mode</span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Offline Ready (PWA)</span>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 flex-1 w-full">
        {currentTab === 'home' && (
          <HomePage
            onSelectChapter={handleSelectChapter}
            onOpenMistakes={() => setCurrentTab('mistakes')}
            onOpenMockTest={() => setCurrentTab('mock')}
          />
        )}

        {currentTab === 'practice' && (
          <PracticePage
            chapterId={activeChapterId}
            onBack={() => setCurrentTab('home')}
            onSelectChapter={handleSelectChapter}
          />
        )}

        {currentTab === 'mistakes' && (
          <MistakesPage
            onBack={() => setCurrentTab('home')}
            onSelectChapter={handleSelectChapter}
          />
        )}

        {currentTab === 'mock' && (
          <MockTestPage
            onBack={() => setCurrentTab('home')}
            onSelectChapter={handleSelectChapter}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-6 text-center text-xs text-slate-400">
        <div className="max-w-6xl mx-auto px-4 space-y-1">
          <p className="font-medium text-slate-600">
            ICSE Class 9 Mathematics Complete Practice Suite • CISCE Curriculum Aligned
          </p>
          <p className="text-[11px] text-slate-400">
            Offline PWA • Procedural Questions • 3-Step Hint Ladder • Bundled KaTeX & mathjs
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;

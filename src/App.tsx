import { useState, useEffect, useMemo, useRef } from 'react';
import { ramadan2026Data, eidData, type PrayerDay } from './data/prayerTimes';
import { quranAyats } from './data/quranAyats';
import { Moon, Sun, Clock, ChevronLeft, ChevronRight, Calendar, Utensils, Coffee } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';


function App() {
  // logic to get today's day immediately on mount
  const getTodayRamadanDay = () => {
    const today = new Date();
    const ramadanStart = new Date('2026-02-18');
    const ramadanEnd = new Date('2026-03-19');
    if (today < ramadanStart) return 1;
    if (today > ramadanEnd) return 30;
    const diffTime = today.getTime() - ramadanStart.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return Math.min(Math.max(diffDays + 1, 1), 30);
  };

  const [selectedDay, setSelectedDay] = useState<number>(getTodayRamadanDay);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentAyatIndex, setCurrentAyatIndex] = useState(0);
  const [shootingStarKey, setShootingStarKey] = useState(0);
  const swipeStartX = useRef<number | null>(null);
  const quickJumpRef = useRef<HTMLDivElement>(null);

  // Keep 'todayRamadanDay' for "Today" badges
  const todayRamadanDay = useMemo(() => getTodayRamadanDay(), []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let timerId = 0;
    const scheduleStar = () => {
      const delay = 6000 + Math.random() * 8000;
      timerId = window.setTimeout(() => {
        setShootingStarKey((prev) => prev + 1);
        scheduleStar();
      }, delay);
    };
    scheduleStar();
    return () => window.clearTimeout(timerId);
  }, []);

  useEffect(() => {
    const ayatTimer = setInterval(() => {
      setCurrentAyatIndex((prev) => (prev + 1) % quranAyats.length);
    }, 4000);
    return () => clearInterval(ayatTimer);
  }, []);

  // FIXED: Manual scroll calculation prevents whole page from jumping
  useEffect(() => {
    if (quickJumpRef.current) {
      const container = quickJumpRef.current;
      const btn = container.querySelector(`[data-day="${selectedDay}"]`) as HTMLElement;
      
      if (btn) {
        const containerWidth = container.offsetWidth;
        const btnLeft = btn.offsetLeft;
        const btnWidth = btn.offsetWidth;
        
        // Calculate center position
        const scrollPos = btnLeft - (containerWidth / 2) + (btnWidth / 2);
        
        container.scrollTo({
          left: scrollPos,
          behavior: 'smooth'
        });
      }
    }
  }, [selectedDay]);

  const parseTime = (timeStr: string): number => {
    if (!timeStr) return -1;
    const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!match) return -1;
    let hours = parseInt(match[1]);
    const minutes = parseInt(match[2]);
    const period = match[3].toUpperCase();
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  const nextPrayerKey = useMemo(() => {
    if (selectedDay !== todayRamadanDay) return null;
    const data = ramadan2026Data[selectedDay - 1];
    const nowMins = currentTime.getHours() * 60 + currentTime.getMinutes();
    const prayers = [
      { key: 'fajr', time: parseTime(data.fajrAdhan) },
      { key: 'sunrise', time: parseTime(data.sunrise) },
      { key: 'dhuhr', time: parseTime(data.dhuhrAdhan) },
      { key: 'asr', time: parseTime(data.asrAdhan) },
      { key: 'maghrib', time: parseTime(data.maghribAdhan) },
      { key: 'isha', time: parseTime(data.ishaAdhan) },
      { key: 'tarawih', time: parseTime(data.tarawih) },
    ];
    const next = prayers.find((p) => p.time > nowMins);
    return next ? next.key : null;
  }, [currentTime, selectedDay, todayRamadanDay]);

  const currentDayData: PrayerDay = ramadan2026Data[selectedDay - 1];

  const navigateDay = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && selectedDay > 1) setSelectedDay(selectedDay - 1);
    else if (direction === 'next' && selectedDay < 30) setSelectedDay(selectedDay + 1);
  };

  const navigateAyat = (direction: 'prev' | 'next') => {
    if (direction === 'prev') setCurrentAyatIndex((prev) => (prev - 1 + quranAyats.length) % quranAyats.length);
    else setCurrentAyatIndex((prev) => (prev + 1) % quranAyats.length);
  };

  const handleSwipeStart = (clientX: number) => { swipeStartX.current = clientX; };
  const handleSwipeEnd = (clientX: number) => {
    if (swipeStartX.current === null) return;
    const deltaX = clientX - swipeStartX.current;
    if (deltaX > 50) navigateAyat('prev');
    else if (deltaX < -50) navigateAyat('next');
    swipeStartX.current = null;
  };
  const handleSwipeCancel = () => { swipeStartX.current = null; };

  const isToday = selectedDay === todayRamadanDay;

  const prayerRowClass = (key: string) =>
    `p-4 flex items-center justify-between transition-colors ${
      nextPrayerKey === key
        ? 'border-l-2 border-emerald-400 bg-emerald-800/30'
        : 'hover:bg-emerald-800/20'
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-900 text-white">
      {/* Header */}
      <header className="bg-emerald-950/80 backdrop-blur-md border-b border-emerald-800/50 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <Moon className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
  <h1 className="text-lg font-bold text-emerald-100">Ramadan 2026</h1>
  <p className="text-xs text-emerald-300 flex items-center gap-1">
    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
    Champaign
  </p>
</div>

            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-emerald-200">
                {currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </p>
              <p className="text-xs text-emerald-400">
                {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        
        {/* Quran Ayat Rotator — Compact Mountain Range Edition */}
        {/* CHANGED: h-40 (160px) fixed height */}
        <Card className="relative overflow-hidden border-0 shadow-xl bg-[#0b1026] h-40 group">
            {/* Sky Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950 via-slate-900 to-[#020617]" />

            {/* Stars */}
            <div className="absolute inset-0 opacity-70">
                <div className="absolute top-4 left-12 w-0.5 h-0.5 bg-white rounded-full shadow-[0_0_2px_white]" />
                <div className="absolute top-10 right-24 w-0.5 h-0.5 bg-white rounded-full" />
                <div className="absolute top-6 left-1/3 w-1 h-1 bg-indigo-200 rounded-full opacity-80" />
                <div className="absolute top-14 right-10 w-0.5 h-0.5 bg-slate-300 rounded-full" />
            </div>

            {/* Cascading Mountains Layer - Adjusted heights for shorter container */}
            <div className="absolute inset-x-0 bottom-0 w-full h-full pointer-events-none">
                {/* Back Range - Taller relative to container */}
                <svg className="absolute bottom-0 w-full h-[85%] text-indigo-900/30" viewBox="0 0 1200 320" preserveAspectRatio="none">
                    <path fill="currentColor" d="M0,224L48,208C96,192,192,160,288,165.3C384,171,480,213,576,229.3C672,245,768,235,864,208C960,181,1056,139,1152,133.3C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>

                {/* Mid Range */}
                <svg className="absolute bottom-0 w-full h-[65%] text-slate-900/50" viewBox="0 0 1200 320" preserveAspectRatio="none">
                    <path fill="currentColor" d="M0,288L60,272C120,256,240,224,360,224C480,224,600,256,720,250.7C840,245,960,203,1080,197.3C1200,192,1320,224,1380,240L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                </svg>

                {/* Front Range */}
                <svg className="absolute bottom-[-1px] w-full h-[45%] text-[#020617]" viewBox="0 0 1200 320" preserveAspectRatio="none">
                    <path fill="currentColor" d="M0,256L80,229.3C160,203,320,149,480,165.3C640,181,800,267,960,277.3C1120,288,1280,224,1360,192L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
                </svg>
            </div>

            {/* Shooting Star */}
            <span key={shootingStarKey} className="shooting-star" aria-hidden="true" />

            {/* Content Overlay */}
            <CardContent className="relative z-10 px-4 py-0 flex items-center justify-center h-full">
                <div
                    className="flex flex-col items-center justify-center gap-1 text-center select-none touch-pan-y w-full max-w-2xl mx-auto"
                    onTouchStart={(e) => handleSwipeStart(e.touches[0].clientX)}
                    onTouchEnd={(e) => handleSwipeEnd(e.changedTouches[0].clientX)}
                    onTouchCancel={handleSwipeCancel}
                    onMouseDown={(e) => handleSwipeStart(e.clientX)}
                    onMouseUp={(e) => handleSwipeEnd(e.clientX)}
                    onMouseLeave={handleSwipeCancel}
                >
                    <div className="min-w-0 animate-in fade-in zoom-in duration-700 space-y-1">
                        <p className="text-xl font-arabic text-amber-50 text-center leading-relaxed drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]" dir="rtl">
                            {quranAyats[currentAyatIndex].arabic}
                        </p>
                        <div className="space-y-0.5">
                            <p className="text-sm text-indigo-100 italic leading-snug font-light drop-shadow-md line-clamp-2">
                                "{quranAyats[currentAyatIndex].english}"
                            </p>
                            <p className="text-[10px] text-indigo-300/80 uppercase tracking-widest font-medium">
                                {quranAyats[currentAyatIndex].reference}
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>

        {/* Day Navigation */}
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateDay('prev')}
            disabled={selectedDay === 1}
            className="border-emerald-700/50 bg-emerald-900/50 hover:bg-emerald-800/50 text-emerald-200 disabled:opacity-30"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <div className="flex-1 text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-900/50 rounded-full px-4 py-2 border border-emerald-700/30">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-200">Day {selectedDay} of 30</span>
              {isToday && (
                <span className="text-xs bg-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded-full">
                  Today
                </span>
              )}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateDay('next')}
            disabled={selectedDay === 30}
            className="border-emerald-700/50 bg-emerald-900/50 hover:bg-emerald-800/50 text-emerald-200 disabled:opacity-30"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Date Display */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-emerald-100">{currentDayData.hijriDate}</h2>
          <p className="text-emerald-400">
            {currentDayData.dayName}, {currentDayData.gregorianDate}/2026
          </p>
        </div>

        {/* Sehri & Iftar Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-indigo-900/60 to-indigo-950/60 border-indigo-700/30">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Coffee className="w-4 h-4 text-indigo-300" />
                <span className="text-xs font-medium text-indigo-300 uppercase tracking-wider">Sehri Ends</span>
              </div>
              <p className="text-3xl font-bold text-white drop-shadow-[0_0_8px_rgba(165,180,252,0.5)]">
                {currentDayData.fajrAdhan}
              </p>
              <p className="text-xs text-indigo-400 mt-1">Fajr Adhan</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-900/60 to-amber-950/60 border-amber-700/30">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Utensils className="w-4 h-4 text-amber-300" />
                <span className="text-xs font-medium text-amber-300 uppercase tracking-wider">Iftar</span>
              </div>
              <p className="text-3xl font-bold text-white drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]">
                {currentDayData.maghribAdhan}
              </p>
              <p className="text-xs text-amber-400 mt-1">Maghrib Adhan</p>
            </CardContent>
          </Card>
        </div>

        {/* Prayer Times */}
        <Card className="bg-emerald-900/40 border-emerald-700/30 overflow-hidden">
          <CardContent className="p-0">
            <div className="divide-y divide-emerald-800/30">
              {/* Fajr */}
              <div className={prayerRowClass('fajr')}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                    <Moon className="w-4 h-4 text-indigo-300" />
                  </div>
                  <div>
                    <p className="font-medium text-emerald-100">Fajr</p>
                    <p className="text-xs text-emerald-500">Dawn Prayer</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-emerald-100">{currentDayData.fajrAdhan}</p>
                  <p className="text-xs text-emerald-500">Iqamah: {currentDayData.fajrIqamah}</p>
                </div>
              </div>

              {/* Sunrise */}
              <div className={prayerRowClass('sunrise')}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <Sun className="w-4 h-4 text-orange-300" />
                  </div>
                  <div>
                    <p className="font-medium text-emerald-100">Sunrise</p>
                    <p className="text-xs text-emerald-500">Ishraq time</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-emerald-100">{currentDayData.sunrise}</p>
                </div>
              </div>

              {/* Dhuhr */}
              <div className={prayerRowClass('dhuhr')}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    <Sun className="w-4 h-4 text-yellow-300" />
                  </div>
                  <div>
                    <p className="font-medium text-emerald-100">Dhuhr</p>
                    <p className="text-xs text-emerald-500">Noon Prayer</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-emerald-100">{currentDayData.dhuhrAdhan}</p>
                  <p className="text-xs text-emerald-500">Iqamah: {currentDayData.dhuhrIqamah}</p>
                </div>
              </div>

              {/* Asr */}
              <div className={prayerRowClass('asr')}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center">
                    <Sun className="w-4 h-4 text-amber-300" />
                  </div>
                  <div>
                    <p className="font-medium text-emerald-100">Asr</p>
                    <p className="text-xs text-emerald-500">Afternoon Prayer</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-emerald-100">{currentDayData.asrAdhan}</p>
                  <p className="text-xs text-emerald-500">Iqamah: {currentDayData.asrIqamah}</p>
                </div>
              </div>

              {/* Maghrib */}
              <div className={`${prayerRowClass('maghrib')} bg-amber-950/20`}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-600/20 rounded-lg flex items-center justify-center">
                    <Sun className="w-4 h-4 text-orange-400" />
                  </div>
                  <div>
                    <p className="font-medium text-amber-100">Maghrib</p>
                    <p className="text-xs text-amber-500">Sunset Prayer • Iftar</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-amber-100">{currentDayData.maghribAdhan}</p>
                  <p className="text-xs text-amber-500">Iqamah: {currentDayData.maghribIqamah}</p>
                </div>
              </div>

              {/* Isha */}
              <div className={prayerRowClass('isha')}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-600/20 rounded-lg flex items-center justify-center">
                    <Moon className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div>
                    <p className="font-medium text-emerald-100">Isha</p>
                    <p className="text-xs text-emerald-500">Night Prayer</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-emerald-100">{currentDayData.ishaAdhan}</p>
                  <p className="text-xs text-emerald-500">Iqamah: {currentDayData.ishaIqamah}</p>
                </div>
              </div>

              {/* Tarawih */}
              <div className={`${prayerRowClass('tarawih')} bg-emerald-800/30`}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-4 h-4 text-emerald-300" />
                  </div>
                  <div>
                    <p className="font-medium text-emerald-100">Tarawih</p>
                    <p className="text-xs text-emerald-500">Ramadan Night Prayer</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-emerald-100">{currentDayData.tarawih}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Day Selector */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-emerald-400">Quick Jump</p>
          <div
            ref={quickJumpRef}
            className="flex overflow-x-auto gap-1 pb-2 scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {ramadan2026Data.map((day) => (
              <button
                key={day.hijriDay}
                data-day={day.hijriDay}
                onClick={() => setSelectedDay(day.hijriDay)}
                className={`flex-shrink-0 w-8 h-8 text-xs rounded-md transition-colors ${
                  selectedDay === day.hijriDay
                    ? 'bg-emerald-600 text-white'
                    : day.hijriDay === todayRamadanDay
                    ? 'bg-emerald-700/60 text-emerald-200 ring-1 ring-emerald-400'
                    : 'bg-emerald-950/50 text-emerald-400 hover:bg-emerald-900/50'
                }`}
              >
                {day.hijriDay}
              </button>
            ))}
          </div>
        </div>

        {/* Eid Info */}
        <Card className="bg-gradient-to-r from-emerald-800/40 to-teal-800/40 border-emerald-600/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <Sun className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <h3 className="font-bold text-emerald-100">Eid al-Fitr</h3>
                <p className="text-sm text-emerald-400">
                  {eidData.hijriDate} • {eidData.dayName}, {eidData.gregorianDate}/2026
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-emerald-950/50 rounded-lg p-2">
                <p className="text-xs text-emerald-500">1st Prayer</p>
                <p className="font-semibold text-emerald-200">{eidData.firstEidPrayer}</p>
              </div>
              <div className="bg-emerald-950/50 rounded-lg p-2">
                <p className="text-xs text-emerald-500">2nd Prayer</p>
                <p className="font-semibold text-emerald-200">{eidData.secondEidPrayer}</p>
              </div>
              <div className="bg-emerald-950/50 rounded-lg p-2">
                <p className="text-xs text-emerald-500">3rd Prayer</p>
                <p className="font-semibold text-emerald-200">{eidData.thirdEidPrayer}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
<footer className="text-center text-emerald-200 py-6 mt-2">
  <p className="text-xs">Based on CIMIC website schedules</p>

  <p className="text-[11px] mt-1">
    vibecoded by saadi, with claude & love &middot;{' '}
    <a
      href="https://github.com/sadiulchyon/ramadan_schedules_cimic"
      target="_blank"
      rel="noopener noreferrer"
      className="text-emerald-200 hover:text-emerald-100 transition-colors duration-200"
    >
      github
    </a>
  </p>
</footer>


      </main>
    </div>
  );
}

export default App;

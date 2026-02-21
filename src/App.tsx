import { useState, useEffect, useMemo } from 'react';
import { ramadan2026Data, additionalInfo, type PrayerDay } from './data/prayerTimes';
import { quranAyats } from './data/quranAyats';
import { Moon, Sun, ChevronLeft, ChevronRight, Calendar, Utensils, Coffee, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

function App() {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentAyatIndex, setCurrentAyatIndex] = useState(0);
  const [shootingStarKey, setShootingStarKey] = useState(0);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Rotate Quran ayats and trigger shooting star every 8 seconds
  useEffect(() => {
    const ayatTimer = setInterval(() => {
      setCurrentAyatIndex((prev) => (prev + 1) % quranAyats.length);
      setShootingStarKey((prev) => prev + 1);
    }, 8000);
    return () => clearInterval(ayatTimer);
  }, []);

  // Determine today's Ramadan day based on date
  const todayRamadanDay = useMemo(() => {
    const today = new Date();
    const ramadanStart = new Date('2026-02-18');
    const ramadanEnd = new Date('2026-03-19');
    
    if (today < ramadanStart) return 1;
    if (today > ramadanEnd) return 30;
    
    const diffTime = today.getTime() - ramadanStart.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return Math.min(Math.max(diffDays + 1, 1), 30);
  }, []);

  // Set initial selected day to today
  useEffect(() => {
    setSelectedDay(todayRamadanDay);
  }, [todayRamadanDay]);

  const currentDayData: PrayerDay = ramadan2026Data[selectedDay - 1];

  const navigateDay = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && selectedDay > 1) {
      setSelectedDay(selectedDay - 1);
    } else if (direction === 'next' && selectedDay < 30) {
      setSelectedDay(selectedDay + 1);
    }
  };

  const isToday = selectedDay === todayRamadanDay;

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-900 text-white pb-8">
      {/* Dynamic Shooting Star Style Embedded */}
      <style dangerouslySetInnerHTML={{__html: `
        .shooting-star {
          position: absolute;
          top: 0;
          left: 50%;
          width: 4px;
          height: 4px;
          background: #fff;
          border-radius: 50%;
          box-shadow: 0 0 0 4px rgba(255,255,255,0.1), 0 0 0 8px rgba(255,255,255,0.1), 0 0 20px rgba(255,255,255,1);
          animation: shoot 3s ease-in-out forwards;
          z-index: 5;
        }
        .shooting-star::before {
          content: '';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 300px;
          height: 1px;
          background: linear-gradient(90deg, #fff, transparent);
        }
        @keyframes shoot {
          0% { transform: rotate(315deg) translateX(0); opacity: 1; }
          70% { opacity: 1; }
          100% { transform: rotate(315deg) translateX(-1000px); opacity: 0; }
        }
      `}} />

      {/* Header */}
      <header className="bg-emerald-950/80 backdrop-blur-md border-b border-emerald-700/50 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <Moon className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-emerald-100">Islamic Foundation of Lincoln</h1>
                <p className="text-xs text-emerald-400">Lincoln</p>
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
        
        {/* Quran Ayat Rotator (CIMIC SVG Background) */}
        <Card className="relative overflow-hidden border-0 shadow-xl bg-[#0b1026] h-48 group">
            {/* Sky Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950 via-slate-900 to-[#020617]" />

            {/* Stars */}
            <div className="absolute inset-0 opacity-70">
                <div className="absolute top-4 left-12 w-0.5 h-0.5 bg-white rounded-full shadow-[0_0_2px_white]" />
                <div className="absolute top-10 right-24 w-0.5 h-0.5 bg-white rounded-full" />
                <div className="absolute top-6 left-1/3 w-1 h-1 bg-indigo-200 rounded-full opacity-80" />
                <div className="absolute top-14 right-10 w-0.5 h-0.5 bg-slate-300 rounded-full" />
            </div>

            {/* Cascading Mountains Layer */}
            <div className="absolute inset-x-0 bottom-0 w-full h-full pointer-events-none">
                {/* Back Range */}
                <svg className="absolute bottom-0 w-full h-[85%] text-emerald-900/30" viewBox="0 0 1200 320" preserveAspectRatio="none">
                    <path fill="currentColor" d="M0,224L48,208C96,192,192,160,288,165.3C384,171,480,213,576,229.3C672,245,768,235,864,208C960,181,1056,139,1152,133.3C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>

                {/* Mid Range */}
                <svg className="absolute bottom-0 w-full h-[65%] text-emerald-950/50" viewBox="0 0 1200 320" preserveAspectRatio="none">
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
            <CardContent className="relative z-10 px-6 py-0 flex items-center justify-center h-full">
                <div className="flex flex-col items-center justify-center text-center w-full max-w-2xl mx-auto h-full">
                    <div className="min-w-0 animate-in fade-in zoom-in duration-700 space-y-3">
                        {quranAyats[currentAyatIndex].arabic && (
                           <p className="text-xl font-arabic text-amber-50 leading-relaxed drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]" dir="rtl">
                               {quranAyats[currentAyatIndex].arabic}
                           </p>
                        )}
                        <div className="space-y-1">
                            <p className="text-sm md:text-base text-emerald-100 italic leading-snug font-light drop-shadow-md line-clamp-3">
                                "{quranAyats[currentAyatIndex].english}"
                            </p>
                            <p className="text-[10px] md:text-xs text-emerald-300/80 uppercase tracking-widest font-medium mt-2">
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
              <span className="text-sm font-medium text-emerald-200">
                Day {selectedDay} of 30
              </span>
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
          <h2 className="text-2xl font-bold text-emerald-100">
            Ramadan {selectedDay}
          </h2>
          <p className="text-emerald-400">
            {currentDayData?.dayName}, {currentDayData?.gregorianDate}/2026
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
              <p className="text-2xl font-bold text-white">{currentDayData?.sehriEnds}</p>
              <p className="text-xs text-indigo-400 mt-1">Fast Starts</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-amber-900/60 to-amber-950/60 border-amber-700/30">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Utensils className="w-4 h-4 text-amber-300" />
                <span className="text-xs font-medium text-amber-300 uppercase tracking-wider">Iftar</span>
              </div>
              <p className="text-2xl font-bold text-white">{currentDayData?.iftar}</p>
              <p className="text-xs text-amber-400 mt-1">Fast Breaks</p>
            </CardContent>
          </Card>
        </div>

        {/* Prayer Times Card (Cleaned up duplicates) */}
        <Card className="bg-emerald-900/40 border-emerald-700/30 overflow-hidden">
          <CardContent className="p-0">
            <div className="divide-y divide-emerald-800/30">
              
              {/* Fajr */}
              <div className="p-4 flex items-center justify-between hover:bg-emerald-800/20 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                    <Moon className="w-4 h-4 text-indigo-300" />
                  </div>
                  <div>
                    <p className="font-medium text-emerald-100">Fajr Jamaat</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-emerald-100">{currentDayData?.fajrJamaat}</p>
                </div>
              </div>

              {/* Sunrise */}
              <div className="p-4 flex items-center justify-between hover:bg-emerald-800/20 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <Sun className="w-4 h-4 text-orange-300" />
                  </div>
                  <div>
                    <p className="font-medium text-emerald-100">Sunrise</p>
                    <p className="text-xs text-emerald-500">Ishraq Time</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-emerald-100">{currentDayData?.sunrise}</p>
                </div>
              </div>

              {/* Dhuhr */}
              <div className="p-4 flex items-center justify-between hover:bg-emerald-800/20 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    <Sun className="w-4 h-4 text-yellow-300" />
                  </div>
                  <div>
                    <p className="font-medium text-emerald-100">Zuhar Jamaat</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-emerald-100">{currentDayData?.dhuhrJamaat}</p>
                </div>
              </div>

              {/* Asr */}
              <div className="p-4 flex items-center justify-between hover:bg-emerald-800/20 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center">
                    <Sun className="w-4 h-4 text-amber-300" />
                  </div>
                  <div>
                    <p className="font-medium text-emerald-100">Asr Jamaat</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-emerald-100">{currentDayData?.asrJamaat}</p>
                </div>
              </div>

              {/* Maghrib */}
              <div className="p-4 flex items-center justify-between hover:bg-emerald-800/20 transition-colors bg-amber-950/20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-600/20 rounded-lg flex items-center justify-center">
                    <Sun className="w-4 h-4 text-orange-400" />
                  </div>
                  <div>
                    <p className="font-medium text-amber-100">Maghrib Jamaat</p>
                    <p className="text-xs text-amber-500">Iftar Time</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-amber-100">{currentDayData?.maghribJamaat}</p>
                </div>
              </div>

              {/* Isha */}
              <div className="p-4 flex items-center justify-between hover:bg-emerald-800/20 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-600/20 rounded-lg flex items-center justify-center">
                    <Moon className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div>
                    <p className="font-medium text-emerald-100">Isha Jamaat</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-emerald-100">{currentDayData?.ishaJamaat}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Day Selector */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-emerald-400">Quick Jump</p>
          <Tabs value={selectedDay.toString()} onValueChange={(v) => setSelectedDay(parseInt(v))}>
            <TabsList className="flex flex-wrap h-auto gap-1 bg-emerald-950/50 p-1">
              {ramadan2026Data.map((day) => (
                <TabsTrigger
                  key={day.hijriDay}
                  value={day.hijriDay.toString()}
                  className="w-8 h-8 p-0 text-xs data-[state=active]:bg-emerald-600 data-[state=active]:text-white text-emerald-400 hover:bg-emerald-900/50"
                >
                  {day.hijriDay}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Footer */}
        <footer className="text-center text-xs text-emerald-600 py-4 space-y-1">
          <p className="flex items-center justify-center gap-1">
            <MapPin className="w-3 h-3" />
            Lincoln
          </p>
          <p>Islamic Foundation of Lincoln (IFOL)</p>
          <p>Ramadhaan 1447 / 2026 CE</p>
        </footer>
      </main>
    </div>
  );
}

export default App;

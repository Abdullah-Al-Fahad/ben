'use client';
import React, { useEffect, useState, useMemo } from "react";
import { FiCalendar, FiUser, FiZap, FiHeart, FiShield, FiCrosshair } from 'react-icons/fi';
import { format, getDay, parseISO } from 'date-fns';
import ConsultationModal from "../../components/ConsultationModal";
import ScheduleDetailModal from "../../components/ScheduleDetailModal";
import { Schedule } from "@/lib/schedule";
import { Coach } from "@/lib/types";
import { ScheduleHeroSection } from "../../lib/types";

const disciplineIcons = {
    Strength: <FiZap className="w-6 h-6" />,
    MMA: <FiShield className="w-6 h-6" />,
    'Jiu-Jitsu': <FiCrosshair className="w-6 h-6" />,
    CrossFit: <FiHeart className="w-6 h-6" />,
    Cardio: <FiHeart className="w-6 h-6" />,
    Mobility: <FiUser className="w-6 h-6" />,
};

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function SchedulePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeDay, setActiveDay] = useState<string>(dayNames[new Date().getDay()]);
  const [disciplineFilter, setDisciplineFilter] = useState('all');
  const [coachFilter, setCoachFilter] = useState('all');
  const [allSchedules, setAllSchedules] = useState<Schedule[]>([]);
  const [allCoaches, setAllCoaches] = useState<Coach[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Schedule | null>(null);
  const [scheduleHeroSection, setScheduleHeroSection] = useState<ScheduleHeroSection | null>(null);

  useEffect(() => {
    setIsVisible(true);
    
    const fetchData = async () => {
      try {
        const [scheduleResponse, coachesResponse, heroResponse] = await Promise.all([
          fetch('/api/schedule'),
          fetch('/api/coaches'),
          fetch('/api/schedule-hero-section')
        ]);

        if (!scheduleResponse.ok) {
          throw new Error(`Failed to fetch schedule data: ${scheduleResponse.status}`);
        }
        if (!coachesResponse.ok) {
          throw new Error(`Failed to fetch coaches data: ${coachesResponse.status}`);
        }
        if (!heroResponse.ok) {
          throw new Error(`Failed to fetch schedule hero section: ${heroResponse.status}`);
        }

        const scheduleData: Schedule[] = await scheduleResponse.json();
        const coachesData: Coach[] = await coachesResponse.json();
        const heroData: ScheduleHeroSection = await heroResponse.json();

        setAllSchedules(scheduleData);
        setAllCoaches(coachesData);
        setScheduleHeroSection(heroData);

      } catch (error) {
        console.error('Error in schedule page fetchData:', error);
      }
    };

    fetchData();
  }, []);

  const disciplines = useMemo(() => ['all', ...Array.from(new Set(allSchedules.map(c => c.discipline)))], [allSchedules]);
  const coaches = useMemo(() => ['all', ...allCoaches.map(c => c.id)], [allCoaches]);
  const coachNameMap = useMemo(() => allCoaches.reduce((acc, coach) => ({ ...acc, [coach.id]: coach.name }), {} as Record<string, string>), [allCoaches]);

  const filteredClasses = useMemo(() => {
    return allSchedules
      .filter(c => dayNames[getDay(parseISO(c.datetime))] === activeDay)
      .filter(c => disciplineFilter === 'all' || c.discipline === disciplineFilter)
      .filter(c => coachFilter === 'all' || c.coachId === coachFilter)
      .sort((a, b) => a.datetime.localeCompare(b.datetime));
  }, [activeDay, disciplineFilter, coachFilter, allSchedules]);

  const handleSessionClick = (session: Schedule) => {
    setSelectedSession(session);
    setIsDetailModalOpen(true);
  };

  if (allSchedules.length === 0) {
    return <div>Loading schedule data...</div>;
  }

  return (
    <main 
        className="relative flex min-h-screen flex-col bg-neutral-950 text-white overflow-hidden"
        style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1200&q=80)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
        }}
    >
      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        .gradient-text {
          background: linear-gradient(135deg, #dc2626 0%, #f87171 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .day-tab::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: #dc2626;
          box-shadow: 0 0 15px #dc2626;
          transform: scaleX(0);
          transition: transform 0.3s ease-in-out;
        }
        .day-tab.active::after, .day-tab:hover::after {
          transform: scaleX(1);
        }
        .class-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .class-card:hover {
          transform: translateY(-8px);
          border-color: rgba(220, 38, 38, 0.5);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
      `}</style>

      <div className="absolute inset-0 bg-black/70 z-0"></div>

      {scheduleHeroSection ? (
        <section className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${scheduleHeroSection.backgroundImageUrl})` }}>
            <div className="absolute inset-0 bg-black/75"></div>
          </div>
          <div className={`relative z-10 container mx-auto px-8 ${isVisible && 'animate-fade-in-up'}`}>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight">
              {scheduleHeroSection.mainHeadline.split(/(schedule)/gi).map((part, index) => (
                part.toLowerCase() === 'schedule' ? <span key={index} className="gradient-text">{part}</span> : <span key={index}>{part}</span>
              ))}
            </h1>
            <p className="mt-6 text-xl text-neutral-300 max-w-3xl mx-auto">
              {scheduleHeroSection.subHeadline}
            </p>
          </div>
        </section>
      ) : (
        <div className="text-center py-8">Loading Hero Section...</div>
      )}

      <section className="relative py-24 bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto px-8">
            <div className={`bg-neutral-900/80 backdrop-blur-md rounded-xl p-6 mb-12 flex flex-col md:flex-row gap-6 items-center ${isVisible && 'animate-fade-in-up'}`} style={{animationDelay: '0.2s'}}>
                <div className="flex-grow w-full md:w-auto">
                    <label className="block text-sm font-bold text-neutral-400 mb-2">FILTER BY DISCIPLINE</label>
                    <select value={disciplineFilter} onChange={(e) => setDisciplineFilter(e.target.value)} className="w-full px-5 py-3 rounded-lg bg-neutral-800 border border-neutral-700 focus:border-red-600 outline-none">
                        {disciplines.map(d => <option key={d} value={d}>{d.toUpperCase()}</option>)}
                    </select>
                </div>
                <div className="flex-grow w-full md:w-auto">
                    <label className="block text-sm font-bold text-neutral-400 mb-2">FILTER BY COACH</label>
                    <select value={coachFilter} onChange={(e) => setCoachFilter(e.target.value)} className="w-full px-5 py-3 rounded-lg bg-neutral-800 border border-neutral-700 focus:border-red-600 outline-none">
                        {coaches.map(c => <option key={c} value={c}>{coachNameMap[c] ? coachNameMap[c].toUpperCase() : c.toUpperCase()}</option>)}
                    </select>
                </div>
                <div className="w-full md:w-auto md:pt-7">
                    <button onClick={() => { setDisciplineFilter('all'); setCoachFilter('all'); }} className="w-full bg-neutral-700 hover:bg-red-600 px-8 py-3 rounded-lg font-bold transition-colors">RESET</button>
                </div>
            </div>

            <div className={`border-b border-neutral-800 flex justify-between overflow-x-auto ${isVisible && 'animate-fade-in-up'}`} style={{animationDelay: '0.3s'}}>
                {dayNames.map(day => (
                    <button key={day} onClick={() => setActiveDay(day)} className={`day-tab relative flex-shrink-0 px-4 py-4 text-lg font-bold uppercase transition-colors ${activeDay === day ? 'text-red-500' : 'text-neutral-500 hover:text-white'}`}>
                        {day}
                    </button>
                ))}
            </div>

            <div className="mt-12">
                {filteredClasses.length > 0 ? (
                    <div className="space-y-4 animate-fade-in">
                        {filteredClasses.map(session => (
                            <div key={session.id} onClick={() => handleSessionClick(session)} className="class-card bg-neutral-900/80 backdrop-blur-md rounded-lg p-6 flex flex-col md:flex-row items-center gap-6 border border-transparent cursor-pointer">
                                <div className="flex items-center gap-4 w-full md:w-1/4">
                                    <div className="text-red-500">{(disciplineIcons as any)[session.discipline]}</div>
                                    <div>
                                        <p className="text-xl font-bold text-white">{session.discipline}</p>
                                        <p className="text-sm text-neutral-400">w/ {coachNameMap[session.coachId] || 'Unknown Coach'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-2xl font-black gradient-text w-full md:w-auto">
                                    <FiCalendar/>
                                    <span>{format(parseISO(session.datetime), 'p')}</span>
                                </div>
                                <p className="text-neutral-400 flex-grow">{session.duration}</p>
                                <button onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); }} className="w-full md:w-auto bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-full font-bold uppercase transition-all hover:shadow-lg hover:shadow-red-600/50 hover:scale-105">
                                    Book Slot
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 animate-fade-in">
                        <h3 className="text-2xl font-bold">No Classes Found</h3>
                        <p className="text-neutral-500 mt-2">Try adjusting your filters or check back on another day.</p>
                    </div>
                )}
            </div>
        </div>
      </section>
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <ScheduleDetailModal 
        isOpen={isDetailModalOpen} 
        onClose={() => setIsDetailModalOpen(false)} 
        session={selectedSession} 
        coach={allCoaches.find(c => c.id === selectedSession?.coachId) || null}
      />
    </main>
  );
}
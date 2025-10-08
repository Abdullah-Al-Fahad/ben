'use client';
import React, { useEffect, useState, useMemo } from "react";
import { FiCalendar, FiUser, FiZap, FiHeart, FiShield, FiCrosshair } from 'react-icons/fi'; // Using react-icons for a sleek icon library
import ConsultationModal from "../../components/ConsultationModal";

// Define the structure for a single class session
interface ClassSession {
  id: number;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  time: string;
  discipline: 'Strength' | 'MMA' | 'Jiu-Jitsu' | 'CrossFit' | 'Cardio' | 'Mobility';
  coach: string;
  duration: string; // e.g., "60 min"
}

// --- MOCK BACKEND DATA ---
// Easily editable data source. In a real app, this comes from an API.
const scheduleData: ClassSession[] = [
  { id: 1, day: 'Monday', time: '06:00', discipline: 'CrossFit', coach: 'Elena Ramirez', duration: '60 min' },
  { id: 2, day: 'Monday', time: '09:00', discipline: 'Strength', coach: 'Marcus Thorne', duration: '90 min' },
  { id: 3, day: 'Monday', time: '18:00', discipline: 'Jiu-Jitsu', coach: 'Sam Chen', duration: '90 min' },
  { id: 4, day: 'Monday', time: '19:30', discipline: 'MMA', coach: 'Elena Ramirez', duration: '60 min' },
  
  { id: 5, day: 'Tuesday', time: '07:00', discipline: 'Cardio', coach: 'Guest Coach', duration: '45 min' },
  { id: 6, day: 'Tuesday', time: '17:00', discipline: 'Strength', coach: 'Marcus Thorne', duration: '90 min' },
  { id: 7, day: 'Tuesday', time: '19:00', discipline: 'MMA', coach: 'Elena Ramirez', duration: '90 min' },

  { id: 8, day: 'Wednesday', time: '06:00', discipline: 'CrossFit', coach: 'Elena Ramirez', duration: '60 min' },
  { id: 9, day: 'Wednesday', time: '09:00', discipline: 'Strength', coach: 'Marcus Thorne', duration: '90 min' },
  { id: 10, day: 'Wednesday', time: '18:00', discipline: 'Jiu-Jitsu', coach: 'Sam Chen', duration: '90 min' },
  
  { id: 11, day: 'Thursday', time: '07:00', discipline: 'Cardio', coach: 'Guest Coach', duration: '45 min' },
  { id: 12, day: 'Thursday', time: '17:00', discipline: 'Strength', coach: 'Marcus Thorne', duration: '90 min' },
  { id: 13, day: 'Thursday', time: '19:00', discipline: 'Jiu-Jitsu', coach: 'Sam Chen', duration: '90 min' },
  
  { id: 14, day: 'Friday', time: '06:00', discipline: 'CrossFit', coach: 'Elena Ramirez', duration: '60 min' },
  { id: 15, day: 'Friday', time: '09:00', discipline: 'Strength', coach: 'Marcus Thorne', duration: '90 min' },
  { id: 16, day: 'Friday', time: '18:00', discipline: 'MMA', coach: 'Elena Ramirez', duration: '60 min' },

  { id: 17, day: 'Saturday', time: '09:00', discipline: 'CrossFit', coach: 'All Coaches', duration: '75 min' },
  { id: 18, day: 'Saturday', time: '11:00', discipline: 'Jiu-Jitsu', coach: 'Sam Chen', duration: '120 min' },
  
  { id: 19, day: 'Sunday', time: '10:00', discipline: 'Mobility', coach: 'Sam Chen', duration: '60 min' },
];
// --- END MOCK DATA ---

// Map disciplines to icons for a visual flair
const disciplineIcons = {
    Strength: <FiZap className="w-6 h-6" />,
    MMA: <FiShield className="w-6 h-6" />,
    'Jiu-Jitsu': <FiCrosshair className="w-6 h-6" />,
    CrossFit: <FiHeart className="w-6 h-6" />,
    Cardio: <FiHeart className="w-6 h-6" />,
    Mobility: <FiUser className="w-6 h-6" />,
};

export default function SchedulePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeDay, setActiveDay] = useState<ClassSession['day']>('Monday');
  const [disciplineFilter, setDisciplineFilter] = useState('all');
  const [coachFilter, setCoachFilter] = useState('all');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const disciplines = useMemo(() => ['all', ...Array.from(new Set(scheduleData.map(c => c.discipline)))], []);
  const coaches = useMemo(() => ['all', ...Array.from(new Set(scheduleData.map(c => c.coach)))], []);
  const daysOfWeek: ClassSession['day'][] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Apply filters to the active day's classes
  const filteredClasses = useMemo(() => {
    return scheduleData
      .filter(c => c.day === activeDay)
      .filter(c => disciplineFilter === 'all' || c.discipline === disciplineFilter)
      .filter(c => coachFilter === 'all' || c.coach === coachFilter)
      .sort((a, b) => a.time.localeCompare(b.time));
  }, [activeDay, disciplineFilter, coachFilter]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main 
        className="relative flex min-h-screen flex-col bg-neutral-950 text-white overflow-hidden"
        style={{
            // --- NEW GYM-RELATED BACKGROUND IMAGE ---
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

      {/* This div adds a dark overlay to the entire page, ensuring text is readable over the background image */}
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      {/* All content below is positioned relative to keep it above the overlay */}
      <section className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1590487988256-5ed24a37982e?w=1200&h=600&fit=crop)` }}>
          <div className="absolute inset-0 bg-black/75"></div>
        </div>
        <div className={`relative z-10 container mx-auto px-8 ${isVisible && 'animate-fade-in-up'}`}>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight">Class <span className="gradient-text">Schedule</span></h1>
          <p className="mt-6 text-xl text-neutral-300 max-w-3xl mx-auto">Find your next challenge. Plan your week, dominate your goals.</p>
        </div>
      </section>

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
                        {coaches.map(c => <option key={c} value={c}>{c.toUpperCase()}</option>)}
                    </select>
                </div>
                <div className="w-full md:w-auto md:pt-7">
                    <button onClick={() => { setDisciplineFilter('all'); setCoachFilter('all'); }} className="w-full bg-neutral-700 hover:bg-red-600 px-8 py-3 rounded-lg font-bold transition-colors">RESET</button>
                </div>
            </div>

            <div className={`border-b border-neutral-800 flex justify-between overflow-x-auto ${isVisible && 'animate-fade-in-up'}`} style={{animationDelay: '0.3s'}}>
                {daysOfWeek.map(day => (
                    <button key={day} onClick={() => setActiveDay(day)} className={`day-tab relative flex-shrink-0 px-4 py-4 text-lg font-bold uppercase transition-colors ${activeDay === day ? 'text-red-500' : 'text-neutral-500 hover:text-white'}`}>
                        {day}
                    </button>
                ))}
            </div>

            <div className="mt-12">
                {filteredClasses.length > 0 ? (
                    <div className="space-y-4 animate-fade-in">
                        {filteredClasses.map(session => (
                            <div key={session.id} className="class-card bg-neutral-900/80 backdrop-blur-md rounded-lg p-6 flex flex-col md:flex-row items-center gap-6 border border-transparent">
                                <div className="flex items-center gap-4 w-full md:w-1/4">
                                    <div className="text-red-500">{disciplineIcons[session.discipline]}</div>
                                    <div>
                                        <p className="text-xl font-bold text-white">{session.discipline}</p>
                                        <p className="text-sm text-neutral-400">w/ {session.coach}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-2xl font-black gradient-text w-full md:w-auto">
                                    <FiCalendar/>
                                    <span>{session.time}</span>
                                </div>
                                <p className="text-neutral-400 flex-grow">{session.duration}</p>
                                <button onClick={() => setIsModalOpen(true)} className="w-full md:w-auto bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-full font-bold uppercase transition-all hover:shadow-lg hover:shadow-red-600/50 hover:scale-105">
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
    </main>
  );
}
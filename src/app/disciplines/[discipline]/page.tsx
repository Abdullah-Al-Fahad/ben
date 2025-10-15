'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { FaShieldAlt, FaBolt, FaCrosshairs, FaDumbbell, FaUserFriends, FaBrain, FaHeartbeat, FaFistRaised, FaQuoteLeft } from 'react-icons/fa';

interface KeyTechnique {
  icon: string;
  name: string;
  description: string;
}

interface ScheduleItem {
  day: string;
  time: string;
  class: string;
}

interface Testimonial {
  quote: string;
  author: string;
}

interface Program {
  id: string;
  name: string;
  tagline: string;
  imageUrl: string;
  description: string;
  detailedDescription: string;
  keyTechniques: KeyTechnique[];
  schedule: ScheduleItem[];
  gear: string[];
  testimonial: Testimonial;
}

const IconMap: { [key: string]: JSX.Element } = {
  FaShieldAlt: <FaShieldAlt />,
  FaBolt: <FaBolt />,
  FaCrosshairs: <FaCrosshairs />,
  FaDumbbell: <FaDumbbell />,
  FaUserFriends: <FaUserFriends />,
  FaBrain: <FaBrain />,
  FaHeartbeat: <FaHeartbeat />,
  FaFistRaised: <FaFistRaised />,
};

export default function DisciplinePage() {
  const params = useParams();
  const disciplineId = params.discipline as string;
  const [discipline, setDiscipline] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiscipline = async () => {
      try {
        const response = await fetch(`/api/programs/${disciplineId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Program = await response.json();
        setDiscipline(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    if (disciplineId) {
      fetchDiscipline();
    }
  }, [disciplineId]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-black text-white">Loading program details...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen bg-black text-white">Error: {error}</div>;
  }

  if (!discipline) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <h1 className="text-3xl font-bold">Discipline not found.</h1>
      </div>
    );
  }

  return (
    <main className="relative flex min-h-screen flex-col bg-black text-white overflow-hidden">
      <style jsx global>{`
        .gradient-text { background: linear-gradient(135deg, #dc2626 0%, #f87171 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      `}</style>

      {/* Hero Section */}
      <section 
        className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden"
      >
        <div 
            className="absolute inset-0 bg-cover bg-center brightness-50"
            style={{ backgroundImage: `url(${discipline.imageUrl})` }}
        >
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        <div className="relative z-10 container mx-auto px-8">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">
            {discipline.name}
          </h1>
          <p className="mt-4 text-2xl text-neutral-200 max-w-3xl mx-auto font-light">
            {discipline.tagline}
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-24 bg-neutral-950">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* Left Column: Description & Testimonial */}
            <div className="lg:col-span-2">
              <h2 className="text-4xl font-bold uppercase mb-6"><span className="gradient-text">Program</span> Overview</h2>
              <p className="text-lg text-neutral-300 leading-relaxed mb-12">{discipline.detailedDescription}</p>

              <h3 className="text-3xl font-bold uppercase mb-8"><span className="gradient-text">Key</span> Techniques</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {discipline.keyTechniques.map(tech => (
                  <div key={tech.name} className="flex items-start gap-4">
                    <div className="text-red-500 text-3xl mt-1">{IconMap[tech.icon]}</div>
                    <div>
                      <h4 className="font-bold text-xl">{tech.name}</h4>
                      <p className="text-neutral-400">{tech.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-black p-8 rounded-lg border border-neutral-800">
                <FaQuoteLeft className="text-red-500 text-4xl mb-4" />
                <p className="text-xl italic text-neutral-300 mb-4">{discipline.testimonial.quote}</p>
                <p className="text-right font-bold text-neutral-400">{discipline.testimonial.author}</p>
              </div>
            </div>

            {/* Right Column: Schedule & Gear */}
            <div className="lg:col-span-1">
              <div className="bg-black p-8 rounded-lg border border-neutral-800 sticky top-24">
                <h3 className="text-2xl font-bold uppercase mb-6 text-center gradient-text">Weekly Schedule</h3>
                <ul className="space-y-4 mb-10">
                  {discipline.schedule.map(item => (
                    <li key={item.day} className="flex justify-between items-center border-b border-neutral-800 pb-2">
                      <span className="font-bold">{item.day}</span>
                      <span className="text-neutral-400 text-sm text-right">{item.time}<br/>{item.class}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-2xl font-bold uppercase mb-6 text-center gradient-text">Required Gear</h3>
                <ul className="space-y-3">
                  {discipline.gear.map(item => (
                    <li key={item} className="flex items-center gap-3">
                      <FaDumbbell className="text-red-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <button className="mt-10 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 uppercase tracking-wider transition-all rounded-md">
                  Book a Class
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}

'use client';
import React, { useEffect, useState } from "react";
import Link from 'next/link';

// Define the structure for a Training Program
interface Program {
  id: string;
  name: string;
  subtitle: string;
  imageUrl: string;
  description: string;
  keyFocus: string[];
  suitability: string;
}

interface HeroSectionData {
  backgroundImageUrl: string;
  mainHeadline: string;
  subHeadline: string;
}

export default function ProgramsPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [heroData, setHeroData] = useState<HeroSectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsVisible(true);
    const fetchData = async () => {
      try {
        const [programsResponse, heroResponse] = await Promise.all([
          fetch('/api/programs'),
          fetch('/api/disciplines-hero-section'),
        ]);

        if (!programsResponse.ok) {
          throw new Error(`HTTP error! status: ${programsResponse.status} for programs`);
        }
        if (!heroResponse.ok) {
          throw new Error(`HTTP error! status: ${heroResponse.status} for hero section`);
        }

        const programsData: Program[] = await programsResponse.json();
        const heroSectionData: HeroSectionData = await heroResponse.json();

        setPrograms(programsData);
        setHeroData(heroSectionData);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-black text-white">Loading content...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen bg-black text-white">Error: {error}</div>;
  }

  return (
    <main className="relative flex min-h-screen flex-col bg-neutral-950 text-white overflow-hidden">
      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .gradient-text {
          background: linear-gradient(135deg, #dc2626 0%, #f87171 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .program-card {
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: background-color 0.4s ease;
        }
        .program-card:hover {
          background-color: rgba(23, 23, 23, 0.5);
        }
        .program-image-container {
            transition: transform 0.4s ease, filter 0.4s ease;
        }
        .program-card:hover .program-image-container {
            transform: scale(1.03);
            filter: saturate(1.1);
        }
      `}</style>

      {/* Hero Section */}
      <section 
        className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden"
      >
        <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed" 
            style={{ backgroundImage: `url(${heroData?.backgroundImageUrl})` }}
        >
          <div className="absolute inset-0 bg-black/75"></div>
        </div>
        <div className={`relative z-10 container mx-auto px-8 ${isVisible ? 'animate-fade-in-up' : ''}`}>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight">
            {heroData?.mainHeadline}
          </h1>
          <p className="mt-6 text-xl text-neutral-300 max-w-3xl mx-auto">
            {heroData?.subHeadline}
          </p>
        </div>
      </section>

      {/* Programs List Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-8">
          <div className="space-y-20">
            {programs.map((program, index) => (
              <div 
                key={program.id}
                className={`program-card grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-8 rounded-2xl ${isVisible ? 'animate-fade-in-up' : ''}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Image Section - reversing order for visual variety */}
                <div className={`relative h-96 rounded-xl overflow-hidden ${index % 2 === 0 ? 'lg:order-last' : ''}`}>
                  <img 
                    src={program.imageUrl} 
                    alt={`${program.name} training session`}
                    className="absolute inset-0 w-full h-full object-cover program-image-container"
                  />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>

                {/* Content Section */}
                <div>
                  <h2 className="text-4xl md:text-5xl font-black uppercase mb-3">
                    <span className="gradient-text">{program.name}</span>
                  </h2>
                  <p className="text-xl font-bold text-neutral-400 mb-6">{program.subtitle}</p>
                  
                  <p className="text-neutral-300 leading-relaxed mb-8">{program.description}</p>
                  
                  <div className="mb-8">
                    <h3 className="font-bold text-lg uppercase tracking-wider text-neutral-400 mb-4">Key Focus Areas:</h3>
                    <div className="flex flex-wrap gap-3">
                      {program.keyFocus.map(focus => (
                        <span key={focus} className="bg-neutral-800 border border-neutral-700 text-neutral-200 text-sm font-medium px-4 py-2 rounded-md">
                          {focus}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/schedule" className={`group relative inline-block rounded-full bg-gradient-to-r from-red-600 to-red-700 px-10 py-4 text-lg font-bold 
                                 uppercase tracking-wide transition-all hover:shadow-2xl hover:shadow-red-600/50 overflow-hidden`}>
                      <span className="relative z-10">View Schedule</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </Link>
                    <Link href={`/disciplines/${program.id}`} className={`inline-block rounded-full border-2 border-white px-10 py-4 text-lg font-bold 
                                 uppercase tracking-wide transition-all hover:bg-white hover:text-black hover:scale-105`}>
                        Learn More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-neutral-950 py-20">
        <div className="container mx-auto px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black uppercase mb-6">Your Path to Mastery Awaits</h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">Whether you're building raw power or mastering combat arts, your journey begins with a single step. Join us.</p>
          <button className={`bg-gradient-to-r from-red-600 to-red-700 text-white px-12 py-5 rounded-full text-lg font-bold uppercase 
                           hover:shadow-lg hover:shadow-red-600/50 transition-all hover:scale-105`}>
            Become a Member
          </button>
        </div>
      </section>
    </main>
  );
}
'use client';
import React, { useEffect, useState } from "react";
import Link from 'next/link';

import { Coach, CoachesHeroSection } from "../../lib/types";

export default function CoachesPage() {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [coachesHeroSection, setCoachesHeroSection] = useState<CoachesHeroSection | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const fetchData = async () => {
      try {
        const [coachesResponse, heroResponse] = await Promise.all([
          fetch('/api/coaches'),
          fetch('/api/coaches-hero-section')
        ]);

        if (!coachesResponse.ok) {
          const errorText = await coachesResponse.text();
          throw new Error(`Failed to fetch coaches: ${coachesResponse.status} - ${errorText}`);
        }
        if (!heroResponse.ok) {
          const errorText = await heroResponse.text();
          throw new Error(`Failed to fetch coaches hero section: ${heroResponse.status} - ${errorText}`);
        }

        const coachesData: Coach[] = await coachesResponse.json();
        const heroData: CoachesHeroSection = await heroResponse.json();

        console.log('Fetched Coaches Data:', coachesData);
        console.log('Fetched Coaches Hero Section Data:', heroData);

        setCoaches(coachesData);
        setCoachesHeroSection(heroData);

      } catch (error) {
        console.error('Error in coaches page fetchData:', error);
        // Optionally, set an error state to display a message to the user
      }
    };

    fetchData();
  }, []);

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
        .coach-card {
          position: relative;
          background: linear-gradient(145deg, #1a1a1a, #101010);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .coach-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 25px 50px rgba(220, 38, 38, 0.3);
        }
        .coach-card .img-container::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(16, 16, 16, 1) 5%, rgba(16, 16, 16, 0) 60%);
          z-index: 2;
        }
      `}</style>

      {/* Hero Section */}
      {coachesHeroSection ? (
        <section 
          className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden"
        >
          <div 
              className="absolute inset-0 bg-cover bg-center bg-fixed" 
              style={{ backgroundImage: `url(${coachesHeroSection.backgroundImageUrl})` }}
          >
            <div className="absolute inset-0 bg-black/75"></div>
          </div>
          <div className={`relative z-10 container mx-auto px-8 ${isVisible ? 'animate-fade-in-up' : ''}`}>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight">
              {coachesHeroSection.mainHeadline.split(' ').map((word, index) => (
                <React.Fragment key={index}>
                  {word.toLowerCase() === 'commanders' ? <span className="gradient-text">{word}</span> : <span>{word}</span>}
                  {index < coachesHeroSection.mainHeadline.split(' ').length - 1 && ' '}
                </React.Fragment>
              ))}
            </h1>
            <p className="mt-6 text-xl text-neutral-300 max-w-3xl mx-auto">
              {coachesHeroSection.subHeadline}
            </p>
          </div>
        </section>
      ) : (
        <div className="text-center py-8">Loading Hero Section...</div>
      )}

      {/* Coaches Grid Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {coaches.map((coach, index) => (
              <div 
                key={coach.id}
                className={`coach-card rounded-2xl overflow-hidden ${isVisible ? 'animate-fade-in-up' : ''}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative h-96 img-container">
                  <img 
                    src={coach.imageUrl} 
                    alt={`Photo of ${coach.name}`} 
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                  <div className="relative z-30 p-6 flex flex-col justify-end h-full text-white">
                    <h2 className="text-3xl font-black tracking-tight">{coach.name}</h2>
                    <p className="text-red-500 font-bold">{coach.role}</p>
                  </div>
                </div>

                <div className="p-8 pt-6">
                  <p className="text-neutral-300 mb-6 italic">"{coach.bio}"</p>
                  
                  <div className="mb-6">
                    <h3 className="font-bold text-lg uppercase tracking-wider text-neutral-400 mb-3">Specializations</h3>
                    <div className="flex flex-wrap gap-2">
                      {coach.specializations.map(spec => (
                        <span key={spec} className="bg-neutral-800 text-neutral-200 text-xs font-medium px-3 py-1 rounded-full">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg uppercase tracking-wider text-neutral-400 mb-3">Certifications</h3>
                    <ul className="list-inside list-disc text-neutral-400 space-y-1">
                      {coach.certifications.map(cert => (
                        <li key={cert}>{cert}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8">
                    <Link href={`/coaches/${coach.id}`} className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 uppercase tracking-wider transition-all rounded-md">
                        View Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 py-20">
        <div className="container mx-auto px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black uppercase mb-6">Ready to Train with the Best?</h2>
          <p className="text-xl mb-8 opacity-90">Our commanders are ready to guide you. Your transformation starts now.</p>
          <button className={`bg-black text-white px-12 py-5 rounded-full text-lg font-bold uppercase 
                           hover:bg-neutral-900 transition-all hover:scale-105 hover:shadow-2xl`}>
            Claim Your Free Trial
          </button>
        </div>
      </section>
    </main>
  );
}
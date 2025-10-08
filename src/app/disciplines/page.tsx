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

export default function ProgramsPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const programs: Program[] = [
    {
      id: "fitness",
      name: "Strength Training",
      subtitle: "Forge Raw Power",
      imageUrl: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=1200&h=800&fit=crop",
      description: "Our core strength program is designed to build a powerful foundation. Focusing on compound lifts like the squat, deadlift, and bench press, we guide you to systematically increase your strength, build lean muscle, and develop unshakable stability. This is where true power is made.",
      keyFocus: ["Maximal Strength", "Hypertrophy (Muscle Growth)", "Powerlifting Technique", "Core Stability"],
      suitability: "Beginner to Advanced Lifters"
    },
    {
      id: "mma",
      name: "Mixed Martial Arts",
      subtitle: "Unleash the Complete Fighter",
      imageUrl: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=1200&h=800&fit=crop",
      description: "Our MMA program integrates the most effective techniques from various combat disciplines. Learn striking, grappling, and wrestling in a dynamic environment that builds physical prowess and strategic thinking. Step into the cage and become a versatile and formidable martial artist.",
      keyFocus: ["Striking (Boxing, Muay Thai)", "Grappling (Submissions)", "Takedowns & Defense", "Cage Control & Strategy"],
      suitability: "All Levels Welcome"
    },
    {
      id: "bjj",
      name: "Jiu-Jitsu",
      subtitle: "The Art of Dominance",
      imageUrl: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=1200&h=800&fit=crop",
      description: "Master the art of ground-based combat with our Jiu-Jitsu program. Often called 'the gentle art,' it teaches you how to use leverage and technique to control and submit larger opponents. Develop discipline, problem-solving skills, and unparalleled grappling ability on the mats.",
      keyFocus: ["Positional Control", "Submissions & Escapes", "Takedowns & Sweeps", "Leverage & Technique"],
      suitability: "Beginner to Competitive Grapplers"
    }
  ];

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
            style={{ backgroundImage: `url(https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&h=600&fit=crop)` }}
        >
          <div className="absolute inset-0 bg-black/75"></div>
        </div>
        <div className={`relative z-10 container mx-auto px-8 ${isVisible ? 'animate-fade-in-up' : ''}`}>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight">
            Choose Your <span className="gradient-text">Discipline</span>
          </h1>
          <p className="mt-6 text-xl text-neutral-300 max-w-3xl mx-auto">
            Discover the elite training programs designed to forge your inner warrior.
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
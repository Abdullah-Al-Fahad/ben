'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedCoachModal, CoachDetail } from '@/components/AnimatedCoachModal';
import { ValueBlock } from '@/components/Landing/LandingCard';

interface Coach {
    slug: string;
    name: string;
    bio: string;
    image: string;
}

const CoachesPage = () => {
  const [coachesData, setCoachesData] = useState<Coach[]>([]);

  useEffect(() => {
    const fetchCoaches = async () => {
        try {
            const response = await fetch('/api/coaches');
            const data: Coach[] = await response.json();
            setCoachesData(data);
        } catch (error) {
            console.error("Failed to fetch coaches:", error);
        }
    };
    fetchCoaches();
  }, []);

  return (
    <div className="bg-black text-white font-sans">
      
      {/* Responsive Hero Section */}
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}> {/* 16:9 Aspect Ratio */}
        <div
          className="absolute inset-0 bg-cover bg-top filter grayscale"
          style={{
            backgroundImage: "url('https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0ef4/68e43e0279ad2b357d6c0f26_67f85e7e1dfe540942d24018_489283717_1143059611166111_4972771042462498311_n.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/6 to-black"></div>
        </div>
      </div>

      {/* Responsive Main Content */}
      <main className="relative z-10 -mt-24 sm:-mt-48 container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex flex-col md:flex-row justify-between items-stretch gap-12 mb-16">
            <div className="w-full md:w-1/2 space-y-6 text-gray-300 leading-relaxed">
                <div>
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight">
                        Our Coaches
                    </h1>
                    <div className="w-32 h-1.5 bg-red-600 mt-4"></div>
                </div>
                <p className="font-bold text-white text-lg">With years of experience both in coaching and competing, you will not find a more well rounded and professional coaching team to help you achieve your goals.</p>
                <p>Our coaching is rooted in purpose and clarity: to help students reach personal and professional goals through structured, meaningful training. We focus on developing a conceptual framework for understanding physical conflict—skills that extend beyond the mat into real life.</p>
                <p>We teach and train through three interconnected lenses. This multi-faceted approach lets us coach with intention and adaptability, honoring the individual journey of each student.</p>
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-4">
              {
                [{
                  title: "STREET",
                  subtitle: `Training should be grounded in real-life efficacy. We prioritize practical applicability over sport-specific rulesets or "gaming" the system.`,
                },
                {
                  title: "SPORT",
                  subtitle: "Sport offers structure, feedback, and challenge. Competing isn’t the only goal—growth is. From drilling to tournaments, every layer is an opportunity to refine your skills.",
                },
                {
                  title: "ART",
                  subtitle: "Martial arts is also a path of self-discovery. Through the joy of training, we strive to uncover personal truth and embrace continuous improvement.",
                },].map((item, index) =>
                  <div key={index} className="w-full">
                    <ValueBlock title={item.title}>
                      {item.subtitle}
                    </ValueBlock>
                  </div>
                )
              }
            </div>
        </div>

        {/* Coaches Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-24">
          {coachesData.map(coach => (
            <motion.div 
              key={coach.slug} 
              className="group relative rounded-lg cursor-pointer"
            >
              <div className="relative h-80 bg-black rounded-lg overflow-hidden">
                <motion.img 
                  src={coach.image} 
                  alt={coach.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-75"
                />
                
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/ to-transparent"></div>
                
                {/* Red line hover effect */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-red-600 transition-all duration-500 group-hover:w-full"></div>
                
                <div className="absolute bottom-0 left-0 w-full p-4">
                    <motion.h3 className="font-black text-lg text-white uppercase tracking-wider mb-2">
                        {coach.name}
                    </motion.h3>
                    <div className="flex flex-wrap gap-2">
                        <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                            {coach.bio}
                        </span>
                    </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CoachesPage;
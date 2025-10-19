'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedCoachModal, CoachDetail } from '@/components/AnimatedCoachModal';

// Coach data with slugs.
const coachesData = [
  {
    slug: 'angela-hayes',
    name: 'Angela Hayes',
    specialties: ['Muay Thai', 'MMA'],
    imageUrl: 'https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0f20/68e43e0279ad2b357d6c0f3c_67f9a7a48dea388609cd7c33_AngieStaffPhoto.jpeg',
  },
  {
    slug: 'ben-westrich',
    name: 'Ben Westrich',
    specialties: ['Brazilian Jiu-Jitsu', 'MMA'],
    imageUrl: 'https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0f20/68e43e0279ad2b357d6c0f3d_67f98256486dddbebb682a94_BenStaffPhoto.jpeg',
  },
  {
    slug: 'kay-hansen',
    name: 'Kay Hansen',
    specialties: ['Brazilian Jiu-Jitsu', 'MMA', 'Muay Thai'],
    imageUrl: 'https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0f20/68e43e0279ad2b357d6c0f56_IMG_20250922_183529.jpg',
  },
  {
    slug: 'larry-ruiz',
    name: 'Larry Ruiz',
    specialties: ['Brazilian Jiu-Jitsu', 'MMA'],
    imageUrl: 'https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0f20/68e43e0279ad2b357d6c0f55_67f9a6a3e5c4a366b4034f55_LarryStaffPhoto.jpeg',
  },
  {
    slug: 'natalie-salcedo',
    name: 'Natalie Salcedo',
    specialties: ['Brazilian Jiu-Jitsu', 'Muay Thai', 'MMA'],
    imageUrl: 'https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0f20/68e43e0279ad2b357d6c0f54_67f9a48c2f2816a346c54aa7_NatalieStaffPhoto-1.jpeg',
  },
];

interface CoachDetailsData { [key: string]: CoachDetail; }

const CoachesPage = () => {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [allCoachDetails, setAllCoachDetails] = useState<CoachDetailsData>({});
  
  const selectedCoachDetails = selectedSlug ? allCoachDetails[selectedSlug] : null;
  
  const handleCoachClick = async (slug: string) => {
    if (Object.keys(allCoachDetails).length === 0) {
        try {
            const response = await fetch('/coachDetails.json');
            const data: CoachDetailsData = await response.json();
            setAllCoachDetails(data);
        } catch (error) {
            console.error("Failed to fetch coach details:", error);
            return;
        }
    }
    setSelectedSlug(slug);
  };

  return (
    <div className="bg-black text-white font-sans">
      
      {/* Hero and Main Content sections remain unchanged */}
      <div className="relative">
        <div
          className="h-[60vh] min-h-[400px] bg-cover bg-center"
          style={{
            backgroundImage: "url('https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0ef4/68e43e0279ad2b357d6c0f26_67f85e7e1dfe540942d24018_489283717_1143059611166111_4972771042462498311_n.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/70 to-black"></div>
        </div>
      </div>
      <main className="relative z-10 -mt-48 container mx-auto px-6 lg:px-8 pb-24">
        <div className="max-w-xl mb-16">
          <h1 className="text-6xl md:text-7xl font-extrabold uppercase tracking-tight">
            Our Coaches
          </h1>
          <div className="w-32 h-1.5 bg-red-600 mt-4"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-12">
            <div className="space-y-6 text-gray-300 leading-relaxed">
                <p className="font-bold text-white text-lg">With years of experience both in coaching and competing, you will not find a more well rounded and professional coaching team to help you achieve your goals.</p>
                <p>Our coaching is rooted in purpose and clarity: to help students reach personal and professional goals through structured, meaningful training. We focus on developing a conceptual framework for understanding physical conflict—skills that extend beyond the mat into real life.</p>
                <p>We teach and train through three interconnected lenses. This multi-faceted approach lets us coach with intention and adaptability, honoring the individual journey of each student.</p>
            </div>
            <div className="space-y-10">
                <div className="border-l-4 border-red-600 pl-6"><h3 className="text-2xl font-bold tracking-widest">STREET</h3><p className="text-gray-300 mt-2">Training should be grounded in real-life efficacy. We prioritize practical applicability over sport-specific rulesets or "gaming" the system.</p></div>
                <div className="border-l-4 border-red-600 pl-6"><h3 className="text-2xl font-bold tracking-widest">SPORT</h3><p className="text-gray-300 mt-2">Sport offers structure, feedback, and challenge. Competing isn’t the only goal—growth is. From drilling to tournaments, every layer is an opportunity to refine your skills.</p></div>
                <div className="border-l-4 border-red-600 pl-6"><h3 className="text-2xl font-bold tracking-widest">ART</h3><p className="text-gray-300 mt-2">Martial arts is also a path of self-discovery. Through the joy of training, we strive to uncover personal truth and embrace continuous improvement.</p></div>
            </div>
        </div>

        {/* Coaches Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-24">
          {coachesData.map(coach => (
            <motion.div 
              key={coach.slug} 
              layoutId={coach.slug}
              onClick={() => handleCoachClick(coach.slug)}
              className="group relative rounded-lg cursor-pointer"
            >
              <div className="relative h-80 bg-black rounded-lg overflow-hidden">
                <motion.img 
                  src={coach.imageUrl} 
                  alt={coach.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-75"
                />
                
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                
                {/* Red line hover effect */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-red-600 transition-all duration-500 group-hover:w-full"></div>
                
                <div className="absolute bottom-0 left-0 w-full p-4">
                    <motion.h3 className="font-black text-lg text-white uppercase tracking-wider mb-2">
                        {coach.name}
                    </motion.h3>
                    <div className="flex flex-wrap gap-2">
                        {coach.specialties.map(spec => (
                            <span key={spec} className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                {spec}
                            </span>
                        ))}
                    </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
      <AnimatePresence>
        {selectedSlug && selectedCoachDetails && (
          <AnimatedCoachModal 
            slug={selectedSlug} 
            coach={selectedCoachDetails} 
            onClose={() => setSelectedSlug(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CoachesPage;

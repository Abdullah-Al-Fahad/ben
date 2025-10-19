import React from 'react';

// Coach data remains the same
const coachesData = [
  {
    name: 'Angela Hayes',
    disciplines: ['Muay Thai', 'MMA'],
    imageUrl: 'https://placehold.co/600x800/1a1a1a/fff?text=Angela+Hayes',
  },
  {
    name: 'Ben Westrich',
    disciplines: ['Brazilian Jiu-Jitsu', 'MMA'],
    imageUrl: 'https://placehold.co/600x800/1a1a1a/fff?text=Ben+Westrich',
  },
  {
    name: 'Kay Hansen',
    disciplines: ['Brazilian Jiu-Jitsu', 'MMA', 'Muay Thai'],
    imageUrl: 'https://placehold.co/600x800/1a1a1a/fff?text=Kay+Hansen',
  },
  {
    name: 'Larry Ruiz',
    disciplines: ['Brazilian Jiu-Jitsu', 'MMA'],
    imageUrl: 'https://placehold.co/600x800/1a1a1a/fff?text=Larry+Ruiz',
  },
  {
    name: 'Natalie Salcedo',
    disciplines: ['Brazilian Jiu-Jitsu', 'Muay Thai', 'MMA'],
    imageUrl: 'https://placehold.co/600x800/1a1a1a/fff?text=Natalie+Salcedo',
  },
];

const CoachesPage = () => {
  return (
    // The main container now has a black background which the image will fade into
    <div className="bg-black text-white font-sans">
      
      {/* Hero Section with Background Image and Fade */}
      <div className="relative">
        <div
          className="h-[60vh] min-h-[400px] bg-cover bg-center"
          style={{
            backgroundImage: "url('https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0ef4/68e43e0279ad2b357d6c0f26_67f85e7e1dfe540942d24018_489283717_1143059611166111_4972771042462498311_n.jpg')",
          }}
        >
          {/* THIS IS THE FADE EFFECT: A gradient overlay div */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/70 to-black"></div>
        </div>
      </div>

      {/* Main Content Section - Pulled up with a negative margin to overlap the image */}
      <main className="relative z-10 -mt-48 container mx-auto px-6 lg:px-8 pb-24">
        
        {/* Page Title */}
        <div className="max-w-xl mb-16">
          <h1 className="text-6xl md:text-7xl font-extrabold uppercase tracking-tight">
            Our Coaches
          </h1>
          <div className="w-32 h-1.5 bg-red-600 mt-4"></div>
        </div>

        {/* Intro and Philosophy Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-12">
            
            {/* Left Column: Intro Text */}
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p className="font-bold text-white text-lg">
                With years of experience both in coaching and competing, you will not find a more well rounded and professional coaching team to help you achieve your goals.
              </p>
              <p>
                Our coaching is rooted in purpose and clarity: to help students reach personal and professional goals through structured, meaningful training. We focus on developing a conceptual framework for understanding physical conflict—skills that extend beyond the mat into real life.
              </p>
              <p>
                We teach and train through three interconnected lenses. This multi-faceted approach lets us coach with intention and adaptability, honoring the individual journey of each student.
              </p>
            </div>

            {/* Right Column: Philosophies */}
            <div className="space-y-10">
              <div className="border-l-4 border-red-600 pl-6">
                <h3 className="text-2xl font-bold tracking-widest">STREET</h3>
                <p className="text-gray-300 mt-2">
                  Training should be grounded in real-life efficacy. We prioritize practical applicability over sport-specific rulesets or "gaming" the system.
                </p>
              </div>
              <div className="border-l-4 border-red-600 pl-6">
                <h3 className="text-2xl font-bold tracking-widest">SPORT</h3>
                <p className="text-gray-300 mt-2">
                  Sport offers structure, feedback, and challenge. Competing isn’t the only goal—growth is. From drilling to tournaments, every layer is an opportunity to refine your skills.
                </p>
              </div>
              <div className="border-l-4 border-red-600 pl-6">
                <h3 className="text-2xl font-bold tracking-widest">ART</h3>
                <p className="text-gray-300 mt-2">
                  Martial arts is also a path of self-discovery. Through the joy of training, we strive to uncover personal truth and embrace continuous improvement.
                </p>
              </div>
            </div>
        </div>

        {/* Coaches Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-24">
          {coachesData.map((coach) => (
            <div
              key={coach.name}
              className="relative h-[500px] bg-cover bg-center group"
              style={{ backgroundImage: `url(${coach.imageUrl})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="text-3xl font-bold uppercase tracking-wide">{coach.name}</h3>
                <div className="flex flex-wrap gap-2 mt-3">
                  {coach.disciplines.map((discipline) => (
                    <span
                      key={discipline}
                      className="bg-gray-900 bg-opacity-60 text-white text-xs font-medium px-3 py-1.5"
                    >
                      {discipline.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
          
      </main>
    </div>
  );
};

export default CoachesPage;
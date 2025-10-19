import React from 'react';

const MMAPage = () => {
  return (
    <main className="bg-black text-white font-['Exo']">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[300px] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0ef4/68f1708b1f423e673688df5e_mma_header.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider">
            MIXED MARTIAL ARTS
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-16 sm:py-24">
        <div className="container mx-auto max-w-4xl px-6 lg:px-8">
          <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
            <p>
              Mixed Martial Arts blends striking, clinch, wrestling, and submission grappling into a single, fluid system. Athletes learn to manage distance on the feet, enter the clinch, use the wall effectively, secure takedowns or defend them, and finish exchanges on the ground with strikes or submissions. MMA training builds fight IQ—transitions, timing, and positional choices that turn techniques into outcomes.
            </p>
            <p>
              At Warrior, our MMA program integrates the best of Muay Thai, wrestling, and Brazilian Jiu-Jitsu into a clear, concept-driven curriculum. Sessions rotate through four core phases—stand-up, clinch/wall work, takedown & defense, and ground control/finishing—so you can connect skills under realistic pressure. We emphasize proper mechanics, safe progressions, and structured rounds (technical, situational, and live) to develop durable movement patterns for beginners and advanced athletes alike. Cross-training with our Muay Thai and BJJ classes deepens your base and accelerates adaptation.
            </p>
            <p>
              Guided by the Warrior mission—to use martial arts to help students achieve personal and professional goals—we view training through three essential lenses:
            </p>
            
            <div className="pt-4">
              <div className="flex items-center">
                <div className="w-1 h-8 bg-red-600"></div>
                <h2 className="ml-4 text-3xl font-semibold tracking-wide text-white">STREET</h2>
              </div>
              <p className="mt-4">
                Principles first; minimal gamesmanship. Control, disengage, or resolve under real-world constraints.
              </p>
            </div>

            <div className="pt-4">
              <div className="flex items-center">
                <div className="w-1 h-8 bg-red-600"></div>
                <h2 className="ml-4 text-3xl font-semibold tracking-wide text-white">SPORT</h2>
              </div>
              <p className="mt-4">
                Use drilling and competition as feedback loops—improvement over temporary outcomes—from in-gym scenarios to sanctioned bouts.
              </p>
            </div>

            <div className="pt-4">
              <div className="flex items-center">
                <div className="w-1 h-8 bg-red-600"></div>
                <h2 className="ml-4 text-3xl font-semibold tracking-wide text-white">ART</h2>
              </div>
              <p className="mt-4">
                Train for the joy of the craft and the clarity it brings; refine mindset, discipline, and resilience through honest practice.
              </p>
            </div>
            
            <p className="pt-4">
              Whether your goal is to compete, get fit, or build confidence, our MMA program equips you to make smart positional choices and convert them into results.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MMAPage;
import React from 'react';

const JiuJitsuPage = () => {
  return (
    <main className="bg-black text-white font-['Exo']">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[300px] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0ef4/68f16d41661cd309160e72c8_bjj_header.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider">
            BRAZILIAN JIU-JITSU
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-16 sm:py-24">
        <div className="container mx-auto max-w-4xl px-6 lg:px-8">
          <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
            <p>
              Brazilian Jiu-Jitsu is a leverage-based grappling art centered on takedowns, positional control, and submissions. Training covers both gi and no-gi and moves seamlessly from the feet to the ground, teaching you to establish dominant positions (guard, half guard, side control, mount, back) and finish with high-percentage chokes and joint locks. Live, progressive sparring develops calm decision-making under pressure and the ability for a smaller, skilled practitioner to overcome size and strength.
            </p>
            <p>
              At Warrior, our Jiu-Jitsu is focused on effectiveness in real-life situations. We integrate wrestling so you can control where the engagement happens—equally useful for MMA, BJJ sport, and self-defense. Classes emphasize sound mechanics, safety, and clear concepts, frames and pressure, and intelligent risk management. Beginners and advanced athletes train side by side through structured progressions designed to build durable movement patterns and confidence.
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
                Principles that carry beyond any one ruleset; minimal gamesmanship, maximum applicability.
              </p>
            </div>

            <div className="pt-4">
              <div className="flex items-center">
                <div className="w-1 h-8 bg-red-600"></div>
                <h2 className="ml-4 text-3xl font-semibold tracking-wide text-white">SPORT</h2>
              </div>
              <p className="mt-4">
                Competition and drilling as feedback loops; improvement over temporary outcomes.
              </p>
            </div>

            <div className="pt-4">
              <div className="flex items-center">
                <div className="w-1 h-8 bg-red-600"></div>
                <h2 className="ml-4 text-3xl font-semibold tracking-wide text-white">ART</h2>
              </div>
              <p className="mt-4">
                The joy of practice and the pursuit of truth in technique and mindset.
              </p>
            </div>
            
            <p className="pt-4">
              Whether your aim is competition, fitness, or confidence, our BJJ program equips you with the skills and coaching to control positions—and control outcomes.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default JiuJitsuPage;
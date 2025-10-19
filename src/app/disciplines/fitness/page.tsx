import React from 'react';

const FitnessPage = () => {
  return (
    <main className="bg-black text-white font-['Exo']">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[300px] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0ef4/68e43e0279ad2b357d6c0f2d_Large_Banner.webp')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider">
            FITNESS
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-16 sm:py-24">
        <div className="container mx-auto max-w-4xl px-6 lg:px-8">
          <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
            <p>
              We don’t run a separate “fitness class”—fitness is built into every session. Our training blends technical skill with purposeful conditioning so you develop strength, mobility, and endurance that actually transfers to real movement: on the mats, on the bag, and in life. Sessions follow clear progressions—warm-up and mobility, skill development, targeted rounds (technical, situational, live), and a short finisher—so you build capacity without sacrificing mechanics or safety.
            </p>
            <h3 className="text-2xl font-semibold text-white pt-4">Why Jiu-Jitsu builds real, functional strength.</h3>
            <p>
              BJJ develops total-body strength through leverage and positional control rather than external weights alone. Frames, posts, and grips train isometric and eccentric strength in the hands, forearms, back, and trunk; guard work and passing build hip mobility and posterior-chain strength (glutes/hamstrings) through bridging, hip escapes, and rotational core actions. Live rounds naturally cycle intensities (aerobic base with anaerobic bursts), improving conditioning, balance, and resilience while keeping joints honest—no pattern survives bad posture or poor alignment.
            </p>
            <h3 className="text-2xl font-semibold text-white pt-4">Why Muay Thai is a conditioning powerhouse.</h3>
            <p>
              Pad/bag work and partner drills train footwork, timing, and full-body coordination while developing power in the hips and legs (kicks, knees) and repeat-effort endurance in the shoulders and trunk (punching volume, clinch). The result is efficient cardio (aerobic + interval), better ankle/hip/shoulder mobility from full-range strikes, improved reaction time, and durable core strength from anti-rotation, bracing, and transverse chaining on every strike. You’ll also see practical changes in body composition—more lean mass, better work capacity—driven by high-quality, skill-centered repetitions.
            </p>
            <p>
             Guided by the Warrior mission—to use martial arts to help students achieve personal and professional goals—we view fitness through the same three lenses:
            </p>
            
            <div className="pt-4">
              <div className="flex items-center">
                <div className="w-1 h-8 bg-red-600"></div>
                <h2 className="ml-4 text-3xl font-semibold tracking-wide text-white">STREET</h2>
              </div>
              <p className="mt-4">
                Fit for purpose—posture, balance, and the ability to control space under stress; minimal gamesmanship.
              </p>
            </div>

            <div className="pt-4">
              <div className="flex items-center">
                <div className="w-1 h-8 bg-red-600"></div>
                <h2 className="ml-4 text-3xl font-semibold tracking-wide text-white">SPORT</h2>
              </div>
              <p className="mt-4">
                Structured intensities and measurable progress—improvement over temporary outcomes—from drilling to live rounds.
              </p>
            </div>

            <div className="pt-4">
              <div className="flex items-center">
                <div className="w-1 h-8 bg-red-600"></div>
                <h2 className="ml-4 text-3xl font-semibold tracking-wide text-white">ART</h2>
              </div>
              <p className="mt-4">
                Training for the joy of refinement; movement quality, self-knowledge, and consistency over hacks.
              </p>
            </div>
            
            <p className="pt-4">
              By embedding conditioning inside BJJ and Muay Thai, you’ll build strength, flexibility, and endurance that are technical, transferable, and sustainable.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FitnessPage;
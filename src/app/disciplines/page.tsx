import React from 'react';

const MuayThaiPage = () => {
  return (
    <main className="bg-black text-white font-['Exo']">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[300px] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0ef4/68f1701389a222b62a80b254_mt_header_2.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider">
            THE ART OF MUAY THAI
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-16 sm:py-24">
        <div className="container mx-auto max-w-4xl px-6 lg:px-8">
          <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
            <p>
              Muay Thai, known as the “Art of Eight Limbs,” is one of the most versatile and effective striking systems in the world. Practitioners learn to use punches, kicks, knees, elbows, and clinch work to create a complete striking arsenal. This well-rounded approach not only builds physical skill and conditioning, but also provides a strong foundation for athletes pursuing success in combat sports, mixed martial arts, or overall fitness and self-defense.
            </p>
            <p>
              At Warrior, our Muay Thai program blends the traditional roots of the art with modern applications. Classes are structured to teach authentic striking techniques while also relating them to what has proven effective across other combat disciplines, such as MMA. We emphasize proper form, the development of solid movement patterns, and a safe training environment so that students of all ages and experience levels can progress with confidence.
            </p>
            <p>
              We are an official affiliate of <strong className="font-bold text-white">Classic Muay Thai</strong>, led by coach <strong className="font-bold text-white">Tyler Wombles</strong>. This system is built on ring-tested fundamentals—balanced stance and footwork, layered defense (parry/check/frame), clean kick and knee mechanics, efficient elbow entries, and disciplined clinch posture and off-balancing—producing success for athletes from beginners to high-level competitors. We incorporate Classic’s curriculum cycles, padwork templates, bag tasks, and sparring protocols, along with shared terminology, film study, and cornering standards, so your day-one fundamentals scale seamlessly into advanced tactics and MMA integration. This affiliation keeps our training current, consistent, and accountable, while giving students access to a proven roadmap for developing real fight IQ and results.Our philosophy of training is guided by the Warrior mission: to use martial arts as a vehicle for growth, both personally and professionally. Every class is designed to be practical, useful, and universally applicable. We view Muay Thai through three essential lenses:
            </p>
            
            <div className="pt-4">
              <div className="flex items-center">
                <div className="w-1 h-8 bg-red-600"></div>
                <h2 className="ml-4 text-3xl font-semibold tracking-wide text-white">STREET</h2>
              </div>
              <p className="mt-4">
                Training is grounded in real-world applicability. While rules exist in sport and training for safety, our focus is on adaptability beyond any one ruleset, preparing students for practical scenarios.
              </p>
            </div>

            <div className="pt-4">
              <div className="flex items-center">
                <div className="w-1 h-8 bg-red-600"></div>
                <h2 className="ml-4 text-3xl font-semibold tracking-wide text-white">SPORT</h2>
              </div>
              <p className="mt-4">
                Competition provides structure and feedback. Whether in controlled drilling or live events, improvement takes priority over temporary outcomes, ensuring lasting growth.
              </p>
            </div>

            <div className="pt-4">
              <div className="flex items-center">
                <div className="w-1 h-8 bg-red-600"></div>
                <h2 className="ml-4 text-3xl font-semibold tracking-wide text-white">ART</h2>
              </div>
              <p className="mt-4">
                At its heart, Muay Thai is a journey. Students train not only for performance but for the joy of practice, the pursuit of truth in technique, and the challenge of self-discovery.
              </p>
            </div>
            
            <p className="pt-4">
              Our athletes embody this journey, using Muay Thai to achieve goals in fitness, competition, and life. Whether your aim is to compete, improve health, or develop confidence and discipline, our Muay Thai program equips you with the tools to succeed.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MuayThaiPage;
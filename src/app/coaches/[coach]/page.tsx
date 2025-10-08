'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { FaTrophy, FaFistRaised, FaShieldAlt, FaStar, FaQuoteLeft, FaPlayCircle } from 'react-icons/fa';
import ConsultationModal from '@/components/ConsultationModal';

// --- EXPANDED DATA SOURCE ---
const coachesData = {
  'marcus-the-titan-thorne': {
    name: "Marcus 'The Titan' Thorne",
    title: "Head Coach & Founder",
    disciplines: ["Powerlifting", "Strongman"],
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1000&h=1200&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    bio: "Marcus isn't just the founder of Cowarrior; he is its very foundation. A titan of the strength world, he has dedicated his life to the pursuit of raw power. His journey began in the gritty, no-nonsense powerlifting gyms of his youth, where he learned that true strength is forged in the crucible of struggle. With a coaching style that is both demanding and deeply supportive, Marcus pushes his athletes to shatter their preconceived limits and build a foundation of unshakeable physical and mental fortitude.",
    philosophy: "We don't lift weights; we build pillars. Every squat, every deadlift, every press is a brick in the temple of your own strength. My goal is to give you the tools to build a monument.",
    achievements: [
      { icon: <FaTrophy />, text: "3x National Powerlifting Champion" },
      { icon: <FaFistRaised />, text: "Arnold Strongman Classic Competitor" },
      { icon: <FaStar />, text: "Certified Master Trainer" },
      { icon: <FaShieldAlt />, text: "15+ Years Coaching Experience" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1581009137042-c552e485697a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&h=600&fit=crop",
    ],
  },
  'elena-viper-ramirez': {
    name: "Elena 'Viper' Ramirez",
    title: "Head of CrossFit & Conditioning",
    disciplines: ["CrossFit", "Conditioning"],
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=1000&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    bio: "Elena is the engine of Cowarrior Gym. A whirlwind of energy and intensity, she is a former CrossFit Games athlete who lives and breathes high-performance fitness. Her 'Viper' moniker comes from her lightning-fast workouts and her ability to strike at the heart of her athletes' weaknesses, turning them into strengths. Elena believes that conditioning is the cornerstone of any warrior's arsenal, and her classes are designed to push you to the absolute edge of your capacity.",
    philosophy: "Your body is a machine. My job is to teach you how to redline it safely. We work hard, we sweat, we suffer, and we come back stronger every single day. There are no shortcuts on the path to elite fitness.",
    achievements: [
      { icon: <FaTrophy />, text: "2x CrossFit Games Athlete" },
      { icon: <FaFistRaised />, text: "National Weightlifting Medalist" },
      { icon: <FaStar />, text: "CrossFit Level 3 Trainer" },
      { icon: <FaShieldAlt />, text: "Certified Nutrition Specialist" },
    ],
    gallery: [
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1590487988256-5ed24a37982e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1519505907962-0a6cb006a87b?w=800&h=600&fit=crop",
    ],
  },
  'sam-the-ghost-chen': {
    name: "Sam 'The Ghost' Chen",
    title: "Mobility & Martial Arts Coach",
    disciplines: ["Mobility", "Muay Thai"],
    imageUrl: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=800&h=1000&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    bio: "Sam is the silent force at Cowarrior Gym. A master of movement and a veteran of the Muay Thai ring, he is known as 'The Ghost' for his fluid, almost effortless technique. Sam believes that true power comes from a foundation of mobility and control. His classes are a blend of ancient martial arts wisdom and modern biomechanics, designed to help you move with grace, prevent injury, and unlock your body's full potential.",
    philosophy: "A warrior who cannot move is a warrior who cannot fight. We build from the ground up, creating a body that is resilient, adaptable, and ready for anything. The fight is not always against an opponent; sometimes, it is against our own limitations.",
    achievements: [
      { icon: <FaTrophy />, text: "K-1 Kickboxing Veteran" },
      { icon: <FaShieldAlt />, text: "Functional Range Conditioning Specialist" },
      { icon: <FaStar />, text: "Certified Yoga & Mobility Instructor" },
      { icon: <FaFistRaised />, text: "10+ Years of International Experience" },
    ],
    gallery: [
        "https://images.unsplash.com/photo-1550345332-09e3ac987658?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1598449248223-8b4fb0f05ce3?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800&h=600&fit=crop",
    ],
  },
};

export default function CoachPage() {
  const params = useParams();
  const coachId = params.coach as keyof typeof coachesData;
  const coach = coachesData[coachId];
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!coach) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <h1 className="text-3xl font-bold">Coach not found.</h1>
      </div>
    );
  }

  return (
    <main className="relative flex min-h-screen flex-col bg-black text-white overflow-hidden">
      <style jsx global>{`
        .gradient-text { background: linear-gradient(135deg, #dc2626 0%, #f87171 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .hover-lift { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .hover-lift:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(220, 38, 38, 0.2); }
      `}</style>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover brightness-50"
          autoPlay
          loop
          muted
          playsInline
          src={coach.videoUrl}
        ></video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        <div className="relative z-10 container mx-auto px-8">
          <p className="text-xl md:text-2xl text-red-500 font-bold uppercase tracking-widest">
            {coach.title}
          </p>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mt-2">
            {coach.name}
          </h1>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-24 bg-neutral-950">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* Left Column: Bio & Philosophy */}
            <div className="lg:col-span-2">
              <h2 className="text-4xl font-bold uppercase mb-6"><span className="gradient-text">The</span> Philosophy</h2>
              <p className="text-xl italic text-neutral-300 leading-relaxed mb-12 border-l-4 border-red-600 pl-6">{coach.philosophy}</p>

              <h2 className="text-4xl font-bold uppercase mb-6"><span className="gradient-text">The</span> Story</h2>
              <p className="text-lg text-neutral-400 leading-relaxed whitespace-pre-line">{coach.bio}</p>
            </div>

            {/* Right Column: Accolades & CTA */}
            <div className="lg:col-span-1">
              <div className="bg-black p-8 rounded-lg border border-neutral-800 sticky top-24">
                <h3 className="text-2xl font-bold uppercase mb-6 text-center gradient-text">Accolades</h3>
                <ul className="space-y-4 mb-10">
                  {coach.achievements.map(item => (
                    <li key={item.text} className="flex items-center gap-4">
                      <div className="text-red-500 text-2xl">{item.icon}</div>
                      <span className="text-neutral-200">{item.text}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={() => setIsModalOpen(true)} className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-4 px-6 uppercase tracking-wider transition-all rounded-md hover:shadow-lg hover:shadow-red-600/50 hover:scale-105">
                  Book a Private Session
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-8">
            <h2 className="text-5xl font-black uppercase mb-12 text-center"><span className="gradient-text">Warrior</span> Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {coach.gallery.map((image, index) => (
                    <div key={index} className="group relative rounded-lg overflow-hidden aspect-w-1 aspect-h-1">
                        <img src={image} alt={`${coach.name} gallery image ${index + 1}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <FaPlayCircle className="text-white text-6xl" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
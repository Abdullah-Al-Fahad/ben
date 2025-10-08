'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { FaShieldAlt, FaBolt, FaCrosshairs, FaDumbbell, FaUserFriends, FaBrain, FaHeartbeat, FaFistRaised, FaQuoteLeft } from 'react-icons/fa';

// --- DATA SOURCE ---
const disciplinesData = {
  bjj: {
    name: "Brazilian Jiu-Jitsu",
    tagline: "The Art of Control and Submission",
    imageUrl: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=1600&h=900&fit=crop",
    description: "Brazilian Jiu-Jitsu is a martial art and combat sport based on ground fighting and submission holds. It focuses on the skill of controlling a resisting opponent in ways that force them to submit. It's a chess match where the human body is the set of pieces, emphasizing technique and leverage over size and strength.",
    keyTechniques: [
      { icon: <FaShieldAlt />, name: "Guard Retention", description: "Mastering the art of defending from your back." },
      { icon: <FaBolt />, name: "Submissions", description: "Learning chokes and joint locks to finish the fight." },
      { icon: <FaCrosshairs />, name: "Positional Dominance", description: "Controlling the opponent from superior positions." },
      { icon: <FaDumbbell />, name: "Sweeps & Reversals", description: "Using leverage to reverse a bad situation." },
    ],
    schedule: [
      { day: "Monday", time: "7:00 PM - 8:30 PM", class: "Gi Fundamentals" },
      { day: "Wednesday", time: "7:00 PM - 8:30 PM", class: "No-Gi Advanced" },
      { day: "Friday", time: "6:00 PM - 7:30 PM", class: "All Levels Sparring" },
    ],
    gear: ["Gi (Kimono)", "Belt", "Rashguard (optional for Gi)", "Spats (optional for Gi)"],
    testimonial: {
      quote: "BJJ at Cowarrior taught me that technique and determination can overcome any obstacle. It's the most challenging and rewarding thing I've ever done.",
      author: "- Alex R., Blue Belt",
    },
  },
  'muay-thai': {
    name: "Muay Thai",
    tagline: "The Science of Eight Limbs",
    imageUrl: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=1600&h=900&fit=crop",
    description: "Known for its tremendous power, efficiency, and raw simplicity, Muay Thai is a combat sport of Thailand that uses stand-up striking along with various clinching techniques. This physical and mental discipline is known as 'the art of eight limbs' because it is characterized by the combined use of fists, elbows, knees, and shins.",
    keyTechniques: [
        { icon: <FaBolt />, name: "Devastating Kicks", description: "Mastering the powerful roundhouse and teep kicks." },
        { icon: <FaFistRaised />, name: "Clinch Work", description: "Controlling the opponent in close quarters with knees and elbows." },
        { icon: <FaShieldAlt />, name: "Defensive Shell", description: "Building a strong guard to block and counter strikes." },
        { icon: <FaHeartbeat />, name: "Elite Conditioning", description: "Forging the endurance to fight round after round." },
    ],
    schedule: [
        { day: "Tuesday", time: "6:00 PM - 7:30 PM", class: "All Levels Striking" },
        { day: "Thursday", time: "6:00 PM - 7:30 PM", class: "Clinching & Sparring" },
        { day: "Saturday", time: "10:00 AM - 11:30 AM", class: "Pad Work Intensive" },
    ],
    gear: ["16oz Boxing Gloves", "Shin Guards", "Mouthguard", "Hand Wraps"],
    testimonial: {
        quote: "The energy in the Muay Thai class is insane. The coaches push you to your limit, and you leave feeling like a true fighter every single time.",
        author: "- Jessica P., 1 Year Member",
    },
  },
  mma: {
    name: "Mixed Martial Arts",
    tagline: "The Ultimate Synthesis of Combat",
    imageUrl: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=1600&h=900&fit=crop",
    description: "Mixed Martial Arts is the fastest growing sport in the world, and for good reason. It combines the most effective techniques from every martial art into a single, unified system. Our program teaches you to seamlessly blend striking, wrestling, and grappling, making you a well-rounded and formidable opponent in any situation.",
    keyTechniques: [
        { icon: <FaCrosshairs />, name: "Wrestling Takedowns", description: "Taking the fight to the ground on your terms." },
        { icon: <FaFistRaised />, name: "Cage Control", description: "Using the environment to your advantage." },
        { icon: <FaBrain />, name: "Strategic Transitions", description: "Flowing between striking and grappling seamlessly." },
        { icon: <FaDumbbell />, name: "Explosive Ground & Pound", description: "Finishing the fight with powerful strikes on the ground." },
    ],
    schedule: [
        { day: "Monday", time: "8:30 PM - 10:00 PM", class: "MMA Sparring" },
        { day: "Wednesday", time: "8:30 PM - 10:00 PM", class: "Wrestling for MMA" },
        { day: "Friday", time: "7:30 PM - 9:00 PM", class: "Live Drills & Scenarios" },
    ],
    gear: ["4oz MMA Gloves", "16oz Boxing Gloves", "Shin Guards", "Mouthguard", "Wrestling Shoes (optional)"],
    testimonial: {
        quote: "MMA training here is the real deal. It's not just about fighting; it's about strategy, discipline, and pushing your own boundaries.",
        author: "- Mike T., Amateur Fighter",
    },
  },
  fitness: {
    name: "Warrior Fitness",
    tagline: "Forge Your Inner Athlete",
    imageUrl: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=1600&h=900&fit=crop",
    description: "Our Warrior Fitness program is the engine of our gym. It's a high-intensity functional training system designed to build the strength, endurance, and agility of a modern-day warrior. We combine compound lifts, explosive plyometrics, and grueling conditioning circuits to create a physique that is as capable as it looks.",
    keyTechniques: [
        { icon: <FaDumbbell />, name: "Compound Strength", description: "Building a powerful foundation with squats, deadlifts, and presses." },
        { icon: <FaHeartbeat />, name: "Metabolic Conditioning", description: "Shredding fat and building endurance with high-intensity circuits." },
        { icon: <FaBolt />, name: "Explosive Power", description: "Developing athletic power with plyometrics and olympic lifts." },
        { icon: <FaUserFriends />, name: "Team-Based Workouts", description: "Pushing your limits with the support of the tribe." },
    ],
    schedule: [
        { day: "Monday", time: "6:00 AM - 7:00 AM", class: "Strength & Power" },
        { day: "Wednesday", time: "6:00 AM - 7:00 AM", class: "Metabolic Conditioning" },
        { day: "Friday", time: "6:00 AM - 7:00 AM", class: "Warrior Challenge" },
    ],
    gear: ["Athletic Shoes", "Comfortable Workout Clothes", "Water Bottle"],
    testimonial: {
        quote: "I've never been in better shape in my life. The Warrior Fitness program is tough, but the results are undeniable. I feel strong, confident, and ready for anything.",
        author: "- Sarah K., 2 Year Member",
    },
  },
};

export default function DisciplinePage() {
  const params = useParams();
  const disciplineId = params.discipline as keyof typeof disciplinesData;
  const discipline = disciplinesData[disciplineId];

  if (!discipline) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <h1 className="text-3xl font-bold">Discipline not found.</h1>
      </div>
    );
  }

  return (
    <main className="relative flex min-h-screen flex-col bg-black text-white overflow-hidden">
      <style jsx global>{`
        .gradient-text { background: linear-gradient(135deg, #dc2626 0%, #f87171 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      `}</style>

      {/* Hero Section */}
      <section 
        className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden"
      >
        <div 
            className="absolute inset-0 bg-cover bg-center brightness-50"
            style={{ backgroundImage: `url(${discipline.imageUrl})` }}
        >
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        <div className="relative z-10 container mx-auto px-8">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">
            {discipline.name}
          </h1>
          <p className="mt-4 text-2xl text-neutral-200 max-w-3xl mx-auto font-light">
            {discipline.tagline}
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-24 bg-neutral-950">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* Left Column: Description & Testimonial */}
            <div className="lg:col-span-2">
              <h2 className="text-4xl font-bold uppercase mb-6"><span className="gradient-text">Program</span> Overview</h2>
              <p className="text-lg text-neutral-300 leading-relaxed mb-12">{discipline.description}</p>

              <h3 className="text-3xl font-bold uppercase mb-8"><span className="gradient-text">Key</span> Techniques</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {discipline.keyTechniques.map(tech => (
                  <div key={tech.name} className="flex items-start gap-4">
                    <div className="text-red-500 text-3xl mt-1">{tech.icon}</div>
                    <div>
                      <h4 className="font-bold text-xl">{tech.name}</h4>
                      <p className="text-neutral-400">{tech.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-black p-8 rounded-lg border border-neutral-800">
                <FaQuoteLeft className="text-red-500 text-4xl mb-4" />
                <p className="text-xl italic text-neutral-300 mb-4">{discipline.testimonial.quote}</p>
                <p className="text-right font-bold text-neutral-400">{discipline.testimonial.author}</p>
              </div>
            </div>

            {/* Right Column: Schedule & Gear */}
            <div className="lg:col-span-1">
              <div className="bg-black p-8 rounded-lg border border-neutral-800 sticky top-24">
                <h3 className="text-2xl font-bold uppercase mb-6 text-center gradient-text">Weekly Schedule</h3>
                <ul className="space-y-4 mb-10">
                  {discipline.schedule.map(item => (
                    <li key={item.day} className="flex justify-between items-center border-b border-neutral-800 pb-2">
                      <span className="font-bold">{item.day}</span>
                      <span className="text-neutral-400 text-sm text-right">{item.time}<br/>{item.class}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-2xl font-bold uppercase mb-6 text-center gradient-text">Required Gear</h3>
                <ul className="space-y-3">
                  {discipline.gear.map(item => (
                    <li key={item} className="flex items-center gap-3">
                      <FaDumbbell className="text-red-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <button className="mt-10 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 uppercase tracking-wider transition-all rounded-md">
                  Book a Class
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}

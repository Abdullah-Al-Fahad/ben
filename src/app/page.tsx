'use client';
import React, { useEffect, useState, useCallback } from "react";
import { FaInstagram, FaFacebookF, FaChevronDown, FaDownload, FaCheck, FaTimes, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link'; // Import Link for navigation
import ConsultationModal from "../components/ConsultationModal";
import { coaches, Coach } from '../lib/coachesData'; // Import coaches data and Coach interface

// Data for schedule - simplified for demonstration
const scheduleData = {
  "Mon 11/10": [
    { time: "6:00 - 7:00", class: "BJJ - Adult GI", color: "blue" },
    { time: "7:00 - 7:30", class: "Kids BJJ - GI", color: "blue" },
    { time: "7:30 - 8:30", class: "Kickboxing - B Kids BJJ - GI", color: "green" },
  ],
  "Tue 11/11": [
    { time: "6:30 - 7:30", class: "Fighter Practice", color: "red" },
    { time: "7:30 - 8:30", class: "Kids Muay Thai", color: "orange" },
    { time: "8:30 - 9:30", class: "BJJ - Adult GI", color: "blue" },
  ],
   "Wed 11/12": [
    { time: "6:00 - 7:00", class: "BJJ - Adult GI", color: "blue" },
    { time: "7:00 - 7:30", class: "Kids BJJ - GI", color: "blue" },
    { time: "7:30 - 8:30", class: "Kickboxing - B Kids BJJ - GI", color: "green" },
  ],
  "Thu 11/13": [
    { time: "6:30 - 7:30", class: "Fighter Practice", color: "red" },
    { time: "7:30 - 8:30", class: "Kids Muay Thai", color: "orange" },
    { time: "8:30 - 9:30", class: "BJJ - Adult GI", color: "blue" },
  ],
  "Fri 11/14": [
    { time: "6:00 - 7:00", class: "BJJ - Adult No-Gi", color: "blue" },
    { time: "7:00 - 7:30", class: "Kids BJJ - No-Gi", color: "blue" },
    { time: "7:30 - 8:30", class: "Kickboxing - B Kids BJJ - GI", color: "green" },
  ],
  "Sat 11/15": [
    { time: "6:00 - 7:00", class: "BJJ - Adult No-Gi", color: "blue" },
    { time: "7:00 - 7:30", class: "Kids BJJ - No-Gi", color: "blue" },
    { time: "7:30 - 8:30", class: "Kickboxing - B Kids BJJ - GI", color: "green" },
  ],
};
interface Testimonial {
  id: number;
  author: string;
  text: string;
}

export default function Home() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    { id: 1, author: "Sarah M.", text: "Best gym I've ever joined! The coaches are amazing and the community is so supportive." },
    { id: 2, author: "Mike T.", text: "I've seen incredible results in just 3 months. The training programs are top-notch!" },
    { id: 3, author: "Jessica L.", text: "The facilities are world-class and the atmosphere keeps me motivated every single day." }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNewsletterStatus("Submitting...");

    if (!newsletterEmail) {
      setNewsletterStatus("Please enter your email.");
      return;
    }

    // Simulated submission
    setTimeout(() => {
      setNewsletterStatus("Subscribed successfully!");
      setNewsletterEmail("");
      setTimeout(() => setNewsletterStatus(""), 3000);
    }, 1000);
  };

  const scrollPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const scrollNext = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const carouselImages = [
    {
      url: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=1200&h=600&fit=crop",
      title: "MASTER BRAZILIAN JIU-JITSU",
      subtitle: "The gentle art of submission"
    },
    {
      url: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1200&h=600&fit=crop",
      title: "MUAY THAI MASTERY",
      subtitle: "The art of eight limbs"
    },
    {
      url: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1200&h=600&fit=crop",
      title: "MIXED MARTIAL ARTS",
      subtitle: "Complete combat training"
    },
    {
      url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&h=600&fit=crop",
      title: "ELITE FITNESS TRAINING",
      subtitle: "Forge an unbreakable body"
    }
];

  return (
    <main className="flex flex-col bg-neutral-950 text-white">
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(220, 38, 38, 0.5); }
          50% { box-shadow: 0 0 40px rgba(220, 38, 38, 0.8), 0 0 60px rgba(220, 38, 38, 0.4); }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        .animate-slide-in {
          animation: slideIn 0.8s ease-out forwards;
        }

        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(220, 38, 38, 0.3);
        }

        .gradient-text {
          background: linear-gradient(135deg, #dc2626 0%, #f87171 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .glass-effect {
          background: rgba(23, 23, 23, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .shimmer {
          position: relative;
          overflow: hidden;
        }

        .shimmer::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          100% { left: 100%; }
        }

        .feature-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .feature-card:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 25px 50px rgba(220, 38, 38, 0.4);
        }

        .icon-bounce {
          animation: pulse 2s ease-in-out infinite;
        }

        .slide-transition {
          transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
        }
      `}</style>

      {/* Hero Carousel Section */}
      <section className="relative min-h-screen overflow-hidden">
        {carouselImages.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 slide-transition ${
              index === currentSlide ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            style={{
              transform: index === currentSlide ? 'scale(1)' : 'scale(1.1)',
            }}
          >
            {/* Background Image with Parallax Effect */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${slide.url})`,
                transform: `scale(${1 + (index === currentSlide ? 0 : 0.1)})`
              }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>

            {/* Content */}
            <div className="container relative z-20 mx-auto px-8 h-full flex items-center">
              <div className={`max-w-3xl ${index === currentSlide ? 'animate-fade-in-up' : ''}`}>
                <div className="mb-6 inline-block">
                  <div className="h-1 w-20 bg-gradient-to-r from-red-600 to-red-400"></div>
                </div>
                <h1 className="mb-6 text-6xl md:text-8xl font-black leading-tight tracking-tight">
                  {slide.title}
                </h1>
                <p className="mb-8 text-2xl text-neutral-300 font-light tracking-wide">{slide.subtitle}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className={`group relative inline-block rounded-full bg-gradient-to-r from-red-600 to-red-700 px-10 py-4 text-lg font-bold 
                               uppercase tracking-wide transition-all hover:shadow-2xl hover:shadow-red-600/50 overflow-hidden`}
                  >
                    <span className="relative z-10">Let's train</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Buttons */}
        <button
          onClick={scrollPrev}
          className={`absolute left-8 top-1/2 -translate-y-1/2 z-30 glass-effect hover:bg-red-600/80 
                     p-4 rounded-full transition-all hover:scale-110`}
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={scrollNext}
          className={`absolute right-8 top-1/2 -translate-y-1/2 z-30 glass-effect hover:bg-red-600/80 
                     p-4 rounded-full transition-all hover:scale-110`}
          aria-label="Next slide"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-30 flex gap-3">
          {carouselImages.map((_, index) => (
            <button  
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? 'w-12 bg-red-600' : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        
             {/* Scroll Indicator */}
        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20 animate-bounce hidden md:block">
          <svg className="w-6 h-6 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
   {/* Disciplines Section */}
         <section className="bg-neutral-900 border-t border-neutral-800">
           <div className="container mx-auto grid grid-cols-1 md:grid-cols-4">
             <div className="border-r border-neutral-800 p-8 text-center">
               <h3 className="text-xl font-bold uppercase tracking-wide">Brazilian Jiu Jitsu</h3>
             </div>
             <div className="border-r border-neutral-800 p-8 text-center">
               <h3 className="text-xl font-bold uppercase tracking-wide">Muay Thai</h3>
             </div>
             <div className="border-r border-neutral-800 p-8 text-center">
               <h3 className="text-xl font-bold uppercase tracking-wide">Mixed Martial Arts</h3>
             </div>
             <div className="p-8 text-center">
               <h3 className="text-xl font-bold uppercase tracking-wide">Fitness</h3>
             </div>
           </div>
         </section>
   
         {/* Programs Section */}
         <section className="py-24 px-4 container mx-auto">
           <div className="grid md:grid-cols-2 gap-16 items-center">
             <div>
               <div className="h-1 w-16 bg-red-600 mb-6"></div>
               <h2 className="text-5xl font-black uppercase leading-tight mb-6">Programs for all levels from beginners to pros.</h2>
             </div>
             <div>
               <p className="text-gray-400 text-lg leading-relaxed">
                 Our gym has had both a local and a national presence since its founding in 2011, however its roots go much deeper. Our Team has been training and competing across the world in multiple combat sports to bring you the best instruction available. We are athletes, hobbyists, competitors, students and professionals. We strive to learn and grow while pushing others around us to do the same. We are people who always are working to improve ourselves and our community. <span className="text-white font-bold">We are a family, and we are a team.</span>
               </p>
             </div>
           </div>
         </section>
   
         {/* Image Section - Training */}
         <section className="relative h-96 overflow-hidden">
           <div 
             className="absolute inset-0 bg-cover bg-center"
             style={{ 
               backgroundImage: `url(https://images.unsplash.com/photo-1517438476312-10d79c077509?w=1600&h=600&fit=crop)`,
             }}
           >
             <div className="absolute inset-0 bg-black/40"></div>
           </div>
         </section>
   
         {/* Gym Features Section */}
         <section className="bg-black py-16 border-y border-neutral-800">
           <div className="container mx-auto px-4">
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
               <div className="p-4">
                 <div className="text-red-600 text-4xl font-black mb-2">∞</div>
                 <span className="font-bold text-sm uppercase tracking-wide">Access to Open Gym</span>
               </div>
               <div className="p-4">
                 <div className="text-red-600 text-4xl font-black mb-2">6</div>
                 <span className="font-bold text-sm uppercase tracking-wide">Days / Week</span>
               </div>
               <div className="p-4">
                 <div className="text-red-600 text-4xl font-black mb-2">♨</div>
                 <span className="font-bold text-sm uppercase tracking-wide">Recovery & Wellness</span>
               </div>
               <div className="p-4">
                 <div className="text-red-600 text-4xl font-black mb-2">23</div>
                 <span className="font-bold text-sm uppercase tracking-wide">World Medals</span>
               </div>
               <div className="p-4">
                 <div className="text-red-600 text-4xl font-black mb-2">12</div>
                 <span className="font-bold text-sm uppercase tracking-wide">Expert Trainers</span>
               </div>
               <div className="p-4">
                 <div className="text-red-600 text-4xl font-black mb-2">1478</div>
                 <span className="font-bold text-sm uppercase tracking-wide">Happy Clients</span>
               </div>
             </div>
           </div>
         </section>
   
         {/* Core Values Section */}
         <section className="py-24 px-4 container mx-auto">
           <div className="h-1 w-16 bg-red-600 mb-6"></div>
           <h2 className="text-5xl font-black uppercase mb-12">Are We Right For You</h2>
           <div className="max-w-4xl space-y-8">
             <p className="text-gray-400 text-lg leading-relaxed">
               At Warrior, we recognize that every student walks through our doors with a unique set of goals, motivations, and reasons for training. Some come to compete, some to get in shape, some for self-defense, and others to find structure or community. We believe wholeheartedly that these goals don't need to be the same for us to support one another.
             </p>
             <div className="grid md:grid-cols-2 gap-8 mt-12">
               <div>
                 <h3 className="text-red-600 font-bold text-xl mb-3 uppercase tracking-wide">REALISM</h3>
                 <p className="text-gray-400">We train for real life. The foundation of our practice is self-defense and practical application—not gamesmanship.</p>
               </div>
               <div>
                 <h3 className="text-red-600 font-bold text-xl mb-3 uppercase tracking-wide">Growth Mindset</h3>
                 <p className="text-gray-400">We believe that who you are today doesn't define who you can become.</p>
               </div>
               <div>
                 <h3 className="text-red-600 font-bold text-xl mb-3 uppercase tracking-wide">Respect</h3>
                 <p className="text-gray-400">Even when it's not obvious, respect is always present.</p>
               </div>
               <div>
                 <h3 className="text-red-600 font-bold text-xl mb-3 uppercase tracking-wide">Safety</h3>
                 <p className="text-gray-400">Training is only sustainable when we take care of each other.</p>
               </div>
               <div>
                 <h3 className="text-red-600 font-bold text-xl mb-3 uppercase tracking-wide">Diversity</h3>
                 <p className="text-gray-400">We embrace different styles, backgrounds, and perspectives.</p>
               </div>
               <div>
                 <h3 className="text-red-600 font-bold text-xl mb-3 uppercase tracking-wide">Cohesion</h3>
                 <p className="text-gray-400">We are individuals, but we train as one team.</p>
               </div>
             </div>
           </div>
         </section>
   
         {/* Team Photo Section */}
         <section className="relative h-96 overflow-hidden border-y border-neutral-800">
           <div 
             className="absolute inset-0 bg-cover bg-center grayscale"
             style={{ 
               backgroundImage: `url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&h=600&fit=crop)`,
             }}
           >
             <div className="absolute inset-0 bg-black/50"></div>
           </div>
           <div className="relative z-10 h-full flex items-center justify-center">
             <div className="text-center">
               <h2 className="text-6xl font-black uppercase mb-4">Our<br/>Team</h2>
               <div className="h-1 w-24 bg-red-600 mx-auto"></div>
             </div>
           </div>
         </section>
   
         {/* Coaches Section */}
         <section className="py-24 bg-neutral-900 px-4">
           <div className="container mx-auto">
             <div className="h-1 w-16 bg-red-600 mb-6"></div>
             <h2 className="text-5xl font-black uppercase mb-6">Our Coaches</h2>
             <p className="max-w-2xl mb-8 text-gray-400 text-lg">
               With years of experience both in coaching and competing, you will not find a more well-rounded and professional coaching team to help you achieve your goals.
             </p>
             <Link href="/coaches" className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 uppercase flex items-center gap-4 mb-12 transition-all w-fit">
               Meet All Coaches <FaArrowRight />
             </Link>
             
             {/* Removed filter buttons as they are not functional with the current setup and data */}
   
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
               {coaches.map(coach => (
                 <Link href={`/coaches/${coach.name.toLowerCase().replace(/[^a-z0-9\s-]/g, ' ').trim().replace(/\s+/g, '-')}`} key={coach.id} className="text-center group cursor-pointer">
                   <div className="aspect-square mb-4 overflow-hidden bg-neutral-800">
                     <img 
                       src={coach.imageUrl} 
                       alt={coach.name}
                       className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                     />
                   </div>
                   <h3 className="font-bold text-lg mb-1">{coach.name}</h3>
                   <p className="text-sm text-gray-400">{coach.specializations.join(' / ')}</p>
                 </Link>
               ))}
             </div>
           </div>
         </section>
   
         {/* Schedule Section */}
         <section className="py-24 px-4 container mx-auto">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
             <div>
               <div className="h-1 w-16 bg-red-600 mb-6"></div>
               <h2 className="text-5xl font-black uppercase">Schedule</h2>
             </div>
             <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 uppercase flex items-center gap-3 transition-all">
               Save Calendar <FaDownload />
             </button>
           </div>
   
           <div className="flex flex-wrap gap-4 border-b border-neutral-700 mb-8">
             <button className="py-3 px-6 bg-red-600 font-bold uppercase text-sm">ALL</button>
             <button className="py-3 px-6 hover:bg-neutral-800 font-bold uppercase text-sm transition-colors">BJJ</button>
             <button className="py-3 px-6 hover:bg-neutral-800 font-bold uppercase text-sm transition-colors">KICKBOXING</button>
             <button className="py-3 px-6 hover:bg-neutral-800 font-bold uppercase text-sm transition-colors">MUAY THAI</button>
             <button className="py-3 px-6 hover:bg-neutral-800 font-bold uppercase text-sm transition-colors">KIDS</button>
           </div>
   
           <div className="text-sm text-gray-400 mb-4">Nov 10 - 15, 2025</div>
           
           <div className="overflow-x-auto">
             <div className="grid grid-cols-6 gap-2 min-w-[800px]">
               {Object.entries(scheduleData).map(([day, classes]) => (
                 <div key={day} className="bg-neutral-900 border border-neutral-800">
                   <div className="text-center py-3 border-b border-neutral-800 font-bold uppercase text-sm bg-black">
                     {day}
                   </div>
                   <div className="p-2 space-y-2">
                     {classes.map(c => (
                       <div 
                         key={c.time + c.class} 
                         className={`p-3 rounded text-xs ${
                           c.color === 'blue' ? 'bg-blue-900/50' :
                           c.color === 'red' ? 'bg-red-900/50' :
                           c.color === 'green' ? 'bg-green-900/50' :
                           'bg-orange-900/50'
                         }`}
                       >
                         <div className="font-bold mb-1">{c.time}</div>
                         <div className="text-gray-300">{c.class}</div>
                       </div>
                     ))}
                   </div>
                 </div>
               ))}
             </div>
           </div>
         </section>
   
         {/* Pricing Section */}
         <section className="py-24 bg-neutral-900 px-4">
           <div className="container mx-auto">
             <div className="h-1 w-16 bg-red-600 mb-6"></div>
             <h2 className="text-5xl font-black uppercase mb-16">Program Pricing</h2>
   
             <div className="mb-16">
               <div className="inline-block bg-red-600 text-white font-bold py-4 px-12 text-lg uppercase mb-4">
                 ADULTS
               </div>
               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <div className="bg-black p-8 border border-neutral-800">
                   <h3 className="text-2xl font-bold uppercase mb-2">Muay Thai Only</h3>
                   <p className="text-gray-400 text-sm mb-6">Focused. Essential. Specialized.</p>
                   <ul className="space-y-3 text-sm mb-8">
                     <li className="flex items-start gap-3"><FaCheck className="text-green-500 mt-1 flex-shrink-0"/> Access Fitness Equipment</li>
                     <li className="flex items-start gap-3"><FaCheck className="text-green-500 mt-1 flex-shrink-0"/> Access to Open Gym</li>
                     <li className="flex items-start gap-3"><FaCheck className="text-green-500 mt-1 flex-shrink-0"/> Access 6 Days / Week</li>
                     <li className="flex items-start gap-3"><FaCheck className="text-green-500 mt-1 flex-shrink-0"/> Style Specific Group Classes</li>
                     <li className="flex items-start gap-3"><FaTimes className="text-red-500 mt-1 flex-shrink-0"/> Access All Available Classes</li>
                     <li className="flex items-start gap-3"><FaTimes className="text-red-500 mt-1 flex-shrink-0"/> Recovery Room</li>
                   </ul>
                   <div className="border-t border-neutral-800 pt-6">
                     <div className="text-4xl font-black mb-2">$119.99</div>
                     <div className="text-gray-400 text-sm">/month for 6 months</div>
                   </div>
                 </div>
   
                 <div className="bg-black p-8 border border-neutral-800">
                   <h3 className="text-2xl font-bold uppercase mb-2">Jiu Jitsu Only</h3>
                   <p className="text-gray-400 text-sm mb-6">Focused. Essential. Specialized.</p>
                   <ul className="space-y-3 text-sm mb-8">
                     <li className="flex items-start gap-3"><FaCheck className="text-green-500 mt-1 flex-shrink-0"/> Access Fitness Equipment</li>
                     <li className="flex items-start gap-3"><FaCheck className="text-green-500 mt-1 flex-shrink-0"/> Access to Open Gym</li>
                     <li className="flex items-start gap-3"><FaCheck className="text-green-500 mt-1 flex-shrink-0"/> Access 6 Days / Week</li>
                     <li className="flex items-start gap-3"><FaCheck className="text-green-500 mt-1 flex-shrink-0"/> Style Specific Group Classes</li>
                     <li className="flex items-start gap-3"><FaTimes className="text-red-500 mt-1 flex-shrink-0"/> Access All Available Classes</li>
                     <li className="flex items-start gap-3"><FaTimes className="text-red-500 mt-1 flex-shrink-0"/> Recovery Room</li>
                   </ul>
                   <div className="border-t border-neutral-800 pt-6">
                     <div className="text-4xl font-black mb-2">$119.99</div>
                     <div className="text-gray-400 text-sm">/month for 6 months</div>
                   </div>
                 </div>
   
                 <div className="bg-black p-8 border border-neutral-800">
                   <h3 className="text-2xl font-bold uppercase mb-2">All Inclusive</h3>
                   <p className="text-gray-400 text-sm mb-6">Dynamic. Versatile. Empowering.</p>
                   <ul className="space-y-3 text-sm mb-8">
                     <li className="flex items-start gap-3"><FaCheck className="text-green-500 mt-1 flex-shrink-0"/> Access Fitness Equipment</li>
                     <li className="flex items-start gap-3"><FaCheck className="text-green-500 mt-1 flex-shrink-0"/> Access to Open Gym</li>
                     <li className="flex items-start gap-3"><FaCheck className="text-green-500 mt-1 flex-shrink-0"/> Access 6 Days / Week</li>
                     <li className="flex items-start gap-3"><FaCheck className="text-green-500 mt-1 flex-shrink-0"/> All Group Classes</li>
                     <li className="flex items-start gap-3"><FaCheck className="text-green-500 mt-1 flex-shrink-0"/> Access All Available Classes</li>
                     <li className="flex items-start gap-3"><FaTimes className="text-red-500 mt-1 flex-shrink-0"/> Recovery Room</li>
                   </ul>
                   <div className="border-t border-neutral-800 pt-6">
                     <div className="text-4xl font-black mb-2">$139.99</div>
                     <div className="text-gray-400 text-sm">/month for 6 months</div>
                   </div>
                 </div>
   
                 <div className="bg-black p-8 border-4 border-red-600 relative">
                   <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-3 py-1 uppercase">
                     Popular
                   </div>
                   <h3 className="text-2xl font-bold uppercase mb-2">Premier</h3>
                   <p className="text-gray-400 text-sm mb-6">Unlimited. Exclusive. Mastery.</p>
                   <ul className="space-y-3 text-sm mb-8">
                     <li className="flex items-start gap-3"><FaCheck className="text-green-500 mt-1 flex-shrink-0"/> Access Fitness Equipment</li>
                     <li className="flex items-start gap-3"><FaCheck className="text-green-500 mt-1 flex-shrink-0"/> Access to Open Gym</li>
                     <li className="flex items-start gap-3"><FaCheck className="text-green-500 mt-1 flex-shrink-0"/> Access 6 Days / Week</li>
                     <li className="flex items-start gap-3"><FaCheck className="text-green-500 mt-1 flex-shrink-0"/> All Group Classes</li>
                     <li className="flex items-start gap-3"><FaCheck className="text-green-500 mt-1 flex-shrink-0"/> Access All Available Classes</li>
                     <li className="flex items-start gap-3"><FaCheck className="text-green-500 mt-1 flex-shrink-0"/> Recovery Room</li>
                     <li className="flex items-start gap-3"><FaCheck className="text-green-500 mt-1 flex-shrink-0"/> One Private Lesson / Month</li>
                   </ul>
                   <div className="border-t border-red-600 pt-6">
                     <div className="text-4xl font-black mb-2">$199.99</div>
                     <div className="text-gray-400 text-sm">/month for 6 months</div>
                   </div>
                 </div>
               </div>
             </div>
   
             <div className="mb-12">
               <div className="inline-block bg-red-600 text-white font-bold py-4 px-12 text-lg uppercase mb-4">
                 KIDS
               </div>
               <div className="grid md:grid-cols-3 gap-6">
                 <div className="bg-black p-8 border border-neutral-800">
                   <h3 className="text-2xl font-bold uppercase mb-6">Muay Thai Only</h3>
                   <div className="border-t border-neutral-800 pt-6">
                     <div className="text-4xl font-black mb-2">$99.99</div>
                     <div className="text-gray-400 text-sm">/month for 6 months</div>
                   </div>
                 </div>
                 <div className="bg-black p-8 border border-neutral-800">
                   <h3 className="text-2xl font-bold uppercase mb-6">Jiu Jitsu Only</h3>
                   <div className="border-t border-neutral-800 pt-6">
                     <div className="text-4xl font-black mb-2">$99.99</div>
                     <div className="text-gray-400 text-sm">/month for 6 months</div>
                   </div>
                 </div>
                 <div className="bg-black p-8 border border-neutral-800">
                   <h3 className="text-2xl font-bold uppercase mb-6">All Inclusive</h3>
                   <div className="border-t border-neutral-800 pt-6">
                     <div className="text-4xl font-black mb-2">$119.99</div>
                     <div className="text-gray-400 text-sm">/month for 6 months</div>
                   </div>
                 </div>
               </div>
             </div>
   
             <div className="text-center text-xs text-gray-500 max-w-3xl mx-auto space-y-2">
               <p>Active Military / LEO / First Responder discounts are applied to the month-to-month price.</p>
               <p>Family rates cap out at $350 monthly for all members. Immediate family only.</p>
               <p>Must be active military, LEO, first responder or on a six-month commitment plan for discount to apply.</p>
               <p className="mt-4">**Premier Membership cannot be combined with membership discount / family rates.</p>
             </div>
           </div>
         </section>
   
         {/* Apparel Section removed as requested. Adjusted flow for visual consistency. */}
   
         {/* Testimonials Section */}
         <section className="py-24 px-4">
           <div className="container mx-auto">
             <div className="h-1 w-16 bg-red-600 mb-6"></div>
             <h2 className="text-5xl font-black uppercase mb-16">What Our Members Say</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { name: "Sarah M.", text: "Best gym I've ever joined! The coaches are amazing and the community is so supportive. I've learned so much in just 6 months." },
                 { name: "Mike T.", text: "I've seen incredible results in just 3 months. The training programs are top-notch and the atmosphere is unmatched!" },
                 { name: "Jessica L.", text: "The facilities are world-class and the atmosphere keeps me motivated every single day. This is more than a gym—it's a family." }
               ].map((testimonial, index) => (
                 <div key={index} className="bg-black p-8 border border-neutral-800">
                   <div className="mb-6">
                     <svg className="w-10 h-10 text-red-600 mb-4" fill="currentColor" viewBox="0 0 24 24">
                       <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                     </svg>
                     <p className="text-gray-300 text-lg leading-relaxed">"{testimonial.text}"</p>
                   </div>
                   <div className="flex items-center gap-3">
                     <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-lg font-bold">
                       {testimonial.name.split(' ').map(n => n[0]).join('')}
                     </div>
                     <p className="text-white font-bold">{testimonial.name}</p>
                   </div>
                 </div>
               ))}
             </div>
           </div>
         </section>
   
         {/* Newsletter Section */}
         <section className="py-24 bg-black px-4 border-y border-neutral-800">
           <div className="container mx-auto text-center">
             <div className="h-1 w-16 bg-red-600 mx-auto mb-6"></div>
             <h2 className="text-5xl font-black uppercase mb-6">Stay Updated</h2>
             <p className="text-xl mb-10 text-gray-400 max-w-2xl mx-auto">
               Subscribe to our newsletter for the latest news, programs, and exclusive offers.
             </p>
             <form onSubmit={handleNewsletterSubmit} className="max-w-xl mx-auto">
               <div className="flex flex-col sm:flex-row gap-4">
                 <input
                   type="email"
                   placeholder="Enter your email"
                   value={newsletterEmail}
                   onChange={(e) => setNewsletterEmail(e.target.value)}
                   required
                   className="flex-1 px-6 py-4 bg-neutral-900 border border-neutral-700 text-white placeholder-gray-500 focus:outline-none focus:border-red-600"
                 />
                 <button
                   type="submit"
                   className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 font-bold uppercase transition-all"
                 >
                   Subscribe
                 </button>
               </div>
               {newsletterStatus && (
                 <p className={`mt-4 text-sm font-medium ${newsletterStatus.includes('success') ? 'text-green-400' : 'text-red-400'}`}>
                   {newsletterStatus}
                 </p>
               )}
             </form>
           </div>
         </section>
   
         {/* CTA Section */}
         <section className="bg-red-600 py-20">
           <div className="container mx-auto px-8 text-center">
             <h2 className="text-5xl font-black uppercase mb-6">Ready to Transform Your Life?</h2>
             <p className="text-xl mb-8 opacity-90">Join Warrior Gym today and start your martial arts journey</p>
             <button onClick={() => setIsModalOpen(true)} className="bg-black hover:bg-neutral-900 text-white px-12 py-5 text-lg font-bold uppercase transition-all">
               Get Started Now
             </button>
           </div>
         </section>
   
       
       </main>
     );
   }
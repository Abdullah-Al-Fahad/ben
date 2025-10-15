'use client';
import React, { useEffect, useState, useCallback, useRef } from "react";
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';
import { FaInstagram, FaFacebookF, FaChevronDown, FaDownload, FaCheck, FaTimes, FaArrowRight, FaInfinity, FaSpa } from 'react-icons/fa';
import Link from 'next/link';
import ConsultationModal from "../components/ConsultationModal";

// Interfaces
interface Coach {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
  bio: string;
  specializations: string[];
  certifications: string[];
}

interface HeroSlide {
  id: number;
  url: string;
  title: string;
  subtitle: string;
}

interface PricingSection {
  id: string;
  title: string;
  tiers: PricingTier[];
}

interface PricingTier {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isFeatured?: boolean;
}

// ... (the rest of the interfaces)

export default function Home() {
  const [pricingSections, setPricingSections] = useState<PricingSection[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [settings, setSettings] = useState<Settings>({ heroTitle: '', heroSlides: [] });
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [whyChooseUsData, setWhyChooseUsData] = useState<WhyChooseUsData | null>(null);
  const [ctaData, setCtaData] = useState<CtaData | null>(null);
  const [programsSectionData, setProgramsSectionData] = useState<ProgramsSectionData | null>(null);
  const [imageSectionTrainingData, setImageSectionTrainingData] = useState<ImageSectionTrainingData | null>(null);
  const [gymFeaturesSectionData, setGymFeaturesSectionData] = useState<GymFeaturesSectionData | null>(null);
  const [coreValuesSectionData, setCoreValuesSectionData] = useState<CoreValuesSectionData | null>(null);
  const [teamPhotoSectionData, setTeamPhotoSectionData] = useState<TeamPhotoSectionData | null>(null);
  const [coachesSectionIntroData, setCoachesSectionIntroData] = useState<CoachesSectionIntroData | null>(null);
  const [scheduleSectionData, setScheduleSectionData] = useState<ScheduleSectionData | null>(null);
  const [pricingSectionData, setPricingSectionData] = useState<PricingSectionData | null>(null);
  const [newsletterSectionData, setNewsletterSectionData] = useState<NewsletterSectionData | null>(null);
  const [homeSchedule, setHomeSchedule] = useState<any>({}); // State for schedule data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fullSchedule, setFullSchedule] = useState<any[]>([]);
  const [scheduleFilters, setScheduleFilters] = useState<string[]>(['ALL']);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [scheduleDateRange, setScheduleDateRange] = useState('');
  const scheduleRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (scheduleRef.current) {
      const button = scheduleRef.current.querySelector('button');
      if (button) {
        button.style.display = 'none';
      }

      html2canvas(scheduleRef.current, { useCORS: true, allowTaint: true }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = canvasWidth / canvasHeight;
        const width = pdfWidth;
        const height = width / ratio;
        pdf.addImage(imgData, 'PNG', 0, 0, width, height);
        pdf.save('schedule.pdf');

        if (button) {
          button.style.display = 'flex';
        }
      });
    }
  };

  useEffect(() => {
    setIsVisible(true);
    
    const fetchCoaches = async () => {
      const response = await fetch('/api/coaches');
      const data = await response.json();
      setCoaches(data);
    };

    const fetchSettingsAndTestimonials = async () => {
        const response = await fetch('/api/settings'); // Assuming /api/settings can return all settings, including testimonials
        const data = await response.json();
        setSettings(data);
        setTestimonials(data.testimonials || []); // Assuming testimonials are nested under settings
    };

    const fetchSchedule = async () => {
      const response = await fetch('/api/schedule');
      const data = await response.json();
      setFullSchedule(data);

      if (data.length > 0) {
        const dates = data.map((item: any) => new Date(item.datetime));
        const minDate = new Date(Math.min.apply(null, dates));
        const maxDate = new Date(Math.max.apply(null, dates));

        const formattedStartDate = minDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const formattedEndDate = maxDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

        setScheduleDateRange(`${formattedStartDate} - ${formattedEndDate}`);
      }

      const disciplines = [...new Set(data.map((item: any) => item.discipline))];
      setScheduleFilters(['ALL', ...disciplines]);

      const groupedSchedule = data.reduce((acc: any, item: any) => {
        const date = new Date(item.datetime);
        const day = date.toLocaleDateString('en-US', { weekday: 'short', month: 'numeric', day: 'numeric' });
        if (!acc[day]) {
          acc[day] = [];
        }
        acc[day].push({ time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }), class: item.discipline, color: "blue" });
        return acc;
      }, {});
      setHomeSchedule(groupedSchedule);
    };

    const fetchPricing = async () => {
      const response = await fetch('/api/pricing');
      const data = await response.json();
      setPricingSections(Array.isArray(data) ? data : []);
    };

    const fetchDisciplines = async () => {
      const response = await fetch('/api/disciplines');
      const data = await response.json();
      setDisciplines(data);
    };

    const fetchWhyChooseUs = async () => {
      const response = await fetch('/api/whyChooseUs');
      const data = await response.json();
      setWhyChooseUsData(data);
    };

    const fetchCtaData = async () => {
      const response = await fetch('/api/cta');
      const data = await response.json();
      setCtaData(data);
    };

    const fetchProgramsSectionData = async () => {
      const response = await fetch('/api/programs-section');
      const data = await response.json();
      setProgramsSectionData(data);
    };

    const fetchImageSectionTrainingData = async () => {
      const response = await fetch('/api/image-section-training');
      const data = await response.json();
      setImageSectionTrainingData(data);
    };

    const fetchGymFeaturesSectionData = async () => {
      const response = await fetch('/api/gym-features-section');
      const data = await response.json();
      setGymFeaturesSectionData(data);
    };

    const fetchCoreValuesSectionData = async () => {
      const response = await fetch('/api/core-values-section');
      const data = await response.json();
      setCoreValuesSectionData(data);
    };

    const fetchTeamPhotoSectionData = async () => {
      const response = await fetch('/api/team-photo-section');
      const data = await response.json();
      setTeamPhotoSectionData(data);
    };

    const fetchCoachesSectionIntroData = async () => {
      const response = await fetch('/api/coaches-section-intro');
      const data = await response.json();
      setCoachesSectionIntroData(data);
    };

    const fetchScheduleSectionData = async () => {
      const response = await fetch('/api/schedule-section');
      const data = await response.json();
      setScheduleSectionData(data);
    };

    const fetchPricingSectionData = async () => {
      const response = await fetch('/api/pricing-section');
      const data = await response.json();
      setPricingSectionData(data);
    };

    const fetchNewsletterSectionData = async () => {
      const response = await fetch('/api/newsletter-section');
      const data = await response.json();
      setNewsletterSectionData(data);
    };

    fetchCoaches();
    fetchSettingsAndTestimonials();
    fetchSchedule();
    fetchPricing();
    fetchDisciplines();
    fetchWhyChooseUs();
    fetchCtaData();
    fetchProgramsSectionData();
    fetchImageSectionTrainingData();
    fetchGymFeaturesSectionData();
    fetchCoreValuesSectionData();
    fetchTeamPhotoSectionData();
    fetchCoachesSectionIntroData();
    fetchScheduleSectionData();
    fetchPricingSectionData();
    fetchNewsletterSectionData();
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (settings.heroSlides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % settings.heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [settings.heroSlides]);

  useEffect(() => {
    let filteredSchedule = fullSchedule;
    if (activeFilter !== 'ALL') {
      filteredSchedule = fullSchedule.filter(item => item.discipline === activeFilter);
    }

    const groupedSchedule = filteredSchedule.reduce((acc: any, item: any) => {
      const date = new Date(item.datetime);
      const day = date.toLocaleDateString('en-US', { weekday: 'short', month: 'numeric', day: 'numeric' });
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push({ time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }), class: item.discipline, color: "blue" });
      return acc;
    }, {});
    setHomeSchedule(groupedSchedule);
  }, [activeFilter, fullSchedule]);

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
    if (settings.heroSlides.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + settings.heroSlides.length) % settings.heroSlides.length);
  };

  const scrollNext = () => {
    if (settings.heroSlides.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % settings.heroSlides.length);
  };


  const renderIcon = (value: string) => {
    switch (value.toLowerCase()) {
      case 'infinity':
      case 'âˆž':
        return <FaInfinity />;
      case 'spa':
      case 'â™¨':
        return <FaSpa />;
      default:
        return value;
    }
  };

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
        {settings.heroSlides.map((slide, index) => (
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
          {settings.heroSlides.map((_, index) => (
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
           <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 justify-center">
             {disciplines.map((discipline, index) => (
               <Link key={discipline.id} href={`/disciplines/${discipline.id}`} className={`p-8 text-center ${index < disciplines.length - 1 ? 'border-r border-neutral-800' : ''} hover:bg-neutral-800 transition-colors cursor-pointer`}>
                 <h3 className="text-xl font-bold uppercase tracking-wide">{discipline.name}</h3>
               </Link>
             ))}
           </div>
         </section>
   
         {/* Programs Section */}
         {programsSectionData && (
           <section className="py-24 px-4 container mx-auto">
             <div className="grid md:grid-cols-2 gap-16 items-center">
               <div>
                 <div className="h-1 w-16 bg-red-600 mb-6"></div>
                 <h2 className="text-5xl font-black uppercase leading-tight mb-6">{programsSectionData.title}</h2>
               </div>
               <div>
                 <p className="text-gray-400 text-lg leading-relaxed">
                   {programsSectionData.description.split('We are a family, and we are a team.').map((part, index, array) => (
                     <React.Fragment key={index}>
                       {part}
                       {index < array.length - 1 && <span className="text-white font-bold">We are a family, and we are a team.</span>}
                     </React.Fragment>
                   ))}
                 </p>
               </div>
             </div>
           </section>
         )}
   
         {/* Image Section - Training */}
         {imageSectionTrainingData && (
           <section className="relative h-96 overflow-hidden">
             <div 
               className="absolute inset-0 bg-cover bg-center"
               style={{ 
                 backgroundImage: `url(${imageSectionTrainingData.imageUrl})`,
               }}
             >
               <div className="absolute inset-0 bg-black/40"></div>
             </div>
           </section>
         )}
   
         {/* Gym Features Section */}
         {gymFeaturesSectionData && (
           <section className="bg-black py-16 border-y border-neutral-800">
             <div className="container mx-auto px-4">
               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
                 {gymFeaturesSectionData.features.map((feature, index) => (
                   <div key={index} className="p-4">
                     <div className="text-red-600 text-4xl font-black mb-2 h-10 flex justify-center items-center">
                       {renderIcon(feature.value)}
                     </div>
                     <span className="font-bold text-sm uppercase tracking-wide">{feature.label}</span>
                   </div>
                 ))}
               </div>
             </div>
           </section>
         )}
   
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
         {teamPhotoSectionData && (
           <section className="relative h-96 overflow-hidden border-y border-neutral-800">
             <div 
               className="absolute inset-0 bg-cover bg-center grayscale"
               style={{ 
                 backgroundImage: `url(${teamPhotoSectionData.imageUrl})`,
               }}
             >
               <div className="absolute inset-0 bg-black/50"></div>
             </div>
             <div className="relative z-10 h-full flex items-center justify-center">
               <div className="text-center">
                 <h2 className="text-6xl font-black uppercase mb-4">{teamPhotoSectionData.title.split(' ')[0]}<br/>{teamPhotoSectionData.title.split(' ')[1]}</h2>
                 <div className="h-1 w-24 bg-red-600 mx-auto"></div>
               </div>
             </div>
           </section>
         )}
   
         {/* Coaches Section */}
         {coachesSectionIntroData && (
           <section className="py-24 bg-neutral-900 px-4">
             <div className="container mx-auto">
               <div className="h-1 w-16 bg-red-600 mb-6"></div>
               <h2 className="text-5xl font-black uppercase mb-6">{coachesSectionIntroData.title}</h2>
               <p className="max-w-2xl mb-8 text-gray-400 text-lg">
                 {coachesSectionIntroData.introParagraph}
               </p>
               <Link href="/coaches" className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 uppercase flex items-center gap-4 mb-12 transition-all w-fit">
                 {coachesSectionIntroData.buttonText} <FaArrowRight />
               </Link>
               
               {/* Removed filter buttons as they are not functional with the current setup and data */}
     
               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                 {coaches.map(coach => (
                   <Link href={`/coaches/${coach.id}`} key={coach.id} className="text-center group cursor-pointer">
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
         )}
   
         {/* Schedule Section */}
         {scheduleSectionData && (
           <section className="py-24 px-4 container mx-auto" ref={scheduleRef}>
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
               <div>
                 <div className="h-1 w-16 bg-red-600 mb-6"></div>
                 <h2 className="text-5xl font-black uppercase">{scheduleSectionData.title}</h2>
               </div>
               <button onClick={handleDownload} className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 uppercase flex items-center gap-3 transition-all">
                 {scheduleSectionData.buttonText} <FaDownload />
               </button>
             </div>
     
             <div className="flex flex-wrap gap-4 border-b border-neutral-700 mb-8">
               {scheduleFilters.map((buttonText, index) => (
                 <button 
                    key={index} 
                    onClick={() => setActiveFilter(buttonText)}
                    className={`py-3 px-6 font-bold uppercase text-sm ${
                   activeFilter === buttonText ? 'bg-red-600' : 'hover:bg-neutral-800 transition-colors'
                 }`}>
                   {buttonText}
                 </button>
               ))}
             </div>
     
             <div className="text-sm text-gray-400 mb-4">{scheduleDateRange}</div>
             
             <div className="overflow-x-auto">
               <div className="grid grid-cols-6 gap-2 min-w-[800px]">
                 {Object.entries(homeSchedule).map(([day, classes]) => (
                   <div key={day} className="bg-neutral-900 border border-neutral-800">
                     <div className="text-center py-3 border-b border-neutral-800 font-bold uppercase text-sm bg-black">
                       {day}
                     </div>
                     <div className="p-2 space-y-2">
                       {classes.map((c, index) => (
                         <div 
                           key={`${c.time}-${c.class}-${index}`}
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
         )}
   
         {/* Pricing Section */}
         {pricingSectionData && (
           <section className="py-24 bg-neutral-900 px-4">
             <div className="container mx-auto">
               <div className="h-1 w-16 bg-red-600 mb-6"></div>
               <h2 className="text-5xl font-black uppercase mb-16">{pricingSectionData.title}</h2>
               {!pricingSections || pricingSections.length === 0 ? (
                 <div>Loading pricing data...</div>
               ) : (
                 <>
                  {pricingSections.map(section => (
                    <div key={section.id} className="mb-16">
                      <div className="inline-block bg-red-600 text-white font-bold py-4 px-12 text-lg uppercase mb-4">
                        {section.title}
                      </div>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {section.tiers.map((tier: any) => (
                          <div key={tier.id} className={`bg-black p-8 border ${tier.isFeatured ? 'border-red-600' : 'border-neutral-800'} relative`}>
                            {tier.isFeatured && (
                              <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-3 py-1 uppercase">
                                Popular
                              </div>
                            )}
                            <h3 className="text-2xl font-bold uppercase mb-2">{tier.name}</h3>
                            <p className="text-gray-400 text-sm mb-6">{tier.description}</p>
                            <ul className="space-y-3 text-sm mb-8">
                              {tier.features.map((feature: any) => (
                                <li key={feature} className="flex items-start gap-3"><FaCheck className="text-green-500 mt-1 flex-shrink-0"/> {feature}</li>
                              ))}
                            </ul>
                            <div className={`border-t ${tier.isFeatured ? 'border-red-600' : 'border-neutral-800'} pt-6`}>
                              <div className="text-4xl font-black mb-2">{tier.price}</div>
                              <div className="text-gray-400 text-sm">{tier.period?.split('for ')[1] || tier.period}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                 </>
               )}
     
               <div className="text-center text-xs text-gray-500 max-w-3xl mx-auto space-y-2">
                 {pricingSectionData.disclaimers.map((disclaimer, index) => (
                   <p key={index}>{disclaimer}</p>
                 ))}
               </div>
             </div>
           </section>
         )}
   
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
         {newsletterSectionData && (
           <section className="py-24 bg-black px-4 border-y border-neutral-800">
             <div className="container mx-auto text-center">
               <div className="h-1 w-16 bg-red-600 mx-auto mb-6"></div>
               <h2 className="text-5xl font-black uppercase mb-6">{newsletterSectionData.title}</h2>
               <p className="text-xl mb-10 text-gray-400 max-w-2xl mx-auto">
                 {newsletterSectionData.description}
               </p>
               <form onSubmit={handleNewsletterSubmit} className="max-w-xl mx-auto">
                 <div className="flex flex-col sm:flex-row gap-4">
                   <input
                     type="email"
                     placeholder={newsletterSectionData.inputPlaceholder}
                     value={newsletterEmail}
                     onChange={(e) => setNewsletterEmail(e.target.value)}
                     required
                     className="flex-1 px-6 py-4 bg-neutral-900 border border-neutral-700 text-white placeholder-gray-500 focus:outline-none focus:border-red-600"
                   />
                   <button
                     type="submit"
                     className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 font-bold uppercase transition-all"
                   >
                     {newsletterSectionData.buttonText}
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
         )}
   
         {/* CTA Section */}
         {ctaData && (
           <section className="bg-red-600 py-20">
             <div className="container mx-auto px-8 text-center">
               <h2 className="text-5xl font-black uppercase mb-6">{ctaData.title}</h2>
               <p className="text-xl mb-8 opacity-90">{ctaData.subtitle}</p>
               <button onClick={() => setIsModalOpen(true)} className="bg-black hover:bg-neutral-900 text-white px-12 py-5 text-lg font-bold uppercase transition-all">
                 {ctaData.primaryButtonText}
               </button>
             </div>
           </section>
         )}
   
       
       </main>
     );
   }

'use client';
import React from "react";
import Link from 'next/link';
import { 
  FaDumbbell, FaBatteryFull, FaCalendarAlt, FaUserFriends, FaMedal, FaSmile, 
  FaChevronRight, FaCheckCircle, FaTimesCircle, FaInstagram, FaFacebookF, FaArrowRight,  
} from 'react-icons/fa';
import Image from "next/image";

//=================================================================
//  HELPER COMPONENTS & DATA
//=================================================================
const PricingFeature = ({ text, included = true }) => (
  <li className={`flex items-center space-x-3 ${included ? 'text-gray-300' : 'text-gray-600 line-through'}`}>
    {included ? <FaCheckCircle className="text-red-500" /> : <FaTimesCircle className="text-gray-700" />}
    <span>{text}</span>
  </li>
);

const coachesData = [
    { name: "Angela Hayes", specialties: "MUAY THAI, MMA", imageUrl: "https://storage.googleapis.com/presented_images/73507d9f-a63e-436f-b251-50da747bb771.jpg" },
    { name: "Ben Westrich", specialties: "BRAZILIAN JIU-JITSU, MMA", imageUrl: "https://storage.googleapis.com/presented_images/1a88b48c-d6b7-47b7-951b-42ef7a2b2260.jpg" },
    { name: "Kay Hansen", specialties: "BRAZILIAN JIU-JITSU, MMA, MUAY THAI", imageUrl: "https://storage.googleapis.com/presented_images/17cc2e1f-72f1-419b-a010-09a96f1d2c6c.jpg" },
    { name: "Larry Ruiz", specialties: "BRAZILIAN JIU-JITSU, MMA", imageUrl: "https://storage.googleapis.com/presented_images/e02c6b45-a7b6-4ac4-913a-c8401aa96d8e.jpg" },
    { name: "Natalie Salcedo", specialties: "BRAZILIAN JIU-JITSU, MUAY THAI, MMA", imageUrl: "https://storage.googleapis.com/presented_images/7c0c1b05-502a-43d9-a29d-bb894b912630.jpg" }
];

const scheduleData = {
  'Sat, Oct 18': [
    { time: '900-1000', name: 'Muay Thai', level: 'All Levels', category: 'Muay Thai Adult' },
    { time: '1000-1100', name: 'BJJ Fundamentals', level: 'Adults and Children', category: 'BJJ Adult' },
    { time: '1000-1100', name: 'Kids Muay Thai', level: 'All Ages, All Levels', category: 'Muay Thai Kids' },
    { time: '1100-1200', name: 'Fighter Practice', level: 'MMA / Muay Thai', category: 'All-Inclusive' },
    { time: '1100-1300', name: 'No-Gi Open Mat', level: 'All Levels', category: 'BJJ Adult' },
  ]
};

//=================================================================
//  HEADER COMPONENT
//=================================================================
const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm absolute top-0 z-50">
      <div className="bg-[#212121] text-white text-center py-2 px-4 text-xs font-light">
        <span>Warrior Fitness Center - 3711 Drennan Road, Colorado Springs, CO 80916</span>
        <span className="mx-2">|</span>
        <span>+1-719-465-2136</span>
      </div>
      <div className="container mx-auto flex justify-between items-center py-3 px-6">
        <Link href="/" className="flex-shrink-0">
            <img 
              src="https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0ef4/68e43e0279ad2b357d6c0efd_fulllogowarrior.svg" 
              alt="Warrior Logo" 
              className="h-12"
            />
        </Link>
        <div className="flex items-center">
            <nav className="hidden md:flex items-center space-x-7 text-gray-800 font-extrabold uppercase tracking-wider text-xs">
                <Link href="#" className="hover:text-red-600 transition-colors">Our Gym</Link>
                <Link href="#" className="hover:text-red-600 transition-colors">Who We Are</Link>
                <Link href="#" className="hover:text-red-600 transition-colors">Disciplines</Link>
                <Link href="#" className="hover:text-red-600 transition-colors">Coaches</Link>
                <Link href="#" className="hover:text-red-600 transition-colors">Schedule</Link>
                <Link href="#" className="hover:text-red-600 transition-colors">Pricing</Link>
                <Link href="#" className="hover:text-red-600 transition-colors">Shop</Link>
            </nav>
            <div className="flex items-stretch ml-6">
                <a href="#" aria-label="Instagram" className="bg-gray-300 flex items-center justify-center p-3 hover:bg-gray-400 transition-colors">
                    <FaInstagram className="h-5 w-5 text-white" />
                </a>
                <a href="#" aria-label="Facebook" className="bg-gray-300 flex items-center justify-center p-3 ml-px hover:bg-gray-400 transition-colors">
                    <FaFacebookF className="h-5 w-5 text-white" />
                </a>
            </div>
        </div>
      </div>
    </header>
  );
};

//=================================================================
//  SECTION COMPONENTS
//=================================================================

const IntroSection = () => {
  return (
    <section className="relative bg-black text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0ef4/68e95350c431166c54c51460_warrior_01.jpg"
          alt="MMA fighters grappling in a gym"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30"></div>
      </div>
      <div className="container mx-auto relative z-10 py-24 px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center">
            <h2 className="text-5xl lg:text-6xl font-black uppercase leading-tight">
              Join our world class mma training programs for all levels - from <span className="text-red-600">beginners</span> to <span className="text-red-600">pros.</span>
            </h2>
            <p className="mt-8 text-gray-300 leading-relaxed max-w-lg">
              Our gym has had both a local and a national presence since its founding in 2011, <strong className="text-white">however its roots go much deeper.</strong> Our Team has been training and competing across the world in multiple combat sports to bring you the best instruction available. We are athletes, hobbyists, competitors, students and professionals. We strive to learn and grow while pushing others around us to do the same. We are people who always are working to improve ourselves and our community.
            </p>
            <div className="mt-12">
              <h3 className="text-2xl font-bold uppercase tracking-wide">
                We are a family, and we are a team.
              </h3>
              <div className="w-48 h-1.5 bg-red-600 mt-2"></div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </section>
  );
};

const VideoSection = () => {
  return (
    <section className="bg-black py-16 px-4">
      <div className="container mx-auto">
        <div className="relative h-0 pb-[56.25%]"> 
          <video 
            className="absolute top-0 left-0 w-full h-full"
            controls 
            autoPlay 
            muted 
            loop 
            playsInline
          >
            <source 
              src="https://www.dropbox.com/scl/fi/vcz6n8i01h3p43md584pn/Copy-of-promo-vid-horizontal-3.mp4?rlkey=nx9t0luzuk9x86sgwbkks3sk1&raw=1" 
              type="video/mp4" 
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const SectionTitle = ({ title }) => (
    <div>
      <h2 className="text-3xl font-black uppercase tracking-wider">{title}</h2>
      <div className="w-24 h-1.5 bg-red-600 mt-2"></div>
    </div>
  );
  const DisciplineLink = ({ href, children }) => (
    <li>
      <Link href={href} className="flex items-center justify-between text-lg text-gray-300 hover:text-white transition-colors group">
        <span>{children}</span>
        <FaChevronRight className="text-red-500 opacity-75 group-hover:opacity-100 group-hover:translate-x-1 transition-transform" />
      </Link>
    </li>
  );
  const GymFeature = ({ icon, text }) => (
    <li className="flex items-center space-x-4 text-lg text-gray-300">
      <div className="w-6 text-center">{icon}</div>
      <span>{text}</span>
    </li>
  );
  return (
    <section className="bg-[#121212] text-white py-24 px-4 overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="flex flex-col space-y-16">
            <div>
              <SectionTitle title="Disciplines" />
              <ul className="mt-8 space-y-4">
                <DisciplineLink href="#">Brazillian Jiu-Jitsu</DisciplineLink>
                <DisciplineLink href="#">Muay Thai</DisciplineLink>
                <DisciplineLink href="#">Mixed Martial Arts</DisciplineLink>
                <DisciplineLink href="#">Fitness</DisciplineLink>
              </ul>
            </div>
            <div>
              <SectionTitle title="Gym Features" />
              <ul className="mt-8 space-y-4">
                <GymFeature icon={<FaDumbbell />} text="Access to Open Gym" />
                <GymFeature icon={<FaBatteryFull />} text="Recovery and Wellness Facilities" />
                <GymFeature icon={<FaCalendarAlt />} text="Open 6 Days / Week" />
                <GymFeature icon={<FaUserFriends />} text="12 Trainers" />
                <GymFeature icon={<FaMedal />} text="23 World Medals" />
                <GymFeature icon={<FaSmile />} text="1478 Happy Clients" />
              </ul>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0ef4/68e43e0279ad2b357d6c0f16_warrioricon.svg"
              alt="Warrior Logo background"
              className="absolute bottom-0 right-0 w-[80%] h-auto opacity-10 pointer-events-none -mr-24"
            />
            <div className="relative z-10 space-y-6 text-gray-300 leading-relaxed">
              <p>
                We are students, athletes, and builders of our team. <strong className="text-white">Warrior Fitness Center</strong> is home to a diverse and dedicated community united by our shared pursuit of growth through martial arts. Our training blends Brazillian Jiu-Jitsu, Muay Thai, Wrestling, Judo, and MMA to foster personal development, confidence, and discipline in an atmosphere that feels like family.
              </p>
              <p>
                Our coaching staff reflects the diversity of our community, each bringing a wealth of experience from different walks of life. This variety isn’t just a point of pride; it’s a strength that enriches our students’ learning. With coaches who’ve lived through high-level competition, military service, and personal transformation, we offer perspectives that go beyond the technical and into the mental, emotional, and strategic dimensions of martial arts.
              </p>
              <p>
                Whether you’re just starting your journey or looking to sharpen your edge, you’ll find guidance, accountability, and support here. We are a team that trains, learns, and grows together—while pushing each other toward the next accomplishment in life.
              </p>
              <div className="pt-8">
                <h3 className="text-2xl font-bold uppercase tracking-wider text-white">
                  We are a family, and we are a team.
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CoreValuesSection = () => {
  const ValueBlock = ({ title, children }) => (
    <div className="bg-[#1a1a1a] p-6">
      <h3 className="text-red-600 font-bold tracking-widest mb-3 border-l-4 border-red-500 pl-3 uppercase">
        {title}
      </h3>
      <p className="text-sm text-gray-400 leading-relaxed">
        {children}
      </p>
    </div>
  );
  return (
    <section className="bg-black text-white py-24 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-4xl font-black mb-4 uppercase">ARE...</h2>
            <div className="w-24 h-1.5 bg-red-600 mb-12"></div>
            <div className="space-y-6 text-gray-400 leading-relaxed max-w-xl">
              <p>
                At Warrior, we recognize that every student walks through our doors with a unique set of goals, motivations, and reasons for training. Some come to compete, some to get in shape, some for self-defense, and others to find structure or community. We believe wholeheartedly that these goals don’t need to be the same for us to support one another. In fact, it’s the diversity of those goals—and the shared commitment to growth—that makes our community strong.
              </p>
              <p>
                We approach training with a mindset rooted in collaboration, not transaction. It’s not about what you get in return—it’s about how we all grow stronger by investing in each other. When one person levels up, we all benefit. When one person struggles, we all step in.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <ValueBlock title="Realism">
              We train for real life. The foundation of our practice is self-defense and practical application—not gamesmanship.
            </ValueBlock>
            <ValueBlock title="Growth Mindset">
              We believe that who you are today doesn’t define who you can become.
            </ValueBlock>
            <ValueBlock title="Respect">
              Even when it’s not obvious, respect is always present.
            </ValueBlock>
            <ValueBlock title="Safety">
              Training is only sustainable when we take care of each other.
            </ValueBlock>
            <ValueBlock title="Diversity">
              We embrace different styles, backgrounds, and perspectives.
            </ValueBlock>
            <ValueBlock title="Cohesion">
              We are individuals, but we train as one team.
            </ValueBlock>
          </div>
        </div>
      </div>
    </section>
  );
};


//=================================================================
//  MAIN CONTENT COMPONENT
//=================================================================
const MainContent = () => {
    return (
        <main>
            {/* HERO SECTION */}
            <section className="relative h-screen w-full overflow-hidden">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover filter grayscale"
                src="https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0ef4/68e43e0279ad2b357d6c0f43_homepageclipwarrior-transcode.mp4"
              />             
              {/* <div className="absolute top-0 left-0 w-full h-full bg-gray-600/30"/> */}
              <div className="relative h-full mix-blend-screen flex flex-col justify-center items-center text-center">
                <div className="relative">
                  <div className="bg-white ">
                    <h1 className="text-8xl sm:text-9xl md:text-[16vw] lg:text-[15vw] font-black uppercase leading-none tracking-tighter text-black p-4">
                      Train like a<br/>Champion
                    </h1>
                  </div>
                </div>
              </div>
                  <Image 
                    src="https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0ef4/68e43e0279ad2b357d6c0f16_warrioricon.svg" 
                    alt="Warrior Logo"
                    width={1920}
                    height={1080}
                    className="absolute top-1/2 right-20 transform -translate-y-[5%] translate-x-[15%] w-[30%] h-auto"
                  />
              <div className="absolute bottom-10 left-10 z-20 text-sm uppercase tracking-[0.5em] text-white">
                S C R O L L
              </div>
            </section>
    
            <IntroSection />
            <VideoSection />
            <FeaturesSection />
            <CoreValuesSection />

            {/* Coaches Section */}
            <section className="py-24 px-4 bg-[#0d0d0d]">
                <div className="container mx-auto">
                    <h2 className="text-4xl font-black mb-4 uppercase">Our Coaches</h2>
                    <div className="w-24 h-1.5 bg-red-600 mb-12"></div>
                    <div className="grid lg:grid-cols-3 gap-12 mb-16">
                        <div className="lg:col-span-1 space-y-4 text-gray-300">
                            <p className="font-bold text-white">With years of experience both in coaching and competing, you will not find a more well rounded and professional coaching team to help you achieve your goals.</p>
                            <p>Our coaching is rooted in purpose and clarity, to help students reach personal and professional goals through structured, meaningful training.</p>
                        </div>
                        <div className="lg:col-span-2 grid md:grid-cols-3 gap-8">
                           <div>
                                <h3 className="font-bold text-lg border-l-4 border-red-500 pl-4 mb-2">STREET</h3>
                                <p className="text-sm text-gray-400">Training should be grounded in real-life efficacy.</p>
                           </div>
                           <div>
                                <h3 className="font-bold text-lg border-l-4 border-red-500 pl-4 mb-2">SPORT</h3>
                                <p className="text-sm text-gray-400">Sport offers structure, feedback, and challenge.</p>
                           </div>
                           <div>
                                <h3 className="font-bold text-lg border-l-4 border-red-500 pl-4 mb-2">ART</h3>
                                <p className="text-sm text-gray-400">Martial arts is also a path of self-discovery.</p>
                           </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {coachesData.map(coach => (
                            <div key={coach.name} className="relative text-center group bg-black">
                                <img src={coach.imageUrl} alt={coach.name} className="w-full h-auto"/>
                                <div className="py-4">
                                   <h3 className="font-bold text-lg">{coach.name.toUpperCase()}</h3>
                                   <div className="text-xs text-gray-400 space-x-2 mt-1">
                                      {coach.specialties.split(', ').map(spec => <span key={spec} className="bg-gray-800 px-2 py-1 rounded">{spec}</span>)}
                                   </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
    
            {/* Schedule Section */}
            <section className="py-24 px-4 bg-black">
              <div className="container mx-auto">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-4xl font-black uppercase tracking-wider">SCHEDULE</h2>
                  <button className="bg-red-600 text-white font-bold py-3 px-6 text-sm flex items-center space-x-2 hover:bg-red-700 transition-colors">
                    <span>PRINT SCHEDULE</span>
                    <span className="text-lg">&darr;</span>
                  </button>
                </div>
                <div className="flex space-x-1 mb-8 border-b-2 border-gray-800">
                  {['All', 'Kids', 'Adult', 'BJJ', 'Muay Thai'].map(filter => (
                    <button key={filter} className={`py-2 px-4 text-sm font-semibold text-gray-400 hover:text-white transition-colors border-b-2 ${filter === 'All' ? 'border-red-600 text-white' : 'border-transparent'}`}>{filter}</button>
                  ))}
                </div>
                <div className="flex space-x-1 mb-8">
                    {['Full Week', 'Mon, Oct 13', 'Tue, Oct 14', 'Wed, Oct 15', 'Thu, Oct 16', 'Fri, Oct 17', 'Today: Sat, Oct 18'].map(day => (
                        <button key={day} className={`py-3 px-5 text-sm font-bold ${day.includes('Today') ? 'bg-red-600 text-white' : 'bg-[#1a1a1a] text-gray-300 hover:bg-gray-800'}`}>
                            {day.split(':')[0]}
                        </button>
                    ))}
                </div>
                <div className="bg-[#1a1a1a] p-1">
                  <div className="space-y-1">
                    {scheduleData['Sat, Oct 18'].map((item, index) => (
                        <div key={index} className="grid grid-cols-12 gap-2 items-center bg-[#2d2d2d] p-3">
                            <div className="col-span-2 font-bold text-lg text-gray-400">{item.time}</div>
                            <div className="col-span-6">
                                <h4 className="font-bold text-xl">{item.name}</h4>
                                <p className="text-gray-400 text-sm">{item.level}</p>
                            </div>
                            <div className="col-span-4 text-right">
                               <span className={`text-xs font-bold py-2 px-3 ${item.category.includes('Muay Thai') ? 'bg-purple-900 text-purple-300' : 'bg-blue-900 text-blue-300'}`}>{item.category}</span>
                            </div>
                        </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
    
            {/* Pricing Section */}
            <section className="py-24 px-4 bg-[#0d0d0d]">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-4xl font-black mb-2 uppercase">Program Pricing</h2>
                            <p className="text-gray-400">Currently we have 48 Classes covering over 50 hours a week of instruction in class times.</p>
                        </div>
                        <a href="#" className="bg-red-600 text-white font-bold py-4 px-8 text-sm flex items-center space-x-2 hover:bg-red-700 transition-colors">
                          <span>VIEW FULL PRICING</span>
                          <FaArrowRight/>
                        </a>
                    </div>
    
                    {/* Adults Pricing */}
                    <div className="mb-12">
                      <div className="inline-block bg-red-600 text-white py-3 px-12 text-lg font-bold mb-6">ADULTS</div>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                          <div className="bg-black p-8 border border-gray-800 flex flex-col justify-between">
                              <div>
                                <h3 className="text-2xl font-bold mb-2">MUAY THAI ONLY</h3>
                                <ul className="space-y-2 my-6 text-sm">
                                    <PricingFeature text="Access Fitness Equipment" />
                                    <PricingFeature text="Access to Open Gym" />
                                    <PricingFeature text="Access 6 Days / Week" />
                                    <PricingFeature text="Style Specific Group Classes" />
                                    <PricingFeature text="Recovery Room" included={false} />
                                    <PricingFeature text="Included Private Lessons" included={false} />
                                </ul>
                              </div>
                              <div>
                                  <div className="text-4xl font-black">$119.99</div>
                                  <p className="text-xs text-gray-400">Per Month for 6 Months</p>
                              </div>
                          </div>
                          <div className="bg-black p-8 border border-gray-800 flex flex-col justify-between">
                              <div>
                                <h3 className="text-2xl font-bold mb-2">JIU JITSU ONLY</h3>
                                 <ul className="space-y-2 my-6 text-sm">
                                    <PricingFeature text="Access Fitness Equipment" />
                                    <PricingFeature text="Access to Open Gym" />
                                    <PricingFeature text="Access 6 Days / Week" />
                                    <PricingFeature text="Style Specific Group Classes" />
                                    <PricingFeature text="Recovery Room" included={false} />
                                    <PricingFeature text="Included Private Lessons" included={false} />
                                </ul>
                              </div>
                              <div>
                                  <div className="text-4xl font-black">$119.99</div>
                                  <p className="text-xs text-gray-400">Per Month for 6 Months</p>
                              </div>
                          </div>
                          <div className="bg-black p-8 border border-gray-800 flex flex-col justify-between">
                              <div>
                                <h3 className="text-2xl font-bold mb-2">ALL INCLUSIVE</h3>
                                 <ul className="space-y-2 my-6 text-sm">
                                    <PricingFeature text="Access Fitness Equipment" />
                                    <PricingFeature text="Access to Open Gym" />
                                    <PricingFeature text="Access 6 Days / Week" />
                                    <PricingFeature text="All Group Classes" />
                                    <PricingFeature text="Access All Available Classes" />
                                    <PricingFeature text="Recovery Room" included={false} />
                                    <PricingFeature text="Included Private Lessons" included={false} />
                                </ul>
                              </div>
                              <div>
                                  <div className="text-4xl font-black">$139.99</div>
                                  <p className="text-xs text-gray-400">Per Month for 6 Months</p>
                              </div>
                          </div>
                          <div className="bg-black p-8 border-2 border-red-500 flex flex-col justify-between">
                              <div>
                                <h3 className="text-2xl font-bold mb-2">PREMIER**</h3>
                                 <ul className="space-y-2 my-6 text-sm">
                                    <PricingFeature text="Access Fitness Equipment" />
                                    <PricingFeature text="Access to Open Gym" />
                                    <PricingFeature text="Access 6 Days / Week" />
                                    <PricingFeature text="All Group Classes" />
                                    <PricingFeature text="Access All Available Classes" />
                                    <PricingFeature text="Recovery Room" />
                                    <PricingFeature text="One Private Lesson per Month" />
                                </ul>
                              </div>
                              <div>
                                  <div className="text-4xl font-black">$199.99</div>
                                  <p className="text-xs text-gray-400">Per Month for 6 Months</p>
                              </div>
                          </div>
                      </div>
                    </div>
    
                    {/* Kids Pricing */}
                    <div>
                      <div className="inline-block bg-red-600 text-white py-3 px-12 text-lg font-bold mb-6">KIDS</div>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-black p-8 border border-gray-800 text-center">
                            <h3 className="text-2xl font-bold mb-2">MUAY THAI ONLY</h3>
                            <div className="text-4xl font-black my-4">$99.99</div>
                            <p className="text-xs text-gray-400">Per Month for 6 Months</p>
                        </div>
                         <div className="bg-black p-8 border border-gray-800 text-center">
                            <h3 className="text-2xl font-bold mb-2">JIU JITSU ONLY</h3>
                            <div className="text-4xl font-black my-4">$99.99</div>
                            <p className="text-xs text-gray-400">Per Month for 6 Months</p>
                        </div>
                         <div className="bg-black p-8 border border-gray-800 text-center">
                            <h3 className="text-2xl font-bold mb-2">ALL INCLUSIVE</h3>
                            <div className="text-4xl font-black my-4">$119.99</div>
                            <p className="text-xs text-gray-400">Per Month for 6 Months</p>
                        </div>
                      </div>
                    </div>
                </div>
            </section>
    
            {/* Apparel CTA Section */}
            <section className="py-24 px-4 bg-black relative text-center" style={{ backgroundImage: "url('https://storage.googleapis.com/presented_images/c8c36081-37d4-46c5-a6e3-5140b2a3bb36.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-black opacity-80"></div>
                <div className="container mx-auto relative z-10 flex flex-col items-center">
                    <img src="https://storage.googleapis.com/presented_images/6334a1d4-814d-4560-84f9-251f2e1469e0.png" alt="War Forged Apparel" className="w-48 h-auto mb-4"/>
                    <h2 className="text-4xl font-black uppercase mb-4">Shop War Forged Apparel</h2>
                    <p className="max-w-2xl mx-auto text-gray-300 mb-8">
                        Based in Colorado Springs, we're a team of veterans, competitors, and fighters committed to providing exceptional, affordable gear and lifestyle clothing for athletes of all levels.
                    </p>
                    <a href="#" className="bg-red-600 text-white font-bold py-4 px-10 text-sm flex items-center space-x-2 hover:bg-red-700 transition-colors">
                        <span>SHOP NOW</span>
                        <FaArrowRight />
                    </a>
                </div>
            </section>
        </main>
    );
}

//=================================================================
//  FINAL EXPORTED PAGE
//=================================================================
export default function Home() {
  return (
    <>
      <Header />
      <MainContent />
      <footer className="bg-[#0d0d0d] border-t border-gray-800 py-16 px-4">
        <div className="container mx-auto text-center">
            <div className="text-3xl font-black tracking-widest mb-8 text-gray-600">WARRIOR</div>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12 text-gray-400">
                <div>
                    <h4 className="font-bold text-white mb-2">WARRIOR FITNESS CENTER</h4>
                    <p>3711 Drennan Road,<br/>Colorado Springs, CO 80916</p>
                </div>
                 <div>
                    <h4 className="font-bold text-white mb-2">HOURS</h4>
                    <p>M-F: 11:30 - 21:30<br/>SAT: 09:00 - 13:00</p>
                </div>
                 <div>
                    <h4 className="font-bold text-white mb-2">CALL US</h4>
                    <p>+1-719-465-2136</p>
                </div>
            </div>
             <div className="flex justify-center space-x-6 mb-8">
                <a href="#" aria-label="Instagram"><FaInstagram className="text-3xl text-gray-500 hover:text-red-500 transition-colors" /></a>
                <a href="#" aria-label="Facebook"><FaFacebookF className="text-3xl text-gray-500 hover:text-red-500 transition-colors" /></a>
            </div>
            <p className="text-xs text-gray-600">&copy; 2025 Warrior Fitness Center. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
}
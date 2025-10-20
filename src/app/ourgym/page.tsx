import React from 'react';
import Image from 'next/image';

const OurGym = () => {
  return (
    <section className="bg-black text-white">
      {/* Hero Section with Background Image */}
      <div className="relative w-full h-[50vh] min-h-[300px] sm:min-h-[400px] flex items-center justify-start">
        {/* Background Image using Next.js Image component for optimization */}
        <Image
          src="https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0ef4/68e43e0279ad2b357d6c0f2d_Large_Banner.webp"
          alt="Warrior Gym"
          layout="fill"
          objectFit="cover"
          className="z-0"
          priority
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
        
        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-wide uppercase">
            Our Gym
          </h1>
        </div>
      </div>

      {/* White Divider Line */}
      <div className="h-px w-full bg-gray-700"></div>

      {/* About Section */}
      <div className="bg-black py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            Our gym has had both a local and a national presence since its founding in 2011, however its roots go much deeper. Our Team has been training and competing across the world in multiple combat sports to bring you the best instruction available. We are athletes, hobbyists, competitors, students and professionals. We strive to learn and grow while pushing others around us to do the same. We are people who always are working to improve ourselves and our community. 
            <strong className="block mt-4 text-white">We are a family, and we are a team.</strong>
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurGym;
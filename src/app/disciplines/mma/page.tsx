import React from 'react';

async function getDisciplineData() {
  const res = await fetch('http://localhost:3000/api/disciplines/mma', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

const MmaPage = async () => {
  const discipline = await getDisciplineData();
  const sections = JSON.parse(discipline.sections);

  return (
    <main className="bg-black text-white font-['Exo']">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[300px] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${discipline.heroImage})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider">
            {discipline.heroTitle}
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-16 sm:py-24">
        <div className="container mx-auto max-w-4xl px-6 lg:px-8">
          <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
            <p>{discipline.description}</p>
            
            {sections.map((section, index) => (
              <div key={index} className="pt-4">
                <div className="flex items-center">
                  <div className="w-1 h-8 bg-red-600"></div>
                  <h2 className="ml-4 text-3xl font-semibold tracking-wide text-white">{section.title}</h2>
                </div>
                <p className="mt-4">{section.content}</p>
              </div>
            ))}
            
            <p className="pt-4">
              Our athletes embody this journey, using MMA to achieve goals in fitness, competition, and life. Whether your aim is to compete, improve health, or develop confidence and discipline, our MMA program equips you with the tools to succeed.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MmaPage;
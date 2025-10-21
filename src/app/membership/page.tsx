import React from 'react';

// --- ICON COMPONENTS --- //
const CheckIcon = () => (
    <svg className="w-5 h-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

const CrossIcon = () => (
    <svg className="w-5 h-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
);

const ArrowIcon = () => (
    <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
);


// --- DATA --- //
const adultPlansData = [
    {
        title: 'MUAY THAI ONLY',
        description: 'Includes all open drill sessions, kickboxing, muay thai, and clinch adult classes, charged monthly.',
        price: '119.99',
        term: 'Per Month for 6 Months',
        monthly: 'or $139.99 monthly',
        features: [
            { text: 'Access Fitness Equipment', included: true },
            { text: 'Access to Open Gym', included: true },
            { text: 'Access 6 Days / Week', included: true },
            { text: 'Style Specific Group Classes', included: true },
            { text: 'Access All Available Classes', included: false },
            { text: 'Recovery Room', included: false },
            { text: 'Included Private Lessons', included: false },
        ]
    },
    {
        title: 'JIU JITSU ONLY',
        description: 'Includes all Brazilian Jiu-Jitsu (Gi and No-Gi), open drill times, and clinch classes.',
        price: '119.99',
        term: 'Per Month for 6 Months',
        monthly: 'or $139.99 monthly',
        features: [
            { text: 'Access Fitness Equipment', included: true },
            { text: 'Access to Open Gym', included: true },
            { text: 'Access 6 Days / Week', included: true },
            { text: 'Style Specific Group Classes', included: true },
            { text: 'Access All Available Classes', included: false },
            { text: 'Recovery Room', included: false },
            { text: 'Included Private Lessons', included: false },
        ]
    },
    {
        title: 'ALL INCLUSIVE',
        description: 'Includes all of our adult classes across each discipline.',
        price: '139.99',
        term: 'Per Month for 6 Months',
        monthly: 'or $169.99 monthly',
        features: [
            { text: 'Access Fitness Equipment', included: true },
            { text: 'Access to Open Gym', included: true },
            { text: 'Access 6 Days / Week', included: true },
            { text: 'All Group Classes', included: true },
            { text: 'Access All Available Classes', included: true },
            { text: 'Recovery Room', included: false },
            { text: 'Included Private Lessons', included: false },
        ]
    },
    {
        title: 'PREMIER**',
        description: 'Includes all of our adult classes across each discipline, one private lesson per month, and recovery room access.',
        price: '199.99',
        term: 'Per Month for 6 Months',
        monthly: 'or $229.99 monthly',
        features: [
            { text: 'Access Fitness Equipment', included: true },
            { text: 'Access to Open Gym', included: true },
            { text: 'Access 6 Days / Week', included: true },
            { text: 'All Group Classes', included: true },
            { text: 'Access All Available Classes', included: true },
            { text: 'Recovery Room', included: true },
            { text: 'One Private Lesson per Month', included: true },
        ]
    }
];

const addOnPlansData = [
    {
        title: 'WAR COLLEGE',
        description: 'FREE with the purchase of any 6 month membership. Access to our custom online curriculum. Complete with drills to practice at home, weekly updates, mindset training, and more. This is a contract add-on.',
        price: '24.99',
        term: 'Monthly',
        note: 'FREE with the purchase of any 6 month membership.',
        moreInfo: true
    },
    {
        title: 'RECOVERY ROOM',
        description: 'Access to recovery room, shower, sauna, and lockers. This is a contract add-on.',
        price: '14.99',
        term: 'Monthly'
    }
];

const kidsPlansData = [
    { title: 'MUAY THAI ONLY', price: '99.99', term: 'Per Month for 6 Months', monthly: 'or $109.99 monthly' },
    { title: 'JIU JITSU ONLY', price: '99.99', term: 'Per Month for 6 Months', monthly: 'or $109.99 monthly' },
    { title: 'ALL INCLUSIVE', price: '119.99', term: 'Per Month for 6 Months', monthly: 'or $129.99 monthly' }
];


// --- REUSABLE COMPONENTS --- //
const PricingCard = ({ plan }) => (
    <div className="p-8">
        <h3 className="text-3xl font-black tracking-[0.1em]">{plan.title}</h3>
        <p className="text-gray-400 mt-4 mb-6 min-h-[110px]">{plan.description}</p>
        <ul className="space-y-3 mb-8">
            {plan.features.map(feature => (
                <li key={feature.text} className={`flex items-center gap-x-3 ${feature.included ? 'text-gray-300' : 'text-gray-600'}`}>
                    {feature.included ? <CheckIcon /> : <CrossIcon />}
                    <span>{feature.text}</span>
                </li>
            ))}
        </ul>
        <div className="text-5xl font-black">${plan.price}</div>
        <p className="mt-2 text-gray-300">{plan.term}</p>
        <p className="text-gray-500">{plan.monthly}</p>
    </div>
);

const AddOnCard = ({ plan }) => (
    <div className="p-8 h-full flex flex-col">
        <h3 className="text-3xl font-black tracking-[0.1em]">{plan.title}</h3>
        <p className="text-gray-400 mt-4 mb-6">{plan.description}</p>
        {plan.moreInfo && <a href="#" className="text-gray-300 underline mb-6">More info</a>}
        <div className="mt-auto">
            <div className="text-5xl font-black">${plan.price}</div>
            <div className="flex items-center gap-x-4">
                <p className="mt-2 text-gray-300">{plan.term}</p>
                {plan.note && <p className="text-gray-500">{plan.note}</p>}
            </div>
        </div>
    </div>
);

const KidsPricingCard = ({ plan }) => (
    <div className="p-8">
        <h3 className="text-2xl font-black">{plan.title}</h3>
        <div className="mt-8 text-5xl font-black">${plan.price}</div>
        <p className="mt-2 text-gray-300">{plan.term}</p>
        <p className="text-gray-500">{plan.monthly}</p>
    </div>
);

const SectionBanner = ({ title }) => (
    <div className="bg-red-600 text-white font-bold text-2xl py-3 px-8">
        {title}
    </div>
);


// --- MAIN PAGE COMPONENT --- //
const PricingPage = () => {
    return (
        <div className="bg-[#121212] text-white">
            <div className="container mx-auto max-w-8xl px-4 py-20">
                
                {/* Header */}
               <div className="flex flex-col md:flex-row justify-between md:items-center mb-8">
  <div>
    <h1 className="text-5xl lg:text-6xl font-black tracking-wider">PROGRAM PRICING</h1>
    <p className="text-lg text-gray-300 mt-2">
      Currently we have 48 Classes covering over 50 hours a week of instruction in class times.
    </p>
  </div>

  <a
    href="https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0ef4/68f184a3ec261e1127d49e76_Warrior%20Price%20List%20(current%20as%20of%20Feb%202024).pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-stretch bg-red-600 text-base hover:bg-white hover:text-red-600 transition-colors duration-300 self-start md:self-auto"
  >
    <span className="pl-8 pr-6 py-5 font-bold text-xl">VIEW FULL PRICING</span>
    <span className="flex items-center px-4" style={{ borderLeft: '2px solid rgba(0,0,0,0.2)' }}>
      <ArrowIcon />
    </span>
  </a>
</div>


                {/* Adults Section */}
                <section>
                    <SectionBanner title="ADULTS" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-l border-b gap-4 border-gray-800">
                        {adultPlansData.map((plan, index) => (
                            <div key={index} className="bg-[#111111] hover:bg-[#242424] border border-gray-200/40">
                                <PricingCard plan={plan} />
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 border-l border-b border-gray-800 mt-4 gap-4">
                        {addOnPlansData.map(plan => (
                             <div key={plan.title} className="bg-[#111111] hover:bg-[#242424] border border-gray-200/40">
                                <AddOnCard plan={plan} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Kids Section */}
                <section className="mt-16">
                    <SectionBanner title="KIDS" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 border-l border-b border-gray-800">
                        {kidsPlansData.map((plan, index) => (
                           <div key={index} className="bg-[#111111] hover:bg-[#242424] border border-gray-200/40">
                                <KidsPricingCard plan={plan} />
                           </div>
                        ))}
                    </div>
                </section>
                
                {/* Disclaimer */}
                <footer className="text-center text-gray-400 mt-12 space-y-4 text-sm max-w-4xl mx-auto">
                    <p>
                        <strong className="text-white">Active Military / LEO / First Responder discounts are applied to the month-to-month price.</strong><br/>
                        BJJ: $20.00 off (14%) Muay Thai: its $20.00 (14%) All-Inclusive: $30.00 off (18%) Premiere: $30.00 (19%)
                    </p>
                    <p>
                        Family rates cap out at $350 monthly for all members. Immediate family only.<br/>
                        Must be active military, LEO, first responder or on a six-month commitment plan for discount to apply.
                    </p>
                    <p>**Premiere Membership cannot be combined with membership discount / family rates.</p>
                </footer>
            </div>
        </div>
    );
};

export default PricingPage;
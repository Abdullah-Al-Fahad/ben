'use client';
import React, { useEffect, useState } from "react";
import ConsultationModal from "../../components/ConsultationModal";

// Define the structure for a Membership Tier
interface MembershipTier {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isFeatured?: boolean;
}

export default function MembershipPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for the modal
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    referral: "",
    comment: "",
    subscribeRemindersEmail: false,
    subscribeRemindersText: false,
    subscribeOffersEmail: false,
    subscribeOffersText: false,
    honeypot: "",
  });
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const adultTiers: MembershipTier[] = [
    {
      id: "muay-thai-adult",
      name: "Muay Thai Only",
      price: "$119.99",
      period: "/ month for 6 months",
      description: "Focused. Essential. Specialized.",
      features: [
        "Access Fitness Equipment",
        "Access to Open Gym",
        "Access 6 Days / Week",
        "Style Specific Group Classes",
      ],
    },
    {
      id: "jiu-jitsu-adult",
      name: "Jiu Jitsu Only",
      price: "$119.99",
      period: "/ month for 6 months",
      description: "Focused. Essential. Specialized.",
      features: [
        "Access Fitness Equipment",
        "Access to Open Gym",
        "Access 6 Days / Week",
        "Style Specific Group Classes",
      ],
    },
    {
      id: "all-inclusive-adult",
      name: "All Inclusive",
      price: "$139.99",
      period: "/ month for 6 months",
      description: "Dynamic. Versatile. Empowering.",
      features: [
        "Access Fitness Equipment",
        "Access to Open Gym",
        "Access 6 Days / Week",
        "All Group Classes",
        "Access All Available Classes",
      ],
      isFeatured: true,
    },
    {
      id: "premier-adult",
      name: "Premier",
      price: "$199.99",
      period: "/ month for 6 months",
      description: "Unlimited. Exclusive. Mastery.",
      features: [
        "Access Fitness Equipment",
        "Access to Open Gym",
        "Access 6 Days / Week",
        "All Group Classes",
        "Access All Available Classes",
        "Recovery Room",
        "One Private Lesson / Month",
      ],
    },
  ];

  const kidsTiers: MembershipTier[] = [
    {
      id: "muay-thai-kids",
      name: "Muay Thai Only",
      price: "$99.99",
      period: "/ month for 6 months",
      description: "Focused. Essential. Specialized.",
      features: [
        "Access Kids Muay Thai Classes",
        "Build Discipline & Focus",
        "Develop Coordination",
      ],
    },
    {
      id: "jiu-jitsu-kids",
      name: "Jiu Jitsu Only",
      price: "$99.99",
      period: "/ month for 6 months",
      description: "Focused. Essential. Specialized.",
      features: [
        "Access Kids Jiu Jitsu Classes",
        "Learn Self-Defense",
        "Improve Problem Solving",
      ],
    },
    {
      id: "all-inclusive-kids",
      name: "All Inclusive",
      price: "$119.99",
      period: "/ month for 6 months",
      description: "Dynamic. Versatile. Empowering.",
      features: [
        "Access All Kids Classes",
        "Comprehensive Martial Arts Training",
        "Character Development",
      ],
      isFeatured: true,
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) {
      console.log("Bot submission detected.");
      return;
    }
    // Simulated submission
    setTimeout(() => {
      setFormStatus(`Inquiry sent! We'll contact you shortly, ${formData.firstName}.`);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        referral: "",
        comment: "",
        subscribeRemindersEmail: false,
        subscribeRemindersText: false,
        subscribeOffersEmail: false,
        subscribeOffersText: false,
        honeypot: "",
      });
    }, 1500);
  };

  return (
    <main className="relative flex min-h-screen flex-col bg-neutral-950 text-white overflow-hidden">
      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .gradient-text {
          background: linear-gradient(135deg, #dc2626 0%, #f87171 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .pricing-card {
          background: linear-gradient(145deg, #1a1a1a, #101010);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .pricing-card:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 25px 50px rgba(220, 38, 38, 0.2);
        }
        .featured-card {
          border-color: #dc2626;
          box-shadow: 0 0 40px rgba(220, 38, 38, 0.2);
        }
        .form-input {
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .form-input:focus {
            border-color: #dc2626;
            box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.3);
            outline: none;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed" 
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=1200&h=600&fit=crop)` }}
        >
          <div className="absolute inset-0 bg-black/75"></div>
        </div>
        <div className={`relative z-10 container mx-auto px-8 ${isVisible ? 'animate-fade-in-up' : ''}`}>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight">
            Become a <span className="gradient-text">Warrior</span>
          </h1>
          <p className="mt-6 text-xl text-neutral-300 max-w-3xl mx-auto">
            Choose your path to greatness. Transparent pricing, unmatched value.
          </p>
        </div>
      </section>

      {/* Free Trial Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-8 text-center">
            <h2 className="text-4xl font-black uppercase mb-4">Start Your Journey for Free</h2>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto mb-8">
                Experience the Cowarrior difference with a no-strings-attached 3-day trial. Access our facilities, join our classes, and feel the community firsthand.
            </p>
            <button 
                onClick={() => setIsModalOpen(true)} // Open modal
                className={`bg-gradient-to-r from-red-600 to-red-700 text-white px-12 py-5 rounded-full text-lg font-bold uppercase 
                               hover:shadow-lg hover:shadow-red-600/50 transition-all hover:scale-105`}>
                Claim Your Free Trial
            </button>
        </div>
      </section>
      
      {/* Adult Pricing Tiers Section */}
      <section className="py-24 bg-neutral-950">
        <div className="container mx-auto px-8">
          <h2 className="text-5xl font-black uppercase mb-12 text-center"><span className="gradient-text">Adult</span> Programs</h2>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-stretch">
            {adultTiers.map((tier, index) => (
              <div 
                key={tier.id}
                className={`pricing-card rounded-2xl p-8 flex flex-col ${tier.isFeatured ? 'featured-card' : ''} ${isVisible ? 'animate-fade-in-up' : ''}`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {tier.isFeatured && (
                    <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                        <span className="bg-red-600 text-white text-sm font-bold px-4 py-1 rounded-full uppercase">Most Popular</span>
                    </div>
                )}
                <div className="flex-grow">
                  <h3 className="text-3xl font-black uppercase mb-2">{tier.name}</h3>
                  <p className="text-neutral-400 mb-6">{tier.description}</p>
                  <div className="mb-8">
                    <span className="text-5xl font-black gradient-text">{tier.price}</span>
                    <span className="text-lg text-neutral-400">{tier.period}</span>
                  </div>
                  <ul className="space-y-4">
                    {tier.features.map(feature => (
                      <li key={feature} className="flex items-center gap-3">
                        <svg className="w-6 h-6 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10">
                  <button 
                    onClick={() => setIsModalOpen(true)} // Open modal
                    className={`w-full text-lg font-bold uppercase py-4 rounded-full transition-all ${tier.isFeatured ? 'bg-gradient-to-r from-red-600 to-red-700 hover:shadow-lg hover:shadow-red-600/50' : 'bg-neutral-800 hover:bg-red-600'}`}>
                    Sign Up Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kids Pricing Tiers Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-8">
          <h2 className="text-5xl font-black uppercase mb-12 text-center"><span className="gradient-text">Kids</span> Programs</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {kidsTiers.map((tier, index) => (
              <div 
                key={tier.id}
                className={`pricing-card rounded-2xl p-8 flex flex-col ${tier.isFeatured ? 'featured-card' : ''} ${isVisible ? 'animate-fade-in-up' : ''}`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {tier.isFeatured && (
                    <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                        <span className="bg-red-600 text-white text-sm font-bold px-4 py-1 rounded-full uppercase">Most Popular</span>
                    </div>
                )}
                <div className="flex-grow">
                  <h3 className="text-3xl font-black uppercase mb-2">{tier.name}</h3>
                  <p className="text-neutral-400 mb-6">{tier.description}</p>
                  <div className="mb-8">
                    <span className="text-5xl font-black gradient-text">{tier.price}</span>
                    <span className="text-lg text-neutral-400">{tier.period}</span>
                  </div>
                  <ul className="space-y-4">
                    {tier.features.map(feature => (
                      <li key={feature} className="flex items-center gap-3">
                        <svg className="w-6 h-6 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10">
                  <button 
                    onClick={() => setIsModalOpen(true)} // Open modal
                    className={`w-full text-lg font-bold uppercase py-4 rounded-full transition-all ${tier.isFeatured ? 'bg-gradient-to-r from-red-600 to-red-700 hover:shadow-lg hover:shadow-red-600/50' : 'bg-neutral-800 hover:bg-red-600'}`}>
                    Sign Up Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Pricing Info Section */}
      <section className="py-24 bg-neutral-950">
        <div className="container mx-auto px-8 text-center">
          <h2 className="text-5xl font-black uppercase mb-12"><span className="gradient-text">Important</span> Notes</h2>
          <div className="max-w-3xl mx-auto space-y-6 text-neutral-400 text-lg">
            <p>
              <strong>Active Military / LEO / First Responder discounts</strong> are applied to the month-to-month price.
            </p>
            <p>
              <strong>Family rates</strong> are capped at $350 monthly for all immediate family members.
            </p>
            <p>
              Must be active military, LEO, first responder or on a six-month commitment plan for discount to apply.
            </p>
            <p className="mt-4 text-red-400 font-bold">
              **Premier Membership cannot be combined with membership discount / family rates.
            </p>
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl font-black uppercase mb-4 gradient-text">Have Questions?</h2>
            <p className="text-xl mb-10 text-neutral-400">
              Fill out the form below and one of our commanders will get back to you to discuss your path to becoming a warrior.
            </p>
          </div>
          <form 
            onSubmit={handleFormSubmit}
            className="max-w-2xl mx-auto space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="form-input w-full px-5 py-4 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500"
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="form-input w-full px-5 py-4 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500"
                />
            </div>
            <div>
                 <input
                    type="email"
                    name="email"
                    placeholder="Your Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="form-input w-full px-5 py-4 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500"
                />
            </div>
            <div>
                 <input
                    type="tel"
                    name="phone"
                    placeholder="Your Phone Number (Optional)"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input w-full px-5 py-4 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500"
                />
            </div>
            <div>
                <select 
                    name="referral" 
                    value={formData.referral}
                    onChange={handleInputChange}
                    required
                    className="form-input w-full px-5 py-4 rounded-lg bg-neutral-800 border border-neutral-700 text-white"
                >
                    <option value="" disabled>How did you hear about us?</option>
                    <option value="social-media">Social Media</option>
                    <option value="friend">Friend</option>
                    <option value="search-engine">Search Engine (Google, etc.)</option>
                    <option value="advertisement">Advertisement</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div>
                <textarea
                    name="comment"
                    placeholder="Comment (optional)"
                    value={formData.comment}
                    onChange={handleInputChange}
                    rows={5}
                    className="form-input w-full px-5 py-4 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500"
                ></textarea>
            </div>
            <div className="space-y-4 rounded-lg border border-neutral-800 p-4">
              <fieldset>
                <legend className="text-base font-medium text-white mb-2">Subscribe to reminders & notifications</legend>
                <div className="flex items-center space-x-6">
                  <label className="flex items-center space-x-2 cursor-pointer text-neutral-300 hover:text-white">
                    <input type="checkbox" name="subscribeRemindersEmail" checked={formData.subscribeRemindersEmail} onChange={handleInputChange} className="form-checkbox" />
                    <span>Email</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer text-neutral-300 hover:text-white">
                    <input type="checkbox" name="subscribeRemindersText" checked={formData.subscribeRemindersText} onChange={handleInputChange} className="form-checkbox" />
                    <span>Text</span>
                  </label>
                </div>
                <p className="text-xs text-neutral-500 mt-1">Get updates on events and our latest offers.</p>
              </fieldset>
            </div>
            {/* Honeypot field for spam prevention */}
            <div className="absolute w-0 h-0 overflow-hidden">
              <label htmlFor="honeypot">Do not fill in this field</label>
              <input
                type="text"
                id="honeypot"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleInputChange}
                tabIndex={-1}
              />
            </div>
            <div className="text-center">
                <button
                    type="submit"
                    className="bg-gradient-to-r from-red-600 to-red-700 text-white px-12 py-4 rounded-full font-bold uppercase transition-all hover:shadow-lg hover:shadow-red-600/50 hover:scale-105"
                >
                    Send Inquiry
                </button>
            </div>
            {formStatus && (
              <p className="mt-6 text-center text-sm font-medium text-green-400">
                {formStatus}
              </p>
            )}
          </form>
        </div>
      </section>
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}

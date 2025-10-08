'use client';
import React, { useState, useEffect, ReactNode } from "react";

// Define the structure for a contact detail item
interface ContactDetail {
  icon: ReactNode;
  title: string;
  value: string;
  href?: string;
}

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    isNotSpam: false,
  });
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  const contactDetails: ContactDetail[] = [
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      ),
      title: "Location",
      value: "123 Warrior Way, Strengthville, ST 90210",
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      ),
      title: "Phone",
      value: "(123) 456-7890",
      href: "tel:123-456-7890",
    },
    {
      icon: (
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      ),
      title: "Email",
      value: "contact@cowarrior.gym",
      href: "mailto:contact@cowarrior.gym",
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    // Annoying trick to get the checked status from a checkbox
    const checkedValue = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({ 
        ...prev, 
        [name]: isCheckbox ? checkedValue : value 
    }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('Submitting...');
    if (!formData.isNotSpam) {
        setFormStatus('Please confirm you are not a robot.');
        return;
    }
    // Simulated submission
    setTimeout(() => {
      setFormStatus(`Message sent! We'll get back to you shortly, ${formData.name}.`);
      setFormData({ name: '', email: '', subject: '', message: '', isNotSpam: false });
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
        .form-input {
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .form-input:focus {
            border-color: #dc2626;
            box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.3);
            outline: none;
        }
        .map-container iframe {
            filter: grayscale(1) invert(0.9) contrast(0.9);
            transition: filter 0.4s ease;
        }
        .map-container:hover iframe {
            filter: grayscale(0) invert(0) contrast(1);
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed" 
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1554284126-aa88f22d8b74?w=1200&h=600&fit=crop)` }}
        >
          <div className="absolute inset-0 bg-black/75"></div>
        </div>
        <div className={`relative z-10 container mx-auto px-8 ${isVisible ? 'animate-fade-in-up' : ''}`}>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight">
            Get In <span className="gradient-text">Touch</span>
          </h1>
          <p className="mt-6 text-xl text-neutral-300 max-w-3xl mx-auto">
            We're here to answer your questions. Reach out and start your warrior journey today.
          </p>
        </div>
      </section>

      {/* Contact Info & Form Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Left Column: Info & Hours */}
            <div className="space-y-12">
                <div>
                    <h2 className="text-4xl font-black uppercase mb-6 gradient-text">Contact Info</h2>
                    <div className="space-y-6">
                        {contactDetails.map((detail, index) => (
                            <div key={index} className="flex items-start gap-4">
                                <div className="bg-neutral-800 p-3 rounded-full">
                                    <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        {detail.icon}
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl">{detail.title}</h3>
                                    <a href={detail.href} className="text-neutral-300 hover:text-red-500 transition-colors">{detail.value}</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-4xl font-black uppercase mb-6 gradient-text">Business Hours</h2>
                    <ul className="text-neutral-300 space-y-3">
                        <li className="flex justify-between border-b border-neutral-800 pb-2"><span>Monday - Friday</span> <strong>5:00 AM - 10:00 PM</strong></li>
                        <li className="flex justify-between border-b border-neutral-800 pb-2"><span>Saturday</span> <strong>7:00 AM - 8:00 PM</strong></li>
                        <li className="flex justify-between border-b border-neutral-800 pb-2"><span>Sunday</span> <strong>8:00 AM - 6:00 PM</strong></li>
                    </ul>
                </div>
            </div>

            {/* Right Column: Contact Form */}
            <div>
              <h2 className="text-4xl font-black uppercase mb-6 gradient-text">Send a Message</h2>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange} required className="form-input w-full px-5 py-4 rounded-lg bg-neutral-800 border border-neutral-700" />
                  <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} required className="form-input w-full px-5 py-4 rounded-lg bg-neutral-800 border border-neutral-700" />
                </div>
                <div>
                  <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleInputChange} required className="form-input w-full px-5 py-4 rounded-lg bg-neutral-800 border border-neutral-700" />
                </div>
                <div>
                  <textarea name="message" placeholder="Your Message..." value={formData.message} onChange={handleInputChange} required rows={5} className="form-input w-full px-5 py-4 rounded-lg bg-neutral-800 border border-neutral-700"></textarea>
                </div>
                <div className="flex items-center gap-3">
                    <input type="checkbox" id="spam-check" name="isNotSpam" checked={formData.isNotSpam} onChange={handleInputChange} className="h-5 w-5 bg-neutral-800 border-neutral-600 text-red-600 focus:ring-red-500 rounded" />
                    <label htmlFor="spam-check" className="text-neutral-400">I am not a robot</label>
                </div>
                <div>
                  <button type="submit" className="bg-gradient-to-r from-red-600 to-red-700 text-white px-12 py-4 rounded-full font-bold uppercase transition-all hover:shadow-lg hover:shadow-red-600/50 hover:scale-105">
                    Submit Now
                  </button>
                </div>
                 {formStatus && (
                    <p className={`mt-4 text-sm font-medium ${formStatus.includes('Please') ? 'text-yellow-400' : 'text-green-400'}`}>
                        {formStatus}
                    </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="w-full h-[60vh] bg-black map-container">
        {/* In a real app, you'd replace the src with your actual Google Maps embed link */}
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.719696952932!2d-118.4940029847847!3d34.05112898060609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2a4d4a8f9d153%3A0x454d8a07c1b8a53e!2sSanta%20Monica%20Pier!5e0!3m2!1sen!2sus!4v1617297378736!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            aria-hidden="false"
            tabIndex={0}
            title="Cowarrior Gym Location"
        ></iframe>
      </section>

    </main>
  );
}
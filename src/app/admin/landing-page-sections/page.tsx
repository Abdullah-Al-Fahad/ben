'use client';

import { useState } from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SectionModal } from './SectionModal';
import { motion } from 'framer-motion';
import { 
    Component, PenSquare, ImageIcon, BarChart, Landmark, Users, Calendar, DollarSign, Newspaper, Megaphone 
} from 'lucide-react';

const sectionIcons: { [key: string]: React.ElementType } = {
    'cta': Megaphone,
    'programs-section': Component,
    'image-section-training': ImageIcon,
    'gym-features-section': BarChart,
    'core-values-section': Landmark,
    'team-photo-section': Users,
    'coaches-section-intro': PenSquare,
    'schedule-section': Calendar,
    'pricing-section': DollarSign,
    'newsletter-section': Newspaper,
};

export default function LandingPageSections() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const openModal = (section: string) => {
    setSelectedSection(section);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedSection(null);
    setIsModalOpen(false);
  };

  const sections = [
    { id: 'cta', title: 'Landing Page CTA', description: 'Edit the Call to Action section on the landing page.' },
    { id: 'programs-section', title: 'Landing Page Programs', description: 'Edit the Programs section on the landing page.' },
    { id: 'image-section-training', title: 'Landing Page Image (Training)', description: 'Edit the background image for the training section.' },
    { id: 'gym-features-section', title: 'Landing Page Gym Features', description: 'Edit the features listed in the gym features section.' },
    { id: 'core-values-section', title: 'Landing Page Core Values', description: 'Edit the core values section on the landing page.' },
    { id: 'team-photo-section', title: 'Landing Page Team Photo', description: 'Edit the team photo section on the landing page.' },
    { id: 'coaches-section-intro', title: 'Landing Page Coaches Intro', description: 'Edit the introductory text for the coaches section.' },
    { id: 'schedule-section', title: 'Landing Page Schedule', description: 'Edit the schedule section on the landing page.' },
    { id: 'pricing-section', title: 'Landing Page Pricing', description: 'Edit the pricing section on the landing page.' },
    { id: 'newsletter-section', title: 'Landing Page Newsletter', description: 'Edit the newsletter subscription section.' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-10"
    >
        <Card className="bg-white/50 dark:bg-white/10 backdrop-blur-lg border border-gray-200 dark:border-white/20 text-gray-800 dark:text-white rounded-xl shadow-lg mb-8">
            <CardHeader>
                <CardTitle className="text-4xl font-bold tracking-tight">Landing Page Sections</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300 text-lg">
                    Manage the content for various sections of the landing page.
                </CardDescription>
            </CardHeader>
        </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sections.map((section, i) => {
            const Icon = sectionIcons[section.id] || Component;
            return (
                <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    onClick={() => openModal(section.id)}
                    className="cursor-pointer h-full"
                >
                    <Card className="bg-white/30 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-lg shadow-md hover:shadow-purple-500/10 dark:hover:shadow-purple-500/20 hover:border-purple-300 dark:hover:border-purple-500 transition-all duration-300 h-full text-gray-800 dark:text-white">
                        <CardHeader className="flex-row items-center gap-4">
                            <Icon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                            <div>
                                <CardTitle>{section.title.replace('Landing Page ', '')}</CardTitle>
                                <CardDescription className="text-gray-600 dark:text-gray-400 mt-1">{section.description}</CardDescription>
                            </div>
                        </CardHeader>
                    </Card>
                </motion.div>
            )
        })}
      </div>

      <SectionModal
        section={selectedSection}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </motion.div>
  );
}
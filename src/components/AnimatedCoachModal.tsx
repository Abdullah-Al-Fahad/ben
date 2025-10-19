// src/components/AnimatedCoachModal.tsx
import React from 'react';
import { motion } from 'framer-motion';

// Interface for CoachDetail remains the same
export interface CoachDetail {
  name: string;
  imageUrl: string;
  specialties: string[];
  achievements: string[];
  bio: string[];
}

interface ModalProps {
  slug: string;
  coach: CoachDetail;
  onClose: () => void;
}

// --- THE KEY TO THE NEW ANIMATION ---
// This custom transition gives us the slow, smooth, and cinematic effect.
const cinematicTransition = {
  duration: 0.7, // Slower duration for a more graceful effect
  ease: [0.87, 0, 0.13, 1], // A common "quint" easing curve for a dramatic, professional feel
};

// Animation for the content to fade in after the main transition
const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06, // A slightly faster stagger for a fluid flow
      delayChildren: 0.3, // Start fading in content during the second half of the main animation
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" } // Each item eases smoothly into place
  },
};

export const AnimatedCoachModal: React.FC<ModalProps> = ({ slug, coach, onClose }) => {
  return (
    // The backdrop now handles the click to close and has its own fade animation
    <motion.div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }} // Simple fade for the backdrop
    >
      <motion.div
        layoutId={slug} // The magic link to the card
        transition={cinematicTransition} // APPLYING THE CUSTOM TRANSITION HERE!
        onClick={(e) => e.stopPropagation()}
        className="relative w-full h-full bg-black"
      >
        {/* Main grid for the two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 h-full">

          {/* Left Column: Image */}
          <div className="lg:col-span-3 relative h-full hidden lg:block overflow-hidden">
            {/* The image is no longer a motion component, the container handles the animation */}
            <img
              src={coach.imageUrl} alt={coach.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <motion.div
              variants={contentVariants} initial="hidden" animate="visible" exit="hidden"
              className="absolute bottom-0 left-0 p-12 text-white"
            >
              <motion.h1 variants={itemVariants} className="text-5xl font-extrabold uppercase tracking-wider">{coach.name}</motion.h1>
              {coach.specialties?.length > 0 && (
                <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mt-4">
                  {coach.specialties.map(spec => (
                    <span key={spec} className="border border-white/50 text-white text-xs font-bold px-3 py-1 rounded-full">{spec}</span>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-2 relative h-full overflow-y-auto p-12">
            <motion.button
              onClick={onClose}
              className="absolute top-8 right-8 text-gray-400 hover:text-white transition"
              aria-label="Close"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, transition: { delay: 0.5 } }}
              exit={{ opacity: 0 }}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </motion.button>

            <motion.div
              variants={contentVariants} initial="hidden" animate="visible" exit="hidden"
              className="text-white space-y-12 max-w-md"
            >
              <motion.h1 variants={itemVariants} className="text-5xl font-extrabold uppercase tracking-wider lg:hidden">{coach.name}</motion.h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div variants={itemVariants}>
                  <h3 className="font-bold text-sm uppercase tracking-widest text-gray-400 mb-3">Specialty</h3>
                  <p className="text-gray-200">{coach.specialties?.join(', ') || 'N/A'}</p>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <h3 className="font-bold text-sm uppercase tracking-widest text-gray-400 mb-3">Achievements</h3>
                  <ul className="text-gray-200 space-y-1">{coach.achievements?.map(item => <li key={item}>{item}</li>)}</ul>
                </motion.div>
              </div>
              <motion.div variants={itemVariants}>
                <h3 className="font-bold text-sm uppercase tracking-widest text-gray-400 mb-3">Bio</h3>
                <div className="text-gray-300 leading-relaxed space-y-4">{coach.bio?.map((p, i) => <p key={i}>{p}</p>)}</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
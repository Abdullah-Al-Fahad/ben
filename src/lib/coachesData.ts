
// Define the structure for a Coach
export interface Coach {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
  bio: string;
  specializations: string[];
  certifications: string[];
}

export const coaches: Coach[] = [
  {
    id: 1,
    name: "Marcus 'The Titan' Thorne",
    role: "Head Coach & Founder",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=1000&fit=crop",
    bio: "With over 15 years in competitive strength sports, Marcus founded Cowarrior Gym to build a community dedicated to overcoming limits. His philosophy is rooted in discipline, raw power, and mental fortitude.",
    specializations: ["Powerlifting", "Strongman Training", "Athletic Performance", "Mental Resilience"],
    certifications: ["NSCA-CSCS", "USAW Level 2", "Certified Strength Coach"]
  },
  {
    id: 2,
    name: "Elena 'Viper' Ramirez",
    role: "Head of CrossFit & Conditioning",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=1000&fit=crop",
    bio: "A former professional CrossFit athlete, Elena lives and breathes high-intensity functional fitness. She excels at pushing members to their peak metabolic condition while perfecting their form and technique.",
    specializations: ["CrossFit", "Metabolic Conditioning", "Gymnastics", "Olympic Weightlifting"],
    certifications: ["CrossFit Level 3 (CF-L3)", "NASM-CPT", "Precision Nutrition L1"]
  },
  {
    id: 3,
    name: "Sam 'The Ghost' Chen",
    role: "Mobility & Martial Arts Coach",
    imageUrl: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=800&h=1000&fit=crop",
    bio: "Combining a lifetime of martial arts with a deep understanding of biomechanics, Sam focuses on building a foundation of mobility and control. He helps warriors move efficiently, prevent injury, and master their bodies.",
    specializations: ["Mobility & Flexibility", "Kettlebell Training", "Muay Thai", "Functional Range Conditioning"],
    certifications: ["FRCms", "Kettlebell Athletics L2", "Certified Yoga Instructor"]
  }
];

export interface Achievement {
  icon: string;
  text: string;
}

export interface Coach {
  id: string;
  name: string;
  title: string;
  disciplines: string[];
  specializations: string[];
  certifications: string[];
  imageUrl: string;
  videoUrl: string;
  bio: string;
  philosophy: string;
  achievements: Achievement[];
  gallery: string[];
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  period?: string;
  description?: string;
  features: string[];
  isFeatured?: boolean;
}

export interface PricingSection {
  id: string;
  title: string;
  tiers: PricingTier[];
}

export interface CoachesHeroSection {
  backgroundImageUrl: string;
  mainHeadline: string;
  subHeadline: string;
}

export interface PricingHeroSection {
  backgroundImageUrl: string;
  mainHeadline: string;
  subHeadline: string;
}

export interface ScheduleHeroSection {
  backgroundImageUrl: string;
  mainHeadline: string;
  subHeadline: string;
}

export interface MembershipPage {
  freeTrial: {
    title: string;
    description: string;
    buttonText: string;
  };
  importantNotes: {
    title: string;
    notes: string[];
  };
  inquiryForm: {
    title: string;
    description: string;
  };
}
import React from 'react';
import { AnimatedCoachModal, CoachDetail } from '@/components/AnimatedCoachModal';
import { ValueBlock } from '@/components/Landing/LandingCard';
import CoachesClientPage from './CoachesClientPage'; // New client component

interface Coach {
    slug: string;
    name: string;
    specialties: string[];
    imageUrl: string;
}

interface CoachDetailsData { [key: string]: CoachDetail; }

const CoachesPage = async () => {
  const coachesResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/coaches`, { cache: 'no-store' });
  const coachesData: Coach[] = await coachesResponse.json();

  const allCoachDetails: CoachDetailsData = {};
  await Promise.all(coachesData.map(async (coach) => {
    const coachDetailResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/coaches/${coach.slug}`, { cache: 'no-store' });
    const coachDetail: CoachDetail = await coachDetailResponse.json();
    allCoachDetails[coach.slug] = coachDetail;
  }));

  const coachesSectionResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/landing-page/coaches`, { cache: 'no-store' });
  const coachesSectionData = await coachesSectionResponse.json();

  return (
    <CoachesClientPage coachesData={coachesData} allCoachDetails={allCoachDetails} coachesSectionData={coachesSectionData} />
  );
};

export default CoachesPage;

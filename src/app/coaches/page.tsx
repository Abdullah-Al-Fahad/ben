import { fetchApi } from '@/lib/api';
import React from 'react';
import { AnimatedCoachModal, CoachDetail } from '@/components/AnimatedCoachModal';
import { ValueBlock } from '@/components/Landing/LandingCard';
import CoachesClientPage from './CoachesClientPage'; // New client component

interface Coach {
    id: string;
    name: string;
    specialties: string[];
    imageUrl: string;
}

interface CoachDetailsData { [key: string]: CoachDetail; }

const CoachesPage = async () => {
  const originalCoachesData: Coach[] = await fetchApi('coaches', { cache: 'no-store' });

  const processUrl = (url: string) => {
    if (url && url.startsWith('http')) {
      try {
        return new URL(url).pathname;
      } catch (e) {
        console.error(`Invalid URL encountered: ${url}`, e);
        return url; // Fallback to the original URL
      }
    }
    return url;
  };

  const coachesData = originalCoachesData.map(coach => ({
    ...coach,
    imageUrl: processUrl(coach.imageUrl),
  }));

  const allCoachDetails: CoachDetailsData = {};
  await Promise.all(originalCoachesData.map(async (coach) => {
    const coachDetail: CoachDetail = await fetchApi(`coaches/${coach.id}`, { cache: 'no-store' });
    allCoachDetails[coach.id] = {
        ...coachDetail,
        imageUrl: coachDetail.imageUrl ? processUrl(coachDetail.imageUrl) : coachDetail.imageUrl
    };
  }));

  const coachesSectionData = await fetchApi('landing-page/coaches', { cache: 'no-store' });

  return (
    <CoachesClientPage coachesData={coachesData} allCoachDetails={allCoachDetails} coachesSectionData={coachesSectionData} />
  );
};

export default CoachesPage;

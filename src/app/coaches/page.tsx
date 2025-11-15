'use client';

import React, { useEffect, useState } from 'react';
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

const CoachesPage = () => {
  const [coachesData, setCoachesData] = useState<Coach[]>([]);
  const [allCoachDetails, setAllCoachDetails] = useState<CoachDetailsData>({});
  const [coachesSectionData, setCoachesSectionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Fetch main coaches data
        const coachesRes = await fetch('/api/coaches');
        if (!coachesRes.ok) throw new Error('Failed to fetch coaches');
        const coaches: Coach[] = await coachesRes.json();
        setCoachesData(coaches);

        // Fetch details for each coach
        const details: CoachDetailsData = {};
        await Promise.all(coaches.map(async (coach) => {
          const detailRes = await fetch(`/api/coaches/${coach.id}`);
          if (detailRes.ok) {
            details[coach.id] = await detailRes.json();
          }
        }));
        setAllCoachDetails(details);

        // Fetch landing page section data
        const sectionRes = await fetch('/api/landing-page/coaches');
        if (sectionRes.ok) {
          setCoachesSectionData(await sectionRes.json());
        }
      } catch (error) {
        console.error("Failed to fetch coaches page data:", error);
        // Handle error state if necessary
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or a proper loading spinner component
  }

  return (
    <CoachesClientPage 
      coachesData={coachesData} 
      allCoachDetails={allCoachDetails} 
      coachesSectionData={coachesSectionData} 
    />
  );
};

export default CoachesPage;

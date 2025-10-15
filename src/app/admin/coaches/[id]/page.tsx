
'use client';

import { useEffect, useState } from 'react';
import { Coach } from '@/lib/types';
import { CoachForm } from '../CoachForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function EditCoachPage({ params }: { params: { id: string } }) {
  const [coach, setCoach] = useState<Coach | null>(null);

  useEffect(() => {
    const fetchCoach = async () => {
      const response = await fetch(`/api/coaches/${params.id}`);
      const data = await response.json();
      setCoach(data);
    };

    fetchCoach();
  }, [params.id]);

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">Edit Coach</CardTitle>
          <CardDescription>
            Edit the coach's details below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {coach ? <CoachForm coach={coach} /> : <p>Loading...</p>}
        </CardContent>
      </Card>
    </div>
  );
}

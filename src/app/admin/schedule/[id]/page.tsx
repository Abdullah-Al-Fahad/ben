'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Schedule {
  id: string;
  day: string;
  time: string;
  program: string;
}

export default function EditSchedulePage() {
  const params = useParams();
  const { id } = params;
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [day, setDay] = useState('');
  const [time, setTime] = useState('');
  const [program, setProgram] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (id) {
      const fetchSchedule = async () => {
        const res = await fetch(`/api/schedule/${id}`);
        const data = await res.json();
        setSchedule(data);
        setDay(data.day);
        setTime(data.time);
        setProgram(data.program);
      };
      fetchSchedule();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/schedule/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ day, time, program }),
    });
    router.push('/admin/schedule');
  };

  if (!schedule) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle>Edit Event: {schedule.program}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="day" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Day</label>
              <Input id="day" value={day} onChange={(e) => setDay(e.target.value)} />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Time</label>
              <Input id="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
            <div>
              <label htmlFor="program" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Program</label>
              <Input id="program" value={program} onChange={(e) => setProgram(e.target.value)} />
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

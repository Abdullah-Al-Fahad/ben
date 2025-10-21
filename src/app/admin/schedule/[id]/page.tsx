
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { schedule } from '@/lib/scheduleData';
import { ScheduleEvent } from '@/lib/types';

export default function EditSchedulePage() {
  const params = useParams();
  const { id } = params;
  const [event, setEvent] = useState<ScheduleEvent | null>(null);

  useEffect(() => {
    if (id) {
      const eventData = schedule[parseInt(id as string)];
      setEvent(eventData || null);
    }
  }, [id]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle>Edit Event: {event.title}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <form className="space-y-6">
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Time</label>
              <Input id="time" defaultValue={event.time} />
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
              <Input id="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
            </div>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
              <Input id="title" defaultValue={event.title} />
            </div>
            <div>
              <label htmlFor="level" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Level</label>
              <Input id="level" defaultValue={event.level} />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
              <Input id="category" defaultValue={event.category} />
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

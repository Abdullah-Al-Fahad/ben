'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Schedule {
  id: string;
  day: string;
  time: string;
  program: string;
}

export default function ManageSchedulePage() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      const res = await fetch('/api/schedule');
      const data = await res.json();
      setSchedules(data);
    };
    fetchSchedules();
  }, []);

  const handleDelete = async (id: string) => {
    await fetch(`/api/schedule/${id}`, {
      method: 'DELETE',
    });
    setSchedules(schedules.filter((schedule) => schedule.id !== id));
  };

  return (
    <div className="container mx-auto py-10">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Manage Schedule</h1>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <Link href="/admin/schedule/add">
                    <Button>
                      <PlusCircle className="mr-2 h-4 w-4" /> Add New Event
                    </Button>
                  </Link>
                </div>
              </div>
      <Card>
        <CardHeader>
          <CardTitle>All Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Day</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedules.map((schedule: Schedule) => (
                  <TableRow key={schedule.id}>
                    <TableCell>{schedule.day}</TableCell>
                    <TableCell>{schedule.time}</TableCell>
                    <TableCell>{schedule.program}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                          <Link href={`/admin/schedule/${schedule.id}`}>
                              <Button variant="outline" size="icon">
                                  <Edit className="h-4 w-4" />
                              </Button>
                          </Link>
                        <Button variant="destructive" size="icon" onClick={() => handleDelete(schedule.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { schedule } from '@/lib/scheduleData';
import { ScheduleEvent } from '@/lib/types';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function ManageSchedulePage() {
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
                  <TableHead>Time</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedule.map((event: ScheduleEvent, index) => (
                  <TableRow key={index} className="flex flex-col sm:table-row border-b sm:border-none">
                    <TableCell className="sm:hidden font-bold">Time:</TableCell>
                    <TableCell className="sm:table-cell">{event.time}</TableCell>
                    <TableCell className="sm:hidden font-bold">Date:</TableCell>
                    <TableCell className="sm:table-cell">2025-10-21</TableCell>
                    <TableCell className="sm:hidden font-bold">Title:</TableCell>
                    <TableCell className="sm:table-cell">{event.title}</TableCell>
                    <TableCell className="sm:hidden font-bold">Level:</TableCell>
                    <TableCell className="sm:table-cell">{event.level}</TableCell>
                    <TableCell className="sm:hidden font-bold">Category:</TableCell>
                    <TableCell className="sm:table-cell">{event.category}</TableCell>
                    <TableCell className="sm:hidden font-bold">Actions:</TableCell>
                    <TableCell className="sm:table-cell">
                      <div className="flex items-center space-x-2">
                          <Link href={`/admin/schedule/${index}`}>
                              <Button variant="outline" size="icon">
                                  <Edit className="h-4 w-4" />
                              </Button>
                          </Link>
                        <Button variant="destructive" size="icon">
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
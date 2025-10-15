'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Schedule, Coach } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MoreHorizontal, PlusCircle, FileEdit, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScheduleModal } from './ScheduleModal';
import { motion } from 'framer-motion';

export default function ManageSchedulePage() {
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState<string | null>(null);

  const fetchData = async () => {
    const [scheduleRes, coachesRes] = await Promise.all([
      fetch('/api/schedule'),
      fetch('/api/coaches'),
    ]);
    const [scheduleData, coachesData] = await Promise.all([
      scheduleRes.json(),
      coachesRes.json(),
    ]);
    setSchedule(scheduleData);
    setCoaches(coachesData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await fetch(`/api/schedule/${id}`, { method: 'DELETE' });
        if (response.ok) {
          fetchData();
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
  };

  const openModal = (scheduleId?: string) => {
    setSelectedScheduleId(scheduleId || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedScheduleId(null);
    setIsModalOpen(false);
    fetchData();
  };

  const getCoachName = (coachId: string) => {
    const coach = coaches.find((c) => c.id === coachId);
    return coach ? coach.name : 'Unknown';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-10"
    >
      <Card className="bg-white/50 dark:bg-white/10 backdrop-blur-lg border border-gray-200 dark:border-white/20 text-gray-800 dark:text-white rounded-xl shadow-lg">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <CardTitle className="text-3xl font-bold">Manage Schedule</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300 mt-1">
              Add, edit, or remove classes from the schedule.
            </CardDescription>
          </div>
          <Button 
            onClick={() => openModal()} 
            className="mt-4 sm:mt-0 bg-purple-600 text-white hover:bg-purple-700 transition-all duration-200"
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Item
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow className="border-b border-gray-200 dark:border-white/20">
                  <TableHead className="font-semibold text-gray-800 dark:text-white">Date & Time</TableHead>
                  <TableHead className="font-semibold text-gray-800 dark:text-white">Discipline</TableHead>
                  <TableHead className="font-semibold text-gray-800 dark:text-white">Coach</TableHead>
                  <TableHead className="font-semibold text-gray-800 dark:text-white">Duration</TableHead>
                  <TableHead className="text-right font-semibold text-gray-800 dark:text-white">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedule.map((item) => (
                  <TableRow key={item.id} className="border-b border-gray-200 dark:border-white/10 hover:bg-gray-100/50 dark:hover:bg-white/5">
                    <TableCell className="font-medium whitespace-nowrap">{format(new Date(item.datetime), 'PPP p')}</TableCell>
                    <TableCell>{item.discipline}</TableCell>
                    <TableCell>{getCoachName(item.coachId)}</TableCell>
                    <TableCell>{item.duration}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-200 dark:hover:bg-white/10">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => openModal(item.id)} className="cursor-pointer hover:!bg-gray-100 dark:hover:!bg-gray-700">
                             <FileEdit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(item.id)} className="cursor-pointer text-red-500 dark:text-red-400 hover:!text-red-500 dark:hover:!text-red-400 hover:!bg-red-100 dark:hover:!bg-red-900/50">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <ScheduleModal
        scheduleId={selectedScheduleId}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </motion.div>
  );
}
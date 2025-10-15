'use client';

import { useEffect, useState } from 'react';
import { Schedule } from '@/lib/types';
import { ScheduleForm } from './ScheduleForm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ScheduleModalProps {
  scheduleId?: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ScheduleModal({ scheduleId, isOpen, onClose }: ScheduleModalProps) {
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const isEditMode = !!scheduleId;

  useEffect(() => {
    if (isOpen && isEditMode) {
      const fetchSchedule = async () => {
        const response = await fetch(`/api/schedule/${scheduleId}`);
        const data = await response.json();
        setSchedule(data);
      };
      fetchSchedule();
    } else if (!isEditMode) {
      setSchedule(null);
    }
  }, [isOpen, scheduleId, isEditMode]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border border-gray-200 dark:border-white/20 text-gray-800 dark:text-white rounded-xl shadow-lg sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{isEditMode ? 'Edit Schedule' : 'Add New Schedule'}</DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300">
            {isEditMode
              ? "Make changes to the schedule here. Click save when you're done."
              : 'Create a new schedule entry.'}
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[80vh] overflow-y-auto pr-6 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-200 dark:scrollbar-track-gray-800">
          <ScheduleForm schedule={isEditMode ? schedule : undefined} onClose={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

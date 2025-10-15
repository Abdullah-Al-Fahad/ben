'use client';

import { useEffect, useState } from 'react';
import { Coach } from '@/lib/types';
import { CoachForm } from './CoachForm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface CoachModalProps {
  coachId?: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CoachModal({ coachId, isOpen, onClose }: CoachModalProps) {
  const [coach, setCoach] = useState<Coach | null>(null);
  const isEditMode = !!coachId;

  useEffect(() => {
    if (isOpen && isEditMode) {
      const fetchCoach = async () => {
        const response = await fetch(`/api/coaches/${coachId}`);
        const data = await response.json();
        setCoach(data);
      };
      fetchCoach();
    } else if (!isEditMode) {
      setCoach(null);
    }
  }, [isOpen, coachId, isEditMode]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border border-gray-200 dark:border-white/20 text-gray-800 dark:text-white rounded-xl shadow-lg sm:max-w-2xl lg:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{isEditMode ? 'Edit Coach' : 'Add New Coach'}</DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300">
            {isEditMode
              ? "Make changes to the coach's profile here. Click save when you're done."
              : 'Create a new coach entry.'}
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[80vh] overflow-y-auto pr-6 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-200 dark:scrollbar-track-gray-800">
          <CoachForm coach={isEditMode ? coach : undefined} onClose={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

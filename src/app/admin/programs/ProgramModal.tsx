'use client';

import { useEffect, useState } from 'react';
import { Program } from '@/lib/types';
import { ProgramForm } from './ProgramForm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ProgramModalProps {
  programId?: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProgramModal({ programId, isOpen, onClose }: ProgramModalProps) {
  const [program, setProgram] = useState<Program | null>(null);
  const isEditMode = !!programId;

  useEffect(() => {
    if (isOpen && isEditMode) {
      const fetchProgram = async () => {
        const response = await fetch(`/api/programs/${programId}`);
        const data = await response.json();
        setProgram(data);
      };
      fetchProgram();
    } else if (!isEditMode) {
      setProgram(null);
    }
  }, [isOpen, programId, isEditMode]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border border-gray-200 dark:border-white/20 text-gray-800 dark:text-white rounded-xl shadow-lg sm:max-w-2xl lg:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{isEditMode ? 'Edit Program' : 'Add New Program'}</DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300">
            {isEditMode
              ? "Make changes to the program here. Click save when you're done."
              : 'Create a new program entry.'}
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[80vh] overflow-y-auto pr-6 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-200 dark:scrollbar-track-gray-800">
          <ProgramForm program={isEditMode ? program : undefined} onClose={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

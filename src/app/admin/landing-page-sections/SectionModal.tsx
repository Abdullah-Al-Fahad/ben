'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { SectionForm } from './SectionForm';

interface SectionModalProps {
  section: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SectionModal({ section, isOpen, onClose }: SectionModalProps) {
  if (!section) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border border-gray-200 dark:border-white/20 text-gray-800 dark:text-white rounded-xl shadow-lg sm:max-w-2xl lg:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Edit {section.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300">
            Make changes to this section here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[80vh] overflow-y-auto pr-6 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-200 dark:scrollbar-track-gray-800">
          <SectionForm section={section} onClose={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { PricingTier, PricingSection } from '@/lib/types';
import { PricingForm } from './PricingForm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface PricingModalProps {
  pricingId?: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PricingModal({ pricingId, isOpen, onClose }: PricingModalProps) {
  const [pricing, setPricing] = useState<{ tier: PricingTier, section: { id: string, title: string } } | null>(null);
  const [pricingSections, setPricingSections] = useState<PricingSection[]>([]);
  const isEditMode = !!pricingId;

  useEffect(() => {
    const fetchSections = async () => {
      const response = await fetch('/api/pricing');
      const data = await response.json();
      setPricingSections(Array.isArray(data) ? data : []);
    };

    if (isOpen) {
      fetchSections();
      if (isEditMode) {
        const fetchPricing = async () => {
          const response = await fetch(`/api/pricing/${pricingId}`);
          const data = await response.json();
          setPricing(data);
        };
        fetchPricing();
      } else {
        setPricing(null);
      }
    }
  }, [isOpen, pricingId, isEditMode]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border border-gray-200 dark:border-white/20 text-gray-800 dark:text-white rounded-xl shadow-lg sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{isEditMode ? 'Edit Pricing Plan' : 'Add New Pricing Plan'}</DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300">
            {isEditMode
              ? "Make changes to the pricing plan here. Click save when you're done."
              : 'Create a new pricing plan.'}
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[80vh] overflow-y-auto pr-6 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-200 dark:scrollbar-track-gray-800">
          <PricingForm pricing={isEditMode ? pricing : undefined} pricingSections={pricingSections} onClose={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

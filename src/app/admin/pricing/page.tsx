'use client';

import React, { useEffect, useState } from 'react';
import { PricingSection, PricingTier } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MoreHorizontal, PlusCircle, FileEdit, Trash2, Star } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PricingModal } from './PricingModal';
import { motion } from 'framer-motion';

export default function ManagePricingPage() {
  const [pricingSections, setPricingSections] = useState<PricingSection[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPricingId, setSelectedPricingId] = useState<string | null>(null);

  const fetchPricing = async () => {
    const response = await fetch('/api/pricing');
    const data = await response.json();
    setPricingSections(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchPricing();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      try {
        const response = await fetch(`/api/pricing/${id}`, { method: 'DELETE' });
        if (response.ok) {
          fetchPricing();
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
  };

  const openModal = (pricingId?: string) => {
    setSelectedPricingId(pricingId || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPricingId(null);
    setIsModalOpen(false);
    fetchPricing();
  };

    const allTiers = pricingSections.flatMap(section => 

      section.tiers.map(tier => ({

          ...tier,

          sectionTitle: section.title

      }))

    );

  

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

              <CardTitle className="text-3xl font-bold">Manage Pricing</CardTitle>

              <CardDescription className="text-gray-600 dark:text-gray-300 mt-1">

                Create, edit, or remove pricing plans.

              </CardDescription>

            </div>

            <Button 

              onClick={() => openModal()} 

              className="mt-4 sm:mt-0 bg-purple-600 text-white hover:bg-purple-700 transition-all duration-200"

            >

              <PlusCircle className="mr-2 h-4 w-4" /> Add New Plan

            </Button>

          </CardHeader>

          <CardContent>

            <div className="overflow-x-auto">

              <Table className="min-w-full">

                <TableHeader>

                  <TableRow className="border-b border-gray-200 dark:border-white/20">

                    <TableHead className="font-semibold text-gray-800 dark:text-white">Plan Name</TableHead>

                    <TableHead className="font-semibold text-gray-800 dark:text-white">Price</TableHead>

                    <TableHead className="font-semibold text-gray-800 dark:text-white">Period</TableHead>

                    <TableHead className="font-semibold text-gray-800 dark:text-white">Section</TableHead>

                    <TableHead className="font-semibold text-gray-800 dark:text-white">Featured</TableHead>

                    <TableHead className="text-right font-semibold text-gray-800 dark:text-white">Actions</TableHead>

                  </TableRow>

                </TableHeader>

                <TableBody>

                  {allTiers.map((plan) => (

                    <TableRow key={plan.id} className="border-b border-gray-200 dark:border-white/10 hover:bg-gray-100/50 dark:hover:bg-white/5">

                      <TableCell className="font-medium whitespace-nowrap">{plan.name}</TableCell>

                      <TableCell>{plan.price}</TableCell>

                      <TableCell>{plan.period?.split('for ')[1] || plan.period}</TableCell>

                      <TableCell>{plan.sectionTitle}</TableCell>

                      <TableCell>{plan.isFeatured ? <Star className="h-5 w-5 text-yellow-400" /> : '-'}</TableCell>

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

                            <DropdownMenuItem onClick={() => openModal(plan.id)} className="cursor-pointer hover:!bg-gray-100 dark:hover:!bg-gray-700">

                              <FileEdit className="mr-2 h-4 w-4" />

                              Edit

                            </DropdownMenuItem>

                            <DropdownMenuItem onClick={() => handleDelete(plan.id)} className="cursor-pointer text-red-500 dark:text-red-400 hover:!text-red-500 dark:hover:!text-red-400 hover:!bg-red-100 dark:hover:!bg-red-900/50">

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

  

        <PricingModal

          pricingId={selectedPricingId}

          isOpen={isModalOpen}

          onClose={closeModal}

        />

      </motion.div>

    );

  }

  
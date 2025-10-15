'use client';

import { useEffect, useState } from 'react';
import { Coach } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { PlusCircle, FileEdit, Trash2 } from 'lucide-react';
import { CoachModal } from './CoachModal';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function ManageCoachesPage() {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoachId, setSelectedCoachId] = useState<string | null>(null);

  const fetchCoaches = async () => {
    const response = await fetch('/api/coaches');
    const data = await response.json();
    setCoaches(data);
  };

  useEffect(() => {
    fetchCoaches();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this coach?')) {
      try {
        const response = await fetch(`/api/coaches/${id}`, { method: 'DELETE' });
        if (response.ok) {
          fetchCoaches();
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
  };

  const openModal = (coachId?: string) => {
    setSelectedCoachId(coachId || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCoachId(null);
    setIsModalOpen(false);
    fetchCoaches();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-10"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Manage Coaches</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Add, edit, or remove coaches from your team.</p>
        </div>
        <Button 
          onClick={() => openModal()} 
          className="bg-purple-600 text-white hover:bg-purple-700 transition-all duration-200"
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Coach
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {coaches.map((coach, i) => (
          <motion.div
            key={coach.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Card className="p-0 bg-white dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 text-gray-800 dark:text-white rounded-lg shadow-md h-full flex flex-col transition-all duration-300 hover:scale-105 hover:border-purple-300 dark:hover:border-purple-500 hover:shadow-lg dark:hover:shadow-purple-500/20 overflow-hidden">
    <img src={coach.imageUrl} alt={coach.name} className="w-full h-56 object-cover"/>
    <CardContent className="p-4 flex-grow">
        <h3 className="text-xl font-bold">{coach.name}</h3>
        <p className="text-purple-600 dark:text-purple-400">{coach.title}</p>
    </CardContent>
    <CardFooter className="p-4 flex justify-end gap-2">
        <Button variant="outline" size="icon" onClick={() => openModal(coach.id)} className="bg-gray-100 dark:bg-gray-800/80 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700">
            <FileEdit className="h-4 w-4" />
        </Button>
        <Button variant="destructive" size="icon" onClick={() => handleDelete(coach.id)} className="bg-red-500 dark:bg-red-600/80 border-red-600 dark:border-red-500 hover:bg-red-600 dark:hover:bg-red-500">
            <Trash2 className="h-4 w-4" />
        </Button>
    </CardFooter>
</Card>
          </motion.div>
        ))}
      </div>

      <CoachModal
        coachId={selectedCoachId}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </motion.div>
  );
}
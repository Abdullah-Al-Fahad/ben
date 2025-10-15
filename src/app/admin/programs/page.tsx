'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, FileEdit, Trash2 } from 'lucide-react';
import { ProgramModal } from './ProgramModal';
import { Program } from '@/lib/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function AdminProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);

  const fetchPrograms = async () => {
    const response = await fetch('/api/programs');
    const data = await response.json();
    setPrograms(data);
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this program?')) {
      try {
        const response = await fetch(`/api/programs/${id}`, { method: 'DELETE' });
        if (response.ok) {
          fetchPrograms();
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
  };

  const openModal = (programId?: string) => {
    setSelectedProgramId(programId || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProgramId(null);
    setIsModalOpen(false);
    fetchPrograms();
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Manage Programs</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Add, edit, or remove training programs.</p>
        </div>
        <Button 
          onClick={() => openModal()} 
          className="bg-purple-600 text-white hover:bg-purple-700 transition-all duration-200"
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Program
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {programs.map((program, i) => (
          <motion.div
            key={program.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
           <Card className="p-0 bg-white dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 text-gray-800 dark:text-white rounded-lg shadow-md h-full flex flex-col transition-all duration-300 hover:scale-105 hover:border-purple-300 dark:hover:border-purple-500 hover:shadow-lg dark:hover:shadow-purple-500/20 overflow-hidden">
    <img src={program.imageUrl} alt={program.name} className="w-full h-56 object-cover"/>
    <CardContent className="p-4 flex-grow">
        <h3 className="text-xl font-bold">{program.name}</h3>
        <p className="text-purple-600 dark:text-purple-400 text-sm">{program.subtitle}</p>
        <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm flex-grow">{program.description}</p>
    </CardContent>
    <CardFooter className="p-4 flex justify-end gap-2">
        <Button variant="outline" size="icon" onClick={() => openModal(program.id)} className="bg-gray-100 dark:bg-gray-800/80 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700">
            <FileEdit className="h-4 w-4" />
        </Button>
        <Button variant="destructive" size="icon" onClick={() => handleDelete(program.id)} className="bg-red-500 dark:bg-red-600/80 border-red-600 dark:border-red-500 hover:bg-red-600 dark:hover:bg-red-500">
            <Trash2 className="h-4 w-4" />
        </Button>
    </CardFooter>
</Card>
          </motion.div>
        ))}
      </div>

      <ProgramModal
        programId={selectedProgramId}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </motion.div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { programs } from '@/lib/programsData';
import { Program } from '@/lib/types';

export default function EditProgramPage() {
  const params = useParams();
  const { id } = params;
  const [program, setProgram] = useState<Program | null>(null);

  useEffect(() => {
    if (id) {
      const programData = programs.find((p) => p.id === (id as string));
      setProgram(programData || null);
    }
  }, [id]);

  if (!program) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle>Edit Program: {program.name}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <form className="space-y-6">
            <div>
              <label htmlFor="heroImageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Hero Image URL</label>
              <Input id="heroImageUrl" defaultValue={program.imageUrl} />
            </div>
            <div>
              <label htmlFor="heroTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Hero Title</label>
              <Input id="heroTitle" defaultValue={program.name} />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
              <Textarea id="description" defaultValue={program.description} />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Subsections</h3>
              <div className="space-y-4 mt-2">
                <div>
                  <label htmlFor="streetTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Street Title</label>
                  <Input id="streetTitle" defaultValue="STREET" />
                  <label htmlFor="streetDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">Street Description</label>
                  <Textarea id="streetDescription" defaultValue="Training is grounded in real-world applicability. While rules exist in sport and training for safety, our focus is on adaptability beyond any one ruleset, preparing students for practical scenarios." />
                </div>
                <div>
                  <label htmlFor="sportTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sport Title</label>
                  <Input id="sportTitle" defaultValue="SPORT" />
                  <label htmlFor="sportDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">Sport Description</label>
                  <Textarea id="sportDescription" defaultValue="Competition provides structure and feedback. Whether in controlled drilling or live events, improvement takes priority over temporary outcomes, ensuring lasting growth." />
                </div>
                <div>
                  <label htmlFor="artTitle" className="block text-sm font--medium text-gray-700 dark:text-gray-300">Art Title</label>
                  <Input id="artTitle" defaultValue="ART" />
                  <label htmlFor="artDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">Art Description</label>
                  <Textarea id="artDescription" defaultValue="At its heart, Muay Thai is a journey. Students train not only for performance but for the joy of practice, the pursuit of truth in technique, and the challenge of self-discovery." />
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
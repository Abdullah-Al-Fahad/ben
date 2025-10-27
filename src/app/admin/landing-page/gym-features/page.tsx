'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Discipline {
  name: string;
  href: string;
}

export default function EditGymFeaturesSectionPage() {
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [gymFeatures, setGymFeatures] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchFeaturesData = async () => {
      try {
        const response = await fetch('/api/landing-page/features');
        if (response.ok) {
          const data = await response.json();
          const content = JSON.parse(data.content);
          setDisciplines(content.disciplines || []);
          setGymFeatures(content.gymFeatures || []);
          setDescription(content.description || '');
          setSubtitle(content.subtitle || '');
        }
      } catch (error) {
        console.error('Failed to fetch features section data:', error);
      }
    };
    fetchFeaturesData();
  }, []);

  const handleDisciplineChange = (index: number, field: keyof Discipline, value: string) => {
    const newDisciplines = [...disciplines];
    newDisciplines[index][field] = value;
    setDisciplines(newDisciplines);
  };

  const handleAddDiscipline = () => {
    setDisciplines([...disciplines, { name: '', href: '' }]);
  };

  const handleRemoveDiscipline = (index: number) => {
    const newDisciplines = disciplines.filter((_, i) => i !== index);
    setDisciplines(newDisciplines);
  };
  
  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...gymFeatures];
    newFeatures[index] = value;
    setGymFeatures(newFeatures);
  };

  const handleAddFeature = () => {
    setGymFeatures([...gymFeatures, '']);
  };

  const handleRemoveFeature = (index: number) => {
    const newFeatures = gymFeatures.filter((_, i) => i !== index);
    setGymFeatures(newFeatures);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/landing-page/features', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: JSON.stringify({ disciplines, gymFeatures, description, subtitle }),
        }),
      });

      if (response.ok) {
        router.push('/admin/landing-page');
      } else {
        console.error('Failed to save data');
      }
    } catch (error) {
      console.error('Failed to save data:', error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Edit GYM FEATURES section</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Disciplines</h3>
              {disciplines.map((discipline, index) => (
                <div key={index} className="flex items-center space-x-2 mt-2">
                  <Input
                    placeholder="Name"
                    value={discipline.name}
                    onChange={(e) => handleDisciplineChange(index, 'name', e.target.value)}
                  />
                  <Input
                    placeholder="Href"
                    value={discipline.href}
                    onChange={(e) => handleDisciplineChange(index, 'href', e.target.value)}
                  />
                  <Button type="button" variant="destructive" onClick={() => handleRemoveDiscipline(index)}>Remove</Button>
                </div>
              ))}
              <Button type="button" onClick={handleAddDiscipline} className="mt-2">Add Discipline</Button>
            </div>

            <div>
              <h3 className="text-lg font-medium">Gym Features</h3>
              {gymFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 mt-2">
                  <Input
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                  />
                  <Button type="button" variant="destructive" onClick={() => handleRemoveFeature(index)}>Remove</Button>
                </div>
              ))}
              <Button type="button" onClick={handleAddFeature} className="mt-2">Add Feature</Button>
            </div>
            
            <div>
              <label htmlFor="gymFeaturesDescription" className="block text-sm font-medium">Description</label>
              <Textarea id="gymFeaturesDescription" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
             <div>
              <label htmlFor="gymFeaturesSubtitle" className="block text-sm font-medium">Subtitle</label>
              <Input id="gymFeaturesSubtitle" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
            </div>
            <div className="flex space-x-4">
              <Button type="submit">Save Changes</Button>
              <Link href="/admin/landing-page">
                <Button variant="outline" type="button">Cancel</Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
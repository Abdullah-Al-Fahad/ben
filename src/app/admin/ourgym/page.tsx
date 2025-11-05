
'use client';

import React, { useState, useEffect } from 'react';

import { OurGym } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const OurGymAdminPage = () => {
  const [ourGymData, setOurGymData] = useState<OurGym | null>(null);
  const [formState, setFormState] = useState({ title: '', content: '', imageUrl: '' });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOurGymData = async () => {
      try {
        const response = await fetch('/api/ourgym');
        const data = await response.json();
        if (data) {
          setOurGymData(data);
          setFormState(data);
        }
      } catch (error) {
        console.error('Error fetching Our Gym data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOurGymData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = ourGymData ? 'PATCH' : 'POST';
      const response = await fetch('/api/ourgym', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ourGymData ? { id: ourGymData.id, ...formState } : formState),
      });

      if (!response.ok) {
        throw new Error('Failed to update Our Gym data');
      }

      alert('Our Gym data updated successfully!');
    } catch (error) {
      console.error('Error updating Our Gym data:', error);
      alert('Failed to update Our Gym data.');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Our Gym Page</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <Input
            id="title"
            name="title"
            value={formState.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
          <Textarea
            id="content"
            name="content"
            value={formState.content}
            onChange={handleInputChange}
            rows={10}
          />
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
          <Input
            id="imageUrl"
            name="imageUrl"
            value={formState.imageUrl}
            onChange={handleInputChange}
          />
        </div>
        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  );
};

export default OurGymAdminPage;

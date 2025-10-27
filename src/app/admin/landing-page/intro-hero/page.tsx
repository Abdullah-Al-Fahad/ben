'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EditIntroHeroSectionPage() {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchIntroData = async () => {
      try {
        const response = await fetch('/api/landing-page/intro');
        if (response.ok) {
          const data = await response.json();
          const content = JSON.parse(data.content);
          setTitle(content.title);
          setSubtitle(content.subtitle);
          setDescription(content.description);
        }
      } catch (error) {
        console.error('Failed to fetch intro section data:', error);
      }
    };
    fetchIntroData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/landing-page/intro', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: JSON.stringify({ title, subtitle, description }),
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
          <CardTitle>Edit Intro Landing Hero Section</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="introTitle" className="block text-sm font-medium">Title</label>
              <Input id="introTitle" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
              <label htmlFor="introSubtitle" className="block text-sm font-medium">Subtitle</label>
              <Input id="introSubtitle" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
            </div>
            <div>
              <label htmlFor="introDescription" className="block text-sm font-medium">Description</label>
              <Textarea id="introDescription" value={description} onChange={(e) => setDescription(e.target.value)} />
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
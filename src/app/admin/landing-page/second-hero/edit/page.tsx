
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EditSecondHeroSectionPage() {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchSecondHeroData = async () => {
      try {
        const response = await fetch('/api/landing-page/second-hero');
        if (response.ok) {
          const data = await response.json();
          const content = JSON.parse(data.content);
          setTitle(content.title);
          setSubtitle(content.subtitle);
          setDescription(content.description);
          setImageUrl(content.imageUrl);
        }
      } catch (error) {
        console.error('Failed to fetch second hero section data:', error);
      }
    };
    fetchSecondHeroData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/landing-page/second-hero', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: JSON.stringify({ title, subtitle, description, imageUrl }),
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
          <CardTitle>Edit Second Hero Section</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label htmlFor="secondHeroImageUrl" className="block text-sm font-medium">Image URL</label>
              <Input id="secondHeroImageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
            </div>
            <div>
              <label htmlFor="secondHeroTitle" className="block text-sm font-medium">Title</label>
              <Input id="secondHeroTitle" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
              <label htmlFor="secondHeroSubtitle" className="block text-sm font-medium">Subtitle</label>
              <Input id="secondHeroSubtitle" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
            </div>
            <div>
              <label htmlFor="secondHeroDescription" className="block text-sm font-medium">Description</label>
              <Textarea id="secondHeroDescription" value={description} onChange={(e) => setDescription(e.target.value)} />
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

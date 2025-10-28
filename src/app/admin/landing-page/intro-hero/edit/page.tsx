
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EditIntroHeroSectionPage() {
  const [heroText, setHeroText] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchIntroData = async () => {
      try {
        const response = await fetch('/api/landing-page/intro-hero');
        if (response.ok) {
          const data = await response.json();
          const content = JSON.parse(data.content);
          setHeroText(content.heroText);
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
      const response = await fetch('/api/landing-page/intro-hero', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: JSON.stringify({ heroText }),
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
              <label htmlFor="heroText" className="block text-sm font-medium">Landing Page Hero Text</label>
              <Input id="heroText" value={heroText} onChange={(e) => setHeroText(e.target.value)} />
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

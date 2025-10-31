'use client';

import { toast } from "sonner";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EditIntroHero() {
  const [heroText, setHeroText] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchIntroHero = async () => {
      const res = await fetch('/api/landing-page/intro-hero');
      if (res.ok) {
        const data = await res.json();
        const content = JSON.parse(data.content);
        setHeroText(content.heroText);
        setVideoUrl(content.videoUrl);
      }
    };
    fetchIntroHero();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/landing-page/intro-hero', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ heroText, videoUrl }),
    });

    if (res.ok) {
      toast.success("Intro Hero section updated successfully!");
      router.push('/admin/landing-page');
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Edit Intro Hero</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="heroText" className="block text-sm font-medium">Hero Text</label>
              <Input id="heroText" value={heroText} onChange={(e) => setHeroText(e.target.value)} />
            </div>
            <div>
              <label htmlFor="videoUrl" className="block text-sm font-medium">Video URL</label>
              <Input id="videoUrl" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
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
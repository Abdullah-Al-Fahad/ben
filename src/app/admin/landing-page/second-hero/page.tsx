
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ViewSecondHeroSectionPage() {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

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

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Second Hero Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">

          <div>
            <h3 className="font-semibold">Image URL:</h3>
            <p>{imageUrl}</p>
          </div>
          <div>
            <h3 className="font-semibold">Title:</h3>
            <p>{title}</p>
          </div>
          <div>
            <h3 className="font-semibold">Subtitle:</h3>
            <p>{subtitle}</p>
          </div>
          <div>
            <h3 className="font-semibold">Description:</h3>
            <p>{description}</p>
          </div>
          <Link href="/admin/landing-page/second-hero/edit">
            <Button>Edit</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

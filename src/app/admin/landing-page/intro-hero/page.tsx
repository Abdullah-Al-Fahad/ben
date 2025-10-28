
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ViewIntroHeroSectionPage() {
  const [heroText, setHeroText] = useState('');

  useEffect(() => {
    const fetchIntroData = async () => {
      try {
        const response = await fetch('/api/landing-page/intro');
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

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Intro Landing Hero Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold">Landing Page Hero Text:</h3>
            <p>{heroText}</p>
          </div>
          <Link href="/admin/landing-page/intro-hero/edit">
            <Button>Edit</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface CoachesSectionIntroData {
  title: string;
  introParagraph: string;
  buttonText: string;
}

export default function AdminCoachesSectionIntroPage() {
  const [coachesSectionIntroData, setCoachesSectionIntroData] = useState<CoachesSectionIntroData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchCoachesSectionIntroData() {
      try {
        const res = await fetch('/api/coaches-section-intro');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setCoachesSectionIntroData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCoachesSectionIntroData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCoachesSectionIntroData((prevData) => (prevData ? { ...prevData, [name]: value } : null));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!coachesSectionIntroData) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/coaches-section-intro', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(coachesSectionIntroData),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      alert('Coaches Section Intro data updated successfully!');
      router.push('/admin'); // Redirect back to admin dashboard
    } catch (err: any) {
      setError(err.message);
      alert(`Failed to update Coaches Section Intro data: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="container mx-auto p-4">Loading Coaches Section Intro data...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">Error: {error}</div>;
  }

  if (!coachesSectionIntroData) {
    return <div className="container mx-auto p-4">No Coaches Section Intro data found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Edit Landing Page Coaches Section Introduction</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={coachesSectionIntroData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="introParagraph">Introduction Paragraph</Label>
              <Textarea
                id="introParagraph"
                name="introParagraph"
                value={coachesSectionIntroData.introParagraph}
                onChange={handleChange}
                required
                rows={5}
              />
            </div>
            <div>
              <Label htmlFor="buttonText">Button Text</Label>
              <Input
                id="buttonText"
                name="buttonText"
                value={coachesSectionIntroData.buttonText}
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

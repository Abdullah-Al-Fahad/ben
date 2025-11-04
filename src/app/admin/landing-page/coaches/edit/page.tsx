'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { toast } from "sonner";
import { FaPlus, FaTrash } from 'react-icons/fa';

interface CoachLens {
  id?: string;
  title: string;
  subtitle: string;
}

const AdminCoachesEditPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');
  const [lenses, setLenses] = useState<CoachLens[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/landing-page/coaches');
        const data = await res.json();
        setTitle(data.title);
        setDescription(data.description);
        setBackgroundImage(data.backgroundImage);
        setLenses(data.lenses);
      } catch (err) {
        console.error('Failed to fetch initial data:', err);
        setError('Failed to load data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLensChange = (index: number, field: keyof CoachLens, value: string) => {
    const newLenses = [...lenses];
    newLenses[index] = { ...newLenses[index], [field]: value };
    setLenses(newLenses);
  };

  const handleAddLens = () => {
    setLenses([...lenses, { title: '', subtitle: '' }]);
  };

  const handleRemoveLens = (index: number) => {
    setLenses(lenses.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      await fetch('/api/landing-page/coaches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, backgroundImage, lenses }),
      });

      toast.success('Coaches section updated successfully!');
      router.push('/admin/landing-page');
    } catch (err) {
      console.error('Failed to save data:', err);
      setError('Failed to save data.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="container mx-auto p-8 text-white">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Edit Coaches Section</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <Label htmlFor="title" className="mb-2 block">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="description" className="mb-2 block">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
              />
            </div>
            <div>
              <Label htmlFor="backgroundImage" className="mb-2 block">Background Image URL</Label>
              <Input
                id="backgroundImage"
                value={backgroundImage}
                onChange={(e) => setBackgroundImage(e.target.value)}
              />
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Lenses</h2>
              {lenses.map((lens, index) => (
                <div key={lens.id || index} className="flex space-x-4 mb-4">
                  <Input
                    placeholder="Lens Title"
                    value={lens.title}
                    onChange={(e) => handleLensChange(index, 'title', e.target.value)}
                    className="flex-1"
                  />
                  <Input
                    placeholder="Lens Subtitle"
                    value={lens.subtitle}
                    onChange={(e) => handleLensChange(index, 'subtitle', e.target.value)}
                    className="flex-1"
                  />
                  <Button type="button" variant="destructive" onClick={() => handleRemoveLens(index)}>
                    <FaTrash />
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={handleAddLens}>
                <FaPlus className="mr-2" /> Add Lens
              </Button>
            </div>

            <div className="flex space-x-4">
              <Button type="submit" disabled={saving}>
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
              <Link href="/admin/landing-page">
                <Button variant="outline" type="button">Cancel</Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCoachesEditPage;

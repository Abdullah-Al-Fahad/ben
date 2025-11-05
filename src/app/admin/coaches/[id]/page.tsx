'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Coach {
  id: string;
  name: string;
  specialties: string[];
  imageUrl: string;
  bio: string[];
  achievements: string[];
}

export default function EditCoachPage() {
  const [coach, setCoach] = useState<Coach | null>(null);
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    if (id) {
      const fetchCoach = async () => {
        const res = await fetch(`/api/coaches/${id}`);
        const data = await res.json();
        setCoach(data);
      };
      fetchCoach();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!coach) return;

    await fetch(`/api/coaches/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(coach),
    });

    router.push('/admin/coaches');
  };

  if (!coach) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Edit Coach</h1>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>{coach.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={coach.name} onChange={(e) => setCoach({ ...coach, name: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input id="imageUrl" value={coach.imageUrl} onChange={(e) => setCoach({ ...coach, imageUrl: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" value={(coach.bio ?? []).join('\n')} onChange={(e) => setCoach({ ...coach, bio: e.target.value.split('\n') })} />
            </div>
            <div>
              <Label htmlFor="specialties">Specialties (comma-separated)</Label>
              <Input id="specialties" value={(coach.specialties ?? []).join(',')} onChange={(e) => setCoach({ ...coach, specialties: e.target.value.split(',') })} />
            </div>
            <div>
              <Label htmlFor="achievements">Achievements (comma-separated)</Label>
              <Input id="achievements" value={(coach.achievements ?? []).join(',')} onChange={(e) => setCoach({ ...coach, achievements: e.target.value.split(',') })} />
            </div>
            <Button type="submit">Save Changes</Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}

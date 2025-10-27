
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Coach {
  id: string;
  name: string;
  bio: string;
  image: string;
  slug: string;
}

export default function ManageCoachesPage() {
  const [coaches, setCoaches] = useState<Coach[]>([]);

  useEffect(() => {
    const fetchCoaches = async () => {
      const res = await fetch('/api/coaches');
      const data = await res.json();
      setCoaches(data);
    };
    fetchCoaches();
  }, []);

  const handleDelete = async (id: string) => {
    await fetch(`/api/coaches/${id}`, {
      method: 'DELETE',
    });
    setCoaches(coaches.filter((coach) => coach.id !== id));
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Coaches</h1>
        <Link href="/admin/coaches/add">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Coach
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Coaches</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coaches.map((coach: Coach) => (
              <Card key={coach.id}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>{coach.name}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Link href={`/admin/coaches/${coach.id}`}>
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="destructive" size="icon" onClick={() => handleDelete(coach.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <img src={coach.image} alt={coach.name} className="w-full h-48 object-cover rounded-md mb-4" />
                  <p className="text-sm text-gray-500">{coach.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Value {
  title: string;
  description: string;
}

export default function EditRightForYouSectionPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [values, setValues] = useState<Value[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/landing-page/core-values');
        if (response.ok) {
          const data = await response.json();
          const content = JSON.parse(data.content);
          setTitle(content.title || '');
          setDescription(content.description || '');
          setValues(content.values || []);
        }
      } catch (error) {
        console.error('Failed to fetch section data:', error);
      }
    };
    fetchData();
  }, []);

  const handleValueChange = (index: number, field: keyof Value, value: string) => {
    const newValues = [...values];
    newValues[index][field] = value;
    setValues(newValues);
  };

  const handleAddValue = () => {
    setValues([...values, { title: '', description: '' }]);
  };

  const handleRemoveValue = (index: number) => {
    const newValues = values.filter((_, i) => i !== index);
    setValues(newValues);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/landing-page/core-values', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: JSON.stringify({ title, description, values }),
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
          <CardTitle>Edit Are we right for you section</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="rightForYouTitle" className="block text-sm font-medium">Title</label>
              <Input id="rightForYouTitle" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
              <label htmlFor="rightForYouDescription" className="block text-sm font-medium">Description</label>
              <Textarea id="rightForYouDescription" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
              <h3 className="text-lg font-medium">Value Blocks</h3>
              {values.map((value, index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  <Input
                    placeholder="Title"
                    value={value.title}
                    onChange={(e) => handleValueChange(index, 'title', e.target.value)}
                  />
                  <Textarea
                    placeholder="Description"
                    value={value.description}
                    onChange={(e) => handleValueChange(index, 'description', e.target.value)}
                  />
                   <Button type="button" variant="destructive" onClick={() => handleRemoveValue(index)}>Remove</Button>
                </div>
              ))}
               <Button type="button" onClick={handleAddValue} className="mt-2">Add Value</Button>
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
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FaPlus, FaTrash } from 'react-icons/fa';

interface Value {
  heading: string;
  description: string;
}

interface CoreValuesSectionData {
  title: string;
  introParagraph: string;
  values: Value[];
}

export default function AdminCoreValuesSectionPage() {
  const [coreValuesSectionData, setCoreValuesSectionData] = useState<CoreValuesSectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchCoreValuesSectionData() {
      try {
        const res = await fetch('/api/core-values-section');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setCoreValuesSectionData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCoreValuesSectionData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCoreValuesSectionData((prevData) => (prevData ? { ...prevData, [name]: value } : null));
  };

  const handleValueChange = (index: number, field: keyof Value, value: string) => {
    setCoreValuesSectionData((prevData) => {
      if (!prevData) return null;
      const newValues = [...prevData.values];
      newValues[index] = { ...newValues[index], [field]: value };
      return { ...prevData, values: newValues };
    });
  };

  const addValue = () => {
    setCoreValuesSectionData((prevData) => {
      if (!prevData) return null;
      return { ...prevData, values: [...prevData.values, { heading: '', description: '' }] };
    });
  };

  const removeValue = (index: number) => {
    setCoreValuesSectionData((prevData) => {
      if (!prevData) return null;
      const newValues = prevData.values.filter((_, i) => i !== index);
      return { ...prevData, values: newValues };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!coreValuesSectionData) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/core-values-section', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(coreValuesSectionData),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      alert('Core Values Section data updated successfully!');
      router.push('/admin'); // Redirect back to admin dashboard
    } catch (err: any) {
      setError(err.message);
      alert(`Failed to update Core Values Section data: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="container mx-auto p-4">Loading Core Values Section data...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">Error: {error}</div>;
  }

  if (!coreValuesSectionData) {
    return <div className="container mx-auto p-4">No Core Values Section data found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Edit Landing Page Core Values Section</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={coreValuesSectionData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="introParagraph">Introduction Paragraph</Label>
              <Textarea
                id="introParagraph"
                name="introParagraph"
                value={coreValuesSectionData.introParagraph}
                onChange={handleChange}
                required
                rows={5}
              />
            </div>

            <h3 className="text-lg font-semibold mt-8">Core Values</h3>
            {coreValuesSectionData.values.map((value, index) => (
              <div key={index} className="flex items-end gap-4 border p-4 rounded-md">
                <div className="flex-grow space-y-2">
                  <div>
                    <Label htmlFor={`value-heading-${index}`}>Heading</Label>
                    <Input
                      id={`value-heading-${index}`}
                      name="heading"
                      value={value.heading}
                      onChange={(e) => handleValueChange(index, 'heading', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor={`value-description-${index}`}>Description</Label>
                    <Textarea
                      id={`value-description-${index}`}
                      name="description"
                      value={value.description}
                      onChange={(e) => handleValueChange(index, 'description', e.target.value)}
                      required
                      rows={3}
                    />
                  </div>
                </div>
                <Button type="button" variant="destructive" onClick={() => removeValue(index)}>
                  <FaTrash />
                </Button>
              </div>
            ))}
            <Button type="button" onClick={addValue} className="flex items-center gap-2">
              <FaPlus /> Add Value
            </Button>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

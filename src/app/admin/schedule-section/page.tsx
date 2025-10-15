'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FaPlus, FaTrash } from 'react-icons/fa';

interface ScheduleSectionData {
  title: string;
  buttonText: string;
  filterButtons: string[];
  dateRange: string;
}

export default function AdminScheduleSectionPage() {
  const [scheduleSectionData, setScheduleSectionData] = useState<ScheduleSectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchScheduleSectionData() {
      try {
        const res = await fetch('/api/schedule-section');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setScheduleSectionData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchScheduleSectionData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setScheduleSectionData((prevData) => (prevData ? { ...prevData, [name]: value } : null));
  };

  const handleFilterButtonChange = (index: number, value: string) => {
    setScheduleSectionData((prevData) => {
      if (!prevData) return null;
      const newFilterButtons = [...prevData.filterButtons];
      newFilterButtons[index] = value;
      return { ...prevData, filterButtons: newFilterButtons };
    });
  };

  const addFilterButton = () => {
    setScheduleSectionData((prevData) => {
      if (!prevData) return null;
      return { ...prevData, filterButtons: [...prevData.filterButtons, ''] };
    });
  };

  const removeFilterButton = (index: number) => {
    setScheduleSectionData((prevData) => {
      if (!prevData) return null;
      const newFilterButtons = prevData.filterButtons.filter((_, i) => i !== index);
      return { ...prevData, filterButtons: newFilterButtons };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!scheduleSectionData) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/schedule-section', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scheduleSectionData),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      alert('Schedule Section data updated successfully!');
      router.push('/admin'); // Redirect back to admin dashboard
    } catch (err: any) {
      setError(err.message);
      alert(`Failed to update Schedule Section data: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="container mx-auto p-4">Loading Schedule Section data...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">Error: {error}</div>;
  }

  if (!scheduleSectionData) {
    return <div className="container mx-auto p-4">No Schedule Section data found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Edit Landing Page Schedule Section</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={scheduleSectionData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="buttonText">Button Text</Label>
              <Input
                id="buttonText"
                name="buttonText"
                value={scheduleSectionData.buttonText}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="dateRange">Date Range</Label>
              <Input
                id="dateRange"
                name="dateRange"
                value={scheduleSectionData.dateRange}
                onChange={handleChange}
                required
              />
            </div>

            <h3 className="text-lg font-semibold mt-8">Filter Buttons</h3>
            {scheduleSectionData.filterButtons.map((button, index) => (
              <div key={index} className="flex items-end gap-4 border p-4 rounded-md">
                <div className="flex-grow space-y-2">
                  <div>
                    <Label htmlFor={`filter-button-${index}`}>Button Text</Label>
                    <Input
                      id={`filter-button-${index}`}
                      name="filterButton"
                      value={button}
                      onChange={(e) => handleFilterButtonChange(index, e.target.value)}
                      required
                    />
                  </div>
                </div>
                <Button type="button" variant="destructive" onClick={() => removeFilterButton(index)}>
                  <FaTrash />
                </Button>
              </div>
            ))}
            <Button type="button" onClick={addFilterButton} className="flex items-center gap-2">
              <FaPlus /> Add Filter Button
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

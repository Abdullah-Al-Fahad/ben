'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FaPlus, FaTrash } from 'react-icons/fa';

interface Feature {
  value: string;
  label: string;
}

interface GymFeaturesSectionData {
  features: Feature[];
}

export default function AdminGymFeaturesSectionPage() {
  const [gymFeaturesSectionData, setGymFeaturesSectionData] = useState<GymFeaturesSectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchGymFeaturesSectionData() {
      try {
        const res = await fetch('/api/gym-features-section');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setGymFeaturesSectionData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchGymFeaturesSectionData();
  }, []);

  const handleFeatureChange = (index: number, field: keyof Feature, value: string) => {
    setGymFeaturesSectionData((prevData) => {
      if (!prevData) return null;
      const newFeatures = [...prevData.features];
      newFeatures[index] = { ...newFeatures[index], [field]: value };
      return { ...prevData, features: newFeatures };
    });
  };

  const addFeature = () => {
    setGymFeaturesSectionData((prevData) => {
      if (!prevData) return null;
      return { ...prevData, features: [...prevData.features, { value: '', label: '' }] };
    });
  };

  const removeFeature = (index: number) => {
    setGymFeaturesSectionData((prevData) => {
      if (!prevData) return null;
      const newFeatures = prevData.features.filter((_, i) => i !== index);
      return { ...prevData, features: newFeatures };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gymFeaturesSectionData) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/gym-features-section', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gymFeaturesSectionData),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      alert('Gym Features Section data updated successfully!');
      router.push('/admin'); // Redirect back to admin dashboard
    } catch (err: any) {
      setError(err.message);
      alert(`Failed to update Gym Features Section data: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="container mx-auto p-4">Loading Gym Features Section data...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">Error: {error}</div>;
  }

  if (!gymFeaturesSectionData) {
    return <div className="container mx-auto p-4">No Gym Features Section data found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Edit Landing Page Gym Features Section</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {gymFeaturesSectionData.features.map((feature, index) => (
              <div key={index} className="flex items-end gap-4 border p-4 rounded-md">
                <div className="flex-grow space-y-2">
                  <div>
                    <Label htmlFor={`feature-value-${index}`}>Value</Label>
                    <Input
                      id={`feature-value-${index}`}
                      name="value"
                      value={feature.value}
                      onChange={(e) => handleFeatureChange(index, 'value', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor={`feature-label-${index}`}>Label</Label>
                    <Input
                      id={`feature-label-${index}`}
                      name="label"
                      value={feature.label}
                      onChange={(e) => handleFeatureChange(index, 'label', e.target.value)}
                      required
                    />
                  </div>
                </div>
                <Button type="button" variant="destructive" onClick={() => removeFeature(index)}>
                  <FaTrash />
                </Button>
              </div>
            ))}
            <Button type="button" onClick={addFeature} className="flex items-center gap-2">
              <FaPlus /> Add Feature
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

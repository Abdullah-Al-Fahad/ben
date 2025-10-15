'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FaPlus, FaTrash } from 'react-icons/fa';

interface PricingSectionData {
  title: string;
  adultsTitle: string;
  kidsTitle: string;
  disclaimers: string[];
}

export default function AdminPricingSectionPage() {
  const [pricingSectionData, setPricingSectionData] = useState<PricingSectionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchPricingSectionData() {
      try {
        const res = await fetch('/api/pricing-section');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setPricingSectionData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPricingSectionData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPricingSectionData((prevData) => (prevData ? { ...prevData, [name]: value } : null));
  };

  const handleDisclaimerChange = (index: number, value: string) => {
    setPricingSectionData((prevData) => {
      if (!prevData) return null;
      const newDisclaimers = [...prevData.disclaimers];
      newDisclaimers[index] = value;
      return { ...prevData, disclaimers: newDisclaimers };
    });
  };

  const addDisclaimer = () => {
    setPricingSectionData((prevData) => {
      if (!prevData) return null;
      return { ...prevData, disclaimers: [...prevData.disclaimers, ''] };
    });
  };

  const removeDisclaimer = (index: number) => {
    setPricingSectionData((prevData) => {
      if (!prevData) return null;
      const newDisclaimers = prevData.disclaimers.filter((_, i) => i !== index);
      return { ...prevData, disclaimers: newDisclaimers };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pricingSectionData) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/pricing-section', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pricingSectionData),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      alert('Pricing Section data updated successfully!');
      router.push('/admin'); // Redirect back to admin dashboard
    } catch (err: any) {
      setError(err.message);
      alert(`Failed to update Pricing Section data: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="container mx-auto p-4">Loading Pricing Section data...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">Error: {error}</div>;
  }

  if (!pricingSectionData) {
    return <div className="container mx-auto p-4">No Pricing Section data found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Edit Landing Page Pricing Section</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={pricingSectionData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="adultsTitle">Adults Section Title</Label>
              <Input
                id="adultsTitle"
                name="adultsTitle"
                value={pricingSectionData.adultsTitle}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="kidsTitle">Kids Section Title</Label>
              <Input
                id="kidsTitle"
                name="kidsTitle"
                value={pricingSectionData.kidsTitle}
                onChange={handleChange}
                required
              />
            </div>

            <h3 className="text-lg font-semibold mt-8">Disclaimers</h3>
            {pricingSectionData.disclaimers.map((disclaimer, index) => (
              <div key={index} className="flex items-end gap-4 border p-4 rounded-md">
                <div className="flex-grow space-y-2">
                  <div>
                    <Label htmlFor={`disclaimer-${index}`}>Disclaimer Text</Label>
                    <Textarea
                      id={`disclaimer-${index}`}
                      name="disclaimer"
                      value={disclaimer}
                      onChange={(e) => handleDisclaimerChange(index, e.target.value)}
                      required
                      rows={3}
                    />
                  </div>
                </div>
                <Button type="button" variant="destructive" onClick={() => removeDisclaimer(index)}>
                  <FaTrash />
                </Button>
              </div>
            ))}
            <Button type="button" onClick={addDisclaimer} className="flex items-center gap-2">
              <FaPlus /> Add Disclaimer
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

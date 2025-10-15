'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MembershipPage } from '../../../lib/types';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  backgroundImageUrl: z.string().url({ message: 'Must be a valid URL.' }),
  mainHeadline: z.string().min(1, { message: 'Main headline is required.' }),
  subHeadline: z.string().min(1, { message: 'Sub-headline is required.' }),
});

type PricingHeroFormValues = z.infer<typeof formSchema>;

export default function PricingHeroSectionPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [membershipPage, setMembershipPage] = useState<MembershipPage | null>(null);

  const form = useForm<PricingHeroFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      backgroundImageUrl: '',
      mainHeadline: '',
      subHeadline: '',
    },
  });

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch('/api/pricing-hero-section');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: PricingHeroFormValues = await response.json();
        form.reset(data);
      } catch (e: any) {
        setError(e.message);
      }
    };

    const fetchMembershipPage = async () => {
      try {
        const response = await fetch('/api/membership-page');
        if (!response.ok) {
          throw new Error('Failed to fetch membership page data');
        }
        const data: MembershipPage = await response.json();
        setMembershipPage(data);
      } catch (error) {
        console.error(error);
      }
    };

    Promise.all([fetchHeroData(), fetchMembershipPage()]).finally(() => setLoading(false));
  }, [form]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    
    setMembershipPage(prev => {
      if (!prev) return null;

      const updated = { ...prev };
      let current: any = updated;

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;

      return updated;
    });
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setMembershipPage(prev => {
        if (!prev) return null;
        return {
            ...prev,
            importantNotes: {
                ...prev.importantNotes,
                notes: value.split('\n')
            }
        };
    });
};

  const onSubmit = async (values: PricingHeroFormValues) => {
    try {
      const response = await fetch('/api/pricing-hero-section', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (membershipPage) {
        const membershipResponse = await fetch('/api/membership-page', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(membershipPage),
        });

        if (!membershipResponse.ok) {
          throw new Error('Failed to update membership page data');
        }
      }

      alert('Pricing Hero Section updated successfully!');
    } catch (error: any) {
      alert(`Error updating pricing hero section: ${error.message}`);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">Edit Pricing Hero Section</CardTitle>
          <CardDescription>Manage the background image and headlines for the pricing page.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="backgroundImageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Background Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/hero.jpg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mainHeadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Main Headline</FormLabel>
                    <FormControl>
                      <Input placeholder="Flexible Pricing" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subHeadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sub-Headline</FormLabel>
                    <FormControl>
                      <Input placeholder="Find a plan that fits your goals..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {membershipPage && (
                <>
                  <div>
                    <label htmlFor="freeTrial.title" className="block text-sm font-medium mb-1">Free Trial Title</label>
                    <Input
                      type="text"
                      id="freeTrial.title"
                      name="freeTrial.title"
                      value={membershipPage.freeTrial.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="freeTrial.description" className="block text-sm font-medium mb-1">Free Trial Description</label>
                    <Textarea
                      id="freeTrial.description"
                      name="freeTrial.description"
                      value={membershipPage.freeTrial.description}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>
                  <div>
                    <label htmlFor="freeTrial.buttonText" className="block text-sm font-medium mb-1">Free Trial Button Text</label>
                    <Input
                      type="text"
                      id="freeTrial.buttonText"
                      name="freeTrial.buttonText"
                      value={membershipPage.freeTrial.buttonText}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="importantNotes.title" className="block text-sm font-medium mb-1">Important Notes Title</label>
                    <Input
                      type="text"
                      id="importantNotes.title"
                      name="importantNotes.title"
                      value={membershipPage.importantNotes.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="importantNotes.notes" className="block text-sm font-medium mb-1">Important Notes (one per line)</label>
                    <Textarea
                      id="importantNotes.notes"
                      name="importantNotes.notes"
                      value={membershipPage.importantNotes.notes.join('\n')}
                      onChange={handleNotesChange}
                      rows={5}
                    />
                  </div>

                  <div>
                    <label htmlFor="inquiryForm.title" className="block text-sm font-medium mb-1">Inquiry Form Title</label>
                    <Input
                      type="text"
                      id="inquiryForm.title"
                      name="inquiryForm.title"
                      value={membershipPage.inquiryForm.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="inquiryForm.description" className="block text-sm font-medium mb-1">Inquiry Form Description</label>
                    <Textarea
                      id="inquiryForm.description"
                      name="inquiryForm.description"
                      value={membershipPage.inquiryForm.description}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>
                </>
              )}

              <Button type="submit">Save Changes</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  backgroundImageUrl: z.string().url({ message: 'Must be a valid URL.' }),
  mainHeadline: z.string().min(1, { message: 'Main headline is required.' }),
  subHeadline: z.string().min(1, { message: 'Sub-headline is required.' }),
});

type ScheduleHeroFormValues = z.infer<typeof formSchema>;

export default function ScheduleHeroSectionPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ScheduleHeroFormValues>({
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
        const response = await fetch('/api/schedule-hero-section');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ScheduleHeroFormValues = await response.json();
        form.reset(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHeroData();
  }, [form]);

  const onSubmit = async (values: ScheduleHeroFormValues) => {
    try {
      const response = await fetch('/api/schedule-hero-section', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert('Schedule Hero Section updated successfully!');
    } catch (error: any) {
      alert(`Error updating schedule hero section: ${error.message}`);
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
          <CardTitle className="text-3xl">Edit Schedule Hero Section</CardTitle>
          <CardDescription>Manage the background image and headlines for the schedule page.</CardDescription>
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
                      <Input placeholder="Our Class Schedule" {...field} />
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
                      <Input placeholder="Plan your training week..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Save Changes</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

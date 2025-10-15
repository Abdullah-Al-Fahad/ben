'use client';

import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Trash2, Save, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const formSchema = z.object({
  heroTitle: z.string().min(2, { message: 'Hero title must be at least 2 characters.' }),
  heroSlides: z.array(
    z.object({
      id: z.number(),
      url: z.string().url({ message: 'Please enter a valid URL.' }),
      title: z.string().min(2, { message: 'Title must be at least 2 characters.' }),
      subtitle: z.string().min(2, { message: 'Subtitle must be at least 2 characters.' }),
    })
  ),
});

export default function AdminSettingsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      heroTitle: '',
      heroSlides: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'heroSlides',
  });

  useEffect(() => {
    const fetchSettings = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/settings');
        const data = await response.json();
        form.reset(data);
      } catch (error) {
        console.error('Failed to fetch settings:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, [form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        alert('Settings saved successfully!');
      } else {
        alert('Failed to save settings.');
        console.error('Failed to save settings');
      }
    } catch (error) {
      alert('An error occurred while saving settings.');
      console.error('An error occurred:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-12 w-12 animate-spin text-purple-400" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-10"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 text-white rounded-xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Website Settings</CardTitle>
              <CardDescription className="text-gray-300 mt-1">
                Configure various settings for your website.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="p-6 border border-white/10 rounded-lg">
                    <FormField
                        control={form.control}
                        name="heroTitle"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-xl font-semibold">Hero Title</FormLabel>
                            <FormControl>
                            <Input placeholder="Welcome to our Gym!" {...field} className="bg-gray-800 border-gray-700 text-base mt-2" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>

                <div>
                    <h3 className="text-2xl font-bold mb-4">Hero Slides</h3>
                    <div className="space-y-6">
                        {fields.map((field, index) => (
                        <motion.div
                            key={field.id}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="p-6 bg-gray-800/50 border border-white/10 rounded-lg shadow-md"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField control={form.control} name={`heroSlides.${index}.url`} render={({ field: slideField }) => (
                                <FormItem className="md:col-span-2"><FormLabel>Image URL</FormLabel><FormControl><Input placeholder="https://example.com/slide.jpg" {...slideField} className="bg-gray-700 border-gray-600" /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name={`heroSlides.${index}.title`} render={({ field: slideField }) => (
                                <FormItem><FormLabel>Title</FormLabel><FormControl><Input placeholder="Slide Title" {...slideField} className="bg-gray-700 border-gray-600" /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name={`heroSlides.${index}.subtitle`} render={({ field: slideField }) => (
                                <FormItem><FormLabel>Subtitle</FormLabel><FormControl><Input placeholder="Slide Subtitle" {...slideField} className="bg-gray-700 border-gray-600" /></FormControl><FormMessage /></FormItem>
                            )} />
                            </div>
                            <div className="flex justify-end mt-6">
                            <Button type="button" variant="destructive" onClick={() => remove(index)} className="bg-red-600/80 border-red-500 hover:bg-red-500">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Remove Slide
                            </Button>
                            </div>
                        </motion.div>
                        ))}
                    </div>
                    <Button
                        type="button"
                        onClick={() => {
                        const currentSlides = form.getValues('heroSlides');
                        const maxId = currentSlides.reduce((max, slide) => Math.max(max, slide.id), 0);
                        append({ id: maxId + 1, url: '', title: '', subtitle: '' });
                        }}
                        className="mt-6 bg-transparent border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
                    >
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Slide
                    </Button>
                </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting} size="lg" className="bg-purple-600 hover:bg-purple-700 transition-all duration-200">
              {isSubmitting ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
              ) : (
                <><Save className="mr-2 h-4 w-4" /> Save Settings</>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
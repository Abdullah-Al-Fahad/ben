'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { PricingTier, PricingSection } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Trash2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Plan name must be at least 2 characters.' }),
  price: z.string().min(1, { message: 'Price is required.' }),
  sectionId: z.string({ required_error: 'Please select a section.' }),
  newSectionTitle: z.string().optional(),
  period: z.string().optional(),
  description: z.string().optional(),
  features: z.array(z.string().min(2, { message: 'Feature must be at least 2 characters.' })).min(1, { message: 'At least one feature is required.' }),
  isFeatured: z.boolean().optional(),
});

interface PricingFormProps {
  pricing?: { tier: PricingTier, section: { id: string, title: string } } | null;
  pricingSections: PricingSection[];
  onClose: () => void;
}

export function PricingForm({ pricing, pricingSections, onClose }: PricingFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: pricing
      ? { ...pricing.tier, sectionId: pricing.section.id }
      : { name: '', price: '', period: '', description: '', features: [''], isFeatured: false, sectionId: '' },
  });

  const { fields, append, remove } = useFieldArray({ control: form.control, name: "features" });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    const method = pricing ? 'PUT' : 'POST';
    const id = pricing ? pricing.tier.id : values.name.toLowerCase().replace(/\s+/g, '-');
    const url = pricing ? `/api/pricing/${pricing.tier.id}` : '/api/pricing';
    
    let body: any;
    if (method === 'POST') {
        const tier = { ...values, id };
        delete tier.sectionId;
        delete tier.newSectionTitle;
        body = {
            sectionId: values.sectionId,
            newSectionTitle: values.newSectionTitle,
            tier
        }
    } else {
        body = { ...values, id };
    }

    try {
      const response = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (response.ok) { onClose(); router.refresh(); } else { console.error('Failed to save pricing plan'); }
    } catch (error) { console.error('An error occurred:', error); } finally { setIsSubmitting(false); }
  };

  const sectionId = form.watch('sectionId');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem><FormLabel>Plan Name</FormLabel><FormControl><Input placeholder="Basic Plan" {...field} className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700" /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="price" render={({ field }) => (
                <FormItem><FormLabel>Price</FormLabel><FormControl><Input type="text" placeholder="$9.99" {...field} className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700" /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="sectionId" render={({ field }) => (
                <FormItem>
                    <FormLabel>Section</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a section" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {pricingSections.map(section => (
                                <SelectItem key={section.id} value={section.id}>{section.title}</SelectItem>
                            ))}
                            <SelectItem value="new-section">Create new section...</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )} />
            {sectionId === 'new-section' && (
                <FormField control={form.control} name="newSectionTitle" render={({ field }) => (
                    <FormItem><FormLabel>New Section Title</FormLabel><FormControl><Input placeholder="e.g., Family Plans" {...field} className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700" /></FormControl><FormMessage /></FormItem>
                )} />
            )}
            <FormField control={form.control} name="period" render={({ field }) => (
                <FormItem className="md:col-span-2"><FormLabel>Period</FormLabel><FormControl><Input placeholder="/ month for 6 months" {...field} className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700" /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem className="md:col-span-2"><FormLabel>Description</FormLabel><FormControl><Input placeholder="Dynamic. Versatile. Empowering." {...field} className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700" /></FormControl><FormMessage /></FormItem>
            )} />
        </div>

        <FormField
          control={form.control}
          name="isFeatured"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border border-gray-200 dark:border-white/20 p-4 bg-gray-50 dark:bg-gray-800/50">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="data-[state=checked]:bg-purple-600 data-[state=checked]:text-white border-gray-300 dark:border-gray-600"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Featured Plan</FormLabel>
                <FormDescription className="text-gray-600 dark:text-gray-400">
                  Mark this plan as featured on the pricing page.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="features"
          render={() => (
            <FormItem className="p-4 border border-gray-200 dark:border-white/10 rounded-lg">
              <FormLabel className="text-lg font-semibold">Features</FormLabel>
              <div className="space-y-2 mt-2">
                {fields.map((item, index) => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <FormControl>
                      <Input
                        placeholder="Feature description"
                        {...form.register(`features.${index}`)}
                        className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-md w-full"
                      />
                    </FormControl>
                    <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button type="button" variant="outline" onClick={() => append('')} className="mt-2 bg-transparent border-purple-500 text-purple-500 dark:text-purple-400 hover:bg-purple-500 hover:text-white">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Feature
              </Button>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4 pt-4">
          <Button type="button" variant="ghost" onClick={onClose} className="text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} className="bg-purple-600 text-white hover:bg-purple-700 transition-all duration-200">
            {isSubmitting ? 'Saving...' : 'Save Plan'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
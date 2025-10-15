'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { PlusCircle, Trash2 } from 'lucide-react';
import { IconPicker } from '@/components/IconPicker';
import { Program } from '@/lib/types';

const programSchema = z.object({
  name: z.string().min(1, { message: 'Program name is required.' }),
  subtitle: z.string().min(1, { message: 'Subtitle is required.' }),
  imageUrl: z.string().url({ message: 'Must be a valid URL.' }),
  description: z.string().min(1, { message: 'Description is required.' }),
  keyFocus: z.array(z.string().min(1, { message: 'Key focus cannot be empty.' })).min(1, { message: 'At least one key focus is required.' }),
  suitability: z.string().min(1, { message: 'Suitability is required.' }),
  tagline: z.string().min(1, { message: 'Tagline is required.' }),
  detailedDescription: z.string().min(1, { message: 'Detailed description is required.' }),
  keyTechniques: z.array(z.object({
    icon: z.string().min(1, { message: 'Icon name is required.' }),
    description: z.string().min(1, { message: 'Technique description is required.' }),
  })).min(1, { message: 'At least one key technique is required.' }),
  schedule: z.array(z.object({
    day: z.string().min(1, { message: 'Day is required.' }),
    time: z.string().min(1, { message: 'Time is required.' }),
    class: z.string().min(1, { message: 'Class name is required.' }),
  })).min(1, { message: 'At least one schedule item is required.' }),
  gear: z.array(z.string().min(1, { message: 'Gear item cannot be empty.' })).min(1, { message: 'At least one gear item is required.' }),
  testimonial: z.object({
    quote: z.string().min(1, { message: 'Testimonial quote is required.' }),
    author: z.string().min(1, { message: 'Testimonial author is required.' }),
  }),
});

interface ProgramFormProps {
  program?: Program | null;
  onClose: () => void;
}

export function ProgramForm({ program, onClose }: ProgramFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<Program>({
    resolver: zodResolver(programSchema),
    defaultValues: program || { name: '', subtitle: '', imageUrl: '', description: '', keyFocus: [''], suitability: '', tagline: '', detailedDescription: '', keyTechniques: [{ icon: '', description: '' }], schedule: [{ day: '', time: '', class: '' }], gear: [''], testimonial: { quote: '', author: '' } },
  });

  useEffect(() => { if (program) { form.reset(program); } }, [program, form]);

  const { fields: keyFocusFields, append: appendKeyFocus, remove: removeKeyFocus } = useFieldArray({ control: form.control, name: 'keyFocus' });
  const { fields: keyTechniquesFields, append: appendKeyTechnique, remove: removeKeyTechnique } = useFieldArray({ control: form.control, name: 'keyTechniques' });
  const { fields: scheduleFields, append: appendSchedule, remove: removeSchedule } = useFieldArray({ control: form.control, name: 'schedule' });
  const { fields: gearFields, append: appendGear, remove: removeGear } = useFieldArray({ control: form.control, name: 'gear' });

  const onSubmit = async (values: z.infer<typeof programSchema>) => {
    setIsSubmitting(true);
    const method = program ? 'PUT' : 'POST';
    const url = program ? `/api/programs/${program.id}` : '/api/programs';
    try {
      const response = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) });
      if (response.ok) { router.refresh(); onClose(); } else { console.error('Failed to save program'); }
    } catch (error) { console.error('An error occurred:', error); } finally { setIsSubmitting(false); }
  };

  const renderFieldArray = (label: string, fields: any[], remove: (index: number) => void, append: (value: any) => void, placeholder: string) => (
    <FormField
      control={form.control}
      name={label.toLowerCase().replace(/\s/g, '') as any}
      render={() => (
        <FormItem className="p-4 border border-gray-200 dark:border-white/10 rounded-lg">
          <FormLabel className="text-lg font-semibold text-gray-800 dark:text-white">{label}</FormLabel>
          <div className="space-y-2 mt-2">
            {fields.map((item, index) => (
              <div key={item.id} className="flex items-center space-x-2">
                <FormControl>
                  <Input
                    placeholder={placeholder}
                    {...form.register(`${label.toLowerCase().replace(/\s/g, '')}.${index}` as any)}
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
            <PlusCircle className="mr-2 h-4 w-4" /> Add {label.slice(0, -1)}
          </Button>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem><FormLabel>Program Name</FormLabel><FormControl><Input placeholder="Strength Training" {...field} className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700" /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="subtitle" render={({ field }) => (
            <FormItem><FormLabel>Subtitle</FormLabel><FormControl><Input placeholder="Forge Raw Power" {...field} className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700" /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="imageUrl" render={({ field }) => (
            <FormItem className="md:col-span-2"><FormLabel>Image URL</FormLabel><FormControl><Input placeholder="https://example.com/image.jpg" {...field} className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700" /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="description" render={({ field }) => (
            <FormItem className="md:col-span-2"><FormLabel>Short Description</FormLabel><FormControl><Textarea placeholder="A brief overview of the program" {...field} className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700" /></FormControl><FormMessage /></FormItem>
          )} />
           <FormField control={form.control} name="suitability" render={({ field }) => (
            <FormItem><FormLabel>Suitability</FormLabel><FormControl><Input placeholder="Beginner to Advanced" {...field} className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700" /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="tagline" render={({ field }) => (
            <FormItem><FormLabel>Tagline</FormLabel><FormControl><Input placeholder="The Art of Dominance" {...field} className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700" /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="detailedDescription" render={({ field }) => (
            <FormItem className="md:col-span-2"><FormLabel>Detailed Description</FormLabel><FormControl><Textarea placeholder="A comprehensive description..." {...field} className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700" /></FormControl><FormMessage /></FormItem>
          )} />
        </div>

        <div className="space-y-4">
          {renderFieldArray('Key Focus', keyFocusFields, removeKeyFocus, appendKeyFocus, 'Key Focus Area')}
          {renderFieldArray('Gear', gearFields, removeGear, appendGear, 'Required Gear')}
        </div>

        <FormField
          control={form.control}
          name="keyTechniques"
          render={() => (
            <FormItem className="p-4 border border-gray-200 dark:border-white/10 rounded-lg">
              <FormLabel className="text-lg font-semibold text-gray-800 dark:text-white">Key Techniques</FormLabel>
              <div className="space-y-3 mt-2">
                {keyTechniquesFields.map((item, index) => (
                  <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 p-3 bg-gray-100 dark:bg-gray-800/50 rounded-md">
                    <div className="w-full sm:w-1/3">
                      <FormControl>
                        <IconPicker
                          value={form.watch(`keyTechniques.${index}.icon`)}
                          onChange={(iconName) => form.setValue(`keyTechniques.${index}.icon`, iconName, { shouldValidate: true })}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 dark:text-red-400 text-xs mt-1">{form.formState.errors.keyTechniques?.[index]?.icon?.message}</FormMessage>
                    </div>
                    <div className="w-full sm:w-2/3 flex items-center space-x-2">
                      <FormControl>
                        <Input
                          {...form.register(`keyTechniques.${index}.description`)}
                          placeholder="Technique description"
                          className="flex-grow bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                        />
                      </FormControl>
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeKeyTechnique(index)} className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <FormMessage className="text-red-500 dark:text-red-400 text-xs mt-1 sm:hidden">{form.formState.errors.keyTechniques?.[index]?.description?.message}</FormMessage>
                  </div>
                ))}
              </div>
              <Button type="button" variant="outline" onClick={() => appendKeyTechnique({ icon: '', description: '' })} className="mt-3 bg-transparent border-purple-500 text-purple-500 dark:text-purple-400 hover:bg-purple-500 hover:text-white">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Key Technique
              </Button>
              <FormMessage className="text-red-500 dark:text-red-400 mt-2" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="schedule"
          render={() => (
            <FormItem className="p-4 border border-gray-200 dark:border-white/10 rounded-lg">
              <FormLabel className="text-lg font-semibold text-gray-800 dark:text-white">Schedule</FormLabel>
              <div className="space-y-3 mt-2">
                {scheduleFields.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-center p-3 bg-gray-100 dark:bg-gray-800/50 rounded-md">
                    <FormControl><Input placeholder="Day" {...form.register(`schedule.${index}.day`)} className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600" /></FormControl>
                    <FormControl><Input placeholder="Time" {...form.register(`schedule.${index}.time`)} className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600" /></FormControl>
                    <FormControl><Input placeholder="Class" {...form.register(`schedule.${index}.class`)} className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 sm:col-span-2" /></FormControl>
                     <Button type="button" variant="ghost" size="icon" onClick={() => removeSchedule(index)} className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-500 sm:col-start-5">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                  </div>
                ))}
              </div>
              <Button type="button" variant="outline" onClick={() => appendSchedule({ day: '', time: '', class: '' })} className="mt-3 bg-transparent border-purple-500 text-purple-500 dark:text-purple-400 hover:bg-purple-500 hover:text-white">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Schedule Item
              </Button>
              <FormMessage className="text-red-500 dark:text-red-400 mt-2" />
            </FormItem>
          )}
        />

        <div className="p-4 border border-gray-200 dark:border-white/10 rounded-lg">
            <FormLabel className="text-lg font-semibold text-gray-800 dark:text-white">Testimonial</FormLabel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                <FormField control={form.control} name="testimonial.quote" render={({ field }) => (
                    <FormItem><FormLabel>Quote</FormLabel><FormControl><Textarea placeholder='"Best program ever!"' {...field} className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="testimonial.author" render={({ field }) => (
                    <FormItem><FormLabel>Author</FormLabel><FormControl><Input placeholder="John D." {...field} className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700" /></FormControl><FormMessage /></FormItem>
                )} />
            </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <Button type="button" variant="ghost" onClick={onClose} className="text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} className="bg-purple-600 text-white hover:bg-purple-700 transition-all duration-200">
            {isSubmitting ? 'Saving...' : 'Save Program'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

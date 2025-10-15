'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Coach } from '@/lib/types';
import { IconPicker } from '@/components/IconPicker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Trash2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  title: z.string().min(2, { message: 'Title must be at least 2 characters.' }),
  imageUrl: z.string().url({ message: 'Please enter a valid URL.' }),
  videoUrl: z.string().url({ message: 'Please enter a valid URL.' }).optional(),
  bio: z.string().min(10, { message: 'Bio must be at least 10 characters.' }),
  philosophy: z.string().min(10, { message: 'Philosophy must be at least 10 characters.' }),
  disciplines: z.array(z.string().min(2, { message: 'Discipline must be at least 2 characters.' })).min(1, { message: 'At least one discipline is required.' }),
  specializations: z.array(z.string().min(2, { message: 'Specialization must be at least 2 characters.' })).min(1, { message: 'At least one specialization is required.' }),
  certifications: z.array(z.string().min(2, { message: 'Certification must be at least 2 characters.' })).min(1, { message: 'At least one certification is required.' }),
  achievements: z.array(
    z.object({
      icon: z.string().min(1, { message: 'Icon is required.' }),
      text: z.string().min(2, { message: 'Achievement text is required.' }),
    })
  ).min(1, { message: 'At least one achievement is required.' }),
  gallery: z.array(z.string().url({ message: 'Please enter a valid URL.' })).min(1, { message: 'At least one gallery video URL is required.' }),
});

interface CoachFormProps {
  coach?: Coach | null;
  onClose: () => void;
}

export function CoachForm({ coach, onClose }: CoachFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', title: '', imageUrl: '', videoUrl: '', bio: '', philosophy: '', disciplines: [''], specializations: [''], certifications: [''], achievements: [{ icon: '', text: '' }], gallery: [''] },
  });

  useEffect(() => {
    if (coach) {
      form.reset({ ...coach, disciplines: coach.disciplines || [''], specializations: coach.specializations || [''], certifications: coach.certifications || [''], gallery: coach.gallery || [''] });
    } else {
      form.reset({ name: '', title: '', imageUrl: '', videoUrl: '', bio: '', philosophy: '', disciplines: [''], specializations: [''], certifications: [''], achievements: [{ icon: '', text: '' }], gallery: ['https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'] });
    }
  }, [coach, form]);

  const { fields: disciplineFields, append: appendDiscipline, remove: removeDiscipline } = useFieldArray({ control: form.control, name: 'disciplines' });
  const { fields: specializationFields, append: appendSpecialization, remove: removeSpecialization } = useFieldArray({ control: form.control, name: 'specializations' });
  const { fields: certificationFields, append: appendCertification, remove: removeCertification } = useFieldArray({ control: form.control, name: 'certifications' });
  const { fields: achievementFields, append: appendAchievement, remove: removeAchievement } = useFieldArray({ control: form.control, name: 'achievements' });
  const { fields: galleryFields, append: appendGallery, remove: removeGallery } = useFieldArray({ control: form.control, name: 'gallery' });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    const method = coach ? 'PUT' : 'POST';
    const url = coach ? `/api/coaches/${coach.id}` : '/api/coaches';
    try {
      const response = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) });
      if (response.ok) { router.refresh(); onClose(); } else { console.error('Failed to save coach'); }
    } catch (error) { console.error('An error occurred:', error); } finally { setIsSubmitting(false); }
  };

  const renderFieldArray = (label: string, fields: any[], remove: (index: number) => void, append: (value: any) => void, placeholder: string) => (
    <FormField
      control={form.control}
      name={label.toLowerCase().replace(' ', '') as any}
      render={() => (
        <FormItem className="p-4 border border-gray-200 dark:border-white/10 rounded-lg">
          <FormLabel className="text-lg font-semibold text-gray-800 dark:text-white">{label}</FormLabel>
          <div className="space-y-2 mt-2">
            {fields.map((item, index) => (
              <div key={item.id} className="flex items-center space-x-2">
                <FormControl>
                  <Input
                    placeholder={placeholder}
                    {...form.register(`${label.toLowerCase().replace(' ', '')}.${index}` as any)}
                    className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white rounded-md w-full"
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
            <FormItem><FormLabel>Name</FormLabel><FormControl><Input placeholder="Coach Name" {...field} className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700" /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="title" render={({ field }) => (
            <FormItem><FormLabel>Title</FormLabel><FormControl><Input placeholder="Coach Title" {...field} className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700" /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="imageUrl" render={({ field }) => (
            <FormItem className="md:col-span-2"><FormLabel>Image URL</FormLabel><FormControl><Input placeholder="https://example.com/image.jpg" {...field} className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700" /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="videoUrl" render={({ field }) => (
            <FormItem className="md:col-span-2"><FormLabel>Video URL</FormLabel><FormControl><Input placeholder="https://example.com/video.mp4" {...field} className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700" /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="bio" render={({ field }) => (
            <FormItem className="md:col-span-2"><FormLabel>Bio</FormLabel><FormControl><Textarea placeholder="Tell us about the coach..." {...field} className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700" /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="philosophy" render={({ field }) => (
            <FormItem className="md:col-span-2"><FormLabel>Philosophy</FormLabel><FormControl><Textarea placeholder="Coach's philosophy..." {...field} className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700" /></FormControl><FormMessage /></FormItem>
          )} />
        </div>

        <div className="space-y-4">
          {renderFieldArray('Disciplines', disciplineFields, removeDiscipline, appendDiscipline, 'Discipline')}
          {renderFieldArray('Specializations', specializationFields, removeSpecialization, appendSpecialization, 'Specialization')}
          {renderFieldArray('Certifications', certificationFields, removeCertification, appendCertification, 'Certification')}
          {renderFieldArray('Gallery', galleryFields, removeGallery, appendGallery, 'Video URL')}
        </div>

        <FormField
          control={form.control}
          name="achievements"
          render={() => (
            <FormItem className="p-4 border border-gray-200 dark:border-white/10 rounded-lg">
              <FormLabel className="text-lg font-semibold text-gray-800 dark:text-white">Achievements</FormLabel>
              <div className="space-y-3 mt-2">
                {achievementFields.map((item, index) => (
                  <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 p-3 bg-gray-100 dark:bg-gray-800/50 rounded-md">
                    <div className="w-full sm:w-1/3">
                      <FormControl>
                        <IconPicker
                          value={form.watch(`achievements.${index}.icon`)}
                          onChange={(iconName) => form.setValue(`achievements.${index}.icon`, iconName, { shouldValidate: true })}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 dark:text-red-400 text-xs mt-1">{form.formState.errors.achievements?.[index]?.icon?.message}</FormMessage>
                    </div>
                    <div className="w-full sm:w-2/3 flex items-center space-x-2">
                      <FormControl>
                        <Input
                          {...form.register(`achievements.${index}.text`)}
                          placeholder="Achievement description"
                          className="flex-grow bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                        />
                      </FormControl>
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeAchievement(index)} className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <FormMessage className="text-red-500 dark:text-red-400 text-xs mt-1 sm:hidden">{form.formState.errors.achievements?.[index]?.text?.message}</FormMessage>
                  </div>
                ))}
              </div>
              <Button type="button" variant="outline" onClick={() => appendAchievement({ icon: '', text: '' })} className="mt-3 bg-transparent border-purple-500 text-purple-500 dark:text-purple-400 hover:bg-purple-500 hover:text-white">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Achievement
              </Button>
              <FormMessage className="text-red-500 dark:text-red-400 mt-2" />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4 pt-4">
          <Button type="button" variant="ghost" onClick={onClose} className="text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} className="bg-purple-600 text-white hover:bg-purple-700 transition-all duration-200">
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

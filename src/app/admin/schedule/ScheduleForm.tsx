'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Schedule, Coach } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formSchema = z.object({
  datetime: z.string().min(1, { message: 'Please select a date and time.' }),
  discipline: z.string().min(2, { message: 'Discipline must be at least 2 characters.' }),
  coachId: z.string().min(1, { message: 'Please select a coach.' }),
  duration: z.string().min(2, { message: 'Duration must be at least 2 characters.' }),
});

interface ScheduleFormProps {
  schedule?: Schedule | null;
  onClose: () => void;
}

export function ScheduleForm({ schedule, onClose }: ScheduleFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    schedule ? new Date(schedule.datetime) : new Date()
  );
  const [time, setTime] = useState(schedule ? format(new Date(schedule.datetime), 'HH:mm') : '10:00');

  useEffect(() => {
    const fetchCoaches = async () => {
      const response = await fetch('/api/coaches');
      const data = await response.json();
      setCoaches(data);
    };
    fetchCoaches();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { datetime: schedule ? schedule.datetime : '', discipline: schedule ? schedule.discipline : '', coachId: schedule ? schedule.coachId : '', duration: schedule ? schedule.duration : '' },
  });

  useEffect(() => {
    if (selectedDate) {
      const [hours, minutes] = time.split(':');
      const newDate = new Date(selectedDate);
      newDate.setHours(parseInt(hours, 10));
      newDate.setMinutes(parseInt(minutes, 10));
      form.setValue('datetime', newDate.toISOString());
    }
  }, [selectedDate, time, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    const method = schedule ? 'PUT' : 'POST';
    const url = schedule ? `/api/schedule/${schedule.id}` : '/api/schedule';
    try {
      const response = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) });
      if (response.ok) { onClose(); router.refresh(); } else { console.error('Failed to save schedule'); }
    } catch (error) { console.error('An error occurred:', error); } finally { setIsSubmitting(false); }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-1">
        <FormField
          control={form.control}
          name="datetime"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-2">
              <FormLabel>Date and Time</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full justify-start text-left font-normal bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                      {field.value ? format(new Date(field.value), 'PPP HH:mm') : <span>Pick a date</span>}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                    className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white rounded-md"
                    classNames={{
                        day_selected: '!bg-purple-600 !text-white',
                        day_today: 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white',
                    }}
                  />
                  <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                    <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700" />
                  </div>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField control={form.control} name="discipline" render={({ field }) => (
            <FormItem><FormLabel>Discipline</FormLabel><FormControl><Input placeholder="Yoga Basics" {...field} className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700" /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="coachId" render={({ field }) => (
            <FormItem>
              <FormLabel>Coach</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700">
                    <SelectValue placeholder="Select a coach" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white">
                  {coaches.map((coach) => (
                    <SelectItem key={coach.id} value={coach.id} className="cursor-pointer hover:!bg-gray-100 dark:hover:!bg-gray-700">{coach.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
        )} />
        <FormField control={form.control} name="duration" render={({ field }) => (
            <FormItem><FormLabel>Duration</FormLabel><FormControl><Input placeholder="60 min" {...field} className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700" /></FormControl><FormMessage /></FormItem>
        )} />
        <div className="flex justify-end space-x-4 pt-4">
          <Button type="button" variant="ghost" onClick={onClose} className="text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} className="bg-purple-600 text-white hover:bg-purple-700 transition-all duration-200">
            {isSubmitting ? 'Saving...' : 'Save Schedule'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

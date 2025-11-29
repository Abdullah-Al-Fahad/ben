'use client';
import { parse, format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function EditSchedulePage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [day, setDay] = useState('');
  const [time, setTime] = useState('');
  const [level, setLevel] = useState('');
  const [classTypeId, setClassTypeId] = useState('');
  const [classTypes, setClassTypes] = useState([]);

  useEffect(() => {
    const fetchClassTypes = async () => {
      const res = await fetch('/api/class-types');
      const data = await res.json();
      setClassTypes(data);
    };
    fetchClassTypes();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchSchedule = async () => {
        const res = await fetch(`/api/schedule/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch schedule');
        }
        const data = await res.json();
        setDay(data.day);
        const parsedTime = parse(data.time, 'hh:mm a', new Date());
        const time24 = format(parsedTime, 'HH:mm');
        setTime(time24);
        setLevel(data.level);
        setClassTypeId(data.classTypeId);
      };
      fetchSchedule();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsedTime = parse(time, 'HH:mm', new Date());
    const time12 = format(parsedTime, 'hh:mm a');
    await fetch(`/api/schedule/${id}`,
     {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ day, time: time12, level, classTypeId }),
    });
    router.push('/admin/schedule');
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Edit Event</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <Label htmlFor="day">Day</Label>
                <Select onValueChange={setDay} value={day}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a day" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Monday">Monday</SelectItem>
                    <SelectItem value="Tuesday">Tuesday</SelectItem>
                    <SelectItem value="Wednesday">Wednesday</SelectItem>
                    <SelectItem value="Thursday">Thursday</SelectItem>
                    <SelectItem value="Friday">Friday</SelectItem>
                    <SelectItem value="Saturday">Saturday</SelectItem>
                    <SelectItem value="Sunday">Sunday</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="classType">Class Type</Label>
                <Select onValueChange={setClassTypeId} value={classTypeId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a class type" />
                  </SelectTrigger>
                  <SelectContent>
                    {classTypes.map((classType: any) => (
                      <SelectItem key={classType.id} value={classType.id}>
                        {classType.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="level">Level</Label>
                <Input id="level" value={level} onChange={(e) => setLevel(e.target.value)} />
              </div>
              <Button type="submit">Update Event</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
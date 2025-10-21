
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function AddCoachPage() {
  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle>Add New Coach</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
              <Input id="name" />
            </div>
            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Slug</label>
              <Input id="slug" />
            </div>
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image URL</label>
              <Input id="imageUrl" />
            </div>
            <div>
              <label htmlFor="specialties" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Specialties (comma-separated)</label>
              <Input id="specialties" />
            </div>
            <div>
              <label htmlFor="achievements" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Achievements (one per line)</label>
              <Textarea id="achievements" />
            </div>
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bio (one paragraph per line)</label>
              <Textarea id="bio" />
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <Button type="submit">Add Coach</Button>
              <Link href="/admin/coaches">
                <Button variant="outline">Cancel</Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function AddKidsPlanPage() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Add Kids Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
              <Input id="title" />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price</label>
              <Input id="price" />
            </div>
            <div>
              <label htmlFor="term" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Term</label>
              <Input id="term" />
            </div>
            <div>
              <label htmlFor="monthly" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Monthly</label>
              <Input id="monthly" />
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <Button type="submit">Add Plan</Button>
              <Link href="/admin/pricing">
                <Button variant="outline">Cancel</Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

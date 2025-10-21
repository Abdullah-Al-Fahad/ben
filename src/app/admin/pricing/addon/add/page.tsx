
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';

export default function AddAddOnPlanPage() {
  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle>Add Add-On Plan</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <form className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
              <Input id="title" />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
              <Textarea id="description" />
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
              <label htmlFor="note" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Note</label>
              <Input id="note" />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="moreInfo" />
              <label htmlFor="moreInfo" className="text-sm font-medium text-gray-700 dark:text-gray-300">More Info</label>
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

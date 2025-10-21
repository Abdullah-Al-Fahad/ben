'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function AddProgramPage() {
  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle>Add New Program</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <form className="space-y-6">
            <div>
              <label htmlFor="heroImageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Hero Image URL</label>
              <Input id="heroImageUrl" />
            </div>
            <div>
              <label htmlFor="heroTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Hero Title</label>
              <Input id="heroTitle" />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
              <Textarea id="description" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Subsections</h3>
              <div className="space-y-4 mt-2">
                <div>
                  <label htmlFor="streetTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Street Title</label>
                  <Input id="streetTitle" />
                  <label htmlFor="streetDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">Street Description</label>
                  <Textarea id="streetDescription" />
                </div>
                <div>
                  <label htmlFor="sportTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sport Title</label>
                  <Input id="sportTitle" />
                  <label htmlFor="sportDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">Sport Description</label>
                  <Textarea id="sportDescription" />
                </div>
                <div>
                  <label htmlFor="artTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Art Title</label>
                  <Input id="artTitle" />
                  <label htmlFor="artDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">Art Description</label>
                  <Textarea id="artDescription" />
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <Button type="submit">Add Program</Button>
              <Link href="/admin/programs">
                <Button variant="outline">Cancel</Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
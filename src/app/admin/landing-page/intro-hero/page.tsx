
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function EditIntroHeroSectionPage() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Edit Intro Landing Hero Section</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div>
              <label htmlFor="introTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
              <Input id="introTitle" defaultValue="Train like a Champion" />
            </div>
            <div>
              <label htmlFor="introVideoUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Video URL</label>
              <Input id="introVideoUrl" defaultValue="https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0ef4/68e43e0279ad2b357d6c0f43_homepageclipwarrior-transcode.mp4" />
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <Button type="submit">Save Changes</Button>
              <Link href="/admin/landing-page">
                <Button variant="outline">Cancel</Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

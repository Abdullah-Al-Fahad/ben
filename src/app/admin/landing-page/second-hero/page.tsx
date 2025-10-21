
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function EditSecondHeroSectionPage() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Edit Second Hero Section</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div>
              <label htmlFor="secondHeroImageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image URL</label>
              <Input id="secondHeroImageUrl" defaultValue="https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0ef4/68e95350c431166c54c51460_warrior_01.jpg" />
            </div>
            <div>
              <label htmlFor="secondHeroTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
              <Textarea id="secondHeroTitle" defaultValue="Join our world class mma training programs for all levels - from beginners to pros." />
            </div>
            <div>
              <label htmlFor="secondHeroDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
              <Textarea id="secondHeroDescription" defaultValue="Our gym has had both a local and a national presence since its founding in 2011, however its roots go much deeper. Our Team has been training and competing across the world in multiple combat sports to bring you the best instruction available. We are athletes, hobbyists, competitors, students and professionals. We strive to learn and grow while pushing others around us to do the same. We are people who always are working to improve ourselves and our community." />
            </div>
            <div>
              <label htmlFor="secondHeroSubtitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subtitle</label>
              <Input id="secondHeroSubtitle" defaultValue="We are a family, and we are a team." />
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

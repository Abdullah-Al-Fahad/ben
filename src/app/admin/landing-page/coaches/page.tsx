'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function EditCoachesSectionPage() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Edit Coaches Section</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div>
              <label htmlFor="coachesTitle" className="block text-sm font-medium">Title</label>
              <Input id="coachesTitle" defaultValue="Our Coaches" />
            </div>
            <div>
              <label htmlFor="coachesDescription" className="block text-sm font-medium">Description</label>
              <Textarea id="coachesDescription" defaultValue="With years of experience both in coaching and competing, you will not find a more well rounded and professional coaching team to help you achieve your goals.
Our coaching is rooted in purpose and clarity: to help students reach personal and professional goals through structured, meaningful training. We focus on developing a conceptual framework for understanding physical conflict—skills that extend beyond the mat into real life.
We teach and train through three interconnected lenses. This multi-faceted approach lets us coach with intention and adaptability, honoring the individual journey of each student." />
            </div>
            <div>
              <label htmlFor="coachesImageUrl" className="block text-sm font-medium">Background Image URL</label>
              <Input id="coachesImageUrl" defaultValue="https://cdn.prod.website-files.com/68e43e0279ad2b357d6c0ef4/68e43e0279ad2b357d6c0f26_67f85e7e1dfe540942d24018_489283717_1143059611166111_4972771042462498311_n.jpg" />
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

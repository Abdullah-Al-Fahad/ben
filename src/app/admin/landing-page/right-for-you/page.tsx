'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function EditRightForYouSectionPage() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Edit Are we right for you section</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div>
              <label htmlFor="rightForYouTitle" className="block text-sm font-medium">Title</label>
              <Input id="rightForYouTitle" defaultValue="Are We Right For You" />
            </div>
            <div>
              <label htmlFor="rightForYouDescription" className="block text-sm font-medium">Description</label>
              <Textarea id="rightForYouDescription" defaultValue="At Warrior, we recognize that every student walks through our doors with a unique set of goals, motivations, and reasons for training. Some come to compete, some to get in shape, some for self-defense, and others to find structure or community. We believe wholeheartedly that these goals don’t need to be the same for us to support one another. In fact, it’s the diversity of those goals—and the shared commitment to growth—that makes our community strong.
We approach training with a mindset rooted in collaboration, not transaction. It’s not about what you get in return—it’s about how we all grow stronger by investing in each other. When one person levels up, we all benefit. When one person struggles, we all step in." />
            </div>
            <div>
              <h3 className="text-lg font-medium">Value Blocks</h3>
              <div className="space-y-2 mt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Input defaultValue="Realism" />
                  <Textarea defaultValue="We train for real life. The foundation of our practice is self-defense and practical application—not gamesmanship." />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Input defaultValue="Growth Mindset" />
                  <Textarea defaultValue="We believe that who you are today doesn’t define who you can become." />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Input defaultValue="Respect" />
                  <Textarea defaultValue="Even when it’s not obvious, respect is always present." />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Input defaultValue="Safety" />
                  <Textarea defaultValue="Training is only sustainable when we take care of each other." />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Input defaultValue="Diversity" />
                  <Textarea defaultValue="We embrace different styles, and perspectives." />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Input defaultValue="Cohesion" />
                  <Textarea defaultValue="We are individuals, but we train as one team." />
                </div>
              </div>
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

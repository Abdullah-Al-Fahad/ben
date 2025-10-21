
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function EditVideoSectionPage() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Edit Third Only Video Section</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div>
              <label htmlFor="thirdVideoUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Video URL</label>
              <Input id="thirdVideoUrl" defaultValue="https://www.dropbox.com/scl/fi/vcz6n8i01h3p43md584pn/Copy-of-promo-vid-horizontal-3.mp4?rlkey=nx9t0luzuk9x86sgwbkks3sk1&raw=1" />
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

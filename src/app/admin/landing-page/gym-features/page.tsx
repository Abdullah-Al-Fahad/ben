'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function EditGymFeaturesSectionPage() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Edit GYM FEATURES section</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">

            <div>
              <h3 className="text-lg font-medium">Gym Features</h3>
              <div className="space-y-2 mt-2">
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <Input defaultValue="Access to Open Gym" />
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <Input defaultValue="Recovery and Wellness Facilities" />
                </div>
                 <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <Input defaultValue="Open 6 Days / Week" />
                </div>
                 <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <Input defaultValue="12 Trainers" />
                </div>
                 <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <Input defaultValue="23 World Medals" />
                </div>
                 <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <Input defaultValue="1478 Happy Clients" />
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="gymFeaturesDescription" className="block text-sm font-medium">Description</label>
              <Textarea id="gymFeaturesDescription" defaultValue="We are students, athletes, and builders of our team. Warrior Fitness Center is home to a diverse and dedicated community united by our shared pursuit of growth through martial arts. Our training blends Brazillian Jiu-Jitsu, Muay Thai, Wrestling, Judo, and MMA to foster personal development, confidence, and discipline in an atmosphere that feels like family.\nOur coaching staff reflects the diversity of our community, each bringing a wealth of experience from different walks of life. This variety isn’t just a point of pride; it’s a strength that enriches our students’ learning. With coaches who’ve lived through high-level competition, military service, and personal transformation, we offer perspectives that go beyond the technical and into the mental, emotional, and strategic dimensions of martial arts.\nWhether you’re just starting your journey or looking to sharpen your edge, you’ll find guidance, accountability, and support here. We are a team that trains, learns, and grows together—while pushing each other toward the next accomplishment in life." />
            </div>
             <div>
              <label htmlFor="gymFeaturesSubtitle" className="block text-sm font-medium">Subtitle</label>
              <Input id="gymFeaturesSubtitle" defaultValue="We are a family, and we are a team." />
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

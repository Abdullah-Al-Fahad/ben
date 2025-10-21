
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { kidsPlans } from '@/lib/pricingData';
import { KidsPlan } from '@/lib/types';

export default function EditKidsPlanPage() {
  const params = useParams();
  const { id } = params;
  const [plan, setPlan] = useState<KidsPlan | null>(null);

  useEffect(() => {
    if (id) {
      const planData = kidsPlans[parseInt(id as string)];
      setPlan(planData || null);
    }
  }, [id]);

  if (!plan) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Edit Kids Plan: {plan.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
              <Input id="title" defaultValue={plan.title} />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price</label>
              <Input id="price" defaultValue={plan.price} />
            </div>
            <div>
              <label htmlFor="term" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Term</label>
              <Input id="term" defaultValue={plan.term} />
            </div>
            <div>
              <label htmlFor="monthly" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Monthly</label>
              <Input id="monthly" defaultValue={plan.monthly} />
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { adultPlans } from '@/lib/pricingData';
import { AdultPlan } from '@/lib/types';
import { Checkbox } from '@/components/ui/checkbox';

export default function EditAdultPlanPage() {
  const params = useParams();
  const { id } = params;
  const [plan, setPlan] = useState<AdultPlan | null>(null);

  useEffect(() => {
    if (id) {
      const planData = adultPlans[parseInt(id as string)];
      setPlan(planData || null);
    }
  }, [id]);

  if (!plan) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle>Edit Adult Plan: {plan.title}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <form className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
              <Input id="title" defaultValue={plan.title} />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
              <Textarea id="description" defaultValue={plan.description} />
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
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Features</label>
              <div className="space-y-2 mt-2">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                    <Checkbox id={`feature-${index}`} defaultChecked={feature.included} />
                    <Input defaultValue={feature.text} />
                  </div>
                ))}
              </div>
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

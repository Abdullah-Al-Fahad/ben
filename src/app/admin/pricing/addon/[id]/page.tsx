
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { addOnPlans } from '@/lib/pricingData';
import { AddOnPlan } from '@/lib/types';
import { Checkbox } from '@/components/ui/checkbox';

export default function EditAddOnPlanPage() {
  const params = useParams();
  const { id } = params;
  const [plan, setPlan] = useState<AddOnPlan | null>(null);

  useEffect(() => {
    if (id) {
      const planData = addOnPlans[parseInt(id as string)];
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
          <CardTitle>Edit Add-On Plan: {plan.title}</CardTitle>
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
              <label htmlFor="note" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Note</label>
              <Input id="note" defaultValue={plan.note} />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="moreInfo" defaultChecked={plan.moreInfo} />
              <label htmlFor="moreInfo" className="text-sm font-medium text-gray-700 dark:text-gray-300">More Info</label>
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

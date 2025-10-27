'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Pricing {
  id: string;
  name: string;
  price: number;
  features: string;
  type: string;
}

export default function ManagePricingPage() {
  const [pricing, setPricing] = useState<Pricing[]>([]);

  useEffect(() => {
    const fetchPricing = async () => {
      const res = await fetch('/api/pricing');
      const data = await res.json();
      setPricing(data);
    };
    fetchPricing();
  }, []);

  const handleDelete = async (id: string) => {
    await fetch(`/api/pricing/${id}`, {
      method: 'DELETE',
    });
    setPricing(pricing.filter((p) => p.id !== id));
  };

  const adultPlans = pricing.filter((p) => p.type === 'adult');
  const addOnPlans = pricing.filter((p) => p.type === 'addon');
  const kidsPlans = pricing.filter((p) => p.type === 'kids');

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Pricing</h1>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <Link href="/admin/pricing/adult/add">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Adult Plan
            </Button>
          </Link>
          <Link href="/admin/pricing/addon/add">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Add-on Plan
            </Button>
          </Link>
          <Link href="/admin/pricing/kids/add">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Kids Plan
            </Button>
          </Link>
        </div>
      </div>

      <div className="space-y-8">
        {/* Adult Plans Card */}
        <Card>
          <CardHeader>
            <CardTitle>Adult Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table className="min-w-full table-fixed">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40%]">Title</TableHead>
                    <TableHead className="w-[20%]">Price</TableHead>
                    <TableHead className="w-[15%]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {adultPlans.map((plan: Pricing) => (
                    <TableRow key={plan.id}>
                      <TableCell>{plan.name}</TableCell>
                      <TableCell>{plan.price}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                            <Link href={`/admin/pricing/adult/${plan.id}`}>
                                <Button variant="outline" size="icon">
                                    <Edit className="h-4 w-4" />
                                </Button>
                            </Link>
                            <Button variant="destructive" size="icon" onClick={() => handleDelete(plan.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Add-On Plans Card */}
        <Card>
          <CardHeader>
            <CardTitle>Add-On Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table className="min-w-full table-fixed">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40%]">Title</TableHead>
                    <TableHead className="w-[20%]">Price</TableHead>
                    <TableHead className="w-[15%]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {addOnPlans.map((plan: Pricing) => (
                    <TableRow key={plan.id}>
                      <TableCell>{plan.name}</TableCell>
                      <TableCell>{plan.price}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                            <Link href={`/admin/pricing/addon/${plan.id}`}>
                                <Button variant="outline" size="icon">
                                    <Edit className="h-4 w-4" />
                                </Button>
                            </Link>
                            <Button variant="destructive" size="icon" onClick={() => handleDelete(plan.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Kids Plans Card */}
        <Card>
          <CardHeader>
            <CardTitle>Kids Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table className="min-w-full table-fixed">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40%]">Title</TableHead>
                    <TableHead className="w-[20%]">Price</TableHead>
                    <TableHead className="w-[15%]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {kidsPlans.map((plan: Pricing) => (
                    <TableRow key={plan.id}>
                      <TableCell>{plan.name}</TableCell>
                      <TableCell>{plan.price}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                            <Link href={`/admin/pricing/kids/${plan.id}`}>
                                <Button variant="outline" size="icon">
                                    <Edit className="h-4 w-4" />
                                </Button>
                            </Link>
                            <Button variant="destructive" size="icon" onClick={() => handleDelete(plan.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
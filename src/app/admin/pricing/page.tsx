'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { adultPlans, addOnPlans, kidsPlans } from '@/lib/pricingData';
import { AdultPlan, AddOnPlan, KidsPlan } from '@/lib/types';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function ManagePricingPage() {
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
              {/* MODIFICATION: Added table-fixed */}
              <Table className="min-w-full table-fixed">
                <TableHeader>
                  <TableRow>
                    {/* MODIFICATION: Added width classes */}
                    <TableHead className="w-[40%]">Title</TableHead>
                    <TableHead className="w-[20%]">Price</TableHead>
                    <TableHead className="w-[25%]">Term</TableHead>
                    <TableHead className="w-[15%]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {adultPlans.map((plan: AdultPlan, index) => (
                    <TableRow key={index} className="flex flex-col sm:table-row border-b sm:border-none">
                      <TableCell className="sm:hidden font-bold">Title:</TableCell>
                      <TableCell className="sm:table-cell">{plan.title}</TableCell>
                      <TableCell className="sm:hidden font-bold">Price:</TableCell>
                      <TableCell className="sm:table-cell">{plan.price}</TableCell>
                      <TableCell className="sm:hidden font-bold">Term:</TableCell>
                      <TableCell className="sm:table-cell">{plan.term}</TableCell>
                      <TableCell className="sm:hidden font-bold">Actions:</TableCell>
                      <TableCell className="sm:table-cell">
                        <div className="flex items-center space-x-2">
                            <Link href={`/admin/pricing/adult/${index}`}>
                                <Button variant="outline" size="icon">
                                    <Edit className="h-4 w-4" />
                                </Button>
                            </Link>
                            <Button variant="destructive" size="icon">
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
               {/* MODIFICATION: Added table-fixed */}
              <Table className="min-w-full table-fixed">
                <TableHeader>
                  <TableRow>
                    {/* MODIFICATION: Added width classes */}
                    <TableHead className="w-[40%]">Title</TableHead>
                    <TableHead className="w-[20%]">Price</TableHead>
                    <TableHead className="w-[25%]">Term</TableHead>
                    <TableHead className="w-[15%]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {addOnPlans.map((plan: AddOnPlan, index) => (
                    <TableRow key={index} className="flex flex-col sm:table-row border-b sm:border-none">
                      <TableCell className="sm:hidden font-bold">Title:</TableCell>
                      <TableCell className="sm:table-cell">{plan.title}</TableCell>
                      <TableCell className="sm:hidden font-bold">Price:</TableCell>
                      <TableCell className="sm:table-cell">{plan.price}</TableCell>
                      <TableCell className="sm:hidden font-bold">Term:</TableCell>
                      <TableCell className="sm:table-cell">{plan.term}</TableCell>
                      <TableCell className="sm:hidden font-bold">Actions:</TableCell>
                      <TableCell className="sm:table-cell">
                        <div className="flex items-center space-x-2">
                            <Link href={`/admin/pricing/addon/${index}`}>
                                <Button variant="outline" size="icon">
                                    <Edit className="h-4 w-4" />
                                </Button>
                            </Link>
                            <Button variant="destructive" size="icon">
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
               {/* MODIFICATION: Added table-fixed */}
              <Table className="min-w-full table-fixed">
                <TableHeader>
                  <TableRow>
                    {/* MODIFICATION: Added width classes */}
                    <TableHead className="w-[40%]">Title</TableHead>
                    <TableHead className="w-[20%]">Price</TableHead>
                    <TableHead className="w-[25%]">Term</TableHead>
                    <TableHead className="w-[15%]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {kidsPlans.map((plan: KidsPlan, index) => (
                    <TableRow key={index} className="flex flex-col sm:table-row border-b sm:border-none">
                      <TableCell className="sm:hidden font-bold">Title:</TableCell>
                      <TableCell className="sm:table-cell">{plan.title}</TableCell>
                      <TableCell className="sm:hidden font-bold">Price:</TableCell>
                      <TableCell className="sm:table-cell">{plan.price}</TableCell>
                      <TableCell className="sm:hidden font-bold">Term:</TableCell>
                      <TableCell className="sm:table-cell">{plan.term}</TableCell>
                      <TableCell className="sm:hidden font-bold">Actions:</TableCell>
                      <TableCell className="sm:table-cell">
                        <div className="flex items-center space-x-2">
                            <Link href={`/admin/pricing/kids/${index}`}>
                                <Button variant="outline" size="icon">
                                    <Edit className="h-4 w-4" />
                                </Button>
                            </Link>
                            <Button variant="destructive" size="icon">
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
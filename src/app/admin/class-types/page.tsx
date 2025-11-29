'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ClassTypesPage() {
  const [classTypes, setClassTypes] = useState([]);

  useEffect(() => {
    const fetchClassTypes = async () => {
      const res = await fetch('/api/class-types');
      const data = await res.json();
      setClassTypes(data);
    };
    fetchClassTypes();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Class Types</CardTitle>
          <Button asChild>
            <Link href="/admin/class-types/add">Add New</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Age Group</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classTypes.map((classType: any) => (
                <TableRow key={classType.id}>
                  <TableCell>{classType.name}</TableCell>
                  <TableCell>{classType.ageGroup}</TableCell>
                  <TableCell>{classType.category}</TableCell>
                  <TableCell>
                    <Button asChild variant="outline">
                      <Link href={`/admin/class-types/edit/${classType.id}`}>Edit</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

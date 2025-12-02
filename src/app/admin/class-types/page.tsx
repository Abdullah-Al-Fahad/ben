'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';

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

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/class-types/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setClassTypes(classTypes.filter((classType: any) => classType.id !== id));
    } else {
      console.error('Failed to delete class type');
    }
  };

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
                  <TableCell className="flex space-x-2">
                    <Button asChild variant="outline">
                      <Link href={`/admin/class-types/edit/${classType.id}`}>Edit</Link>
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="destructive">Delete</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you absolutely sure?</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently delete the class type and remove its data from our servers.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button variant="destructive" onClick={() => handleDelete(classType.id)}>Continue</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
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

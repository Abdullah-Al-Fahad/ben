'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Pencil } from "lucide-react";
import { motion } from 'framer-motion';

export default function UserProfile() {
  return (
    <motion.div 
      className="container mx-auto py-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-2xl mx-auto bg-white/30 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-lg shadow-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-900 dark:text-white">
            Edit Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center mb-6 relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>BL</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-1/2 translate-x-[40px] bg-white rounded-full p-2 border-2 border-gray-300 dark:border-gray-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <Camera className="text-gray-600 dark:text-gray-300 h-6 w-6" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <div className="relative">
                <Input 
                  id="name" 
                  defaultValue="Bradley" 
                  className="bg-white/50 dark:bg-white/10 border-gray-300 dark:border-white/20" 
                />
                <Pencil className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="surname">Surname</Label>
              <div className="relative">
                <Input 
                  id="surname" 
                  defaultValue="Lawlor" 
                  className="bg-white/50 dark:bg-white/10 border-gray-300 dark:border-white/20" 
                />
                <Pencil className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer" />
              </div>
            </div>
          </div>

          <div className="space-y-6 pt-6 border-t border-gray-200 dark:border-white/10">
            <h2 className="text-xl font-semibold text-center text-gray-900 dark:text-white">
              Password and Security
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type="password"
                    defaultValue="John123#$8"
                    className="bg-white/50 dark:bg-white/10 border-gray-300 dark:border-white/20"
                  />
                  <Pencil className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type="password"
                    defaultValue="John123#$8"
                    className="bg-white/50 dark:bg-white/10 border-gray-300 dark:border-white/20"
                  />
                  <Pencil className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type="password"
                    defaultValue="John123#$8"
                    className="bg-white/50 dark:bg-white/10 border-gray-300 dark:border-white/20"
                  />
                  <Pencil className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Button className="w-full bg-purple-600 text-white hover:bg-purple-700 transition-all duration-300 transform hover:scale-105">
              Update Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
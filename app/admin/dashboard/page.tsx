"use client";

import type React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Building2,
  Calendar,
  Flag,
  UserCheck,
  Clock,
  AlertTriangle,
  Trophy,
  Star,
  Activity,
  ArrowUp,
  ArrowDown,
  Upload,
  ImageIcon,
  CheckCircle,
  Info,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Mock data for club leaderboard
const clubLeaderboard = [
  {
    id: 1,
    name: "Coding Club",
    avatar: "C",
    rating: 4.9,
    activityPoints: 1250,
    members: 78,
    trend: "up",
    category: "Technology",
  },
  {
    id: 2,
    name: "Debate Society",
    avatar: "D",
    rating: 4.8,
    activityPoints: 1180,
    members: 65,
    trend: "up",
    category: "Academic",
  },
  {
    id: 3,
    name: "Photography Club",
    avatar: "P",
    rating: 4.7,
    activityPoints: 980,
    members: 42,
    trend: "down",
    category: "Arts",
  },
  {
    id: 4,
    name: "Environmental Club",
    avatar: "E",
    rating: 4.6,
    activityPoints: 920,
    members: 56,
    trend: "up",
    category: "Social",
  },
  {
    id: 5,
    name: "Music Club",
    avatar: "M",
    rating: 4.5,
    activityPoints: 890,
    members: 61,
    trend: "down",
    category: "Arts",
  },
  {
    id: 6,
    name: "Chess Club",
    avatar: "C",
    rating: 4.4,
    activityPoints: 780,
    members: 34,
    trend: "up",
    category: "Games",
  },
  {
    id: 7,
    name: "Dance Club",
    avatar: "D",
    rating: 4.3,
    activityPoints: 750,
    members: 48,
    trend: "down",
    category: "Arts",
  },
];

// Mock data for user leaderboard
const userLeaderboard = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "AJ",
    activityPoints: 890,
    badges: 12,
    department: "Computer Science",
    trend: "up",
  },
  {
    id: 2,
    name: "Maria Garcia",
    avatar: "MG",
    activityPoints: 845,
    badges: 10,
    department: "Business Administration",
    trend: "up",
  },
  {
    id: 3,
    name: "David Lee",
    avatar: "DL",
    activityPoints: 780,
    badges: 8,
    department: "Electrical Engineering",
    trend: "down",
  },
  {
    id: 4,
    name: "Sarah Brown",
    avatar: "SB",
    activityPoints: 720,
    badges: 9,
    department: "Psychology",
    trend: "up",
  },
  {
    id: 5,
    name: "James Wilson",
    avatar: "JW",
    activityPoints: 690,
    badges: 7,
    department: "Mechanical Engineering",
    trend: "down",
  },
  {
    id: 6,
    name: "Emily Davis",
    avatar: "ED",
    activityPoints: 650,
    badges: 6,
    department: "Biology",
    trend: "up",
  },
  {
    id: 7,
    name: "Michael Taylor",
    avatar: "MT",
    activityPoints: 610,
    badges: 5,
    department: "Finance",
    trend: "down",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+5 since yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Club Applications
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 since yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Events
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">+3 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Flagged Content
            </CardTitle>
            <Flag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">+2 since yesterday</p>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="clubs-leaderboard">Club Leaderboard</TabsTrigger>
          <TabsTrigger value="users-leaderboard">User Leaderboard</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Recent User Registrations</CardTitle>
                <CardDescription>Last 5 user registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center">
                      <div className="mr-4 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                        <UserCheck className="h-5 w-5 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          User {i}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Registered {i} hour{i !== 1 ? "s" : ""} ago
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Pending Club Applications</CardTitle>
                <CardDescription>Clubs waiting for approval</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center">
                      <div className="mr-4 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          Club {i}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Submitted {i + 1} day{i !== 0 ? "s" : ""} ago
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Flagged Content</CardTitle>
                <CardDescription>Content requiring moderation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center">
                      <div className="mr-4 flex h-9 w-9 items-center justify-center rounded-full bg-destructive/10">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {i % 2 === 0 ? "Blog Post" : "Comment"} #{i}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Flagged by {i + 2} user{i !== 0 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="clubs-leaderboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="mr-2 h-5 w-5 text-amber-500" />
                Club Leaderboard
              </CardTitle>
              <CardDescription>
                Top performing clubs based on rating and activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {clubLeaderboard.map((club, index) => (
                  <div key={club.id} className="flex items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                      {index + 1}
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage
                              src={`/placeholder.svg?text=${club.avatar}`}
                              alt={club.name}
                            />
                            <AvatarFallback>{club.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center">
                              <p className="font-medium">{club.name}</p>
                              {index < 3 && (
                                <Badge className="ml-2 bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900 dark:text-amber-100">
                                  {index === 0
                                    ? "Gold"
                                    : index === 1
                                    ? "Silver"
                                    : "Bronze"}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {club.category} • {club.members} members
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-amber-500 mr-1" />
                            <span className="font-medium">{club.rating}</span>
                          </div>
                          <div className="flex items-center">
                            <Activity className="h-4 w-4 text-primary mr-1" />
                            <span className="font-medium">
                              {club.activityPoints}
                            </span>
                            {club.trend === "up" ? (
                              <ArrowUp className="ml-1 h-3 w-3 text-green-500" />
                            ) : (
                              <ArrowDown className="ml-1 h-3 w-3 text-red-500" />
                            )}
                          </div>
                        </div>
                      </div>
                      <Progress
                        className="mt-2"
                        value={
                          (club.activityPoints /
                            clubLeaderboard[0].activityPoints) *
                          100
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="users-leaderboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="mr-2 h-5 w-5 text-primary" />
                User Leaderboard
              </CardTitle>
              <CardDescription>
                Most active users based on participation and contributions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {userLeaderboard.map((user, index) => (
                  <div key={user.id} className="flex items-center">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full font-bold text-lg ${
                        index === 0
                          ? "bg-amber-500 text-white"
                          : index === 1
                          ? "bg-gray-300 text-gray-800 dark:bg-gray-600 dark:text-gray-100"
                          : index === 2
                          ? "bg-amber-700 text-white"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage
                              src={`/placeholder.svg?text=${user.avatar}`}
                              alt={user.name}
                            />
                            <AvatarFallback>{user.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center">
                              <p className="font-medium">{user.name}</p>
                              {user.badges > 10 && (
                                <Badge className="ml-2 bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-100">
                                  Top Contributor
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {user.department} • {user.badges} badges
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Activity className="h-4 w-4 text-primary mr-1" />
                          <span className="font-medium">
                            {user.activityPoints}
                          </span>
                          {user.trend === "up" ? (
                            <ArrowUp className="ml-1 h-3 w-3 text-green-500" />
                          ) : (
                            <ArrowDown className="ml-1 h-3 w-3 text-red-500" />
                          )}
                        </div>
                      </div>
                      <Progress
                        className="mt-2"
                        value={
                          (user.activityPoints /
                            userLeaderboard[0].activityPoints) *
                          100
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

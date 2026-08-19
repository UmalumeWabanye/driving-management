import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Calendar } from "./ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Plus, Clock, User, MapPin, Car } from "lucide-react";
import { useState } from "react";

export function LessonsPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const upcomingLessons = [
    {
      id: 1,
      student: "John Smith",
      instructor: "David Martinez",
      time: "09:00 AM",
      date: "2024-08-15",
      type: "Highway Driving",
      location: "Downtown Location",
      car: "Honda Civic (Manual)",
      status: "Confirmed"
    },
    {
      id: 2,
      student: "Sarah Wilson",
      instructor: "Jennifer Lee",
      time: "11:00 AM",
      date: "2024-08-15",
      type: "Parallel Parking",
      location: "West Side Location",
      car: "Toyota Corolla (Auto)",
      status: "Confirmed"
    },
    {
      id: 3,
      student: "Emily Davis",
      instructor: "Robert Chen",
      time: "02:00 PM",
      date: "2024-08-15",
      type: "Road Test Prep",
      location: "Test Center",
      car: "Nissan Sentra (Auto)",
      status: "Pending"
    },
    {
      id: 4,
      student: "Mike Johnson",
      instructor: "Maria Rodriguez",
      time: "04:00 PM",
      date: "2024-08-15",
      type: "Basic Skills",
      location: "Main Campus",
      car: "Ford Focus (Manual)",
      status: "Confirmed"
    }
  ];

  const todayLessons = [
    {
      id: 1,
      student: "Lisa Anderson",
      instructor: "James Wilson",
      time: "10:00 AM",
      type: "Theory Review",
      status: "In Progress"
    },
    {
      id: 2,
      student: "Robert Brown",
      instructor: "Amanda Thompson",
      time: "01:00 PM",
      type: "City Driving",
      status: "Completed"
    },
    {
      id: 3,
      student: "Alex Green",
      instructor: "David Martinez",
      time: "03:30 PM",
      type: "Night Driving",
      status: "Upcoming"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-emerald-100 text-emerald-800";
      case "Upcoming":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1>Lessons</h1>
          <p className="text-muted-foreground">Schedule and manage driving lessons</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Schedule Lesson
        </Button>
      </div>

      <Tabs defaultValue="schedule" className="space-y-6">
        <TabsList>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="today">Today's Lessons</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            {/* Selected Date Lessons */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>
                  Lessons for {selectedDate?.toLocaleDateString() || "Today"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingLessons.map((lesson) => (
                    <div key={lesson.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{lesson.time}</span>
                          <Badge variant="secondary" className={getStatusColor(lesson.status)}>
                            {lesson.status}
                          </Badge>
                        </div>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>{lesson.student}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>Instructor: {lesson.instructor}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{lesson.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Car className="h-4 w-4 text-muted-foreground" />
                          <span>{lesson.car}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                          {lesson.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="today" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Today's Lessons ({todayLessons.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayLessons.map((lesson) => (
                  <div key={lesson.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{lesson.time}</span>
                        <Badge variant="secondary" className={getStatusColor(lesson.status)}>
                          {lesson.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{lesson.student} with {lesson.instructor}</p>
                      <p className="text-sm">{lesson.type}</p>
                    </div>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Lessons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingLessons.map((lesson) => (
                  <div key={lesson.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{lesson.date} at {lesson.time}</span>
                        <Badge variant="secondary" className={getStatusColor(lesson.status)}>
                          {lesson.status}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="sm">Manage</Button>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-muted-foreground">
                      <div>{lesson.student}</div>
                      <div>{lesson.instructor}</div>
                      <div>{lesson.location}</div>
                      <div>{lesson.type}</div>
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
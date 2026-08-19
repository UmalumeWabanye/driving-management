import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Input } from "./ui/input";
import { Search, Plus, MoreHorizontal, Phone, Mail, Star, Clock } from "lucide-react";

export function InstructorsPage() {
  const instructors = [
    {
      id: 1,
      name: "David Martinez",
      email: "david.martinez@drivingschool.com",
      phone: "(555) 111-2222",
      specialty: "Manual Transmission",
      availability: "Available",
      rating: 4.9,
      experience: "8 years",
      activeStudents: 12,
      completedLessons: 1247
    },
    {
      id: 2,
      name: "Jennifer Lee",
      email: "jennifer.lee@drivingschool.com",
      phone: "(555) 222-3333",
      specialty: "Automatic & Highway",
      availability: "Busy",
      rating: 4.8,
      experience: "6 years",
      activeStudents: 15,
      completedLessons: 892
    },
    {
      id: 3,
      name: "Robert Chen",
      email: "robert.chen@drivingschool.com",
      phone: "(555) 333-4444",
      specialty: "Defensive Driving",
      availability: "Available",
      rating: 4.7,
      experience: "10 years",
      activeStudents: 8,
      completedLessons: 1543
    },
    {
      id: 4,
      name: "Maria Rodriguez",
      email: "maria.rodriguez@drivingschool.com",
      phone: "(555) 444-5555",
      specialty: "Teen Driving",
      availability: "Available",
      rating: 4.9,
      experience: "5 years",
      activeStudents: 18,
      completedLessons: 756
    },
    {
      id: 5,
      name: "James Wilson",
      email: "james.wilson@drivingschool.com",
      phone: "(555) 555-6666",
      specialty: "Commercial License",
      availability: "Off Duty",
      rating: 4.8,
      experience: "12 years",
      activeStudents: 6,
      completedLessons: 2134
    },
    {
      id: 6,
      name: "Amanda Thompson",
      email: "amanda.thompson@drivingschool.com",
      phone: "(555) 666-7777",
      specialty: "Parallel Parking",
      availability: "Available",
      rating: 4.6,
      experience: "4 years",
      activeStudents: 14,
      completedLessons: 623
    }
  ];

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "Available":
        return "bg-green-100 text-green-800";
      case "Busy":
        return "bg-yellow-100 text-yellow-800";
      case "Off Duty":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1>Instructors</h1>
          <p className="text-muted-foreground">Manage your driving instructors and their schedules</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Instructor
        </Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search instructors..."
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
        </CardHeader>
      </Card>

      {/* Instructors Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Instructors ({instructors.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Specialty</TableHead>
                <TableHead>Availability</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Students</TableHead>
                <TableHead className="w-[50px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {instructors.map((instructor) => (
                <TableRow key={instructor.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{instructor.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {instructor.experience}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span className="truncate max-w-[200px]">{instructor.email}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                        {instructor.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {instructor.specialty}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getAvailabilityColor(instructor.availability)}>
                      {instructor.availability}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{instructor.rating}</span>
                      <span className="text-sm text-muted-foreground">
                        ({instructor.completedLessons})
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <span className="font-semibold">{instructor.activeStudents}</span>
                      <div className="text-xs text-muted-foreground">active</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
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
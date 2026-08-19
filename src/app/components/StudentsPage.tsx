import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Input } from "./ui/input";
import { Search, Plus, MoreHorizontal, Phone, Mail } from "lucide-react";

export function StudentsPage() {
  const students = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "(555) 123-4567",
      status: "Active",
      lessons: 12,
      progress: "Theory Complete",
      joinDate: "2024-01-15"
    },
    {
      id: 2,
      name: "Sarah Wilson",
      email: "sarah.wilson@email.com",
      phone: "(555) 234-5678",
      status: "In Progress",
      lessons: 8,
      progress: "Road Test Pending",
      joinDate: "2024-02-01"
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@email.com",
      phone: "(555) 345-6789",
      status: "Completed",
      lessons: 20,
      progress: "Licensed",
      joinDate: "2023-11-10"
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@email.com",
      phone: "(555) 456-7890",
      status: "Active",
      lessons: 5,
      progress: "Theory in Progress",
      joinDate: "2024-03-01"
    },
    {
      id: 5,
      name: "Robert Brown",
      email: "robert.brown@email.com",
      phone: "(555) 567-8901",
      status: "Paused",
      lessons: 15,
      progress: "On Hold",
      joinDate: "2023-12-05"
    },
    {
      id: 6,
      name: "Lisa Anderson",
      email: "lisa.anderson@email.com",
      phone: "(555) 678-9012",
      status: "Active",
      lessons: 18,
      progress: "Practice Sessions",
      joinDate: "2023-10-20"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-emerald-100 text-emerald-800";
      case "Paused":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1>Students</h1>
          <p className="text-muted-foreground">Manage your driving school students</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Student
        </Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
        </CardHeader>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Students ({students.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Lessons</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead className="w-[50px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{student.name}</div>
                      <div className="text-sm text-muted-foreground">ID: {student.id.toString().padStart(4, '0')}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                        {student.email}
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                        {student.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getStatusColor(student.status)}>
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <span className="font-semibold">{student.lessons}</span>
                      <div className="text-xs text-muted-foreground">completed</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{student.progress}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{new Date(student.joinDate).toLocaleDateString()}</span>
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
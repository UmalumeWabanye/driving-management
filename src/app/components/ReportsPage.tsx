import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Download, TrendingUp, Users, DollarSign, BookOpen } from "lucide-react";

export function ReportsPage() {
  const monthlyRevenue = [
    { month: "Jan", revenue: 12500, students: 45 },
    { month: "Feb", revenue: 15200, students: 52 },
    { month: "Mar", revenue: 18900, students: 63 },
    { month: "Apr", revenue: 16800, students: 58 },
    { month: "May", revenue: 21200, students: 72 },
    { month: "Jun", revenue: 19500, students: 67 },
    { month: "Jul", revenue: 23100, students: 78 },
    { month: "Aug", revenue: 25400, students: 84 }
  ];

  const lessonTypes = [
    { name: "Basic Skills", count: 156, color: "#2563eb" },
    { name: "Highway Driving", count: 89, color: "#10b981" },
    { name: "Parallel Parking", count: 67, color: "#f59e0b" },
    { name: "Road Test Prep", count: 45, color: "#ef4444" },
    { name: "Night Driving", count: 23, color: "#8b5cf6" }
  ];

  const instructorPerformance = [
    { name: "David Martinez", lessons: 127, rating: 4.9, revenue: 5680 },
    { name: "Jennifer Lee", lessons: 115, rating: 4.8, revenue: 5175 },
    { name: "Maria Rodriguez", lessons: 98, rating: 4.9, revenue: 4410 },
    { name: "Robert Chen", lessons: 87, rating: 4.7, revenue: 3915 },
    { name: "James Wilson", lessons: 76, rating: 4.8, revenue: 3420 },
    { name: "Amanda Thompson", lessons: 65, rating: 4.6, revenue: 2925 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1>Reports</h1>
          <p className="text-muted-foreground">Analytics and business insights</p>
        </div>
        <div className="flex space-x-2">
          <Select defaultValue="thisMonth">
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="thisMonth">This Month</SelectItem>
              <SelectItem value="lastMonth">Last Month</SelectItem>
              <SelectItem value="thisQuarter">This Quarter</SelectItem>
              <SelectItem value="thisYear">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$152,600</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +18.2% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Active Students</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Lessons Completed</CardTitle>
            <BookOpen className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">380</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8.7% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Pass Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.3%</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +2.1% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="revenue" className="space-y-6">
        <TabsList>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="lessons">Lessons</TabsTrigger>
          <TabsTrigger value="instructors">Instructors</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyRevenue} id="revenue-line-chart">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                    <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Student Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyRevenue} id="student-growth-bar-chart">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="students" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="lessons" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Lesson Types Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={lessonTypes}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="count"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {lessonTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lesson Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lessonTypes.map((lesson) => (
                    <div key={lesson.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: lesson.color }}
                        ></div>
                        <span className="text-sm">{lesson.name}</span>
                      </div>
                      <span className="font-semibold">{lesson.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="instructors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Instructor Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {instructorPerformance.map((instructor) => (
                  <div key={instructor.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="font-medium">{instructor.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Rating: {instructor.rating}/5.0
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="font-semibold">{instructor.lessons} lessons</div>
                      <div className="text-sm text-muted-foreground">${instructor.revenue} revenue</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Progress Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Theory Complete</span>
                    <span className="font-semibold">342 students</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Practical Training</span>
                    <span className="font-semibold">567 students</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Road Test Ready</span>
                    <span className="font-semibold">189 students</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Licensed</span>
                    <span className="font-semibold">149 students</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Registrations</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={monthlyRevenue.slice(-6)} id="monthly-registrations-bar-chart">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="students" fill="#2563eb" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
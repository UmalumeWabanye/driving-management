import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Users, UserCheck, Calendar, DollarSign, TrendingUp, BookOpen } from "lucide-react";

export function DashboardPage() {
  const stats = [
    {
      title: "Total Students",
      value: "1,247",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Active Instructors",
      value: "24",
      change: "+2",
      trend: "up",
      icon: UserCheck,
      color: "text-green-600"
    },
    {
      title: "Scheduled Lessons",
      value: "89",
      change: "Today",
      trend: "neutral",
      icon: Calendar,
      color: "text-orange-600"
    },
    {
      title: "Total Payments",
      value: "$45,670",
      change: "+8.2%",
      trend: "up",
      icon: DollarSign,
      color: "text-emerald-600"
    }
  ];

  const recentActivities = [
    { type: "New student registered", name: "John Smith", time: "2 hours ago" },
    { type: "Lesson completed", name: "Sarah Wilson", time: "4 hours ago" },
    { type: "Payment received", name: "Mike Johnson", time: "6 hours ago" },
    { type: "Instructor scheduled", name: "Emily Davis", time: "1 day ago" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1>Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening at your driving school.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {stat.trend === "up" && <TrendingUp className="h-3 w-3 mr-1 text-green-500" />}
                  <span className={stat.trend === "up" ? "text-green-500" : ""}>{stat.change}</span>
                  {stat.trend === "up" && <span className="ml-1">from last month</span>}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity and Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.type}</p>
                    <p className="text-xs text-muted-foreground">{activity.name}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Lessons Completed</span>
                </div>
                <span className="font-semibold">127</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-green-600" />
                  <span className="text-sm">New Registrations</span>
                </div>
                <span className="font-semibold">8</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm">Revenue</span>
                </div>
                <span className="font-semibold">$12,450</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-orange-600" />
                  <span className="text-sm">Upcoming Lessons</span>
                </div>
                <span className="font-semibold">45</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
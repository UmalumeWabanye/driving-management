import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Search, Plus, MoreHorizontal, DollarSign, CreditCard, AlertCircle, CheckCircle } from "lucide-react";

export function PaymentsPage() {
  const payments = [
    {
      id: 1,
      studentName: "John Smith",
      amount: 450,
      date: "2024-08-10",
      status: "Paid",
      method: "Credit Card",
      description: "10 Lesson Package",
      dueDate: "2024-08-10",
      invoice: "INV-2024-001"
    },
    {
      id: 2,
      studentName: "Sarah Wilson",
      amount: 180,
      date: "2024-08-08",
      status: "Paid",
      method: "Bank Transfer",
      description: "4 Lesson Package",
      dueDate: "2024-08-08",
      invoice: "INV-2024-002"
    },
    {
      id: 3,
      studentName: "Mike Johnson",
      amount: 225,
      date: "2024-08-14",
      status: "Pending",
      method: "Cash",
      description: "5 Lesson Package",
      dueDate: "2024-08-15",
      invoice: "INV-2024-003"
    },
    {
      id: 4,
      studentName: "Emily Davis",
      amount: 90,
      date: "2024-08-12",
      status: "Overdue",
      method: "Credit Card",
      description: "2 Lesson Package",
      dueDate: "2024-08-10",
      invoice: "INV-2024-004"
    },
    {
      id: 5,
      studentName: "Robert Brown",
      amount: 360,
      date: "2024-08-13",
      status: "Paid",
      method: "Debit Card",
      description: "8 Lesson Package",
      dueDate: "2024-08-13",
      invoice: "INV-2024-005"
    },
    {
      id: 6,
      studentName: "Lisa Anderson",
      amount: 675,
      date: "2024-08-09",
      status: "Paid",
      method: "Bank Transfer",
      description: "15 Lesson Package",
      dueDate: "2024-08-09",
      invoice: "INV-2024-006"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Overdue":
        return "bg-red-100 text-red-800";
      case "Refunded":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Paid":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "Pending":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case "Overdue":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <DollarSign className="h-4 w-4 text-gray-600" />;
    }
  };

  const totalRevenue = payments.filter(p => p.status === "Paid").reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = payments.filter(p => p.status === "Pending").reduce((sum, p) => sum + p.amount, 0);
  const overdueAmount = payments.filter(p => p.status === "Overdue").reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1>Payments</h1>
          <p className="text-muted-foreground">Track payments and invoices</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Create Invoice
        </Button>
      </div>

      {/* Payment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Pending</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pendingAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Awaiting payment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Overdue</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${overdueAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Past due date</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Transactions</CardTitle>
            <CreditCard className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{payments.length}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search payments..."
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter</Button>
            <Button variant="outline">Export</Button>
          </div>
        </CardHeader>
      </Card>

      {/* Payments Table */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Payments</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="overdue">Overdue</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Payments ({payments.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="w-[50px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{payment.invoice}</div>
                          <div className="text-sm text-muted-foreground">{payment.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{payment.studentName}</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold">${payment.amount}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(payment.status)}
                          <Badge variant="secondary" className={getStatusColor(payment.status)}>
                            {payment.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{payment.method}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{new Date(payment.date).toLocaleDateString()}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{new Date(payment.dueDate).toLocaleDateString()}</span>
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
        </TabsContent>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.filter(p => p.status === "Pending").map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{payment.invoice}</div>
                          <div className="text-sm text-muted-foreground">{payment.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>{payment.studentName}</TableCell>
                      <TableCell className="font-semibold">${payment.amount}</TableCell>
                      <TableCell>{new Date(payment.dueDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">Mark Paid</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overdue">
          <Card>
            <CardHeader>
              <CardTitle>Overdue Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Days Overdue</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.filter(p => p.status === "Overdue").map((payment) => {
                    const daysOverdue = Math.floor((new Date().getTime() - new Date(payment.dueDate).getTime()) / (1000 * 3600 * 24));
                    return (
                      <TableRow key={payment.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{payment.invoice}</div>
                            <div className="text-sm text-muted-foreground">{payment.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>{payment.studentName}</TableCell>
                        <TableCell className="font-semibold text-red-600">${payment.amount}</TableCell>
                        <TableCell>{new Date(payment.dueDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge variant="destructive">{daysOverdue} days</Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">Send Reminder</Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
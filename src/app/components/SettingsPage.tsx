import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { Building2, Bell, Shield, Palette, Mail, Phone } from "lucide-react";

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1>Settings</h1>
        <p className="text-muted-foreground">Manage your driving school settings and preferences</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building2 className="h-5 w-5" />
                <span>School Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="schoolName">School Name</Label>
                  <Input id="schoolName" defaultValue="Elite Driving Academy" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessNumber">Business Number</Label>
                  <Input id="businessNumber" defaultValue="123456789" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea 
                  id="address" 
                  defaultValue="123 Main Street, Downtown, City, State 12345"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex">
                    <Phone className="w-4 h-4 mt-3 mr-2 text-muted-foreground" />
                    <Input id="phone" defaultValue="(555) 123-4567" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="flex">
                    <Mail className="w-4 h-4 mt-3 mr-2 text-muted-foreground" />
                    <Input id="email" defaultValue="info@elitedrivingacademy.com" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Business Hours</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Weekdays</Label>
                    <div className="flex space-x-2">
                      <Select defaultValue="8">
                        <SelectTrigger className="w-[100px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({length: 12}, (_, i) => i + 6).map(hour => (
                            <SelectItem key={hour} value={hour.toString()}>{hour}:00 AM</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <span className="mt-2">to</span>
                      <Select defaultValue="18">
                        <SelectTrigger className="w-[100px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({length: 12}, (_, i) => i + 12).map(hour => (
                            <SelectItem key={hour} value={hour.toString()}>{hour > 12 ? hour - 12 : hour}:00 {hour >= 12 ? 'PM' : 'AM'}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Weekends</Label>
                    <div className="flex space-x-2">
                      <Select defaultValue="9">
                        <SelectTrigger className="w-[100px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({length: 12}, (_, i) => i + 6).map(hour => (
                            <SelectItem key={hour} value={hour.toString()}>{hour}:00 AM</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <span className="mt-2">to</span>
                      <Select defaultValue="16">
                        <SelectTrigger className="w-[100px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({length: 12}, (_, i) => i + 12).map(hour => (
                            <SelectItem key={hour} value={hour.toString()}>{hour > 12 ? hour - 12 : hour}:00 {hour >= 12 ? 'PM' : 'AM'}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notification Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>New Student Registration</Label>
                    <p className="text-sm text-muted-foreground">Get notified when new students register</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Lesson Cancellations</Label>
                    <p className="text-sm text-muted-foreground">Get notified when lessons are cancelled</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Payment Received</Label>
                    <p className="text-sm text-muted-foreground">Get notified when payments are received</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Overdue Payments</Label>
                    <p className="text-sm text-muted-foreground">Get notified about overdue payments</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Security Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable 2FA</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Update Security</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5" />
                <span>Appearance Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <Select defaultValue="light">
                    <SelectTrigger className="w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger className="w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Date Format</Label>
                  <Select defaultValue="mm/dd/yyyy">
                    <SelectTrigger className="w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input id="cardName" defaultValue="Elite Driving Academy" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" defaultValue="**** **** **** 1234" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" defaultValue="12/26" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" defaultValue="***" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="billingAddress">Billing Address</Label>
                  <Textarea 
                    id="billingAddress" 
                    defaultValue="123 Main Street, Downtown, City, State 12345"
                    rows={3}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Current Plan</h3>
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Professional Plan</h4>
                      <p className="text-sm text-muted-foreground">Up to 2000 students</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">$99/month</p>
                      <p className="text-sm text-muted-foreground">Next billing: Sep 15, 2024</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Update Billing</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
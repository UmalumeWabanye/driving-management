import Login from "./Login";
import { getCurrentUser, signOut } from "../lib/auth";
import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { Button } from "./components/ui/button";
import { DashboardPage } from "./components/DashboardPage";
import { StudentsPage } from "./components/StudentsPage";
import { InstructorsPage } from "./components/InstructorsPage";
import { LessonsPage } from "./components/LessonsPage";
import { PaymentsPage } from "./components/PaymentsPage";
import { ReportsPage } from "./components/ReportsPage";
import { SettingsPage } from "./components/SettingsPage";
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  Calendar, 
  DollarSign, 
  BarChart3, 
  Settings,
  Car,
  LogOut
} from "lucide-react";

const navigationItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    id: "dashboard"
  },
  {
    title: "Students",
    icon: Users,
    id: "students"
  },
  {
    title: "Instructors",
    icon: UserCheck,
    id: "instructors"
  },
  {
    title: "Lessons",
    icon: Calendar,
    id: "lessons"
  },
  {
    title: "Payments",
    icon: DollarSign,
    id: "payments"
  },
  {
    title: "Reports",
    icon: BarChart3,
    id: "reports"
  },
  {
    title: "Settings",
    icon: Settings,
    id: "settings"
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
  const initializeAuth = async () => {
    const currentUser = await getCurrentUser();

    setUser(currentUser);
    setAuthLoading(false);

  };

  initializeAuth();

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    setUser(session?.user ?? null);
  });

  return () => {
    subscription.unsubscribe();
  };
}, []);

if (authLoading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground">Loading...</p>
    </div>
  );
}

if (!user) {
  return <Login />;
}

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardPage />;
      case "students":
        return <StudentsPage />;
      case "instructors":
        return <InstructorsPage />;
      case "lessons":
        return <LessonsPage />;
      case "payments":
        return <PaymentsPage />;
      case "reports":
        return <ReportsPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="border-r">
          <SidebarHeader className="border-b px-6 py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Car className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-semibold">Elite Driving</h2>
                <p className="text-xs text-muted-foreground">Management System</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="px-3 py-4">
            <SidebarMenu>
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => setCurrentPage(item.id)}
                      isActive={currentPage === item.id}
                      className="w-full justify-start space-x-2"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="border-t px-3 py-4">
            <div className="space-y-2">
              <div className="px-3 py-2 text-xs text-muted-foreground">
                Logged in as: admin@elitedrivingacademy.com
              </div>
              <Button
  variant="ghost"
  onClick={async () => {
    const { error } = await signOut();

    if (error) {
      console.error("Sign out error:", error);
    }
  }}
  className="w-full justify-start text-muted-foreground hover:text-foreground"
>
  <LogOut className="h-4 w-4 mr-2" />
  Sign Out
</Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <header className="border-b px-6 py-4 bg-background">
            <div className="flex items-center justify-between">
              <SidebarTrigger className="md:hidden" />
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6 bg-muted/20">
            {renderCurrentPage()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}


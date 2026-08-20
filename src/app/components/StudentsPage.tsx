import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import type { Student } from "../../lib/students";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

import { Input } from "./ui/input";

import {
  Search,
  MoreHorizontal,
  Phone,
  Mail,
} from "lucide-react";

import { AddStudentDialog } from "./AddStudentDialog";

type StudentQueryResult = Omit<Student, "profiles"> & {
  profiles:
    | {
        full_name: string | null;
        email: string | null;
        phone: string | null;
      }[]
    | null;
};

function normalizeStudent(
  student: StudentQueryResult,
): Student {
  return {
    ...student,
    profiles:
      student.profiles?.[0] ?? null,
  };
}

export function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(
    [],
  );

  const [searchTerm, setSearchTerm] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [realtimeStatus, setRealtimeStatus] =
    useState<
      "connecting" | "connected" | "error"
    >("connecting");

  /*
   * Fetch all students.
   */
  async function fetchStudents() {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("students")
      .select(`
        id,
        profile_id,
        student_number,
        date_of_birth,
        id_number,
        license_type,
        transmission_preference,
        enrollment_date,
        status,
        emergency_contact_name,
        emergency_contact_phone,
        address,
        notes,
        created_at,
        updated_at,
        profiles (
          full_name,
          email,
          phone
        )
      `)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(
        "Error fetching students:",
        error,
      );

      setError(
        "Unable to load students.",
      );

      setLoading(false);
      return;
    }

    const normalizedStudents = (
      (data ?? []) as StudentQueryResult[]
    ).map(normalizeStudent);

    setStudents(normalizedStudents);
    setLoading(false);
  }

  /*
   * Initial fetch + Realtime subscription.
   */
  useEffect(() => {
    fetchStudents();

    const channel = supabase
      .channel("students-realtime")
      /*
       * INSERT
       */
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "students",
        },
        async (payload) => {
          console.log(
            "Realtime student INSERT:",
            payload,
          );

          /*
           * Fetch the complete student including
           * the related profile.
           */
          const { data, error } =
            await supabase
              .from("students")
              .select(`
                id,
                profile_id,
                student_number,
                date_of_birth,
                id_number,
                license_type,
                transmission_preference,
                enrollment_date,
                status,
                emergency_contact_name,
                emergency_contact_phone,
                address,
                notes,
                created_at,
                updated_at,
                profiles (
                  full_name,
                  email,
                  phone
                )
              `)
              .eq(
                "id",
                payload.new.id,
              )
              .single();

          if (error) {
            console.error(
              "Unable to fetch new student:",
              error,
            );

            await fetchStudents();
            return;
          }

          const normalizedStudent =
            normalizeStudent(
              data as StudentQueryResult,
            );

          setStudents(
            (currentStudents) => {
              const exists =
                currentStudents.some(
                  (student) =>
                    student.id ===
                    normalizedStudent.id,
                );

              if (exists) {
                return currentStudents;
              }

              return [
                normalizedStudent,
                ...currentStudents,
              ];
            },
          );
        },
      )

      /*
       * UPDATE
       */
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "students",
        },
        async (payload) => {
          console.log(
            "Realtime student UPDATE:",
            payload,
          );

          const { data, error } =
            await supabase
              .from("students")
              .select(`
                id,
                profile_id,
                student_number,
                date_of_birth,
                id_number,
                license_type,
                transmission_preference,
                enrollment_date,
                status,
                emergency_contact_name,
                emergency_contact_phone,
                address,
                notes,
                created_at,
                updated_at,
                profiles (
                  full_name,
                  email,
                  phone
                )
              `)
              .eq(
                "id",
                payload.new.id,
              )
              .single();

          if (error) {
            console.error(
              "Unable to fetch updated student:",
              error,
            );

            await fetchStudents();
            return;
          }

          const normalizedStudent =
            normalizeStudent(
              data as StudentQueryResult,
            );

          setStudents(
            (currentStudents) =>
              currentStudents.map(
                (student) =>
                  student.id ===
                  normalizedStudent.id
                    ? normalizedStudent
                    : student,
              ),
          );
        },
      )

      /*
       * DELETE
       */
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "students",
        },
        (payload) => {
          console.log(
            "Realtime student DELETE:",
            payload,
          );

          setStudents(
            (currentStudents) =>
              currentStudents.filter(
                (student) =>
                  student.id !==
                  payload.old.id,
              ),
          );
        },
      )

      /*
       * Subscribe
       */
      .subscribe((status) => {
        console.log(
          "Students realtime status:",
          status,
        );

        if (status === "SUBSCRIBED") {
          setRealtimeStatus(
            "connected",
          );
        } else if (
          status === "CHANNEL_ERROR" ||
          status === "TIMED_OUT"
        ) {
          setRealtimeStatus("error");
        } else {
          setRealtimeStatus(
            "connecting",
          );
        }
      });

    /*
     * Cleanup.
     */
    return () => {
      supabase.removeChannel(
        channel,
      );
    };
  }, []);

  /*
   * Called when AddStudentDialog successfully
   * creates a student.
   */
  const handleStudentCreated = (
    student: Student,
  ) => {
    setStudents(
      (currentStudents) => {
        const exists =
          currentStudents.some(
            (existingStudent) =>
              existingStudent.id ===
              student.id,
          );

        if (exists) {
          return currentStudents;
        }

        return [
          student,
          ...currentStudents,
        ];
      },
    );
  };

  /*
   * Search students.
   */
  const filteredStudents =
    students.filter((student) => {
      const name =
        student.profiles?.full_name
          ?.toLowerCase() ?? "";

      const email =
        student.profiles?.email
          ?.toLowerCase() ?? "";

      const studentNumber =
        student.student_number
          ?.toLowerCase() ?? "";

      const search =
        searchTerm
          .toLowerCase()
          .trim();

      return (
        name.includes(search) ||
        email.includes(search) ||
        studentNumber.includes(search)
      );
    });

  /*
   * Status badge colours.
   */
  const getStatusColor = (
    status: string,
  ) => {
    switch (
      status?.toLowerCase()
    ) {
      case "active":
        return "bg-green-100 text-green-800";

      case "in progress":
        return "bg-blue-100 text-blue-800";

      case "completed":
        return "bg-emerald-100 text-emerald-800";

      case "paused":
        return "bg-yellow-100 text-yellow-800";

      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-3">
            <h1>
              Students
            </h1>

            {realtimeStatus ===
              "connected" && (
              <span className="flex items-center gap-1.5 text-xs text-green-600">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Live
              </span>
            )}

            {realtimeStatus ===
              "connecting" && (
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-yellow-500" />
                Connecting...
              </span>
            )}

            {realtimeStatus ===
              "error" && (
              <span className="flex items-center gap-1.5 text-xs text-red-600">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                Live updates unavailable
              </span>
            )}
          </div>

          <p className="text-muted-foreground">
            Manage your driving school
            students
          </p>
        </div>

        <AddStudentDialog
          onStudentCreated={
            handleStudentCreated
          }
        />
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

              <Input
                placeholder="Search students..."
                className="pl-10"
                value={
                  searchTerm
                }
                onChange={(event) =>
                  setSearchTerm(
                    event.target.value,
                  )
                }
              />
            </div>

            <Button variant="outline">
              Filter
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Student table */}
      <Card>
        <CardHeader>
          <CardTitle>
            All Students (
            {
              filteredStudents.length
            }
            )
          </CardTitle>
        </CardHeader>

        <CardContent>
          {loading && (
            <div className="py-8 text-center text-muted-foreground">
              Loading students...
            </div>
          )}

          {error && (
            <div className="py-8 text-center text-red-600">
              {error}
            </div>
          )}

          {!loading &&
            !error && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      Name
                    </TableHead>

                    <TableHead>
                      Contact
                    </TableHead>

                    <TableHead>
                      Status
                    </TableHead>

                    <TableHead>
                      Student Number
                    </TableHead>

                    <TableHead>
                      Enrollment Date
                    </TableHead>

                    <TableHead className="w-[50px]">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredStudents.length ===
                  0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center py-8 text-muted-foreground"
                      >
                        {searchTerm
                          ? "No students match your search."
                          : "No students found."}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredStudents.map(
                      (student) => (
                        <TableRow
                          key={
                            student.id
                          }
                        >
                          <TableCell>
                            <div>
                              <div className="font-medium">
                                {student
                                  .profiles
                                  ?.full_name ||
                                  "Unnamed Student"}
                              </div>

                              <div className="text-sm text-muted-foreground">
                                ID:{" "}
                                {student.student_number ||
                                  student.id.slice(
                                    0,
                                    8,
                                  )}
                              </div>
                            </div>
                          </TableCell>

                          <TableCell>
                            <div className="space-y-1">
                              {student
                                .profiles
                                ?.email && (
                                <div className="flex items-center text-sm">
                                  <Mail className="h-3 w-3 mr-1 text-muted-foreground" />

                                  {
                                    student
                                      .profiles
                                      .email
                                  }
                                </div>
                              )}

                              {student
                                .profiles
                                ?.phone && (
                                <div className="flex items-center text-sm">
                                  <Phone className="h-3 w-3 mr-1 text-muted-foreground" />

                                  {
                                    student
                                      .profiles
                                      .phone
                                  }
                                </div>
                              )}

                              {!student
                                .profiles
                                ?.email &&
                                !student
                                  .profiles
                                  ?.phone && (
                                  <span className="text-sm text-muted-foreground">
                                    No contact details
                                  </span>
                                )}
                            </div>
                          </TableCell>

                          <TableCell>
                            <Badge
                              variant="secondary"
                              className={getStatusColor(
                                student.status,
                              )}
                            >
                              {
                                student.status
                              }
                            </Badge>
                          </TableCell>

                          <TableCell>
                            {student.student_number ||
                              "—"}
                          </TableCell>

                          <TableCell>
                            {student.enrollment_date
                              ? new Date(
                                  student.enrollment_date,
                                ).toLocaleDateString()
                              : "—"}
                          </TableCell>

                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ),
                    )
                  )}
                </TableBody>
              </Table>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
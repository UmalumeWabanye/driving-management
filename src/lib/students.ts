import { supabase } from "./supabase";

export type Student = {
  id: string;
  profile_id: string | null;
  student_number: string | null;
  date_of_birth: string | null;
  id_number: string | null;
  license_type: string | null;
  transmission_preference: string | null;
  enrollment_date: string | null;
  status: string;
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
  address: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;

  profiles: {
    full_name: string | null;
    email: string | null;
    phone: string | null;
  } | null;
};

export type CreateStudentInput = {
  full_name: string;
  email?: string | null;
  phone?: string | null;
  profile_id?: string | null;
  student_number?: string | null;
  date_of_birth?: string | null;
  id_number?: string | null;
  license_type?: string | null;
  transmission_preference?: string | null;
  enrollment_date?: string | null;
  status?: string;
  emergency_contact_name?: string | null;
  emergency_contact_phone?: string | null;
  address?: string | null;
  notes?: string | null;
};

export async function getStudents() {
  const { data, error } = await supabase
    .from("students")
    .select(`
      *,
      profiles (
        full_name,
        email,
        phone
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data as Student[];
}

export async function createStudent(
  input: CreateStudentInput
) {
  const { data, error } =
    await supabase.functions.invoke(
      "create-student",
      {
        body: input,
      }
    );

  if (error) {
    console.error(
      "Edge Function error:",
      error
    );

    if (error.context) {
      try {
        const response =
          error.context as Response;

        const errorBody =
          await response.json();

        console.error(
          "Edge Function response body:",
          errorBody
        );

        if (
          errorBody?.error &&
          typeof errorBody.error === "string"
        ) {
          throw new Error(errorBody.error);
        }

        if (
          errorBody?.message &&
          typeof errorBody.message === "string"
        ) {
          throw new Error(errorBody.message);
        }
      } catch (parseError) {
        if (parseError instanceof Error) {
          throw parseError;
        }
      }
    }

    throw new Error(
      error.message ||
        "The student could not be created."
    );
  }

  if (!data) {
    throw new Error(
      "The student was created, but the server returned no data."
    );
  }

  console.log(
    "Student created:",
    data
  );

  return data;
}
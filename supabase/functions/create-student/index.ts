import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import "@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type CreateStudentInput = {
  full_name: string;
  email?: string | null;
  phone?: string | null;
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

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Method not allowed",
      }),
      {
        status: 405,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  }

  let createdUserId: string | null = null;

  try {
    const body = (await req.json()) as CreateStudentInput;

    if (!body.full_name?.trim()) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Full name is required",
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        },
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get(
      "SUPABASE_SERVICE_ROLE_KEY",
    );

    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error(
        "Missing Supabase server environment variables",
      );
    }

    const supabaseAdmin = createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      },
    );

    /*
     * Create the Auth user.
     *
     * The database trigger should create
     * the corresponding profiles row.
     */

    const email =
      body.email?.trim() ||
      `student-${crypto.randomUUID()}@placeholder.local`;

    const { data: authData, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        email_confirm: true,
        user_metadata: {
          full_name: body.full_name.trim(),
          phone: body.phone?.trim() || null,
          role: "student",
        },
      });

    if (authError || !authData.user) {
      throw authError ?? new Error("Failed to create Auth user");
    }

    createdUserId = authData.user.id;

    /*
     * Give the database trigger a moment to create
     * the profile before attempting to read it.
     */

    let profile = null;

    for (let attempt = 0; attempt < 5; attempt++) {
      const { data: profileData, error: profileError } =
        await supabaseAdmin
          .from("profiles")
          .select("*")
          .eq("id", createdUserId)
          .maybeSingle();

      if (profileError) {
        throw profileError;
      }

      if (profileData) {
        profile = profileData;
        break;
      }

      await new Promise((resolve) =>
        setTimeout(resolve, 200)
      );
    }

    if (!profile) {
      throw new Error(
        "Profile was not created by the database trigger.",
      );
    }

    /*
     * Update the profile with the student's
     * contact information.
     */

    const { error: profileUpdateError } =
      await supabaseAdmin
        .from("profiles")
        .update({
          full_name: body.full_name.trim(),
          email: body.email?.trim() || email,
          phone: body.phone?.trim() || null,
        })
        .eq("id", createdUserId);

    if (profileUpdateError) {
      throw profileUpdateError;
    }

    /*
     * Build the student record.
     *
     * student_number is intentionally omitted when
     * not supplied so PostgreSQL can generate it.
     */

    const studentData: Record<string, unknown> = {
      profile_id: createdUserId,
      date_of_birth: body.date_of_birth ?? null,
      id_number: body.id_number ?? null,
      license_type: body.license_type ?? null,
      transmission_preference:
        body.transmission_preference ?? null,
      enrollment_date: body.enrollment_date ?? null,
      status: body.status ?? "active",
      emergency_contact_name:
        body.emergency_contact_name ?? null,
      emergency_contact_phone:
        body.emergency_contact_phone ?? null,
      address: body.address ?? null,
      notes: body.notes ?? null,
    };

    if (body.student_number?.trim()) {
      studentData.student_number =
        body.student_number.trim();
    }

    const { data: student, error: studentError } =
      await supabaseAdmin
        .from("students")
        .insert(studentData)
        .select()
        .single();

    if (studentError || !student) {
      throw (
        studentError ??
        new Error("Failed to create student record")
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        student,
        profile,
      }),
      {
        status: 201,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("create-student error:", error);

    /*
     * Clean up the Auth user if something failed
     * after the user was created.
     */

    if (createdUserId) {
      try {
        const supabaseUrl = Deno.env.get("SUPABASE_URL");
        const serviceRoleKey = Deno.env.get(
          "SUPABASE_SERVICE_ROLE_KEY",
        );

        if (supabaseUrl && serviceRoleKey) {
          const supabaseAdmin = createClient(
            supabaseUrl,
            serviceRoleKey,
            {
              auth: {
                autoRefreshToken: false,
                persistSession: false,
              },
            },
          );

          await supabaseAdmin.auth.admin.deleteUser(
            createdUserId,
          );
        }
      } catch (cleanupError) {
        console.error(
          "Failed to clean up Auth user:",
          cleanupError,
        );
      }
    }

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to create student";

    const errorCode =
      typeof error === "object" &&
      error !== null &&
      "code" in error
        ? (error as { code?: string }).code
        : undefined;

    return new Response(
      JSON.stringify({
        success: false,
        error: {
          message: errorMessage,
          code: errorCode,
        },
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  }
});
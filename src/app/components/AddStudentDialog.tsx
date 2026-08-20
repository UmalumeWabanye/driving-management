import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import {
  createStudent,
  type Student,
} from "../../lib/students";

type AddStudentDialogProps = {
  onStudentCreated?: (student: Student) => void;
};

const initialFormData = {
  fullName: "",
  studentNumber: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  idNumber: "",
  licenseType: "",
  transmissionPreference: "",
  enrollmentDate: "",
  status: "active",
  emergencyContactName: "",
  emergencyContactPhone: "",
  address: "",
  notes: "",
};

export function AddStudentDialog({
  onStudentCreated,
}: AddStudentDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (
    field: keyof typeof formData,
    value: string,
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    if (error) {
      setError(null);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setError(null);
  };

  const handleOpenChange = (value: boolean) => {
    if (isSubmitting) {
      return;
    }

    setOpen(value);

    if (!value) {
      setError(null);
    }
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!formData.fullName.trim()) {
      setError("Full name is required.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Email address is required.");
      return;
    }

    if (!formData.licenseType) {
      setError("Please select a license type.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await createStudent({
        full_name: formData.fullName.trim(),

        email: formData.email.trim(),

        phone: formData.phone.trim() || null,

        student_number:
          formData.studentNumber.trim() || null,

        date_of_birth:
          formData.dateOfBirth || null,

        id_number:
          formData.idNumber.trim() || null,

        license_type:
          formData.licenseType || null,

        transmission_preference:
          formData.transmissionPreference.trim() || null,

        enrollment_date:
          formData.enrollmentDate || null,

        status: formData.status,

        emergency_contact_name:
          formData.emergencyContactName.trim() || null,

        emergency_contact_phone:
          formData.emergencyContactPhone.trim() || null,

        address:
          formData.address.trim() || null,

        notes:
          formData.notes.trim() || null,
      });

      console.log(
        "Student created successfully:",
        result,
      );

      /*
       * The Edge Function returns:
       *
       * {
       *   success: true,
       *   student: {...},
       *   profile: {...}
       * }
       *
       * We need to combine those into the Student shape
       * expected by StudentsPage.
       */

      const createdStudent: Student = {
        ...result.student,

        profiles: result.profile
          ? {
              full_name:
                result.profile.full_name ?? null,
              email:
                result.profile.email ?? null,
              phone:
                result.profile.phone ?? null,
            }
          : null,
      };

      /*
       * Immediately tell StudentsPage about the new student.
       */
      onStudentCreated?.(createdStudent);

      /*
       * Close the dialog and reset the form.
       */
      setOpen(false);
      resetForm();
    } catch (submitError) {
      console.error(
        "Error creating student:",
        submitError,
      );

      let message = "Unable to create student.";

      if (submitError instanceof Error) {
        message = submitError.message;
      }

      /*
       * Supabase Edge Function errors can contain
       * additional information in the context.
       */
      if (
        submitError &&
        typeof submitError === "object" &&
        "context" in submitError
      ) {
        try {
          const context = (
            submitError as {
              context?: unknown;
            }
          ).context;

          if (context instanceof Response) {
            const body = await context.json();

            if (
              body?.error?.message &&
              typeof body.error.message === "string"
            ) {
              message = body.error.message;
            }
          }
        } catch {
          // Keep the original error message.
        }
      }

      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
    >
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          Add Student
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Add New Student
          </DialogTitle>

          <DialogDescription>
            Enter the student's details to create their
            student profile.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="font-semibold">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">
                  Full Name
                </Label>

                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(event) =>
                    handleChange(
                      "fullName",
                      event.target.value,
                    )
                  }
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email
                </Label>

                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(event) =>
                    handleChange(
                      "email",
                      event.target.value,
                    )
                  }
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  Phone
                </Label>

                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(event) =>
                    handleChange(
                      "phone",
                      event.target.value,
                    )
                  }
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">
                  Date of Birth
                </Label>

                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(event) =>
                    handleChange(
                      "dateOfBirth",
                      event.target.value,
                    )
                  }
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="idNumber">
                  ID Number
                </Label>

                <Input
                  id="idNumber"
                  value={formData.idNumber}
                  onChange={(event) =>
                    handleChange(
                      "idNumber",
                      event.target.value,
                    )
                  }
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="studentNumber">
                  Student Number
                </Label>

                <Input
                  id="studentNumber"
                  value={formData.studentNumber}
                  onChange={(event) =>
                    handleChange(
                      "studentNumber",
                      event.target.value,
                    )
                  }
                  placeholder="Leave blank to auto-generate"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          {/* Driving Information */}
          <div className="space-y-4">
            <h3 className="font-semibold">
              Driving Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="licenseType">
                  License Type
                </Label>

                <select
                  id="licenseType"
                  value={formData.licenseType}
                  onChange={(event) =>
                    handleChange(
                      "licenseType",
                      event.target.value,
                    )
                  }
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                  disabled={isSubmitting}
                >
                  <option value="">
                    Select license type
                  </option>

                  <option value="code_8">
                    Code 8
                  </option>

                  <option value="code_10">
                    Code 10
                  </option>

                  <option value="code_14">
                    Code 14
                  </option>

                  <option value="other">
                    Other
                  </option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="transmissionPreference">
                  Transmission Preference
                </Label>

                <select
                  id="transmissionPreference"
                  value={
                    formData.transmissionPreference
                  }
                  onChange={(event) =>
                    handleChange(
                      "transmissionPreference",
                      event.target.value,
                    )
                  }
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  disabled={isSubmitting}
                >
                  <option value="">
                    Select transmission
                  </option>

                  <option value="manual">
                    Manual
                  </option>

                  <option value="automatic">
                    Automatic
                  </option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="enrollmentDate">
                  Enrollment Date
                </Label>

                <Input
                  id="enrollmentDate"
                  type="date"
                  value={formData.enrollmentDate}
                  onChange={(event) =>
                    handleChange(
                      "enrollmentDate",
                      event.target.value,
                    )
                  }
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">
                  Status
                </Label>

                <select
                  id="status"
                  value={formData.status}
                  onChange={(event) =>
                    handleChange(
                      "status",
                      event.target.value,
                    )
                  }
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  disabled={isSubmitting}
                >
                  <option value="active">
                    Active
                  </option>

                  <option value="in progress">
                    In Progress
                  </option>

                  <option value="paused">
                    Paused
                  </option>

                  <option value="completed">
                    Completed
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold">
              Emergency Contact
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyContactName">
                  Contact Name
                </Label>

                <Input
                  id="emergencyContactName"
                  value={
                    formData.emergencyContactName
                  }
                  onChange={(event) =>
                    handleChange(
                      "emergencyContactName",
                      event.target.value,
                    )
                  }
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyContactPhone">
                  Contact Phone
                </Label>

                <Input
                  id="emergencyContactPhone"
                  value={
                    formData.emergencyContactPhone
                  }
                  onChange={(event) =>
                    handleChange(
                      "emergencyContactPhone",
                      event.target.value,
                    )
                  }
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="font-semibold">
              Additional Information
            </h3>

            <div className="space-y-2">
              <Label htmlFor="address">
                Address
              </Label>

              <Textarea
                id="address"
                value={formData.address}
                onChange={(event) =>
                  handleChange(
                    "address",
                    event.target.value,
                  )
                }
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">
                Notes
              </Label>

              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(event) =>
                  handleChange(
                    "notes",
                    event.target.value,
                  )
                }
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div
              role="alert"
              className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Creating..."
                : "Create Student"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
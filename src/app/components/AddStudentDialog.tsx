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
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";

export function AddStudentDialog() {
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    studentNumber: "",
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
  });

  const handleChange = (
    field: keyof typeof formData,
    value: string
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    console.log("Student form:", formData);

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          Add Student
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
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
                    handleChange("fullName", event.target.value)
                  }
                  required
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
                    handleChange("email", event.target.value)
                  }
                  required
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
                    handleChange("phone", event.target.value)
                  }
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
                      event.target.value
                    )
                  }
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
                      event.target.value
                    )
                  }
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
                    handleChange("idNumber", event.target.value)
                  }
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">
              Driving Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="licenseType">
                  License Type
                </Label>
                <Input
                  id="licenseType"
                  placeholder="e.g. Code 8"
                  value={formData.licenseType}
                  onChange={(event) =>
                    handleChange(
                      "licenseType",
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="transmissionPreference">
                  Transmission Preference
                </Label>
                <Input
                  id="transmissionPreference"
                  placeholder="Manual or Automatic"
                  value={formData.transmissionPreference}
                  onChange={(event) =>
                    handleChange(
                      "transmissionPreference",
                      event.target.value
                    )
                  }
                />
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
                      event.target.value
                    )
                  }
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
                    handleChange("status", event.target.value)
                  }
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="active">Active</option>
                  <option value="in progress">
                    In Progress
                  </option>
                  <option value="paused">Paused</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>

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
                  value={formData.emergencyContactName}
                  onChange={(event) =>
                    handleChange(
                      "emergencyContactName",
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyContactPhone">
                  Contact Phone
                </Label>
                <Input
                  id="emergencyContactPhone"
                  value={formData.emergencyContactPhone}
                  onChange={(event) =>
                    handleChange(
                      "emergencyContactPhone",
                      event.target.value
                    )
                  }
                />
              </div>
            </div>
          </div>

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
                  handleChange("address", event.target.value)
                }
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
                  handleChange("notes", event.target.value)
                }
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button type="submit">
              Create Student
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

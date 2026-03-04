import { z } from "zod";

export const SemesterSchema = z.object({
    semester_name: z
        .string()
        .min(3, "Semester name must be at least 3 characters")
        .max(30, "Semester name must not exceed 30 characters")
});

export const DepartmentSchema = z.object({
    department_name: z
        .string()
        .min(3, "Department name must be at least 3 characters")
        .max(30, "Department name must not exceed 30 characters")
});

export const SectionSchema = z.object({
    section_name: z
        .string()
        .min(3, "Section name must be at least 3 characters")
        .max(30, "Section name must not exceed 30 characters"),

    class_day: z
        .array(z.enum(["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]))
        .min(1, "Select at least one class day"),

    class_time: z
        .string()
        .trim()
        .min(1, "Class time is required"),

    semester_id: z
        .string()
        .trim()
        .min(1, "Semester is required"),

    teacher_id: z
        .string()
        .trim()
        .min(1, "Teacher is required"),
});

export const TeacherSchema = z.object({
    first_name: z
        .string()
        .trim()
        .min(3, "First name must be at least 3 characters")
        .max(15, "First name must not exceed 15 characters"),

    last_name: z
        .string()
        .trim()
        .min(3, "Last name must be at least 3 characters")
        .max(15, "Last name must not exceed 15 characters"),

    phone: z
        .string()
        .trim()
        .min(11, "Phone must be at least 11 characters")
        .max(11, "Phone must not exceed 11 characters"),

    email: z
        .string()
        .trim()
        .email("Enter a valid email address")
        .min(11, "Email must be at least 8 characters")
        .max(50, "Email must not exceed 50 characters"),

    department_id: z
        .string()
        .trim()
        .min(1, "Department is required"),

    blood_group: z
        .enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],)
        .nullable()
        .or(z.literal(""))
        .transform((value) => (value === "" ? null : value)),

    religion: z
        .enum(["Islam", "Hindu", "Christian", "Buddhism", "Other"])
        .nullable()
        .or(z.literal(""))
        .transform((value) => (value === "" ? null : value)),
});

export const AdmissionSchema = z.object({
    date_and_time: z
        .string()
        .nonempty("Admission date is required")
        .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date format" }),

    first_name: z
        .string()
        .trim()
        .min(3, "First name must be at least 3 characters")
        .max(15, "First name must not exceed 15 characters"),

    last_name: z
        .string()
        .trim()
        .min(3, "Last name must be at least 3 characters")
        .max(15, "Last name must not exceed 15 characters"),

    phone: z
        .string()
        .trim()
        .min(11, "Phone must be at least 11 characters")
        .max(11, "Phone must not exceed 11 characters"),

    email: z
        .string()
        .trim()
        .email("Enter a valid email address")
        .min(8, "Email must be at least 8 characters")
        .max(50, "Email must not exceed 50 characters"),

    semester_id: z.string().trim(),
    section_id: z.string().trim(),
    department_id: z.string().trim(),

    semester_fee: z.coerce
        .number({ invalid_type_error: "Semester fee must be a number" })
        .min(1, "Semester fee must be >1"),

    institute_name: z
        .string()
        .trim()
        .min(3, "Institute name must be at least 3 characters")
        .max(50, "Institute name must not exceed 50 characters")
        .nullable()
        .or(z.literal(""))
        .transform((value) => (value === "" ? null : value)),

    blood_group: z
        .enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"])
        .nullable()
        .or(z.literal(""))
        .transform((value) => (value === "" ? null : value)),

    religion: z
        .enum(["Islam", "Hindu", "Christian", "Buddhism", "Other"])
        .nullable()
        .or(z.literal(""))
        .transform((value) => (value === "" ? null : value)),

    guardian_name: z
        .string()
        .trim()
        .min(3, "First name must be at least 3 characters")
        .max(15, "First name must not exceed 15 characters")
        .nullable()
        .or(z.literal(""))
        .transform((value) => (value === "" ? null : value)),

    guardian_phone: z
        .string()
        .trim()
        .min(11, "Phone must be at least 11 characters")
        .max(11, "Phone must not exceed 11 characters")
        .nullable()
        .or(z.literal(""))
        .transform((value) => (value === "" ? null : value)),

    guardian_relation_ship: z
        .enum(["Father", "Mother", "Brother", "Sister", "Uncle", "Others"])
        .nullable()
        .or(z.literal(""))
        .transform((value) => (value === "" ? null : value)),

    address: z
        .string()
        .trim()
        .min(10, "Address must be at least 10 characters")
        .max(100, "Address must not exceed 100 characters")
        .nullable()
        .or(z.literal(""))
        .transform((value) => (value === "" ? null : value)),

    notes: z
        .string()
        .trim()
        .min(10, "Notes must be at least 10 characters")
        .max(100, "Notes must not exceed 100 characters")
        .nullable()
        .or(z.literal(""))
        .transform((value) => (value === "" ? null : value)),
});

export const PaymentSchema = z.object({
    date_and_time: z
        .string()
        .nonempty("Payment date is required")
        .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date format" }),

    admission_id: z.string().trim(),

    payment: z.coerce
        .number({ invalid_type_error: "Payment must be a number" })
        .min(1, "Payment must be >1"),

    payment_method: z
        .enum(["Cash", "Bkash", "Nagad", "Bank", "Other"])
});

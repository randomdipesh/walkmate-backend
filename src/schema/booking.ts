import { z } from "zod";

export const bookingRequestSchema = z.object({
  dogName: z.string().min(1, "Dog name is required"),
  breedOrSize: z.string().min(1, "Breed or size is required"),
  //   valid date format
  preferredDate: z
    .string()
    .min(1, "Preferred date is required")
    .refine((date) => {
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime());
    }, "Invalid date format"),
  preferredTime: z
    .string()
    .min(1, "Preferred time is required")
    .refine((time) => {
      const [hours, minutes] = time.split(":").map(Number);
      return (
        !isNaN(hours) &&
        !isNaN(minutes) &&
        hours >= 0 &&
        hours < 24 &&
        minutes >= 0 &&
        minutes < 60
      );
    }, "Invalid time format (HH:MM)"),
  duration: z.number().min(1, "Duration is required"),
  specialNotes: z.string().optional(),
});

export type BookingRequest = z.infer<typeof bookingRequestSchema>;

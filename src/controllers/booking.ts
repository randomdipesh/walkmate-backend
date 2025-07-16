import { bookingRequestSchema } from "@/schema/booking";
import { Booking } from "@/types/booking";
import { getBookingData } from "@/utils/data";
import { getWeekRange } from "@/utils/date";
import { Request, Response } from "express";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
// create a booking
export const createBooking = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const validatedData = bookingRequestSchema.parse(data);
    const bookingData = getBookingData();
    // check if there's another booking for the same date and time
    const existingBooking = bookingData.find(
      (booking: Booking) =>
        booking.preferredDate === validatedData.preferredDate &&
        booking.preferredTime === validatedData.preferredTime &&
        booking.isCompleted === false
    );
    // check if there is another booking for the same date and time
    if (existingBooking?.id) {
      return res.json({
        success: false,
        status: "unavailable",
        message:
          "There's another booking for the same date and time, please chose another time",
      });
    }
    // create a new booking
    const booking = {
      id: uuidv4(),
      ...validatedData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isCompleted: false,
    };
    const newBookingData = [...bookingData, booking];
    // save in file
    fs.writeFileSync(
      "src/data/bookingData.json",
      JSON.stringify(newBookingData, null, 2)
    );
    // return the booking id
    res.json({
      success: true,
      status: "confirmed",
      message: "Booking created successfully",
      data: {
        id: booking.id,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      status: "error",
      message: "Invalid booking data",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// mark a booking as completed
export const markCompleted = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const bookingData = getBookingData();
    const booking = bookingData.find((booking: Booking) => booking.id === id);
    // check if the booking exists
    if (!booking) {
      res.json({
        success: false,
        message: "Booking not found",
      });
      return;
    }
    // mark the booking as completed
    const newBookingData = bookingData.map((booking: Booking) =>
      booking.id === id ? { ...booking, isCompleted: true } : booking
    );
    // save in file
    fs.writeFileSync(
      "src/data/bookingData.json",
      JSON.stringify(newBookingData, null, 2)
    );
    res.json({
      success: true,
      message: "Booking marked as completed",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error marking booking as completed",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// get dashboard data
export const dashboardData = async (req: Request, res: Response) => {
  try {
    const bookingData = getBookingData();
    // get upcoming walks
    const today = new Date();
    const upcomingWalks = bookingData
      .filter(
        (booking: Booking) =>
          !booking.isCompleted &&
          new Date(booking.preferredDate) >= new Date(today.toDateString())
      )
      .map((booking: Booking) => ({
        id: booking.id,
        dogName: booking.dogName,
        preferredDate: booking.preferredDate,
        preferredTime: booking.preferredTime,
        duration: booking.duration,
        specialNotes: booking.specialNotes,
      }));

    // get walks this week
    const { monday, friday } = getWeekRange(today);
    const walksThisWeek = bookingData.filter((schedule: Booking) => {
      const preferredDate = new Date(schedule.preferredDate);
      return preferredDate >= monday && preferredDate <= friday;
    }).length;

    // get walk type breakdown in 30min and 60min
    const walkTypeBreakdown = bookingData.reduce(
      (acc: { "30min": number; "60min": number }, booking: Booking) => {
        if (booking.duration === 30) acc["30min"] += 1;
        else if (booking.duration === 60) acc["60min"] += 1;
        return acc;
      },
      { "30min": 0, "60min": 0 }
    );

    res.json({
      success: true,
      data: {
        upcomingWalks,
        walksThisWeek,
        walkTypeBreakdown,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error fetching dashboard data",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

import fs from "fs";

export const getBookingData = () => {
  const data = fs.readFileSync("src/data/bookingData.json", "utf8");
  return JSON.parse(data);
};

export const getWeekRange = (date: Date) => {
  // get the monday and friday of the week of the date
  const dayOfWeek = date.getDay();
  // if the day of the week is sunday, go back 6 days, otherwise go back to the previous day
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(date);
  monday.setDate(date.getDate() + diffToMonday);
  monday.setHours(0, 0, 0, 0);

  const friday = new Date(monday);
  friday.setDate(monday.getDate() + 4);
  friday.setHours(23, 59, 59, 999);

  return { monday, friday };
};

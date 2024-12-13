export const extractStartTime = (timeSlot) => {
  const match = timeSlot.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (match) {
    let [_, hours, minutes, period] = match;
    hours = Number(hours);
    minutes = Number(minutes);

    // Convert to 24-hour format if needed
    if (period.toUpperCase() === "PM" && hours !== 12) {
      hours += 12;
    } else if (period.toUpperCase() === "AM" && hours === 12) {
      hours = 0;
    }

    return { hours, minutes };
  }
  return null;
};

export function maxDate(DaysAfterDisable) {
  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + DaysAfterDisable);
  return maxDate.toISOString().split("T")[0];
}

export function minDate() {
  const today = new Date();
  const minDate = new Date(today);
  minDate.setDate(minDate.getDate() + 1);
  return minDate.toISOString().split("T")[0];
}

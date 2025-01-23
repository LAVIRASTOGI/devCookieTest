import moment from "moment";
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
export function isDateValidWithMoment(dateToCheck, days = 15) {
  const now = moment();
  const fifteenDaysFromNow = moment().add(15, "days"); // 15 days from today

  return (
    moment(dateToCheck).isAfter(now) &&
    moment(dateToCheck).isBefore(fifteenDaysFromNow)
  );
}

// extract a particualar Object from array of objects
export function extractObjectFromArray(array, key, value) {
  return array.find((obj) => obj[key] === value);
}

export function createQuizLevelDescription(startLevelArray, startLevelNumber) {
  if (startLevelArray?.length === 1)
    return `${startLevelNumber + startLevelArray?.length}`;
  return `${startLevelNumber + 1} - ${
    startLevelNumber + startLevelArray?.length
  }`;
}

export function createQuizStepsSkill(
  quizObj,
  stepsArray = ["freeQuiz", "beginner", "intermediate", "expert"],
  quizSubscription
) {
  let newQuizObj = {};
  stepsArray.forEach((step) => {
    if (quizObj[step]) {
      newQuizObj[step] = { ...quizObj[step], ...quizSubscription[step] };
    }
  });
  return newQuizObj;
}

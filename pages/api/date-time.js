import differenceInDays from "date-fns/differenceInDays";

import { getAllExerciseRoutines } from "@/exercises";

import {
  getNextShowDate,
  getNextShowDateStringForHistory,
} from "@/helpers/helpers";

const {
  zonedTimeToUtc,
  utcToZonedTime,
  format,
  getTimezoneOffset,
} = require("date-fns-tz");

const handler = (req, res) => {
  if (req.method === "GET") {
    // Build the response, then send it
    const nextShowDate = getNextShowDate();
    // console.log("nextShowDate ", nextShowDate);
    const nextShowDateFormatted = getNextShowDateStringForHistory(nextShowDate);
    const nextShowString = `${nextShowDate.getFullYear()}-${(
      "0" +
      (nextShowDate.getMonth() + 1)
    ).slice(-2)}-${("0" + nextShowDate.getDate()).slice(-2)}`;
    const nextShowDateStart = new Date(nextShowString + "T20:00:00");
    const nextShowDateEnd = new Date(nextShowString + "T22:00:00");
    // console.log("nextShowDateStart ", nextShowDateStart);
    // console.log("nextShowDateEnd ", nextShowDateEnd);
    const result = getTimezoneOffset("America/New_York", new Date());
    nextShowDateStart.setTime(nextShowDateStart.getTime() + result);
    nextShowDateEnd.setTime(nextShowDateEnd.getTime() + result);
    // console.log("nextShowDateStart LOCAL ", nextShowDateStart);
    // console.log("nextShowDateEnd LOCAL ", nextShowDateEnd);

    const currentExercises = getCurrentExerciseRoutine();

    res.status(200).json({
      nextShowDateStart: nextShowDateStart,
      nextShowDateEnd: nextShowDateEnd,
      nextShowDateUserHistoryKey: nextShowDateFormatted,
      currentExercises: currentExercises,
    });
  }
};

export default handler;

export const getCurrentExerciseRoutine = () => {
  const originDate = new Date("2023-02-21");
  //   console.log("originDate ", originDate);
  const originDay = 2;

  // RIGHT NOW, UTC TIME
  const currDate = new Date();
  //   console.log("currDate ", currDate);

  // Timezone offset from East Coast time
  const result = getTimezoneOffset("America/New_York", currDate);
  // console.log("result ", result);

  // Subtract the offset
  // Now currDate is East Coast time
  currDate.setTime(currDate.getTime() + result);
  //   console.log("currDate ", currDate);

  const daysBetween = differenceInDays(currDate, originDate);
  //   console.log("daysBetween ", daysBetween);

  // DAY of week, UTC
  const todayDayUTC = new Date().getUTCDay();
  // console.log("todayDayUTC ", todayDayUTC);

  // DAY of week, EST (5 hours behind)
  // console.log("today.getUTCHours() ", new Date().getUTCHours());
  let todayDay = todayDayUTC;
  if (new Date().getUTCHours() >= 0 && new Date().getUTCHours() < 5) {
    if (todayDay === 0) {
      todayDay = 6;
    } else {
      todayDay -= 1;
    }
  }
  // console.log("todayDay ", todayDay);
  // How many full weeks have passed? that's 2 shows / week
  let mondaysAndThusdaysPast = 0;
  const weeksPast = Math.floor(daysBetween / 7);
  //   console.log("weeksPast ", weeksPast);
  mondaysAndThusdaysPast = weeksPast * 2;
  //   console.log("mondaysAndThusdaysPast ", mondaysAndThusdaysPast);
  // How many additional days need to be checked that aren't included in the full weeks
  const additionalDays = daysBetween - weeksPast * 7;
  //   console.log("additionalDays ", additionalDays);

  // How many of these additionalDays are Monday or Thursday
  for (let i = 0; i < additionalDays; i++) {
    if ((originDay + i) % 7 === 1 || (originDay + i) % 7 === 4) {
      mondaysAndThusdaysPast += 1;
    }
  }
  //   console.log("mondaysAndThusdaysPast ", mondaysAndThusdaysPast);

  const whichExerciseRoutine =
    mondaysAndThusdaysPast % getAllExerciseRoutines().length;
  //   console.log("whichExerciseRoutine ", whichExerciseRoutine);
  const thisExerciseRoutine = getAllExerciseRoutines()[whichExerciseRoutine];
  console.log("thisExerciseRoutine ", thisExerciseRoutine);
  return thisExerciseRoutine;
};

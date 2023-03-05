import addDays from "date-fns/addDays";

const { getTimezoneOffset } = require("date-fns-tz");

const getNextShowDate = () => {
  var nextThursdayFunc = require("date-fns/nextThursday");
  var nextMondayFunc = require("date-fns/nextMonday");

  // RIGHT NOW, UTC TIME
  const today = new Date();
  // console.log("today ", today);

  // Timezone offset from East Coast time
  const result = getTimezoneOffset("America/New_York", today);
  // console.log("result ", result);

  // Subtract the offset
  // Now today is East Coast time
  today.setTime(today.getTime() + result);
  // console.log("today ", today);

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

  // Next calendar Monday or Thursday
  let nextDate;
  for (let i = 0; i < 7; i++) {
    const result = addDays(today, i);
    // console.log("result ", result);
    if ((todayDay + i) % 7 === 1 || (todayDay + i) % 7 === 4) {
      nextDate = result;
      break;
    }
  }

  return nextDate;
};

// console.log("nextDate ", nextDate);
const getNextShowDateStringForHistory = (dateToFormat) => {
  getNextShowDateStringForHistory;

  // Transform from iso string (ex: 2023-02-24) to new format (ex: v2023_02_24)
  let iso = dateToFormat.toISOString();
  iso = iso.substring(0, iso.indexOf("T"));

  return "v" + iso.split("-").join("_");
};

export { getNextShowDate, getNextShowDateStringForHistory };

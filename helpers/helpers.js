const getNextShowDateStringForHistory = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const nextMonday = new Date(nextDay(today, 1));
  const nextThursday = new Date(nextDay(today, 4));

  let nextDate;
  // Monday is the next show!
  if (nextMonday < nextThursday) {
    nextDate = new Date(nextMonday.getTime());
  }
  // Thursday is the next show!
  if (nextMonday > nextThursday) {
    nextDate = new Date(nextThursday.getTime());
  }

  // Transform from iso string (ex: 2023-02-24) to new format (ex: v2023_02_24)
  let iso = nextDate.toISOString();
  iso = iso.substring(0, iso.indexOf("T"));

  return "v" + iso.split("-").join("_");
};
function nextDay(day, dow) {
  const d = new Date(day.getTime());
  d.setDate(d.getDate() + ((dow + (7 - d.getDay())) % 7));
  return d;
}

export { getNextShowDateStringForHistory };

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const startingDay = firstDay.getDay();
  const lastDay = new Date(year, month + 1, 0);
  const lastingDay = lastDay.getDate();

  const days = [];
  for (let i = 0; i < startingDay; i++) {
    days.push(null);
  }
  for (let d = 1; d <= lastingDay; d++) {
    days.push(d);
  }
  for (let i = lastDay.getDay(); i < 6; i++) {
    days.push(null);
  }
  return days;
}
export { getCalendarDays };

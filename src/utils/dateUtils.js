export const formatDate = (date) => {
  const d = new Date(date);
  const month = '' + (d.getMonth() + 1);
  const day = '' + d.getDate();
  const year = d.getFullYear();

  return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
};

export const formatDisplayDate = (date) => {
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

export const formatFullDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

export const getToday = () => {
  return formatDate(new Date());
};

export const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getMonthDays = (year, month) => {
  const daysInMonth = getDaysInMonth(year, month);
  const days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(formatDate(new Date(year, month, i)));
  }
  return days;
};

export const getDayOfWeek = (dateStr) => {
  const options = { weekday: 'long' };
  return new Date(dateStr).toLocaleDateString(undefined, options);
};

export const getWeekNumber = (dateStr) => {
  const d = new Date(dateStr);
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
};

export const isToday = (dateStr) => {
  return dateStr === getToday();
};

export const isPast = (dateStr) => {
  return new Date(dateStr).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);
};

export const daysBetween = (dateStr1, dateStr2) => {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const diffDays = Math.round(Math.abs((new Date(dateStr2) - new Date(dateStr1)) / oneDay));
  return diffDays;
};

export const getLastNDays = (n) => {
  const days = [];
  for (let i = 0; i < n; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(formatDate(d));
  }
  return days.reverse();
};

export const getMonthName = (month) => {
  const d = new Date();
  d.setMonth(month);
  return d.toLocaleDateString(undefined, { month: 'long' });
};

export const getStartOfWeek = (dateStr) => {
  const d = new Date(dateStr);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  return formatDate(new Date(d.setDate(diff)));
};

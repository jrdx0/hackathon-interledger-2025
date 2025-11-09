import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatDayTime = (date: string) => {
  return dayjs.utc(date).tz(dayjs.tz.guess()).format('DD/MM/YYYY hh:mm A');
};

export const formatDayShort = (date: string) => {
  return dayjs.utc(date).tz(dayjs.tz.guess()).format('DD/MM/YYYY');
};

export const formatDay = (date: string) => {
  return dayjs.utc(date).format('DD/MM/YYYY'); // UTC plano
};

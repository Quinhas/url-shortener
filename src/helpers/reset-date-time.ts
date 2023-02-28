import dayjs from 'dayjs';

export function resetDateTime(date: Date): Date {
  return dayjs(date).set('ms', 0).set('s', 0).set('m', 0).set('h', 0).toDate();
}

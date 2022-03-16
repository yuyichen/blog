import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";

dayjs.locale("zh-cn");

dayjs.extend(relativeTime);

/**
 * Format a date string to a human readable format
 * @param date - The date to be formatted.
 * @param [format=YYYY-MM-DD HH:mm:ss] - The format of the date.
 * @returns a string.
 */
export const formatDate = (date, format = "YYYY-MM-DD HH:mm:ss") => {
  const updateMoment = dayjs(date);
  const isUpdateRecent = dayjs() - updateMoment < 7 * 24 * 3600000;
  return isUpdateRecent
    ? updateMoment.fromNow()
    : updateMoment.format(format);
};

export default function getElapsedTime(timeString: string) {
  const currentTime = new Date();
  const givenTime = new Date(timeString);

  const OFFSET = 1000 * 60 * 60 * 9;

  const elapsedMilliseconds =
    currentTime.getTime() - givenTime.getTime() + OFFSET;
  const elapsedMinutes = Math.floor(elapsedMilliseconds / (1000 * 60));

  const MINUTE = 60;
  const MINUTES_IN_DAY = MINUTE * 24;
  const MINUTES_IN_WEEK = MINUTES_IN_DAY * 7;

  if (elapsedMinutes < 1) {
    return '방금 전';
  }
  if (elapsedMinutes < MINUTE) {
    return `${elapsedMinutes}분 전`;
  }
  if (elapsedMinutes < MINUTES_IN_DAY) {
    const elapsedHours = Math.floor(elapsedMinutes / 60);
    return `${elapsedHours}시간 전`;
  }

  if (elapsedMinutes < MINUTES_IN_WEEK) {
    const elapsedDays = Math.floor(elapsedMinutes / (60 * 24));
    return `${elapsedDays}일 전`;
  }

  return timeString.slice(0, 10).replace(/-/g, '.');
}

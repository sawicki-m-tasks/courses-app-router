export default function formatDuration(duration) {
  const hours = Math.trunc(duration / 60);
  const minutes = duration - hours * 60;

  return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}

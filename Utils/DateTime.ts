const formatTimestamp = (timestamp: number): string => {
  if (!timestamp) return '';

  const date = new Date(timestamp);

  const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  const ampm = date.getHours() >= 12 ? 'pm' : 'am';
  const month = date.getMonth() + 1; // JavaScript months are 0-11
  const day = date.getDate();
  const year = date.getFullYear();

  return `${hours}:${minutes}${ampm}, ${month}/${day}/${year}`;
}

export { formatTimestamp };
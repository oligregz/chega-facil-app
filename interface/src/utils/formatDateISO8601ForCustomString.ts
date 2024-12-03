export function formatDateISO8601ForCustomString(dateString: string | undefined): string {

  if (!dateString) return 'dd-mm-yyyy às hh:mm'

  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}-${month}-${year} às ${hours}:${minutes}`;
}

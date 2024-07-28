export function formatDateToWords(dateInput) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];

  const date = new Date(dateInput);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${day}  ${months[month]}, ${year}`;
}

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getMonthName = (monthNumber) => {
  const date = new Date(2000, monthNumber, 1); // Use a dummy date
  return date.toLocaleString('en-US', { month: 'long' });
};

export function formatDate(date, format = "dateTime") {
  const options = {
    dateTime: {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    },
    time: {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    },
    date: {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    },
    monthYear: {
      month: "short",
      day: "2-digit",
      year: "numeric",
    },
  };
  return new Date(date).toLocaleString("en", options[format]);
}

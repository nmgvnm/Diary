const pad = (number) => number.toString().padStart(2, "0");

const formatDate = (date, format = "YYYY.MM.DD hh:mm:ss") => {
  const year = date.getFullYear().toString().slice(-2);
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  let formattedDate = format
    .replace("YYYY", date.getFullYear())
    .replace("YY", year)
    .replace("MM", month)
    .replace("DD", day)
    .replace("hh", hours)
    .replace("mm", minutes)
    .replace("ss", seconds);

  if (format.includes("SSS")) {
    const milliseconds = date.getMilliseconds().toString().padStart(3, "0");
    formattedDate = formattedDate.replace("SSS", milliseconds);
  }

  return formattedDate;
};

export default formatDate;

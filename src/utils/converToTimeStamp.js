const dateToTimestamp = (dateString) => {
  const [datePart, timePart] = dateString.split(" ");
  const [day, month, year] = datePart.split("/").map(Number);
  const [hours, minutes] = timePart.split(":").map(Number);
  const date = new Date(year, month - 1, day, hours, minutes);
  const timestamp = Math.floor(date.getTime() / 1000);

  return timestamp;
};

module.exports = dateToTimestamp;

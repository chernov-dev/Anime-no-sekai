export const handleDate = (nextAiringEpisodeTime: number) => {
  // convert unix time to date and time
  if (nextAiringEpisodeTime === undefined) {
    return;
  }
  const date = new Date(nextAiringEpisodeTime * 1000);
  return formatDate({date});
};

export const formatDate = ({date, showSeconds} : {date: Date, showSeconds? : boolean}) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  const seconds = showSeconds ? ":" + ("0" + date.getSeconds()).substr(-2) : "";
  return month + " " + day + ", " + hours + ":" + minutes.substr(-2) + seconds;
};

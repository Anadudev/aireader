export const formatDateString = (dateString: string) => {
  try {
    const dateObject = new Date(dateString);

    if (isNaN(dateObject.getTime())) {
      console.error(`Invalid Date: ${dateString}`);
      return null;
    }

    const year = dateObject.getFullYear();
    const month = dateObject.toLocaleString("en-US", { month: "short" });
    const day = dateObject.getDate();

    return `${month} ${day}, ${year}`;
  } catch (error) {
    console.error(`Error formatting date: ${error}`);
    // If error occurs, try the next format.
  }

  return dateString;
};

const stringLimiter = (str: string, limit = 50) => {
  const div = document.createElement("div");
  div.innerHTML = str;
  const text = div.textContent || div.innerText || "";
  if (text && text.length > limit && limit > 0) {
    return text.substring(0, limit) + "...";
  }
  return str;
};

export default stringLimiter;

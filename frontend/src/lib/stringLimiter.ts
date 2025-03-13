const stringLimiter = (str: string, limit = 50) => {
  if (str && str.length > limit) {
    return str.substring(0, limit) + "...";
  }
  return str;
};

export default stringLimiter;

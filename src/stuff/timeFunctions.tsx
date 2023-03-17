export const getDate = (str: string) => {
  let year = str.substring(0, 4);
  let month = str.substring(5, 7);
  let day = str.substring(8, 10);

  return day + "." + month + "." + year;
};
export const getTime = (str: string) => {
  return str.substring(11, 16);
};

export const getRandomString = () => Math.random().toString(36).substring(2, 15);

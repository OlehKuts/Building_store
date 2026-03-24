export const getCurrentStringDate = () => {
  const dateObj = new Date();
  return `${dateObj.getDate()}.${dateObj.getMonth() + 1}.${dateObj.getFullYear()}`;
};

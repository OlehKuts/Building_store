export const getAreaRowsCount = (stringLength, basicTextareaWidth = 20) => {
  if (!stringLength) return 1;
  return basicTextareaWidth * 2.4 > stringLength
    ? 1
    : Math.ceil(stringLength / (basicTextareaWidth * 2.4));
};

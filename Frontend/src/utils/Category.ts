export const getFirstWord = (category: string): string => {
  const parts = category.split('/');
  return parts[0];
};

export const getMiddleWords = (category: string): string => {
  const parts = category.split('/');
  if (parts.length <= 2) return '';
  return parts.slice(1, -1).join('/');
};


export const getLastWord = (category: string): string => {
  const parts = category.split("/");
  return parts[parts.length - 1];
};

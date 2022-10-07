export const decodeURIData = (data: string | string[]) => {
  if (typeof data === "string") return decodeURIComponent(data as string);
  return data.map((item) => decodeURIComponent(item));
};

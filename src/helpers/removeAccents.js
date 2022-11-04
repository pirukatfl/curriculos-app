export const removeAccents = (value) => {
  if (!value) {
    return "";
  }
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f-'']/g, "")
    .replace(" ", "");
};

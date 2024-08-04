export const capitalizeFirstName = (name) => {
  if (!name) return ""; // Return an empty string if name is falsy
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

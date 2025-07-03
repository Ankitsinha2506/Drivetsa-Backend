// utils/getCityPrefix.js
function getCityPrefix(address) {
  if (!address) return "GEN";
  const city = address.split(",").pop().trim();
  return city.slice(0, 3).toUpperCase();
}

export default getCityPrefix;
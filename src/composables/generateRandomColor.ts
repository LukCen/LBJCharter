export const generateRandomColor = () => {
  // Generate one random number for all 3 channels (R+G+B)
  const num = Math.floor(Math.random() * 16777216); // 0 to 0xFFFFFF
  // Convert to hex, pad to 6 digits, add #
  return `#${num.toString(16).padStart(6, '0')}`;
};

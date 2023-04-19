module.exports = (clear, encodingTable, encoded) => {
  const originalSize = clear.length * 8; // 8 bits per character
  const encodedSize = encoded.length;
  return 100 - encodedSize / originalSize * 100;
};
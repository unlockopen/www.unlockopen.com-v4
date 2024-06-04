export const appendSuffixToFilename = (path, suffix) => {
  const pos = path.lastIndexOf(".");
  if (pos === -1) return path + suffix;
  return path.substring(0, pos) + suffix + path.substring(pos);
};

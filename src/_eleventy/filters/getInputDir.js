export const getInputDir = page => {
  const inputPath = page.inputPath;
  const inputDir = inputPath.substring(0, inputPath.lastIndexOf("/"));
  return inputDir;
};

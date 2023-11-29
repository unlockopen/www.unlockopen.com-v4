/** All blog posts as a collection. */
const getAllPosts = collection => {
  const projects = collection.getFilteredByGlob('./src/posts/*.md');
  return projects.reverse();
};

/** All markdown files as a collection for sitemap.xml */
const onlyMarkdown = collection => {
  return collection.getFilteredByGlob('./src/**/*.md');
};

const sgAtoms = collection => {
  return collection.getFilteredByGlob('**/style-guide/atoms/**/*');
};

const sgComponents = collection => {
  return collection.getFilteredByGlob('**/style-guide/components/**/*');
};

module.exports = {
  getAllPosts,
  onlyMarkdown,
  sgAtoms,
  sgComponents
};

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
  return collection.getFilteredByGlob('**/style-guide/atoms/**/*').sort((a, b) => {
    if (b.data.title > a.data.title) return -1;
    else if (b.data.title < a.data.title) return 1;
    else return 0;
  });
};

const sgComponents = collection => {
  return collection.getFilteredByGlob('**/style-guide/components/**/*').sort((a, b) => {
    if (b.data.title > a.data.title) return -1;
    else if (b.data.title < a.data.title) return 1;
    else return 0;
  });
};

module.exports = {
  getAllPosts,
  onlyMarkdown,
  sgAtoms,
  sgComponents
};

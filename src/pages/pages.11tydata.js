module.exports = {
  layout: 'page',
  permalink: function (data) {
    // Slug override for localized URL slugs
    if (data.slugOverride) {
      return `/${this.slugify(data.slugOverride)}/`;
    }
  }
};

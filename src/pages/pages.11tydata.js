module.exports = {
  layout: 'page',
  permalink: function (data) {
    if (data.slugOverride) {
      return `/${this.slugify(data.slugOverride)}/`;
    }
  }
};

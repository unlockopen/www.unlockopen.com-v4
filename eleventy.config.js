// JSDoc comment: Hint VS Code for eleventyConfig autocompletion. © Henry Desroches - https://gist.github.com/xdesro/69583b25d281d055cd12b144381123bf

/**
 *  @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig
 */

const packageVersion = require('./package.json').version;
const fs = require('fs');
const prettify = require('html-prettify');

// module import filters
const {
  limit,
  toHtml,
  where,
  toISOString,
  rawComponent,
  formatDate,
  toAbsoluteUrl,
  stripHtml,
  minifyCss,
  minifyJs,
  mdInline,
  console
} = require('./config/filters/index.js');

// module import shortcodes
const {
  brace,
  imageShortcodePlaceholder,
  liteYoutube
} = require('./config/shortcodes/index.js');

// module import collections
const {
  getAllPosts,
  onlyMarkdown,
  sgAtoms,
  sgComponents
} = require('./config/collections/index.js');

// plugins
const markdownLib = require('./config/plugins/markdown.js');
const {EleventyRenderPlugin} = require('@11ty/eleventy');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const {slugifyString} = require('./config/utils/index.js');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const bundlerPlugin = require('@11ty/eleventy-plugin-bundle');
const pluginWebc = require('@11ty/eleventy-plugin-webc');
const imageConfig = require('./config/plugins/image.js');
const {eleventyImagePlugin} = require('@11ty/eleventy-img');

module.exports = eleventyConfig => {
  // 	--------------------- Custom Watch Targets -----------------------
  eleventyConfig.addWatchTarget('./src/assets');
  eleventyConfig.addWatchTarget('./src/_includes/**/*');

  // --------------------- layout aliases -----------------------
  eleventyConfig.addLayoutAlias('plain', 'plain.webc');
  eleventyConfig.addLayoutAlias('base', 'base.webc');
  eleventyConfig.addLayoutAlias('home', 'home.webc');
  eleventyConfig.addLayoutAlias('post', 'post.webc');
  eleventyConfig.addLayoutAlias('sg-wrapper', 'sg-wrapper.webc');
  eleventyConfig.addLayoutAlias('sg-atom', 'sg-atom.webc');
  eleventyConfig.addLayoutAlias('sg-component', 'sg-component.webc');

  // 	---------------------  Custom filters -----------------------
  eleventyConfig.addFilter('limit', limit);
  eleventyConfig.addFilter('where', where);
  eleventyConfig.addFilter('toHtml', toHtml);
  eleventyConfig.addFilter('toIsoString', toISOString);
  eleventyConfig.addFilter('rawComponent', rawComponent);
  eleventyConfig.addFilter('formatDate', formatDate);
  eleventyConfig.addFilter('toAbsoluteUrl', toAbsoluteUrl);
  eleventyConfig.addFilter('stripHtml', stripHtml);
  eleventyConfig.addFilter('slugify', slugifyString);
  eleventyConfig.addFilter('cssmin', minifyCss);
  eleventyConfig.addFilter('md', mdInline);
  eleventyConfig.addFilter('console', console);
  eleventyConfig.addNunjucksAsyncFilter('jsmin', minifyJs);
  eleventyConfig.addFilter('toJson', JSON.stringify);
  eleventyConfig.addFilter('fromJson', JSON.parse);
  eleventyConfig.addFilter('keys', Object.keys);
  eleventyConfig.addFilter('values', Object.values);
  eleventyConfig.addFilter('entries', Object.entries);

  // 	--------------------- Custom shortcodes ---------------------
  eleventyConfig.addPairedShortcode('brace', brace);
  eleventyConfig.addNunjucksAsyncShortcode('imagePlaceholder', imageShortcodePlaceholder);
  eleventyConfig.addShortcode('youtube', liteYoutube);
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`); // current year, stephanie eckles
  eleventyConfig.addShortcode('packageVersion', () => `v${packageVersion}`);
  eleventyConfig.addPairedShortcode('prettify', content => {
    return prettify(content);
  });

  // 	--------------------- Custom transforms ---------------------
  eleventyConfig.addPlugin(require('./config/transforms/html-config.js'));

  // 	--------------------- Custom Template Languages ---------------------
  eleventyConfig.addPlugin(require('./config/template-languages/css-config.js'));
  eleventyConfig.addPlugin(require('./config/template-languages/js-config.js'));
  eleventyConfig.addPlugin(eleventyImagePlugin, imageConfig);

  // 	--------------------- Custom collections -----------------------
  eleventyConfig.addCollection('posts', getAllPosts);
  eleventyConfig.addCollection('onlyMarkdown', onlyMarkdown);
  eleventyConfig.addCollection('sgAtoms', sgAtoms);
  eleventyConfig.addCollection('sgComponents', sgComponents);

  // 	--------------------- Plugins ---------------------
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.setLibrary('md', markdownLib);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(bundlerPlugin);

  eleventyConfig.addPlugin(pluginWebc, {
    components: ['src/_includes/**/*.webc', 'npm:@11ty/eleventy-img/*.webc']
  });

  // 	--------------------- Passthrough File Copy -----------------------
  // same path
  ['src/assets/fonts/', 'src/assets/images/'].forEach(path =>
    eleventyConfig.addPassthroughCopy(path)
  );

  // social icons to root directory
  eleventyConfig.addPassthroughCopy({
    'src/assets/images/favicon/*': '/'
  });

  // node_modules
  eleventyConfig.addPassthroughCopy({
    'node_modules/@zachleat/seven-minute-tabs/seven-minute-tabs.js':
      'assets/scripts/seven-minute-tabs.js'
  });

  // 	--------------------- general config -----------------------
  return {
    markdownTemplateEngine: 'webc',
    dataTemplateEngine: 'webc',
    htmlTemplateEngine: 'webc',
    dir: {
      output: 'dist',
      input: 'src',
      includes: '_includes',
      layouts: '_layouts'
    }
  };
};

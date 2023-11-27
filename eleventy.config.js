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
const {getAllPosts, onlyMarkdown, sgAtoms} = require('./config/collections/index.js');

// plugins
const markdownLib = require('./config/plugins/markdown.js');
const {EleventyRenderPlugin} = require('@11ty/eleventy');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const {slugifyString} = require('./config/utils/index.js');
const {escape} = require('lodash');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const bundlerPlugin = require('@11ty/eleventy-plugin-bundle');
const EleventyPluginOgImage = require('eleventy-plugin-og-image');
const pluginWebc = require('@11ty/eleventy-plugin-webc');

module.exports = eleventyConfig => {
  // 	--------------------- Custom Watch Targets -----------------------
  eleventyConfig.addWatchTarget('./src/assets');
  eleventyConfig.addWatchTarget('./utils/*.js');

  // --------------------- layout aliases -----------------------
  eleventyConfig.addLayoutAlias('plain', 'plain.webc');
  eleventyConfig.addLayoutAlias('base', 'base.webc');
  eleventyConfig.addLayoutAlias('iframe', 'iframe.webc');
  eleventyConfig.addLayoutAlias('sg-wrapper', 'sg-wrapper.webc');
  eleventyConfig.addLayoutAlias('sg-static', 'sg-static.webc');
  eleventyConfig.addLayoutAlias('home', 'home.webc');
  eleventyConfig.addLayoutAlias('post', 'post.webc');

  // 	---------------------  Custom filters -----------------------
  eleventyConfig.addFilter('limit', limit);
  eleventyConfig.addFilter('where', where);
  eleventyConfig.addFilter('escape', escape);
  eleventyConfig.addFilter('toHtml', toHtml);
  eleventyConfig.addFilter('toIsoString', toISOString);
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

  // 	--------------------- Custom collections -----------------------
  eleventyConfig.addCollection('posts', getAllPosts);
  eleventyConfig.addCollection('onlyMarkdown', onlyMarkdown);
  eleventyConfig.addCollection('sgAtoms', sgAtoms);

  // 	--------------------- Plugins ---------------------
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.setLibrary('md', markdownLib);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(bundlerPlugin);

  eleventyConfig.addPlugin(pluginWebc, {
    components: ['src/_includes/**/*.webc', 'npm:@11ty/eleventy-img/*.webc']
  });

  eleventyConfig.addPlugin(EleventyPluginOgImage, {
    satoriOptions: {
      fonts: [
        {
          name: 'Geologica',
          data: fs.readFileSync('src/assets/fonts/geologica/geologica-bold.woff2'),
          weight: 700,
          style: 'normal'
        },
        {
          name: 'Geologica',
          data: fs.readFileSync('src/assets/fonts/geologica/geologica-light.woff2'),
          weight: 400,
          style: 'normal'
        }
      ]
    }
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
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      output: 'dist',
      input: 'src',
      includes: '_includes',
      layouts: '_layouts'
    }
  };
};

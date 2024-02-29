/**
 * Configures Eleventy with various settings, collections, plugins, filters, shortcodes, and more.
 * Hint VS Code for eleventyConfig autocompletion.
 * © Henry Desroches - https://gist.github.com/xdesro/69583b25d281d055cd12b144381123bf
 * @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig -
 * @returns {Object} -
 */

import {readFileSync} from 'node:fs';
const pkg = JSON.parse(readFileSync('./package.json'));

//  config import
import {getAllArticles, onlyMarkdown, tagList} from './src/_eleventy/collections.js';
import events from './src/_eleventy/events.js';
import filters from './src/_eleventy/filters.js';
import plugins from './src/_eleventy/plugins.js';
import shortcodes from './src/_eleventy/shortcodes.js';

export default async function (eleventyConfig) {
  // --------------------- layout aliases
  eleventyConfig.addLayoutAlias('base', 'base.njk');
  eleventyConfig.addLayoutAlias('page', 'page.njk');
  eleventyConfig.addLayoutAlias('article', 'article.njk');
  eleventyConfig.addLayoutAlias('archive', 'archive.njk');
  eleventyConfig.addLayoutAlias('tags', 'tags.njk');

  //	---------------------  Collections
  eleventyConfig.addCollection('articles', getAllArticles);
  eleventyConfig.addCollection('onlyMarkdown', onlyMarkdown);
  eleventyConfig.addCollection('tagList', tagList);

  // ---------------------  Plugins
  eleventyConfig.addPlugin(plugins.htmlConfig);
  eleventyConfig.addPlugin(plugins.cssConfig);
  eleventyConfig.addPlugin(plugins.jsConfig);

  eleventyConfig.addPlugin(plugins.EleventyRenderPlugin);
  eleventyConfig.addPlugin(plugins.rss);
  eleventyConfig.addPlugin(plugins.syntaxHighlight);

  eleventyConfig.addPlugin(plugins.bundler, {
    hoistDuplicateBundlesFor: ['css', 'js']
  });

  eleventyConfig.addPlugin(plugins.webc, {
    components: ['./src/webc/**/*.webc'],
    useTransform: true,
    transformData: {
      pkg
    }
  });

  // 	--------------------- Library
  eleventyConfig.setLibrary('md', plugins.markdown);

  // --------------------- Filters
  eleventyConfig.addFilter('toIsoString', filters.toISOString);
  eleventyConfig.addFilter('formatDate', filters.formatDate);
  eleventyConfig.addFilter('cssmin', filters.minifyCss);
  eleventyConfig.addNunjucksAsyncFilter('jsmin', filters.minifyJs);
  eleventyConfig.addFilter('splitlines', filters.splitlines);
  eleventyConfig.addFilter('toAbsoluteUrl', filters.toAbsoluteUrl);
  eleventyConfig.addFilter('slugify', filters.slugifyString);
  eleventyConfig.addFilter('escapeHtml', filters.escapeHtml);

  // --------------------- Shortcodes
  eleventyConfig.addShortcode('svg', shortcodes.svg);
  eleventyConfig.addShortcode('image', shortcodes.image);
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);
  eleventyConfig.addFilter('markdown', content => {
    return plugins.markdown.render(content);
  });

  // --------------------- Events ---------------------
  if (process.env.ELEVENTY_RUN_MODE === 'serve') {
    eleventyConfig.on('eleventy.after', events.svgToJpeg);
  }

  // --------------------- Passthrough File Copy

  // -- same path
  ['src/assets/fonts/', 'src/assets/images/template', 'src/assets/og-images'].forEach(
    path => eleventyConfig.addPassthroughCopy(path)
  );

  // -- to root
  eleventyConfig.addPassthroughCopy({
    'src/assets/images/favicon/*': '/'
  });

  // -- node_modules
  eleventyConfig.addPassthroughCopy({
    'node_modules/lite-youtube-embed/src/lite-yt-embed.{css,js}': `assets/scripts/`
  });

  // --------------------- Build Settings
  eleventyConfig.setDataDeepMerge(true);
  // eleventyConfig.setQuietMode(true);

  // --------------------- general config
  return {
    htmlTemplateEngine: false,
    markdownTemplateEngine: 'njk',

    dir: {
      output: 'dist',
      input: 'src',
      includes: '_includes',
      layouts: '_layouts'
    }
  };
}

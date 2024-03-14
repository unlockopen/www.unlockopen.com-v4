// Eleventy
import {EleventyRenderPlugin} from "@11ty/eleventy";
import rss from "@11ty/eleventy-plugin-rss";
import bundler from "@11ty/eleventy-plugin-bundle";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import webc from "@11ty/eleventy-plugin-webc";

// vendor
import embedTwitter from "eleventy-plugin-embed-twitter";

// custom
import markdown from "./plugins/markdown.js";

// Custom transforms
import htmlConfig from "./plugins/html-config.js";

// Custom template language
import cssConfig from "./plugins/css-config.js";
import jsConfig from "./plugins/js-config.js";

export default {
  EleventyRenderPlugin,
  rss,
  bundler,
  syntaxHighlight,
  webc,
  embedTwitter,
  markdown,
  htmlConfig,
  cssConfig,
  jsConfig
};

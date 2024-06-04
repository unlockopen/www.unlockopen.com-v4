import {appendSuffixToFilename} from "./filters/appendSuffixToFilename.js";
import {getInputDir} from "./filters/getInputDir.js";
import {base64Format} from "./filters/base64.js";
import {toISOString, formatDate} from "./filters/dates.js";
import {minifyCss, minifyJs} from "./filters/minify.js";
import {readingTime} from "./filters/readingTime.js";
import {splitlines} from "./filters/splitlines.js";
import {striptags} from "./filters/striptags.js";
import {toAbsoluteUrl} from "./filters/toAbsoluteUrl.js";
import {slugifyString} from "./filters/slugify.js";
import {escapeHtml} from "./filters/escapeHtml.js";

export default {
  appendSuffixToFilename,
  getInputDir,
  base64Format,
  toISOString,
  formatDate,
  minifyCss,
  minifyJs,
  readingTime,
  splitlines,
  striptags,
  toAbsoluteUrl,
  slugifyString,
  escapeHtml
};

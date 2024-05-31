import { readdir, access, readFile } from "node:fs/promises";
import { join, extname } from "node:path";
import yaml from "js-yaml";

const IMG_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"]);

function isImage(filename) {
    return IMG_EXTENSIONS.has(extname(filename).toLowerCase());
}

async function findImages(directories) {
  const images = [];

  for (const dir of directories) {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const filename = entry.name;
      const fullPath = join(dir, filename);
      if (entry.isDirectory()) {
        const subentries = await findImages([fullPath]);
        images.push(...subentries);
      } else if (isImage(filename)) {
        images.push(fullPath);
      }
    }
  }

  return images;
}

async function readYamlFile(filePath) {
  try {
    await access(filePath);
  } catch (err) {
    console.log(`Missing metadata for image "${ filePath.replace(".yml", "") }".` );
    return null;
  }

  try {
      const content = await readFile(filePath, 'utf8');
      return yaml.load(content);
  } catch (err) {
      console.log(`Malformed metadata for image "${ filePath.replace(".yml", "") }".` );
      throw err;
  }
}

function creditText(data) {
    const attr = [];
    let type = data.type;

    if (data.creditText) {
        return `${type} credit: ${data.creditText}`;
    }

    if (data.url) {
        type = `[${type}](${data.url})`;
    }

    let author = data.author;
    if (author) {
        if (author.url) {
            author = `[${data.author.name}](${data.author.url})`;
        }
        attr.push(`${type} by ${author}`);
    }

    let license = data.license;
    if (license && license.name && license.name.toLowerCase() != "unsplash license") {
        license = license.url ? `[${license.name}](${license.url})` : `${license.name}`;
        attr.push(license);
    }

    if (attr.length > 0) {
        return attr.join(", ");
    }

    return "";
}


async function buildIndexWithYamlData(images) {
  const index = {};

  for (const imagePath of images) {
    const ymlPath = `${imagePath}.yml`;
    const yamlData = await readYamlFile(ymlPath) || {};
    if (yamlData) {
        yamlData.type = yamlData.type || "Photo";
        yamlData.src = imagePath;
    }
    index[imagePath] = yamlData;
  }
  return index;
}

async function main() {
  const directories = ["./src/assets/images/", "./src/articles/"];
  let images = await findImages(directories);
  let index = await buildIndexWithYamlData(images);
  let md;
  function normalizePath(path) {
      if (path.startsWith(".")) {
          path = path.substring(1);
      }
      if (path.startsWith("/")) {
          path = path.substring(1);
      }
      return path;
  }
  function getData(path) {
      path = normalizePath(path)
      return index[path];
  }

  function getCaption(path, customCaptionText) {
      const data = getData(path);
      const caption = customCaptionText || data.caption;
      const creditTxt = creditText(data);
			if (!caption && !creditTxt) return null;
      return md(caption ? `${caption} (${creditTxt})` : `(${creditTxt})`);
  }

  function getCreditText(path) {
      const data = getData(path);
      const creditTxt = creditText(data);
      return md(creditTxt);
  }

  function getAlt(path) {
      const data = getData(path);
      return md(data.alt || "");
  }

  function setMarkdownEngine(engine) {
      md = engine;
  }
  return {
      data: index,
      setMarkdownEngine,
      getCaption,
      getAlt,
      getData,
      getCreditText
  }
}

export default main;


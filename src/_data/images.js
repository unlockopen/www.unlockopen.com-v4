import { readdir, access, readFile } from "node:fs/promises";
import { join, extname } from "node:path";
import yaml from "js-yaml";

const IMG_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"]);

function isImage(filename) {
    return IMG_EXTENSIONS.has(extname(filename).toLowerCase());
}

async function findImages(dir) {
    const images = [];
    const entries = await readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const filename = entry.name;
      const fullPath = join(dir, filename);
      if (entry.isDirectory()) {
          const subentries = await findImages(fullPath);
          images.push(...subentries);
      } else if (isImage(filename)) {
          images.push(fullPath);
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

const ATTRIBUTION_NOT_REQUIRED = new Set(["unsplash license", "public domain"]);

function attributionRequired(data) {
    // assumes UnlockOpen copyright unless otherwise-mentioned
    if (data.license && data.license.name) {
        const license = data.license.name.toLowerCase();
        if (ATTRIBUTION_NOT_REQUIRED.has(license)) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}

function attribution(data) {
    const attr = [];
    let type = data.type;
    type = type.charAt(0).toUpperCase() + type.slice(1);
    if (data.url) {
        type = `[${type}](${data.url})`;
    }
    
    let author = data.author;
    if (author) {
        if (author.url) {
            author = `[${data.author.name}](${data.author.url})`;
        }
        attr.push(type, "by", author);
    }
    
    let license = data.license;
    if (license && license.name) {
        license = license.url ? `([${license.name}](${license.url}))` : `(${license.name})`;
        attr.push(license);
    }
    
    if (attr.length > 0) {
        return attr.join(" ") + ".";
    }

    return "";
}

async function buildIndexWithYamlData(images) {
  const index = {};

  for (const imagePath of images) {
    const ymlPath = `${imagePath}.yml`;
    const yamlData = await readYamlFile(ymlPath) || {};
    if (yamlData) {
        yamlData.type = yamlData.type || "photo";
        yamlData.src = imagePath;
        yamlData.attributionRequired = attributionRequired(yamlData);
        yamlData.attribution = attribution(yamlData);
    }
    index[imagePath] = yamlData;
  }
  return index;
}

export default async function(data) {
  let images = await findImages("./src/assets/images/");
  let index = await buildIndexWithYamlData(images);
  return index;
};

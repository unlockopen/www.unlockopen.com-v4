import Image from "@11ty/eleventy-img";
import path from "path";
import htmlmin from "html-minifier-terser";

const stringifyAttributes = attributeMap => {
  return Object.entries(attributeMap)
    .map(([attribute, value]) => {
      if (typeof value === "undefined") return "";
      return `${attribute}="${value}"`;
    })
    .join(" ");
};

function main(imgAttr) {
  return async function eleventyImage(
    src,
    alt = "",
    caption = "",
    loading = "lazy",
    className,
    sizes = "90vw",
    widths = [440, 650, 960, 1200],
    formats = ["avif", "webp", "jpeg"]
  ) {
    // set correct path to image src
    let imgSrc = src;
    if (src.startsWith("/assets")) {
      imgSrc = `./src${src}`;
    } else {
      const dir = path.dirname(this.page.inputPath);
      imgSrc = path.join(dir, src);
    }

    const metadata = await Image(imgSrc, {
      widths: [...widths],
      formats: [...formats],
      urlPath: "/assets/images/",
      outputDir: "./dist/assets/images/",
      filenameFormat: (id, src, width, format, options) => {
        const extension = path.extname(src);
        const name = path.basename(src, extension);
        return `${name}-${width}w.${format}`;
      }
    });

    const lowsrc = metadata.jpeg[metadata.jpeg.length - 1];

    const imageSources = Object.values(metadata)
      .map(imageFormat => {
        return `  <source type="${imageFormat[0].sourceType}" srcset="${imageFormat
          .map(entry => entry.srcset)
          .join(", ")}" sizes="${sizes}">`;
      })
      .join("\n");

    caption = imgAttr.getCaption(imgSrc, caption);
    alt = alt || imgAttr.getAlt(imgSrc);

    const imgageAttributes = stringifyAttributes({
      src: lowsrc.url,
      width: lowsrc.width,
      height: lowsrc.height,
      alt,
      loading,
      decoding: loading === "eager" ? "sync" : "async"
    });

    const imageElement = caption
      ? `<figure slot="image" class="flow ${className ? `${className}` : ""}">
				<picture>
					${imageSources}
					<img
					${imgageAttributes}>
				</picture>
				<figcaption>${caption}</figcaption>
			</figure>`
      : `<picture slot="image" class="${className ? `${className}` : ""}">
				${imageSources}
				<img
				${imgageAttributes}>
			</picture>`;

    return htmlmin.minify(imageElement, {collapseWhitespace: true});
  };
}

export default main;

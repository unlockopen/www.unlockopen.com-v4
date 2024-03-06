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

const eleventyImage = async (
  src,
  alt = "",
  caption,
  loading = "lazy",
  className,
  sizes = "90vw",
  widths = [440, 650, 960, 1200],
  formats = ["avif", "webp", "jpeg"]
) => {
  const metadata = await Image(src, {
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

  // Getting the URL to use
  let imgSrc = src;
  if (!imgSrc.startsWith(".")) {
    const inputPath = this.page.inputPath;
    const pathParts = inputPath.split("/");
    pathParts.pop();
    imgSrc = `${pathParts.join("/")}/${src}`;
  }

  const imageSources = Object.values(metadata)
    .map(imageFormat => {
      return `  <source type="${imageFormat[0].sourceType}" srcset="${imageFormat
        .map(entry => entry.srcset)
        .join(", ")}" sizes="${sizes}">`;
    })
    .join("\n");

  const imgageAttributes = stringifyAttributes({
    src: lowsrc.url,
    width: lowsrc.width,
    height: lowsrc.height,
    alt,
    loading,
    decoding: "async"
  });

  const imageElement = caption
    ? `<figure class="flow ${className ? `${className}` : ""}">
				<picture>
					${imageSources}
					<img
					${imgageAttributes}>
				</picture>
				<figcaption>${caption}</figcaption>
			</figure>`
    : `<picture class="${className ? `${className}` : ""}">
				${imageSources}
				<img
				${imgageAttributes}>
			</picture>`;

  return htmlmin.minify(imageElement, {collapseWhitespace: true});
};

export default eleventyImage;

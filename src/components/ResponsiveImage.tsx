import type { ImgHTMLAttributes } from "react";

const widths = [480, 768, 1200, 1600, 2200];
const localImagePattern = /^(.+\/images\/.+)-1600\.webp$/;

export default function ResponsiveImage({
  src,
  alt,
  sizes = "100vw",
  decoding = "async",
  ...props
}: Omit<ImgHTMLAttributes<HTMLImageElement>, "alt"> & { alt: string }) {
  const match = typeof src === "string" ? src.match(localImagePattern) : null;
  const srcSet = match
    ? widths.map((width) => `${match[1]}-${width}.webp ${width}w`).join(", ")
    : undefined;

  return (
    <img
      {...props}
      src={src}
      alt={alt}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      decoding={decoding}
    />
  );
}


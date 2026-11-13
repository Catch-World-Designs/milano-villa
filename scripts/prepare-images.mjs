import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sources = JSON.parse(await readFile("assets/image-sources.json", "utf8"));
const outputDirectory = path.resolve("public/images");
const widths = [480, 768, 1200, 1600, 2200];

await mkdir(outputDirectory, { recursive: true });

for (const [name, id] of Object.entries(sources)) {
  const sourceUrl = `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=2400`;
  const response = await fetch(sourceUrl);
  if (!response.ok) throw new Error(`Unable to download ${sourceUrl}: ${response.status}`);
  const source = Buffer.from(await response.arrayBuffer());

  await Promise.all(
    widths.map((width) =>
      sharp(source)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 84, effort: 5, smartSubsample: true })
        .toFile(path.join(outputDirectory, `${name}-${width}.webp`))
    )
  );
  process.stdout.write(`Prepared ${name}\n`);
}

const licenseLines = Object.entries(sources).map(
  ([name, id]) =>
    `- \`${name}\`: https://www.pexels.com/photo/${id}/ (Pexels photo ID ${id})`
);
await writeFile(
  path.join(outputDirectory, "SOURCES.md"),
  `# Image sources\n\nThe responsive image files in this directory are optimized copies of the approved prototype photography. Each source was obtained from Pexels and remains subject to the Pexels license: https://www.pexels.com/license/\n\nSource record generated 2026-11-13.\n\n${licenseLines.join("\n")}\n`
);


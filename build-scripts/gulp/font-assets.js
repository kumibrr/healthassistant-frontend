import fs from "fs-extra";

export function copyFontAssets(sourceDir, targetDir) {
  fs.copySync(sourceDir, targetDir, {
    filter: (src) => fs.statSync(src).isDirectory() || src.endsWith(".woff2"),
  });
}

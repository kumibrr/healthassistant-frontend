/**
 * @vitest-environment node
 */

import fs from "fs-extra";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { copyFontAssets } from "../../build-scripts/gulp/font-assets.js";

const directories = [];

afterEach(() => {
  for (const directory of directories.splice(0)) {
    fs.removeSync(directory);
  }
});

describe("copyFontAssets", () => {
  it.each(["checkout", ".t3/checkout.with.dots"])(
    "ships WOFF2 fonts from %s without other font formats",
    (checkout) => {
      const directory = fs.mkdtempSync(path.join(os.tmpdir(), "ha-fonts-"));
      directories.push(directory);
      const source = path.join(directory, checkout, "fonts");
      const target = path.join(directory, "output");
      fs.ensureDirSync(source);
      fs.writeFileSync(path.join(source, "Roboto-Regular.woff2"), "regular");
      fs.writeFileSync(path.join(source, "Roboto-Bold.woff2"), "bold");
      fs.writeFileSync(path.join(source, "Roboto-Regular.woff"), "legacy");
      fs.writeFileSync(path.join(source, "README.md"), "documentation");

      copyFontAssets(source, target);

      expect(fs.existsSync(path.join(target, "Roboto-Regular.woff2"))).toBe(
        true
      );
      expect(fs.readdirSync(target).sort()).toEqual([
        "Roboto-Bold.woff2",
        "Roboto-Regular.woff2",
      ]);
      expect(
        fs.readFileSync(path.join(target, "Roboto-Regular.woff2"), "utf8")
      ).toBe("regular");
    }
  );
});

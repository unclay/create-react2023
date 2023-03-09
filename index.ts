#!/usr/bin/env node

import * as fs from "node:fs";
import * as path from "node:path";

import minimist from "minimist";
import prompts from "prompts";
import banners from "./utils/banners";
import renderTemplate from "./utils/render-template";
import {
  postOrderDirectoryTraverse,
  preOrderDirectoryTraverse,
} from "./utils/directory-traverse";

let result: {
  projectName?: string;
  shouldOverwrite?: boolean;
} = {};
async function init() {
  console.log();
  console.log(
    process.stdout.isTTY && process.stdout.getColorDepth() > 8
      ? banners.gradientBanner
      : banners.defaultBanner
  );
  console.log();

  const cwd = process.cwd();
  // possible options:
  // --force (for force overwriting)
  const argv = minimist(process.argv.slice(2), {
    alias: {},
    string: ["_"],
    // all arguments are treated as booleans
    boolean: true,
  });
  let targetDir = argv._[0];
  const defaultProjectName = !targetDir ? "react-project" : targetDir;

  const forceOverwrite = argv.force;

  try {
    result = await prompts([
      {
        type: targetDir ? null : "text",
        name: "name",
        message: "Project name",
        initial: defaultProjectName,
        onState: (state) =>
          (targetDir = String(state.value).trim() || defaultProjectName),
      },
      {
        name: "shouldOverwrite",
        type: () =>
          canSkipEmptying(targetDir) || forceOverwrite ? null : "confirm",
        message: () => {
          const dirForPrompt =
            targetDir === "."
              ? "Current directory"
              : `Target directory "${targetDir}"`;

          return `${dirForPrompt} is not empty. Remove existing files and continue?`;
        },
      },
    ]);
  } catch (cancelled) {
    console.log(cancelled.message);
    process.exit(1);
  }

  fs.writeFileSync("./test.txt", JSON.stringify(result, null, 2), "utf-8");
  // `initial` won't take effect if the prompt type is null
  // so we still have to assign the default values here
  const { shouldOverwrite = argv.force } = result;

  const root = path.join(cwd, targetDir);

  if (fs.existsSync(root) && shouldOverwrite) {
    emptyDir(root);
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root);
  }

  // todo:
  // work around the esbuild issue that `import.meta.url` cannot be correctly transpiled
  // when bundling for node and the format is cjs
  // const templateRoot = new URL('./template', import.meta.url).pathname
  const templateRoot = path.resolve(__dirname, "template");
  const render = function render(templateName) {
    const templateDir = path.resolve(templateRoot, templateName);
    renderTemplate(templateDir, root);
  };

  // Render base template
  render("base");
  render("config/jsx");
  render("code/default");
}

try {
  init();
} catch (err) {
  console.error(err);
}

function canSkipEmptying(dir: string) {
  if (!fs.existsSync(dir)) {
    return true;
  }

  const files = fs.readdirSync(dir);
  if (files.length === 0) {
    return true;
  }
  if (files.length === 1 && files[0] === ".git") {
    return true;
  }

  return false;
}

function emptyDir(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }

  postOrderDirectoryTraverse(
    dir,
    (dir) => fs.rmdirSync(dir),
    (file) => fs.unlinkSync(file)
  );
}

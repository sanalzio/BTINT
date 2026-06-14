#!/usr/bin/env bun

const { program } = require("commander");
const { log, error, setupLogger } = require("../lib/logger");
const { loadThemePalette } = require("../lib/theme");
const { processImage } = require("../lib/image");
const updateNotifier = require('update-notifier').default;
const pkg = require("../package.json");

const notifier = updateNotifier({ pkg });
notifier.notify();

program
    .option("-o, --output <path>", "output folder")
    .option("-t, --theme <name>", "theme name")
    .option("-p, --palette <palette>", "custom palette (path to JSON file or flat RGB list)")
    .argument('[images...]', 'input images')

program.parse(process.argv);
const options = program.opts();

if (!options.output || !program.args || !program.args.length) {
    program.help({ error: true });
}


/*checkForUpdate(REPO, CURRENT_VERSION, (info) => {
    lastUpdateInfo = info;
});*/


// Safe sync run
try {
    const themePalette = await loadThemePalette(options);
    for (const image of program.args) {
        processImage(image, options.output, themePalette);
    }
} catch (err) {
    error(err.message);
    process.exit(1);
}
const fs = require("fs");
const path = require("path"); 
const { colors } = require("./logger");

async function loadThemePalette(options) {
    let palette;
    const themesPath = path.join(__dirname, "..", "themes.json");

    if (options.palette) {
        let raw;
        if (fs.existsSync(options.palette)) {
            const file = Bun.file(options.palette);
            raw = (await file.json())
                    .map(c => Bun.color(c, "[rgb]"))
                    .filter(Boolean); // filter errors
        } else {
            raw = JSON.parse(options.palette)
                    .map(c => Bun.color(c, "[rgb]"))
                    .filter(Boolean);
        }

        if (!Array.isArray(raw) || !raw.length) {
            throw new Error("Bad custom theme syntax.");
        }

        palette = raw;

        console.log(colors.blue("Using custom palette with"), colors.bold(palette.length), "colors.");
    } else {
        const file = Bun.file(themesPath);
        const themes = await file.json();
        let rawTheme = themes[options.theme];
        if (!rawTheme) {
            const available = Object.keys(themes).sort();
            let msg = `Theme not found: ${options.theme || "(none)"}\nAvailable themes:\n`;
            available.forEach(t => msg += ` - ${t}\n`);
            throw new Error(msg);
        }
        rawTheme = rawTheme
                    .map(c => Bun.color(c, "[rgb]"))
                    .filter(Boolean);

        palette = rawTheme;

        console.log(colors.blue("Using theme:"), colors.bold(options.theme));
    }

    return palette;
}

module.exports = { loadThemePalette };


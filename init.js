const path = require("path");
const shell = require("shelljs");

// Create build directory
shell.mkdir("-p", "build");

// Templates
[
    "src/config.xml.mustache",
    "src/www/index.html.mustache"
].forEach(f => {
    shell.cp(path.join("node_modules/mendix-hybrid-app-base", f), f);
});

// Examples of config files
[
    "config/environments.json",
    "config/parameters.json",
    "config/resources.json",
    "config/texts.json"
].forEach(f => {
    shell.cp(path.join("node_modules/mendix-hybrid-app-base", f), f + ".example");
});

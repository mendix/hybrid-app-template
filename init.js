const path = require("path");
const shell = require("shelljs");

const CONFIG_FOLDER = 'config';
const SRC_FOLDER = 'src';
const WWW_FOLDER = path.join('src', 'www');
const STYLES_FOLDER = path.join(WWW_FOLDER, 'styles');

const BASE_DEP_FOLDER = path.join('node_modules', 'mendix-hybrid-app-base');

const CONFIG_PATH = path.join(SRC_FOLDER, 'config.xml.mustache');
const INDEX_PATH = path.join(WWW_FOLDER, 'index.html.mustache');
const STYLES_PATH = path.join(STYLES_FOLDER, 'index.css.mustache');

const LOADER_HTML_PATH = path.join(CONFIG_FOLDER, 'loader.html.snippet');
const LOADER_STYLING_PATH = path.join(CONFIG_FOLDER, 'loader.css.snippet');


// Create build directory
shell.mkdir("-p", "build");

// Copy templates
[
    CONFIG_PATH,
    INDEX_PATH,
    STYLES_PATH,
    LOADER_HTML_PATH,
    LOADER_STYLING_PATH
].forEach(f => {
    shell.cp(path.join(BASE_DEP_FOLDER, f), f + '.example');

    if (!shell.test('-e', f)) {
        shell.cp(path.join(BASE_DEP_FOLDER, f), f);
    }
});

// Copy examples of config files
[
    path.join(CONFIG_FOLDER, 'environments.json'),
    path.join(CONFIG_FOLDER, 'parameters.json'),
    path.join(CONFIG_FOLDER, 'resources.json'),
    path.join(CONFIG_FOLDER, 'texts.json')
].forEach(f => {
    shell.cp(path.join(BASE_DEP_FOLDER, f), f + '.example');
});

// Determine required Phonegap CLI version
let re = new RegExp('"cli-(.*)"');
let version_line = shell.grep('phonegap-version', CONFIG_PATH).head().stdout;
let matches = version_line.match(re);

if (matches === undefined) {
    shell.echo('No CLI version found in config.xml.');
    shell.exit(1);
}

let required_phonegap_version = matches[1].trim();

console.log('Required Phonegap version: ' + required_phonegap_version);

// Determine installed Phonegap CLI version
if (!shell.which('phonegap')) {
    shell.echo(`Sorry, this script requires phonegap version ${required_phonegap_version}. Install it using 'npm install -g phonegap@${required_phonegap_version}'.`);
    shell.exit(1);
}

let installed_phonegap_version = shell.exec('phonegap -v', { silent:true }).stdout.trim();

console.log('Installed Phonegap version: ' + installed_phonegap_version);

// Compare Phonegap CLI versions
if (installed_phonegap_version !== required_phonegap_version) {
    shell.echo(`Sorry, this script requires phonegap version ${required_phonegap_version}. Install it using 'npm install -g phonegap@${required_phonegap_version}'.`);
    shell.exit(1);
}
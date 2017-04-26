var shell = require('shelljs');

if (!shell.test('-f', "src/config.xml.mustache")) {
    shell.cp('node_modules/mendix-hybrid-app-base/src/config.xml.mustache', 'src/');
}

if (!shell.test('-f', "src/www/index.html.mustache")) {
    shell.cp('node_modules/mendix-hybrid-app-base/src/www/index.html.mustache', 'src/www/');
}

if (!shell.test('-f', "config/texts.json")) {
    shell.cp('node_modules/mendix-hybrid-app-base/config/texts.json', 'config/');
}
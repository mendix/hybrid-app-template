const {existsSync, readFileSync, writeFileSync} = require("fs");
const {join} = require("path");
const location = join("build/platforms/android/phonegap-plugin-barcodescanner", "*.gradle");

if (existsSync(location)) {
    const fileContent = readFileSync(location, "utf-8");
    // Adds compatibility to new gradle 7
    writeFileSync(location, fileContent.replace("compile(", "implementation("));
}

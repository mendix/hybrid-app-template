const {existsSync, readFileSync, writeFileSync, readdirSync} = require("fs");
const {join} = require("path");
const location = join("build/platforms/android/phonegap-plugin-barcodescanner");

if (existsSync(location)) {
    const files = readdirSync(location);

    if (files.length > 0) {
        files.filter(file => file.endsWith(".gradle")).forEach(file => {
            const fileContent = readFileSync(join(location, file), "utf-8");
            // Adds compatibility to new gradle 7
            writeFileSync(join(location, file), fileContent.replace("compile(", "implementation("));
        });
    }
}

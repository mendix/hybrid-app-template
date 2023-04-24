const {existsSync, readFileSync, writeFileSync} = require("fs")
const location = "build/platforms/android/phonegap-plugin-barcodescanner/hybrid-barcodescanner.gradle"

if (existsSync(location)) {
    const fileContent = readFileSync(location, "utf-8");
    // Adds compatibility to new gradle 7
    writeFileSync(location, fileContent.replace("compile(", "implementation("));
}

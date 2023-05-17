const {existsSync, readFileSync, writeFileSync} = require("fs")
const location = "build/platforms/android/app/src/main/java/nl/xservices/plugins/FileProvider.java"

if (existsSync(location)) {
    const fileContent = readFileSync(location, "utf-8");
    // Adds compatibility to new Android 31+
    writeFileSync(location, fileContent.replace("android.support.v4.content.FileProvider", "androidx.core.content.FileProvider"));
}


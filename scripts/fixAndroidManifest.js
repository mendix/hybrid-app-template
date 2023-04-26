const {existsSync, readFileSync, writeFileSync} = require("fs")
const location = "build/platforms/android/app/src/main/AndroidManifest.xml"

if (existsSync(location)) {
    const fileContent = readFileSync(location, "utf-8");
    let newFileContent;
    // Adds compatibility to new Android 30+
    let inLoop = true;
    let index = 0;
    while (inLoop) {
        const startTag = fileContent.indexOf("<receiver", index);
        if (startTag !== -1) {
            const endTag = fileContent.indexOf(">", startTag);
            const tagContent = fileContent.substring(startTag, endTag);
            if (tagContent.indexOf("android:exported") === -1) {
                newFileContent = fileContent.replace(tagContent, tagContent.replace("<receiver","<receiver android:exported=\"true\""))
            }
            index = startTag + 1;
        } else {
            inLoop = false
        }
    }
    if (newFileContent.length > 0) {
        writeFileSync(location, newFileContent);
    }
}

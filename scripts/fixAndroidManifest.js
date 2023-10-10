const { existsSync, readFileSync, writeFileSync, readFile } = require("fs");
const location = "build/platforms/android/app/src/main/AndroidManifest.xml";

function addExportToReceiverTags() {
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
          newFileContent = fileContent.replace(
            tagContent,
            tagContent.replace("<receiver", '<receiver android:exported="true"')
          );
        }
        index = startTag + 1;
      } else {
        inLoop = false;
      }
    }
    if (newFileContent && newFileContent.length > 0) {
      writeFileSync(location, newFileContent);
    }
  }
}

/**
 * This function removes the dublicated permissions from Android Manifest.
 * Ex: <uses-permission android:maxSdkVersion="32" android:name="android.permission.READ_EXTERNAL_STORAGE" />
 */
function removeDublicatePermissions() {
  if (existsSync(location)) {
    const lineSeperator = "\n";
    const dublicatePermissionString = "maxSdkVersion";
    const fileContent = readFileSync(location, "utf-8");

    if (!fileContent.includes(dublicatePermissionString)) {
      return;
    }

    const fileContentLines = fileContent.split(lineSeperator);
    const newFileContent = fileContentLines
      .filter((val) => !val.includes(dublicatePermissionString))
      .join(lineSeperator);

    if (newFileContent && newFileContent.length > 0) {
      writeFileSync(location, newFileContent);
    }
  }
}

addExportToReceiverTags();
removeDublicatePermissions();

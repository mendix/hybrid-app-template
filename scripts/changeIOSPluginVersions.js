const { existsSync, readFileSync, writeFileSync } = require("fs");
const location = "build/config.xml";

// MARK: If any of these packages is updated, these object must be also updated.
const pluginsToBeChanged = [
  {
    name: "cordova-plugin-file",
    currentVersion: "8.0.0",
    iosVersion: "7.0.0",
  },
  {
    name: "cordova-plugin-camera",
    currentVersion: "7.0.0",
    iosVersion: "6.0.0",
  },
  {
    name: "cordova-plugin-media-capture",
    currentVersion: "5.0.0",
    iosVersion: "4.0.0",
  },
  {
    name: "cordova-plugin-media",
    currentVersion: "7.0.0",
    iosVersion: "6.1.0",
  },
];

function downgradeIOSPluginVersions() {
  const lineSeperator = "\n";
  if (existsSync(location)) {
    const fileContent = readFileSync(location, "utf-8");
    const fileContentLines = fileContent.split(lineSeperator);

    for (let plugin of pluginsToBeChanged) {
      // Check plugins name inside of ""
      // Example: "cordova-plugin-media"
      const changeIndex = fileContentLines.findIndex((val) =>
        val.includes(`"${plugin.name}"`)
      );

      // Downgrade plugin versions.
      fileContentLines[changeIndex] = fileContentLines[changeIndex].replace(
        `${plugin.currentVersion}`,
        `${plugin.iosVersion}`
      );
    }

    const newFileContent = fileContentLines.join(lineSeperator);
    writeFileSync(location, newFileContent);
  }
}

function upgradePluginVersions() {
  const lineSeperator = "\n";
  if (existsSync(location)) {
    const fileContent = readFileSync(location, "utf-8");
    const fileContentLines = fileContent.split(lineSeperator);

    for (let plugin of pluginsToBeChanged) {
      // Check plugins name inside of ""
      // Example: "cordova-plugin-media"
      const changeIndex = fileContentLines.findIndex((val) =>
        val.includes(`"${plugin.name}"`)
      );

      // Upgrade plugin versions.
      fileContentLines[changeIndex] = fileContentLines[changeIndex].replace(
        `${plugin.iosVersion}`,
        `${plugin.currentVersion}`
      );
    }

    const newFileContent = fileContentLines.join(lineSeperator);
    writeFileSync(location, newFileContent);
  }
}

/**
 * Before adding iOS platform, this script will downgrade some packages version to older versions.
 * After the platform added, this script will revert changes of the versions.
 */
function changeIOSPluginVersions() {
  if (existsSync(location)) {
    const fileContent = readFileSync(location, "utf-8");
    const fileContentLines = fileContent.split("\n");

    // Check the version of the file plugin: if it were updated. All the other plugins should have been updated.
    // Therefore, checking only one plugin is good enough to use downgradeIOSPluginVersions or upgradePluginVersions functions.
    const filePluginObject = pluginsToBeChanged[0];
    const filePluginTag = fileContentLines.find((val) =>
      val.includes(`"${filePluginObject.name}"`)
    );

    // If it is current version, downgrade version.
    if (filePluginTag.includes(filePluginObject.currentVersion)) {
      console.log("Downgrade plugins for iOS.");
      downgradeIOSPluginVersions();
      console.log("Downgraded for iOS build.");
    }
    // Else revert to the current version.
    else {
      console.log("Reverting downgraded plugins.");
      upgradePluginVersions();
      console.log("Plugins were reverted.");
    }
  }
}

changeIOSPluginVersions();

const { existsSync, readFileSync, writeFileSync, readFile } = require("fs");
const location = "build/config.xml";

const pluginName = "@mendix/cordova-plugin-wkwebview-engine";
const pluginTagString =
  '<plugin name="@mendix/cordova-plugin-wkwebview-engine" source="npm" spec="1.0.3-mx.1.3.0" />';


function removeWkwebviewEnginePlugin() {
    const fileContent = readFileSync(location, "utf-8");
    const newFileContent = fileContent.replace(pluginTagString,'')
    writeFileSync(location, newFileContent);
}

function addWkwebviewEnginePlugin() {
    const lineSeperator = "\n";
    const fileContent = readFileSync(location, "utf-8");
    const fileContentLines = fileContent.split(lineSeperator);
    const indexOfComment = fileContentLines.findIndex((val)=>val.includes(pluginName))
    fileContentLines[indexOfComment+1] += pluginTagString
    
    const newFileContent = fileContentLines.join(lineSeperator)
    writeFileSync(location, newFileContent);
}

/**
 * 
 * - The function removes this plugin, if it exist. 
 * It means it was called before adding Android platform.
 * 
 * - The function adds this plugin if it does not exist.
 * It means it was called after adding Android platform.
 * 
 * This way, the function prevents any iOS related issue.
 */
function fixWkwebviewEnginePlugin() {
    if (existsSync(location)) {
        const fileContent = readFileSync(location, "utf-8");

        if(fileContent.includes(pluginTagString)){
            console.log("Removing cordova-plugin-wkwebview-engine for Android.")
            removeWkwebviewEnginePlugin()
            console.log("Removed cordova-plugin-wkwebview-engin Android.")
        }else{
            console.log("Adding cordova-plugin-wkwebview-engin for Android.")
            addWkwebviewEnginePlugin()
            console.log("Added cordova-plugin-wkwebview-engin for Android.")
        }
    }
}

fixWkwebviewEnginePlugin()
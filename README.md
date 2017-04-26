***This repository is under active development, and should not be used at this moment***

---

# Mendix PhoneGap Build app template

Mendix apps can simply be viewed in mobile web browsers.
However, some features of mobile devices cannot be accessed through HTML and Javascript.
Also, if you want to publish your app on the Apple App Store, Google Play or Microsoft Phone Store  true in general, but our particular case does not support microsoft phone store, so I would remove any reference to Microsoft's Platform, you have to wrap your app in a native shell.
We use PhoneGap to do this. Add link to phonegap
PhoneGap creates a native wrapper around a web application and provides access to native functions functionality through a Javascript API.
These apps are also called _hybrid_ apps because they are a hybrid of a web and a native app.

This project contains the Mendix PhoneGap Build app template.
It can be used to customize your mobile Mendix app, debug the app using emulators, and build installable packages of your app, either locally or in the cloud using Phonegap Build link to phonegap build.
By using this template, you can easily adapt many facets of your app, like styling, icons, splash screens, and the login screen.

## Prerequisites

- Install NodeJS
    - You can download the installer from [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
    - On MacOS, you can use Brew to install NodeJS: `brew install node`
    - On Unix, you can use your distro's package manager, e.g. for Debian-based systems: `sudo apt-get install node`
- Make sure that the NodeJS executable is on your path. In most cases, this is done for you by the installer.

## Setup

Hint: all text displayed between `like this`, is to be executed from the command line.

- Obtain a local copy of this project, by doing one of the following:
    - Download a .zip package through the Mendix Portal. By following this path, a lot of configuration will already be filled in for you.
    - Clone or fork this repository from GitHub
- Go to the root directory of the project: `cd <path/to/project`
- Install all dependencies: `npm install`
    - This will also prepare a .zip package that can be sent to Phonegap Build, in the "dist" folder.

### Advanced Setup

In order to create deployment packages locally (instead of with Phonegap Build) or to run your app on an emulator, you will need to install additional tooling.

#### Android

For Android, the easiest approach is to install [Android Studio](https://developer.android.com/studio/index.html).
You can find installation instructions for each platform (Windows/Mac/Linux) [here](https://developer.android.com/studio/install.html).
which SDK level do I need to install? Or is that out of scope?

#### iOS

For build iOS packages locally and for running your app on an iOS emulator, you are required to use an Apple device (MacBook / iMac), with Xcode installed. You can install Xcode through iTunes.

## Folder Structure

The project structure consists of the following elements:
where does this structure originate from? how does it compare to any structure imposed by Cordova?

- **/src**: this is where you place all customizations for your app
    - **/www**:
        - **/images**: any images that you'd like to use on e.g. the login screen
        - **/styles**: styling for e.g. the login screen, in the form of css files
        - **/scripts**: javascript files that customize the behavior of your app
        - **index.html.mustache**: a template file that is used to generate the index page
    - **/resources**: a collection of icons and splash screens
    - **config.xml.mustache**: a template file that is used to generate the Phonegap configuration file
- **/config**: this is where all external configuration files go; these files are optional, overriding the defaults
    - **environments.json**: a description of all available deployment environments for your app, including the app IDs and URLs
    - **parameters.json**: settings that influence some aspects of the build process and the resulting app, such as Android/iOS support, offline mode, and pin login
    - **resources.json**: descriptions of all resources, such as icons and splash screens, including their types and sizes
    - **texts.json**: translations/customizations for the static texts in the hybrid shell part of your app
- **/build**: contains all intermediate build files, such as the bundles javascript and css. The contents of this folder are overwritten every time you run a build
- **/dist**: the final build packages will end up here
- **webpack.config.js**: starting point for the build process

## Building your app package

We use [Webpack 2](https://webpack.js.org/) to bundle your custom files, together with the base package files, into a .zip file that can be sent to Phonegap Build.

You can trigger a build by executing `npm run package` from the root folder of your project. This will produce a .zip file in the _/dist_ folder, targeted at your production environment.

The build process can be customized by adding parameters. Add `--` followed by `--env.<param>` to influence the outcome. (the extra `--` are needed to properly pass the parameters to Webpack, instead of to the NodeJS executable).

- **target=[d|t|a|p]**: Use this parameter to customize the endpoint of your app; e.g. `npm run package -- --env.target=t` will produce a package that is targeted at the TEST environment of your Mendix application. You can also use the longer versions of each environment name; e.g. `--env.target=p`, `--env.target=prod`, and `--env.target=production` all result in a package targeting the PROD environment.
- **[x86|arm]**: Use these parameters to influence the architecture for which the app is built; e.g. `npm run package -- --env.x86` will produce a package that can run on an emulator on most PCs. Can I also build universal x86/arm binaries?

## Building your app with Phonegap Build

After creating a build package, you can build installation packages using Phonegap Build.
In order to do so, you'll need a Phonegap Build account.
You can create one [here](https://build.phonegap.com/).

Once you have an account, you can either upload the produced .zip file manually, or trigger the process from the command line:

### From the command line

First, log in to the service by running `npm run phonegap-login`. You'll be asked for your credentials.

Afterwards, you can start the remote build process by running `npm run android-remote` or `npm run ios-remote`.

### Manually

Navigate to [https://build.phonegap.com/apps/](https://build.phonegap.com/apps/) and click on `+ new app`.
You'll be guided through the steps from there.
Use the .zip file produced earlier, which you can find in the _/dist_ folder.

## Building your app locally

If you have installed the prerequisites outlined in **Setup / Advanced Setup**, you'll be able to build installation packages locally.
This approach is more complicated, but once you have all dependencies set up, it is generally faster than building remotely using Phonegap Build.

To build installation packages locally, execute either `npm run android-build` or `npm run ios-build`.

In case you want to deploy your app on a real device, you will likely need to sign your app.
Please refer to the appropriate Cordova documentation for details:
- [iOS](https://cordova.apache.org/docs/en/latest/guide/platforms/ios/#signing-an-app)
- [Android](https://cordova.apache.org/docs/en/latest/guide/platforms/android/#signing-an-app)

## Customizing your app

When you first download this project, it is fairly empty. Most functionality and styling is implemented as part of one this project's dependencies, called `mendix-hybrid-app-base`.

However, you can customize your hybrid app in several ways. All defaults from the base package can be overridden and/or extended, including the build process itself.

This section briefly describes what you'll need to for each type of change.

### Basic app settings

Several simple app settings, such as the name and the identifier, can be set in _/config/pararmeters.json_.
If you've downloaded this project the Mendix portal, the file is already there.
Otherwise, you can copy it from the base package.

### Phonegap settings

Several simple app settings, such as the name and the identifier, can be set in _/config/pararmeters.json_.
If you've downloaded this project the Mendix portal, the file is already there.
Otherwise, you can copy it from the base package.

### Styling

To customize the styling of the login screen (including the pin screen), add a .css file to _/src/www/styles/_.
It will be automatically picked up by the build process.

### Page structure

To change the structure and contents of the login screen (including the pin screen), you can adapt _/src/www/index.html.mustache_.

### Translations / custom text

All static text in the hybrid app can be customized and/or translated.
To do so, open _/config/texts.json_ in your favorite text editor, and look up the text you want to change on the left.
You can then enter the replacement text on the right-hand side.

### Icons & Splash screens

Icons and splash screens are configure in two seperate places.
The image files should be stored in _/src/resources_.
The configuration of each icon and splash screen should be updated in _/config/resources.json_.
Please make sure that all details (including the relative paths), are exactly correct.
In case you have downloaded this package through the Mendix portal, all icons and splash screens you configured have been pre-packaged and pre-configured.

### Client behavior (advanced)

The Mendix hybrid app is primarily a shell, that loads you Mendix hybrid application in a webview.
The shell itself does not contain a lot of custom code what does custom code mean in this context?.
However, there is some code to properly handle several mobile and Mendix specific features, such as the back button behavior on Android, and the preparation of files for running in Offline mode.

Most of this code is implemented as part of the mendix-hybrid-app-base package, and cannot easily be overridden.
You can run custom code in two specific cases:
* Once the client configuration has been prepared; and
* once the Mendix client has been loaded

To implement custom behavior for these cases, adapt _/src/www/scripts/entry.js_ to your needs.

## Customizing the build process (advanced)

You can customize the build process by making changes to _webpack.config.js_, in the root folder of this project.
All Webpack configuration you add here will be merged with the default Webpack configuration.
You can read more about this in [the documentation of webpack-merge](https://www.npmjs.com/package/webpack-merge).
# Mendix PhoneGap Build app template

Mendix apps can simply be viewed in mobile web browsers.
However, some features of mobile devices cannot be accessed through HTML and Javascript.
Also, if you want to publish your app on the Apple App Store, Google Play or Microsoft Phone Store, you have to wrap your app in a native shell.
We use PhoneGap to do this.
PhoneGap creates a native wrapper around a web application and provides access to native functions through a Javascript API.
These apps are also called _hybrid_ apps because they are a hybrid of a web and a native app.

This project contains the Mendix PhoneGap Build app template.
It can be used to customize your mobile Mendix app, debug the app using emulators, and build installable packages of your app, either locally or using Phonegap Build.
By using this template, you can easily adapt many facets of your app, like styling, icons, splash screens, and the login screen.

## Prerequisites

- Install NodeJS
    - You can download the installer from [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
    - On MacOS, you can use Brew to install NodeJS: `brew install node`
    - On Unix, you can use your distro's package manager, e.g. for Debian-based systems: `sudo apt-get install node`
- Make sure that the NodeJS executable is on your path. In most cases, this is done for you by the installer.

## Setup

Hint: all text displayed between `like this`, is to be executed from the command line

- Obtain a local copy of this project, by doing one of the following:
    - Download a .zip package through the Mendix Portal. By following this path, a lot of configuration will already be filled in for you.
    - Clone or fork this repository from GitHub
- Install Webpack globally: `npm install -g webpack`
- Install Phonegap globally: `npm install -g phonegap`
- Go to the root directory of the project: `cd <path/to/project`
- Install all dependencies: `npm install`
    - This will also prepare a .zip package that can be sent to Phonegap Build, in the "dist" folder.

### Advanced Setup

In order to create deployment packages locally (instead of with Phonegap Build) or to run your app on an emulator, you will need to install additional tooling.

### Android

For Android, the easiest approach is to install [Android Studio](https://developer.android.com/studio/index.html).
You can find installation instructions for each platform (Windows/Mac/Linux) [here](https://developer.android.com/studio/install.html).
  
### iOS

For build iOS packages locally and for running your app on an iOS emulator, you are required to use an Apple device (MacBook / iMac), with Xcode installed. You can install Xcode through iTunes.

## Folder Structure

The project structure consists of the following elements:

- **/src**: this is where you place all customizations for your app
    - **/www**: 
        - **/images**: any images that you'd like to use on e.g. the login screen
        - **/styles**: styling for e.g. the login screen, in the form of css files
        - **/scripts**: javascript files that customize the behavior of your app
        - **index.html.mustache**: a template file that is used to generate the index page
    - **/resources**: a collection of icons and splash screens
    - **config.xml.mustache**: a template file that is used to generate the Phonegap configuration file
- **/config**: this is where all external configuration files go
    - **environments.json**: a description of all available deployment environments for your app, including the app IDs and URLs
    - **parameters.json**: settings that influence some aspects of the build process and the resulting app, such as Android/iOS support, offline mode, and pin login
    - **resources.json**: descriptions of all resources, such as icons and splash screens, including their types and sizes
    - **texts.json**: translations/customizations for the static texts in the hybrid shell part of your app
- **webpack.config.js**: starting point for the build process

After building your app package for the first time, you'll see two additional folders:

- **/build**: contains all intermediate build files, such as the bundles javascript and css. The contents of this folder are overwritten every time you run a build
- **/dist**: the final build packages will end up here

## Building your app package

We use [Webpack 2](https://webpack.js.org/) to bundle your custom files, together with the base package files, into a .zip file that can be sent to Phonegap Build.

You can trigger a build by executing `npm run package` from the root folder of your project. This will produce a .zip file in the _/dist_ folder, targeted at your production environment.

The build process can be customized by adding parameters. Add `--` followed by `--env.<param>` to influence the outcome. (the extra `--` are needed to properly pass the parameters to Webpack, instead of to the NodeJS executable).

- **[dev, sandbox, test, accp, prod]**: Use these parameters to customize the endpoint of your app; e.g. `npm run package -- --env.test` will produce a package that is targeted at the TEST environment of your Mendix application.
- **[x86, arm]**: Use these parameters to influence the architecture for which the app is built; e.g. `npm run package -- --env.x86` will produce a package that can run on an emulator on most PCs.

## Building your app with Phonegap Build

After creating a build package, you can build installation package using Phonegap Build.
In order to do so, you'll need a Phonegap Build account.
You can create one [here](https://build.phonegap.com/).

Once you have an account, you should log in to the service by running `npm run phonegap-login`.
You'll be asked for your credentials.

Afterwards, you can start the remote build process by running `npm run remote-run-android` or `npm run remote-run-ios`.

## Building your app locally

If you have installed the prerequisites outlined in **Setup / Advanced Setup**, you'll be able to build installation packages locally.
This approach is more complicated, but it is faster than building remotely using Phonegap Build.

To build installation packages locally, execute either `npm run build-android` or `npm run build-ios`.

In case you want to deploy your app on a real device, you will likely need to sign your app.
Please refer to the appropriate Cordova documentation for details:
- [iOS](https://cordova.apache.org/docs/en/latest/guide/platforms/ios/#signing-an-app)
- [Android](https://cordova.apache.org/docs/en/latest/guide/platforms/android/#signing-an-app)

## Customizing your app

### Basic app settings

### Phonegap settings

### Styling

### Page structure

### Translations / custom text

### Icons & Splash screens

### Shell & client behavior (advanced)

## Customizing the build process (advanced)
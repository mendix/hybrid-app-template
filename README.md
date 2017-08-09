# Mendix PhoneGap Build App Template

This is the template used to create the hybrid app wrapper for Mendix apps.

# Prerequisites

Make sure that the following is installed on your system:

- A clone of this repository or the customizable package for your app, available in the 'Deploy' section of the Mendix Portal. When starting from a customizable package, basic configuration for your app has already been done.
- Recent `Node.js`. This code was tested with version 6. You can check by running `node -v`.
    - Windows: install from [nodejs.org](https://nodejs.org/en/download/)
    - MacOS: use [Brew](https://brew.sh/) to install `Node.js`: `brew install node`
    - Linux, BSD, etc: install using the available package manager, e.g. on Debian: `sudo apt-get install node`

For building locally you also need:

- Development environment for your target platform
    - Android: [Android Studio](https://developer.android.com/studio/index.html) by following [the instructions](https://developer.android.com/studio/install.html)
    - iOS: [XCode](https://developer.apple.com/xcode/), only available for Apple computers (MacBook, iMac)

# Build and run locally

If this is the initial build, first do some preparation:
```
$ npm install                       # install dependencies
$ npm run package:emulator          # prepare `build` directory for emulator, alternatively use package:device
$ npm run platform:android          # setup for Android or
$ npm run platform:ios              # setup for iOS
```

To build and run the app:
```
$ npm run package:emulator          # prepare `build` directory for emulator, alternatively use package:device
$ npm run start:emulator            # run on emulator, alternatively use start:device
```

# Build on PhoneGap

With the PhoneGap Build service you can build your app in the cloud, even if you haven't installed the development environment for your target platform. This way you can target iOS without owning an Apple computer.

To use the PhoneGap Build service you need to [register for an account](https://build.phonegap.com/plans) first. After that, you can build your app by uploading a PhoneGap Build package, which is just a regular `.zip` file containing JavaScript and resource files.

## Through the command line

To build on PhoneGap Build through the command line:
```
$ npm install                       # install dependencies
$ npm run package:device            # prepare `build` directory for device
$ npm run phonegap:login            # login into the PGB service
$ npm run phonegap:build:android    # build on PGB, alternatively use `phonegap:build:ios`
```

## Through uploading to PhoneGap Build

To build through the PhoneGap site, first build a PhoneGap Build package:
```
$ npm install                       # install dependencies
$ npm run package:device            # create PGB package in `dist`
```

Then, go to [https://build.phonegap.com/apps/](https://build.phonegap.com/apps/) and click the `+ new app` button. When asked, upload the PhoneGap Build package from the `dist` folder.

# Customizing your app

When you first download this project, it is mostly empty. All functionality and styling is by default implemented as part of one this project's dependencies, called `mendix-hybrid-app-base`.

You can customize your hybrid app in several ways. All defaults from the base package can be overridden and/or extended, including the build process itself.

## Basic app settings

Several simple app settings, such as the app name and identifier, can be set in `config/parameters.json`. If you've downloaded this project the Mendix Portal, the file is already there. Otherwise, you can look at the `config/parameters.json.example` file.

## Styling

To customize the styling of the login screen (including the pin screen), add a .css file to `src/www/styles/`. It will be automatically picked up by the build process.

## Page structure

To change the structure and contents of the login screen (including the pin screen), you can adapt `src/www/index.html.mustache`.

## Translations / custom text

All static text in the hybrid app can be customized and/or translated. To do so, create a file `config/texts.json` containing the original text as keys and the replacement text as values. You can take a look at `config/texts.json.example` to see which texts are available for translation.

## Icons & Splash screens

Icons and splash screens are configured in two separate places. The image files themselves should be stored in `src/resources/`. The configuration of each icon and splash screen should be updated in `config/resources.json`. You can take a look at `config/resources.json.example` for an example.

In case you have downloaded this package through the Mendix Portal, all configured icons and splash screens have already been prepackaged and preconfigured.

## Client behavior (advanced)

You can run custom code in two specific cases:
- on client configuration setup
- on Mendix client load

To implement custom behavior for these cases, edit `src/www/scripts/entry.js`.

## Customizing the build process (advanced)

You can customize the build process by making changes to `webpack.config.js` in the root folder of this project. All Webpack configuration you add here will be merged with the default Webpack configuration. You can read more about this in the [webpack-merge documentation](https://www.npmjs.com/package/webpack-merge).

## Upgrading the base package

Default functionality and styling is implemented in the `mendix-hybrid-app-base` package. We will occasionally release updates to this package. You can upgrade the base package by running `npm upgrade` from the root of your project.

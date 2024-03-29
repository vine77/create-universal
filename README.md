# create-universal

Cross-platform Expo project generator to bootstrap an app that runs on iOS, Android, and web.

Includes typescript, expo, expo-router and some other expo- packages, react-native-web, react-native-svg, react-native-svg-transformer, gluestack-ui, eslint, prettier, etc.

## Usage

With npm:

```sh
npm create universal app
```

With yarn:

```sh
yarn create universal app
```

Or specify a name to create your app in that directory:

```sh
npm create universal app your-app-name
```

> Note: To ensure npm uses the latest if you used a previous version, you can also run `npm create universal@latest app`.

## Explanation

This essentially does the following:

- Install base dependencies with `npm create -y expo -- -y --template tabs your-app-name`
- Replace tabs example with a bare-bones template
- Add some config like eslint and prettier with eslint-config-universe
- Add some extra dependencies like gluestack-ui
- Format code based on the config

Then you can simply run the following to see the web version of your new app:

```sh
cd my-app && npm start
```

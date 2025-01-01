# create-universal

Cross-platform Expo/shadcn project generator to bootstrap an app that runs on iOS, Android, and web.

Includes TypeScript, Expo, Expo Router, web support, SVG support, an opinionated (auto-fixable) linting config, and shadcn/Tailwind via react-native-reusables/NativeWind.

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

> Note: To ensure npm uses the latest if you used a previous version, you can run `npm create universal@latest app`.

## Explanation

This essentially does the following:

- Install base dependencies with `npm create -y expo -- -y your-app-name` (the default expo template)
- Replace the default/tabs example with a bare-bones template
- Add some extra dependencies like react-native-svg
- Add eslint/prettier with eslint-config-universe and eslint-plugin-perfectionist
- Add a subset of shadcn/tailwind via react-native-reusables/nativewind
- Format code based on the linting config

Then you can simply run the following to see the web version of your new app:

```sh
cd my-app && npm start
```

# Webpack Frontend Starterkit

[![Greenkeeper badge](https://badges.greenkeeper.io/wbkd/webpack-starter.svg)](https://greenkeeper.io/)

A lightweight foundation for your next webpack based frontend project.


### Installation

```
yarn install
```

### Start Dev Server

```
yarn start
```

### Build Prod Version

Update `homepage` in `package.json` to your URL like as follows: `https://username.github.io/project`.

```
yarn build
```

### Deploy

```
yarn deploy
```

### Features:

* ES6 Support via [babel](https://babeljs.io/) (v7)
* SASS Support via [sass-loader](https://github.com/jtangelder/sass-loader)
* Linting via [eslint-loader](https://github.com/MoOx/eslint-loader)

When you run `yarn run build` we use the [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) to move the css to a separate file. The css file gets included in the head of the `index.html`.
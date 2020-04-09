# Installation

## Install the package

### Using NPM:

```
npm install echofetch --save
```

### Using YARN

```
yarn add echofetch
```

## Build setup

To use EchoFetch, you need to configure [TypeScript](https://www.typescriptlang.org) or [Babel](https://babeljs.io)
in your project to enable support for [ECMAScript Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html),
which is necessary for decorators to work inside the browser.

### TypeScript

Create a `tsconfig.json` in your project root and:
- Add or change `experimentalDecorators: true`
- Make sure to add the `es2015` module.

```json
{
    "compilerOptions": {
        "target": "es5",
        "module": "es2015",
        "moduleResolution": "node",
        "strict": true,
        "experimentalDecorators": true
   }
}
```

### Babel

Install the following packages:
- `@babel/plugin-proposal-decorators`
- `@babel/plugin-proposal-class-properties`

**Using NPM:**

```
npm install --save-dev @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties
```

**Using Yarn:**
```
yarn add -D @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties
```

Configure `.babelrc` in your project root:
```json
{
  "plugins": [
    ["@babel/proposal-decorators"],
    ["@babel/proposal-class-properties"]
  ]
}
```
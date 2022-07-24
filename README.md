# ![Bun-doc](https://raw.githubusercontent.com/William-McGonagle/bun-doc/c8be8454f3686ddfb5c7e84b51fa847c4cbde824/.github/media/cover.svg)

[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/william-mcgonagle/bun-doc)](https://github.com/william-mcgonagle/bun-doc)
[![GitHub issues](https://img.shields.io/github/issues/william-mcgonagle/bun-doc)](https://github.com/william-mcgonagle/bun-doc/issues)
[![GitHub Repo stars](https://img.shields.io/github/stars/william-mcgonagle/bun-doc?color=green)](https://github.com/william-mcgonagle/bun-doc)
[![GitHub followers](https://img.shields.io/github/followers/william-mcgonagle?color=red)](https://github.com/william-mcgonagle)
[![GitHub Sponsors](https://img.shields.io/github/sponsors/fairfield-programming?color=orange)](https://github.com/fairfield-programming)
[![GitHub top language](https://img.shields.io/github/languages/top/william-mcgonagle/bun-doc?color=purple)](https://github.com/william-mcgonagle/bun-doc)
[![Discord](https://img.shields.io/discord/928056769983447090)](https://discord.gg/qtu2MXGhcf)

## How to Use

Add a new github action and simply paste the code below to add Bun-doc to your project.

```yaml
name: Generate Documentation Website

on:
  push:
    branches: [ master, main ]

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x]

    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
      - name: Install NPM Packages
        run: npm install; npm install next react react-dom; npm i bun-doc -g
      - name: Clean the Package
        run: rm -f ./tsconfig.json; rm -rf ./docs
      - name: Build
        run: bun-doc build; npx next build && npx next export; mv ./out ./docs
      - name: Deploy 🚀
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: docs
```

## Features

- [X] Generates page from NPM Data
- [X] Template System for Customization
- [X] Important Page Linking
  - [X] Donation Page
  - [X] Sourcecode Page
- [X] NPM Download Instructions
- [ ] Documentation Generation from Code
- [ ] About Page from Readme
- [ ] Licensing Information from [choosealicense.org](https://choosealicense.org)

## Contributing

## License

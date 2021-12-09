# 🎄 Advent of Code 2021 🎄

![screenshot](https://github.com/apaulheim/aoc21/blob/main/screenshot.png?raw=true)

## TODO

- [ ] Write Azure Function to get input from AOC
  - [ ] Add session token as GitHub secret
  - [ ] Pass secret as env variable to function or app [Static WebApp build configuration](https://docs.microsoft.com/en-us/azure/static-web-apps/build-configuration?tabs=github-actions#environment-variables)

# Vue Basic

[Azure Static Web Apps](https://docs.microsoft.com/azure/static-web-apps/overview) allows you to easily build [Vue.js](https://vuejs.org/) apps in minutes. Use this repo with the [Vue quickstart](https://docs.microsoft.com/azure/static-web-apps/getting-started?tabs=vue) to build and customize a new static site.

# Start locally

```
npm run build
swa start dist --api-location api
```

## Project setup

```bash
npm install
```

### Compiles and hot-reloads for development

```bash
npm run serve
```

### Compiles and minifies for production

```bash
npm run build
```

### Lints and fixes files

```bash
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

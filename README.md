# test-task

Stack: Vue3, Vueuse core, Pinia, Pinia plugin persistedstate, Vue Router.
Built with Vite, published on Netlify.

While developing this project, an issue with copilots arised. Check opened issues for details.
Those are the only copilots that were used.

## Done:

[x] SPA & basic router configuration
[x] Mocked user stores: auth (where token is stored) and client's store (where storeId is stored)
[x] Composables for fetching categories and products with proper limit, offset and other params
[x] Categories and Subcategories pages
[x] Mocked images for categories
[x] Product card and product page
[x] Mocked currency
[x] Persistent cart state
[x] Mobile-first cart contents: list or table depending on amount of free space. Table can be used as a basis for print styles (print styles not implemented though)
[x] Two variants of color theme, depending on user's device settings
[x] Sizings in rems for user's custom font size settings (tested with extra large in Chrome among others)

## TODO:

[] Change title and set focus when routing
[] Add 404
[] Add live region for accessibility
[] E2E tests

## Run locally

### Project Setup

```sh
yarn
```

#### Compile and Hot-Reload for Development

```sh
yarn dev
```

#### Type-Check, Compile and Minify for Production

```sh
yarn build
```

#### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
yarn test:unit
```

#### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
yarn build

# Runs the end-to-end tests
yarn test:e2e
# Runs the tests only on Chromium
yarn test:e2e --project=chromium
# Runs the tests of a specific file
yarn test:e2e tests/example.spec.ts
# Runs the tests in debug mode
yarn test:e2e --debug
```

#### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```

# nuxt-update

Nuxt module that detects update to Nuxt app.

### Problem

When you publish updates, users won't get the new version until they hard refresh the browser page. Client-side navigation with `<nuxt-link>` doesn't trigger updates. Users may continue working with outdated versions of your app for days or even weeks.

### Solution

`nuxt-update` publishes the current app version at a JSON endpoint, and then periodically checks on the client if the version has changed on the server. When an update is detected, an event is emitted which you can handle with some kind of user notifcation (or simply refresh the page automatically).

To save bandwidth and prevent unexpected network activity, updates are only checked during client-side navigation, with a customizeable minimum interval.

## Quick Setup

Install:

```sh
npm install nuxt-update
```

Add `nuxt-update` to the `modules` section of `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ["nuxt-update"],
})
```

Create `plugins/update.client.ts` with your own update handler:

```ts
export default defineNuxtPlugin(() => {
  const { $update } = useNuxtApp()
  $update.on("update", (version) => {
    // TODO: Use some fancy toast library.
    if (confirm(`New version ${version} available. Update?`)) {
      location.reload()
    }
  })
})
```

Define `NUXT_PUBLIC_UPDATE_VERSION` when starting Nuxt app:

```sh
export NUXT_PUBLIC_UPDATE_VERSION="1.2.3"
# or
export NUXT_PUBLIC_UPDATE_VERSION=$(git rev-parse --short HEAD)

npx nuxi start
```

## Module options

The following defaults are used:

```ts
export default defineNuxtConfig({
  modules: ["nuxt-update"],
  update: {
    // Minimum interval between update checks (in seconds).
    checkInterval: 60,
    // URL path where the current version is published.
    path: "/version.json",
  },
})
```

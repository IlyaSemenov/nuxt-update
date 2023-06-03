<template>
  <div style="display: flex; gap: 1em">
    <div>[Version {{ $config.public.update.version }}]</div>
    <nuxt-link
      v-for="page in ['Home', 'About', 'Contact']"
      :key="page"
      :to="page"
      >{{ page }}</nuxt-link
    >
  </div>
  <hr />
  <ClientOnly>
    <ul>
      <li>start</li>
      <li v-for="([type, event], i) in $updateLog.value" :key="i">
        {{ type }}: {{ event }}
      </li>
    </ul>
  </ClientOnly>
  <hr />
  <nuxt-page />
</template>

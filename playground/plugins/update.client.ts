export default defineNuxtPlugin(() => {
  const { $update } = useNuxtApp()
  const updateLog = ref<[string, any][]>([])
  $update.on("*", (type, event) => {
    updateLog.value.push([type, event])
  })
  $update.on("update", (version) => {
    if (confirm(`New version ${version} available. Update?`)) {
      location.reload()
    }
  })
  return {
    provide: { updateLog },
  }
})

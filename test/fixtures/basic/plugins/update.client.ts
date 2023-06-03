// Stub, not tested.
export default defineNuxtPlugin(() => {
  const { $update } = useNuxtApp()
  const updateLog = ref<[string, any][]>([])
  $update.on("*", (type, event) => {
    updateLog.value.push([type, event])
  })
  return {
    provide: { updateLog },
  }
})

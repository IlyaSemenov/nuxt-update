import EventEmitter from "mitt"
import { defineNuxtPlugin, useRouter } from "nuxt/app"

export default defineNuxtPlugin(({ $config }) => {
  const options = $config.public.update
  const events = EventEmitter<{
    check: void
    version: any
    update: any
  }>()
  if (options.version) {
    let last_check_time = new Date()
    useRouter().afterEach(async () => {
      const last_check_interval = +new Date() - +last_check_time
      if (last_check_interval >= options.checkInterval * 1000) {
        last_check_time = new Date()
        events.emit("check")
        const version = await get_remote_version(options.path)
        events.emit("version", version)
        if (version !== options.version) {
          options.version = version
          events.emit("update", version)
        }
      }
    })
  } else {
    if (process.env.NODE_ENV !== "development") {
      console.warn(
        "nuxt-update will not check for updates because app version not set."
      )
    }
  }
  return {
    provide: { update: events },
  }
})

function get_remote_version(path: string) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open("GET", path)
    xhr.onload = function () {
      if (xhr.status === 200) {
        try {
          const { version } = JSON.parse(xhr.responseText)
          if (version) {
            resolve(version)
          } else {
            reject("Malformed version response.")
          }
        } catch (err) {
          reject(err)
        }
      } else {
        reject("Request failed.")
      }
    }
    xhr.send()
  })
}

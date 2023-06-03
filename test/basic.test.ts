import { fileURLToPath } from "node:url"

import { $fetch, setup } from "@nuxt/test-utils"
import { describe, expect, it } from "vitest"

describe("ssr", async () => {
  await setup({
    rootDir: fileURLToPath(new URL("./fixtures/basic", import.meta.url)),
  })

  it("puts version into runtime config", async () => {
    const html = await $fetch("/")
    expect(html).toContain("<div>version = 123</div>")
  })

  it("returns version in JSON", async () => {
    const json = await $fetch("/version.json")
    expect(json).toStrictEqual({ version: 123 })
  })
})

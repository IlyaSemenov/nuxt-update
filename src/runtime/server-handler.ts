import { IncomingMessage, ServerResponse } from "node:http"

import { fromNodeMiddleware } from "h3"

const version = get_version()

export default fromNodeMiddleware(
  (req: IncomingMessage, res: ServerResponse) => {
    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    res.setHeader("Cache-Control", "no-cache")
    res.end(JSON.stringify({ version }))
  }
)

function get_version() {
  // Poor man replica of Nuxt env parser.
  // TODO: Learn how to access the actual runtime config from here.
  const str = process.env.NUXT_PUBLIC_UPDATE_VERSION
  const num = Number(str)
  return Number.isFinite(num) ? num : str
}

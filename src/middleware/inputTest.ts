import type { Context } from "hono"

export default function inputTest() {
  return async (c: Context, next: () => Promise<void>) => {
    const contentType = c.req.headers.get("content-type") || ""
    if (!contentType.includes("application/json")) {
      return c.json({ error: "A requisição deve ser application/json" }, 415)
    }

    let data: any
    try {
      data = await c.req.json()
    } catch (err) {
      return c.json({ error: "Corpo JSON inválido" }, 400)
    }

    const { nome, email } = data || {}
    if (!nome || typeof nome !== "string" || nome.trim().length < 2) {
      return c.json({ error: "Campo 'nome' inválido" }, 400)
    }
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return c.json({ error: "Campo 'email' inválido" }, 400)
    }

    await next()
  }
}

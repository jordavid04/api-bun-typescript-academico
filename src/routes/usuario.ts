import { Hono } from "hono"
import { getUsuarios, createUsuario } from "../controllers/usuario"
import inputTest from "../middleware/inputTest"

const app = new Hono()

app.get("/", async (c) => {
  const usuarios = await getUsuarios()
  return c.json(usuarios)
})

app.post("/", inputTest(), async (c) => {
  const body = await c.req.json()
  const novo = await createUsuario(body)
  return c.json(novo, 201)
})

export default app

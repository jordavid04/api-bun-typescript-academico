import { Hono } from "hono"
import usuarioRoutes from "./routes/usuario"

const app = new Hono()

// registra o sub-app de usuários em /usuarios
app.route("/usuarios", usuarioRoutes)

// roda o servidor usando Bun.serve
Bun.serve({
  fetch: app.fetch,
  port: 3000,
})

console.log("Servidor rodando em http://localhost:3000")

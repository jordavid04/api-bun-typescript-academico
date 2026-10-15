type Usuario = { id: number; nome: string; email: string }

let usuarios: Usuario[] = []
let nextId = 1

export async function getUsuarios(): Promise<Usuario[]> {
  return usuarios
}

export async function createUsuario(data: Partial<Usuario>): Promise<Usuario> {
  const usuario: Usuario = {
    id: nextId++,
    nome: String(data.nome),
    email: String(data.email),
  }
  usuarios.push(usuario)
  return usuario
}

export interface Client {
  id: string
  username: string
  password: string
  nome: string
  email: string
  ids_igg: string[]
  role?: 'admin' | 'client' // Added role support
}

export interface ClientsData {
  clients: Client[]
}
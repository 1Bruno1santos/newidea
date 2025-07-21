import { promises as fs } from 'fs'
import path from 'path'

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

// Get the path to clients.json
export function getClientsPath() {
  return path.join(process.cwd(), 'data', 'clients.json')
}

// Read clients from JSON file
export async function getClients(): Promise<ClientsData> {
  try {
    const filePath = getClientsPath()
    const fileContent = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(fileContent) as ClientsData
  } catch (error) {
    console.error('Error reading clients.json:', error)
    return { clients: [] }
  }
}

// Validate client credentials
export async function validateCredentials(username: string, password: string): Promise<Client | null> {
  const { clients } = await getClients()
  
  const client = clients.find(
    c => c.username === username && c.password === password
  )
  
  return client || null
}

// Get client from session (browser-side)
export function getClientFromSession(): Client | null {
  if (typeof window === 'undefined') return null
  
  try {
    const clientData = localStorage.getItem('client')
    return clientData ? JSON.parse(clientData) : null
  } catch {
    return null
  }
}

// Set client in session (browser-side)
export function setClientInSession(client: Client): void {
  if (typeof window === 'undefined') return
  
  localStorage.setItem('client', JSON.stringify(client))
}

// Clear client session (browser-side)
export function clearClientSession(): void {
  if (typeof window === 'undefined') return
  
  localStorage.removeItem('client')
}

// Check if client has access to IGG ID
export function clientHasAccess(client: Client | null, iggId: string): boolean {
  if (!client) return false
  // Admins have access to all castles
  if (client.role === 'admin') return true
  return client.ids_igg.includes(iggId)
}

// Check if user is admin
export function isAdmin(client: Client | null): boolean {
  if (!client) return false
  return client.role === 'admin' || client.username === 'admin' || client.username === 'demo'
}
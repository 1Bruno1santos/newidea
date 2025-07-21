import { promises as fs } from 'fs'
import path from 'path'
import { Client, ClientsData } from './auth-types'

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
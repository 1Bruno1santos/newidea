import { Client } from './auth-types'

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
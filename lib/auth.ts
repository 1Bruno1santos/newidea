// Re-export types and client functions for backward compatibility
export type { Client, ClientsData } from './auth-types'
export { 
  getClientFromSession, 
  setClientInSession, 
  clearClientSession, 
  clientHasAccess, 
  isAdmin 
} from './auth-client'
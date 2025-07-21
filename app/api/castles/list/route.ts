import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

// Convert Windows path to WSL path if needed
function convertPath(windowsPath: string): string {
  // Check if running in WSL and path is Windows format
  if (process.platform === 'linux' && windowsPath.match(/^[A-Z]:\\/)) {
    const drive = windowsPath[0].toLowerCase()
    const pathPart = windowsPath.substring(2).replace(/\\/g, '/')
    return `/mnt/${drive}${pathPart}`
  }
  return windowsPath
}

export async function GET(request: NextRequest) {
  try {
    // Get the auth header to identify the user
    const authHeader = request.headers.get('x-client-data')
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const client = JSON.parse(authHeader)
    const isAdmin = client.role === 'admin' || client.username === 'admin' || client.username === 'demo'

    // Get config path from settings
    const settingsResponse = await fetch(`${request.nextUrl.origin}/api/settings`)
    const settings = await settingsResponse.json()
    const configPath = convertPath(settings.config_path)

    // Read castle directories
    const castles = []
    
    try {
      const dirs = await fs.readdir(configPath)
      
      for (const dir of dirs) {
        // Skip non-numeric directories
        if (!/^\d+$/.test(dir)) continue
        
        const iggId = dir
        
        // Check if client has access to this castle
        if (!isAdmin && !client.ids_igg.includes(iggId)) continue
        
        const castlePath = path.join(configPath, dir)
        const settingsPath = path.join(castlePath, 'settings.json')
        
        try {
          // Check if it's a directory
          const stat = await fs.stat(castlePath)
          if (!stat.isDirectory()) continue
          
          // Try to read settings.json
          let castleData = {
            igg_id: iggId,
            name: `Castle_${iggId}`,
            level: 1,
            power: 0,
            troops: 0
          }
          
          try {
            const settingsContent = await fs.readFile(settingsPath, 'utf-8')
            const settings = JSON.parse(settingsContent)
            
            // Extract castle info from settings if available
            castleData.name = settings.castleName || settings.name || castleData.name
            castleData.level = settings.castleLevel || settings.level || castleData.level
            castleData.power = settings.power || castleData.power
            castleData.troops = settings.troops || castleData.troops
          } catch (e) {
            // If settings.json doesn't exist or is invalid, use defaults
            console.log(`No valid settings.json for castle ${iggId}`)
          }
          
          castles.push(castleData)
        } catch (e) {
          console.error(`Error processing castle ${iggId}:`, e)
        }
      }
    } catch (error) {
      console.error('Error reading config directory:', error)
      // Return mock data if directory doesn't exist
      if (isAdmin) {
        return NextResponse.json({
          castles: [
            { igg_id: "830123456", name: "Castelo_Imperial", level: 35, power: 1000000, troops: 50000 },
            { igg_id: "830987654", name: "Fortaleza_Negra", level: 28, power: 800000, troops: 40000 },
            { igg_id: "830555555", name: "Torre_do_Dragão", level: 42, power: 1200000, troops: 60000 }
          ]
        })
      } else {
        // Filter mock data based on client's IGG IDs
        const mockCastles = [
          { igg_id: "830123456", name: "Castelo_Imperial", level: 35, power: 1000000, troops: 50000 },
          { igg_id: "830987654", name: "Fortaleza_Negra", level: 28, power: 800000, troops: 40000 },
          { igg_id: "830555555", name: "Torre_do_Dragão", level: 42, power: 1200000, troops: 60000 }
        ].filter(castle => client.ids_igg.includes(castle.igg_id))
        
        return NextResponse.json({ castles: mockCastles })
      }
    }
    
    return NextResponse.json({ castles })
    
  } catch (error) {
    console.error('Castles list error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch castles' },
      { status: 500 }
    )
  }
}
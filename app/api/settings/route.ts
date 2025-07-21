import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

// Settings file path
const SETTINGS_FILE = path.join(process.cwd(), 'data', 'system-settings.json')

// Default settings
const defaultSettings = {
  config_path: "C:\\Users\\bruno\\Desktop\\lordsbot_dev\\config"
}

async function loadSettings() {
  try {
    const data = await fs.readFile(SETTINGS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    // If file doesn't exist, return defaults
    return defaultSettings
  }
}

async function saveSettings(settings: any) {
  const dir = path.dirname(SETTINGS_FILE)
  try {
    await fs.mkdir(dir, { recursive: true })
    await fs.writeFile(SETTINGS_FILE, JSON.stringify(settings, null, 2))
  } catch (error) {
    console.error('Error saving settings:', error)
    throw error
  }
}

export async function GET(request: NextRequest) {
  try {
    const settings = await loadSettings()
    return NextResponse.json({
      config_path: settings.config_path
    })
  } catch (error) {
    console.error('Settings error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { config_path } = body

    if (!config_path) {
      return NextResponse.json(
        { error: 'config_path is required' },
        { status: 400 }
      )
    }

    const settings = await loadSettings()
    settings.config_path = config_path
    await saveSettings(settings)

    return NextResponse.json({
      message: 'Settings updated successfully',
      config_path: settings.config_path
    })
  } catch (error) {
    console.error('Settings update error:', error)
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    )
  }
}
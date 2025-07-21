// app/api/telegram-webhook/route.ts

import { type NextRequest, NextResponse } from "next/server"
import { Telegraf, type Context } from "telegraf"

const BOT_TOKEN = process.env.BOT_TOKEN ?? ""
const bot = new Telegraf(BOT_TOKEN)

bot.start((ctx: Context) => ctx.reply("Welcome to DieselBot!"))

// Add more commands and bot logic here...

// 1. Tratamos apenas POST (que é como o Telegram manda updates)
export async function POST(req: NextRequest) {
  try {
    // Use a separate await for clarity
    const update = await req.json()
    await bot.handleUpdate(update)
    return new NextResponse("OK", { status: 200 })
  } catch (error) {
    // More specific error handling if needed
    console.error("Error handling Telegram update:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

// Explicitly disallow other methods
export const GET = () => new NextResponse("Method Not Allowed", { status: 405 })
export const PUT = () => new NextResponse("Method Not Allowed", { status: 405 })
export const DELETE = () => new NextResponse("Method Not Allowed", { status: 405 })


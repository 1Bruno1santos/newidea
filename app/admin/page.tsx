"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Users, 
  Bot, 
  AlertCircle, 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock
} from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Mock data for development
const mockStats = {
  totalCustomers: 15,
  activeCustomers: 12,
  totalBots: 45,
  activeBots: 38,
  expiredBots: 7,
  monthlyRevenue: 4500.00,
  lastMonthRevenue: 4200.00,
  revenueGrowth: 7.14,
  expiringThisMonth: 5,
  renewalRate: 85
}

const mockRecentActivities = [
  {
    id: 1,
    type: 'renewal',
    customer: 'João Silva',
    action: 'Bot renovado',
    castle: '830123456',
    date: new Date().toISOString(),
    value: 150.00
  },
  {
    id: 2,
    type: 'new_customer',
    customer: 'Maria Santos',
    action: 'Novo cliente cadastrado',
    date: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 3,
    type: 'expiration',
    customer: 'Pedro Costa',
    action: 'Bot expirado',
    castle: '830987654',
    date: new Date(Date.now() - 172800000).toISOString(),
  },
]

const mockRevenueData = [
  { month: 'Jul', revenue: 3200 },
  { month: 'Ago', revenue: 3800 },
  { month: 'Set', revenue: 3500 },
  { month: 'Out', revenue: 4100 },
  { month: 'Nov', revenue: 4200 },
  { month: 'Dez', revenue: 4500 },
]

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState(mockStats)
  const [activities, setActivities] = useState(mockRecentActivities)
  const [revenueData, setRevenueData] = useState(mockRevenueData)

  useEffect(() => {
    // In production, fetch real data from API
    // For now, using mock data
    setTimeout(() => setLoading(false), 500)
  }, [])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    
    if (hours < 1) return 'Há poucos minutos'
    if (hours < 24) return `Há ${hours} horas`
    if (hours < 48) return 'Ontem'
    return date.toLocaleDateString('pt-BR')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-zinc-400">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard Administrativo</h1>
        <p className="text-zinc-400 mt-1">
          Visão geral do sistema DieselBot
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">
              Clientes Ativos
            </CardTitle>
            <Users className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeCustomers}</div>
            <p className="text-xs text-zinc-500">
              {stats.totalCustomers} total
            </p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">
              Bots Ativos
            </CardTitle>
            <Bot className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeBots}</div>
            <p className="text-xs text-zinc-500">
              {stats.totalBots} total
            </p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">
              Bots Expirados
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              {stats.expiredBots}
            </div>
            <p className="text-xs text-zinc-500">
              {stats.expiringThisMonth} expirando este mês
            </p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">
              Receita Mensal
            </CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(stats.monthlyRevenue)}
            </div>
            <div className="flex items-center text-xs">
              {stats.revenueGrowth > 0 ? (
                <>
                  <TrendingUp className="h-3 w-3 text-emerald-500 mr-1" />
                  <span className="text-emerald-500">
                    +{stats.revenueGrowth.toFixed(1)}%
                  </span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                  <span className="text-red-500">
                    {stats.revenueGrowth.toFixed(1)}%
                  </span>
                </>
              )}
              <span className="text-zinc-500 ml-1">vs mês anterior</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Activities */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle>Receita dos Últimos 6 Meses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-2">
              {revenueData.map((data, index) => {
                const height = (data.revenue / 5000) * 100
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-zinc-800 rounded-t relative" style={{ height: `${height}%` }}>
                      <div className="absolute -top-6 left-0 right-0 text-center text-xs text-zinc-400">
                        {formatCurrency(data.revenue)}
                      </div>
                    </div>
                    <span className="text-xs text-zinc-500">{data.month}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center",
                    activity.type === 'renewal' && "bg-emerald-500/20",
                    activity.type === 'new_customer' && "bg-blue-500/20",
                    activity.type === 'expiration' && "bg-red-500/20"
                  )}>
                    {activity.type === 'renewal' && <Clock className="h-4 w-4 text-emerald-500" />}
                    {activity.type === 'new_customer' && <Users className="h-4 w-4 text-blue-500" />}
                    {activity.type === 'expiration' && <AlertCircle className="h-4 w-4 text-red-500" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.customer}</span>
                      {' - '}
                      <span className="text-zinc-400">{activity.action}</span>
                    </p>
                    {activity.castle && (
                      <p className="text-xs text-zinc-500">Castle: {activity.castle}</p>
                    )}
                    {activity.value && (
                      <p className="text-xs text-emerald-500">{formatCurrency(activity.value)}</p>
                    )}
                  </div>
                  <span className="text-xs text-zinc-500">{formatDate(activity.date)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-lg">Taxa de Renovação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Taxa atual</span>
                <span className="text-2xl font-bold text-emerald-500">{stats.renewalRate}%</span>
              </div>
              <Progress value={stats.renewalRate} className="h-2" />
              <p className="text-xs text-zinc-500">
                Meta: 90% de renovação mensal
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-lg">Bots por Expirar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Próximos 7 dias</span>
                <span className="text-lg font-semibold text-orange-500">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Próximos 15 dias</span>
                <span className="text-lg font-semibold text-yellow-500">5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Próximos 30 dias</span>
                <span className="text-lg font-semibold">{stats.expiringThisMonth}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
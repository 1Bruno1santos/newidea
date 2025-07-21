"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { 
  ArrowLeft,
  Plus, 
  Edit,
  Bot,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  AlertCircle,
  RefreshCw,
  Pause,
  X,
  Trash2,
  MoreHorizontal
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

// Mock data for development
const mockCustomer = {
  id: 1,
  customer_code: "CLIENTE_001",
  name: "João Silva",
  email: "joao.silva@email.com",
  whatsapp: "11999887766",
  address: "Rua das Flores, 123 - São Paulo, SP",
  created_at: new Date('2024-01-15').toISOString(),
  bots: [
    {
      id: 1,
      castle_id: "830123456",
      igg_id: "123456789",
      plan_type: "mensal",
      price: 150.00,
      status: "active",
      start_date: new Date('2024-01-15').toISOString(),
      end_date: new Date('2025-01-15').toISOString(),
      renewals: [
        {
          id: 1,
          action: "renewed",
          old_end_date: new Date('2024-12-15').toISOString(),
          new_end_date: new Date('2025-01-15').toISOString(),
          price: 150.00,
          created_at: new Date('2024-12-01').toISOString()
        }
      ]
    },
    {
      id: 2,
      castle_id: "830987654",
      igg_id: "987654321",
      plan_type: "trimestral",
      price: 400.00,
      status: "active",
      start_date: new Date('2024-02-01').toISOString(),
      end_date: new Date('2025-02-01').toISOString(),
      renewals: []
    },
    {
      id: 3,
      castle_id: "830555555",
      igg_id: "555555555",
      plan_type: "mensal",
      price: 150.00,
      status: "expired",
      start_date: new Date('2023-11-01').toISOString(),
      end_date: new Date('2024-11-01').toISOString(),
      renewals: []
    }
  ]
}

export default function CustomerDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [customer, setCustomer] = useState(mockCustomer)
  const [loading, setLoading] = useState(false)
  const [showNewBotDialog, setShowNewBotDialog] = useState(false)
  const [showRenewDialog, setShowRenewDialog] = useState(false)
  const [selectedBot, setSelectedBot] = useState<any>(null)
  const [newBot, setNewBot] = useState({
    castle_id: "",
    igg_id: "",
    plan_type: "mensal",
    price: 150.00
  })

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-BR')
  }

  const getDaysUntilExpiration = (endDate: string) => {
    const end = new Date(endDate)
    const now = new Date()
    const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    return diff
  }

  const getStatusBadge = (status: string, endDate: string) => {
    const daysLeft = getDaysUntilExpiration(endDate)
    
    if (status === 'expired') {
      return <Badge variant="destructive">Expirado</Badge>
    } else if (status === 'paused') {
      return <Badge variant="secondary">Pausado</Badge>
    } else if (daysLeft <= 7) {
      return <Badge variant="warning">Expirando</Badge>
    } else {
      return <Badge variant="success">Ativo</Badge>
    }
  }

  const getPlanPrice = (planType: string) => {
    const prices: Record<string, number> = {
      mensal: 150.00,
      trimestral: 400.00,
      semestral: 750.00,
      anual: 1400.00
    }
    return prices[planType] || 150.00
  }

  const handleCreateBot = async () => {
    if (!newBot.castle_id || !newBot.igg_id) {
      toast({
        title: "Erro",
        description: "Castle ID e IGG ID são obrigatórios",
        variant: "destructive"
      })
      return
    }

    setLoading(true)
    
    const now = new Date()
    const endDate = new Date(now)
    
    switch (newBot.plan_type) {
      case 'mensal':
        endDate.setMonth(endDate.getMonth() + 1)
        break
      case 'trimestral':
        endDate.setMonth(endDate.getMonth() + 3)
        break
      case 'semestral':
        endDate.setMonth(endDate.getMonth() + 6)
        break
      case 'anual':
        endDate.setFullYear(endDate.getFullYear() + 1)
        break
    }

    const newBotData = {
      id: customer.bots.length + 1,
      ...newBot,
      status: 'active',
      start_date: now.toISOString(),
      end_date: endDate.toISOString(),
      renewals: []
    }

    setCustomer({
      ...customer,
      bots: [...customer.bots, newBotData]
    })
    
    setShowNewBotDialog(false)
    setNewBot({
      castle_id: "",
      igg_id: "",
      plan_type: "mensal",
      price: 150.00
    })
    
    toast({
      title: "Bot criado",
      description: `Bot ${newBotData.castle_id} foi adicionado com sucesso!`
    })
    
    setLoading(false)
  }

  const handleRenewBot = async () => {
    if (!selectedBot) return

    setLoading(true)
    
    const now = new Date()
    const newEndDate = new Date(selectedBot.end_date)
    
    switch (selectedBot.plan_type) {
      case 'mensal':
        newEndDate.setMonth(newEndDate.getMonth() + 1)
        break
      case 'trimestral':
        newEndDate.setMonth(newEndDate.getMonth() + 3)
        break
      case 'semestral':
        newEndDate.setMonth(newEndDate.getMonth() + 6)
        break
      case 'anual':
        newEndDate.setFullYear(newEndDate.getFullYear() + 1)
        break
    }

    const renewal = {
      id: selectedBot.renewals.length + 1,
      action: 'renewed',
      old_end_date: selectedBot.end_date,
      new_end_date: newEndDate.toISOString(),
      price: selectedBot.price,
      created_at: now.toISOString()
    }

    const updatedBots = customer.bots.map(bot => {
      if (bot.id === selectedBot.id) {
        return {
          ...bot,
          status: 'active',
          end_date: newEndDate.toISOString(),
          renewals: [...bot.renewals, renewal]
        }
      }
      return bot
    })

    setCustomer({
      ...customer,
      bots: updatedBots
    })
    
    setShowRenewDialog(false)
    setSelectedBot(null)
    
    toast({
      title: "Bot renovado",
      description: `Bot ${selectedBot.castle_id} foi renovado até ${formatDate(newEndDate.toISOString())}`
    })
    
    setLoading(false)
  }

  const handlePauseBot = async (botId: number) => {
    const updatedBots = customer.bots.map(bot => {
      if (bot.id === botId) {
        return { ...bot, status: 'paused' }
      }
      return bot
    })

    setCustomer({ ...customer, bots: updatedBots })
    
    toast({
      title: "Bot pausado",
      description: "O bot foi pausado com sucesso."
    })
  }

  const handleCancelBot = async (botId: number) => {
    if (window.confirm("Tem certeza que deseja cancelar este bot?")) {
      const updatedBots = customer.bots.map(bot => {
        if (bot.id === botId) {
          return { ...bot, status: 'cancelled' }
        }
        return bot
      })

      setCustomer({ ...customer, bots: updatedBots })
      
      toast({
        title: "Bot cancelado",
        description: "O bot foi cancelado com sucesso."
      })
    }
  }

  const handleDeleteBot = async (botId: number) => {
    if (window.confirm("ATENÇÃO: Esta ação é irreversível!\n\nTem certeza que deseja REMOVER COMPLETAMENTE este bot?\n\nTodo o histórico será perdido.")) {
      const updatedBots = customer.bots.filter(bot => bot.id !== botId)

      setCustomer({ ...customer, bots: updatedBots })
      
      toast({
        title: "Bot removido",
        description: "O bot foi removido completamente da ficha do cliente.",
        variant: "destructive"
      })
    }
  }

  const activeBots = customer.bots.filter(bot => bot.status === 'active').length
  const expiredBots = customer.bots.filter(bot => bot.status === 'expired').length
  const monthlyValue = customer.bots
    .filter(bot => bot.status === 'active')
    .reduce((sum, bot) => sum + bot.price, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/admin/users')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{customer.customer_code}</h1>
            <p className="text-zinc-400 mt-1">{customer.name}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-zinc-800">
            <Edit className="h-4 w-4 mr-2" />
            Editar Cliente
          </Button>
          <Button 
            onClick={() => setShowNewBotDialog(true)}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Novo Bot
          </Button>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Contact Info */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-lg">Informações de Contato</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-zinc-400" />
              <span className="text-sm">{customer.email || 'Não informado'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-zinc-400" />
              <span className="text-sm">{customer.whatsapp || 'Não informado'}</span>
              {customer.whatsapp && (
                <a
                  href={`https://wa.me/55${customer.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-500 hover:text-emerald-400 text-xs"
                >
                  Abrir WhatsApp
                </a>
              )}
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-zinc-400 mt-0.5" />
              <span className="text-sm">{customer.address || 'Não informado'}</span>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-lg">Estatísticas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-zinc-400">Total de Bots</span>
              <span className="font-medium">{customer.bots.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-zinc-400">Bots Ativos</span>
              <span className="font-medium text-emerald-500">{activeBots}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-zinc-400">Bots Expirados</span>
              <span className="font-medium text-red-500">{expiredBots}</span>
            </div>
            <div className="pt-2 border-t border-zinc-800">
              <div className="flex justify-between">
                <span className="text-sm text-zinc-400">Valor Mensal</span>
                <span className="font-medium text-emerald-500">
                  {formatCurrency(monthlyValue)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Info */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-lg">Informações da Conta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-zinc-400">Cliente desde</span>
              <span className="text-sm">{formatDate(customer.created_at)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-zinc-400">Status</span>
              <Badge variant="success">Ativo</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-zinc-400">Tipo</span>
              <span className="text-sm">Cliente Regular</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bots Table */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle>Bots do Cliente</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800">
                <TableHead>Castle ID / IGG ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Plano</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Expira em</TableHead>
                <TableHead>Renovações</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customer.bots.map((bot) => {
                const daysLeft = getDaysUntilExpiration(bot.end_date)
                return (
                  <TableRow key={bot.id} className="border-zinc-800">
                    <TableCell>
                      <div>
                        <div className="font-mono text-sm">{bot.castle_id}</div>
                        <div className="text-xs text-zinc-400">IGG: {bot.igg_id}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(bot.status, bot.end_date)}
                    </TableCell>
                    <TableCell className="capitalize">{bot.plan_type}</TableCell>
                    <TableCell>{formatCurrency(bot.price)}</TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm">{formatDate(bot.end_date)}</div>
                        {bot.status === 'active' && (
                          <div className={cn(
                            "text-xs",
                            daysLeft <= 7 ? "text-red-500" : 
                            daysLeft <= 30 ? "text-yellow-500" : 
                            "text-zinc-400"
                          )}>
                            {daysLeft > 0 ? `${daysLeft} dias` : 'Expirado'}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{bot.renewals.length}</span>
                        {bot.renewals.length > 0 && (
                          <Clock className="h-3 w-3 text-zinc-400" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800">
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-zinc-800" />
                          {bot.status === 'active' && (
                            <>
                              <DropdownMenuItem 
                                onClick={() => {
                                  setSelectedBot(bot)
                                  setShowRenewDialog(true)
                                }}
                              >
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Renovar
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handlePauseBot(bot.id)}>
                                <Pause className="mr-2 h-4 w-4" />
                                Pausar
                              </DropdownMenuItem>
                            </>
                          )}
                          {bot.status === 'expired' && (
                            <DropdownMenuItem 
                              onClick={() => {
                                setSelectedBot(bot)
                                setShowRenewDialog(true)
                              }}
                            >
                              <RefreshCw className="mr-2 h-4 w-4" />
                              Reativar
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-orange-500"
                            onClick={() => handleCancelBot(bot.id)}
                          >
                            <X className="mr-2 h-4 w-4" />
                            Cancelar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-zinc-800" />
                          <DropdownMenuItem 
                            className="text-red-600 hover:text-red-500"
                            onClick={() => handleDeleteBot(bot.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remover Completamente
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* New Bot Dialog */}
      <Dialog open={showNewBotDialog} onOpenChange={setShowNewBotDialog}>
        <DialogContent className="bg-zinc-900 border-zinc-800">
          <DialogHeader>
            <DialogTitle>Novo Bot</DialogTitle>
            <DialogDescription>
              Adicione um novo bot para {customer.name}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="castle_id">Castle ID *</Label>
              <Input
                id="castle_id"
                placeholder="830123456"
                value={newBot.castle_id}
                onChange={(e) => setNewBot({...newBot, castle_id: e.target.value})}
                className="bg-zinc-800 border-zinc-700"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="igg_id">IGG ID *</Label>
              <Input
                id="igg_id"
                placeholder="123456789"
                value={newBot.igg_id}
                onChange={(e) => setNewBot({...newBot, igg_id: e.target.value})}
                className="bg-zinc-800 border-zinc-700"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="plan_type">Plano</Label>
              <Select
                value={newBot.plan_type}
                onValueChange={(value) => setNewBot({
                  ...newBot, 
                  plan_type: value,
                  price: getPlanPrice(value)
                })}
              >
                <SelectTrigger className="bg-zinc-800 border-zinc-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800">
                  <SelectItem value="mensal">Mensal - R$ 150,00</SelectItem>
                  <SelectItem value="trimestral">Trimestral - R$ 400,00</SelectItem>
                  <SelectItem value="semestral">Semestral - R$ 750,00</SelectItem>
                  <SelectItem value="anual">Anual - R$ 1.400,00</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Valor (R$)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={newBot.price}
                onChange={(e) => setNewBot({...newBot, price: parseFloat(e.target.value)})}
                className="bg-zinc-800 border-zinc-700"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewBotDialog(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleCreateBot} 
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Criar Bot
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Renew Bot Dialog */}
      <Dialog open={showRenewDialog} onOpenChange={setShowRenewDialog}>
        <DialogContent className="bg-zinc-900 border-zinc-800">
          <DialogHeader>
            <DialogTitle>Renovar Bot</DialogTitle>
            <DialogDescription>
              Confirme a renovação do bot {selectedBot?.castle_id}
            </DialogDescription>
          </DialogHeader>
          {selectedBot && (
            <div className="py-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-zinc-400">Plano atual</span>
                  <span className="capitalize">{selectedBot.plan_type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-zinc-400">Valor</span>
                  <span>{formatCurrency(selectedBot.price)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-zinc-400">Expira em</span>
                  <span>{formatDate(selectedBot.end_date)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-zinc-400">Nova data de expiração</span>
                  <span className="font-medium text-emerald-500">
                    {(() => {
                      const newDate = new Date(selectedBot.end_date)
                      switch (selectedBot.plan_type) {
                        case 'mensal':
                          newDate.setMonth(newDate.getMonth() + 1)
                          break
                        case 'trimestral':
                          newDate.setMonth(newDate.getMonth() + 3)
                          break
                        case 'semestral':
                          newDate.setMonth(newDate.getMonth() + 6)
                          break
                        case 'anual':
                          newDate.setFullYear(newDate.getFullYear() + 1)
                          break
                      }
                      return formatDate(newDate.toISOString())
                    })()}
                  </span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRenewDialog(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleRenewBot} 
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Confirmar Renovação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
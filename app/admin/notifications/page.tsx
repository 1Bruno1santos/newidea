"use client"

import { useEffect, useState } from "react"
import { 
  Bell, 
  Send, 
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Filter,
  Plus,
  MessageSquare,
  Calendar,
  Users,
  Bot
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for development
const mockNotifications = [
  {
    id: 1,
    customer_id: 1,
    customer_name: "João Silva",
    type: "renewal_reminder",
    title: "Lembrete de Renovação",
    message: "Seu bot 830123456 expira em 7 dias. Renove agora para não perder o acesso!",
    channel: "whatsapp",
    status: "sent",
    scheduled_at: new Date(Date.now() - 86400000).toISOString(),
    sent_at: new Date(Date.now() - 86400000).toISOString(),
    castle_id: "830123456"
  },
  {
    id: 2,
    customer_id: 2,
    customer_name: "Maria Santos",
    type: "expiration_warning",
    title: "Aviso de Expiração",
    message: "Seu bot 830987654 expirou ontem. Renove para reativar o serviço.",
    channel: "whatsapp",
    status: "pending",
    scheduled_at: new Date().toISOString(),
    castle_id: "830987654"
  },
  {
    id: 3,
    customer_id: 3,
    customer_name: "Pedro Costa",
    type: "payment_pending",
    title: "Pagamento Pendente",
    message: "Identificamos um pagamento pendente para o bot 830555555. Entre em contato para regularizar.",
    channel: "email",
    status: "failed",
    scheduled_at: new Date(Date.now() - 172800000).toISOString(),
    error: "Email inválido"
  },
  {
    id: 4,
    customer_id: 1,
    customer_name: "João Silva",
    type: "general",
    title: "Novidades do DieselBot",
    message: "Confira as novas funcionalidades disponíveis para seu bot!",
    channel: "whatsapp",
    status: "sent",
    scheduled_at: new Date(Date.now() - 259200000).toISOString(),
    sent_at: new Date(Date.now() - 259200000).toISOString()
  }
]

const mockCustomers = [
  { id: 1, name: "João Silva", whatsapp: "11999887766" },
  { id: 2, name: "Maria Santos", whatsapp: "21998765432" },
  { id: 3, name: "Pedro Costa", whatsapp: "31987654321" },
]

export default function NotificationsPage() {
  const { toast } = useToast()
  const [notifications, setNotifications] = useState(mockNotifications)
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [showNewNotificationDialog, setShowNewNotificationDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const [newNotification, setNewNotification] = useState({
    customer_id: "",
    type: "general",
    title: "",
    message: "",
    channel: "whatsapp"
  })

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filter === "all" || notification.status === filter
    const matchesSearch = notification.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return <Badge variant="success">Enviada</Badge>
      case 'pending':
        return <Badge variant="warning">Pendente</Badge>
      case 'failed':
        return <Badge variant="destructive">Falhou</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'renewal_reminder':
        return <Clock className="h-4 w-4 text-blue-500" />
      case 'expiration_warning':
        return <AlertCircle className="h-4 w-4 text-orange-500" />
      case 'payment_pending':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case 'general':
        return <MessageSquare className="h-4 w-4 text-zinc-400" />
      default:
        return <Bell className="h-4 w-4 text-zinc-400" />
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleString('pt-BR')
  }

  const handleSendNotification = async () => {
    if (!newNotification.customer_id || !newNotification.title || !newNotification.message) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      })
      return
    }

    setLoading(true)
    
    const customer = mockCustomers.find(c => c.id === parseInt(newNotification.customer_id))
    const notification = {
      id: notifications.length + 1,
      ...newNotification,
      customer_id: parseInt(newNotification.customer_id),
      customer_name: customer?.name || "",
      status: 'pending',
      scheduled_at: new Date().toISOString()
    }

    setNotifications([notification, ...notifications])
    setShowNewNotificationDialog(false)
    setNewNotification({
      customer_id: "",
      type: "general",
      title: "",
      message: "",
      channel: "whatsapp"
    })
    
    toast({
      title: "Notificação criada",
      description: "A notificação foi agendada para envio."
    })
    
    // Simulate sending
    setTimeout(() => {
      setNotifications(prev => prev.map(n => 
        n.id === notification.id 
          ? { ...n, status: 'sent', sent_at: new Date().toISOString() }
          : n
      ))
    }, 2000)
    
    setLoading(false)
  }

  const handleResendNotification = async (notificationId: number) => {
    setNotifications(prev => prev.map(n => 
      n.id === notificationId 
        ? { ...n, status: 'pending', error: undefined }
        : n
    ))
    
    toast({
      title: "Reenviando notificação",
      description: "A notificação será processada novamente."
    })
    
    // Simulate sending
    setTimeout(() => {
      setNotifications(prev => prev.map(n => 
        n.id === notificationId 
          ? { ...n, status: 'sent', sent_at: new Date().toISOString() }
          : n
      ))
    }, 2000)
  }

  const stats = {
    total: notifications.length,
    sent: notifications.filter(n => n.status === 'sent').length,
    pending: notifications.filter(n => n.status === 'pending').length,
    failed: notifications.filter(n => n.status === 'failed').length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notificações</h1>
          <p className="text-zinc-400 mt-1">
            Central de comunicação com clientes
          </p>
        </div>
        <Button 
          onClick={() => setShowNewNotificationDialog(true)}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nova Notificação
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">
              Total
            </CardTitle>
            <Bell className="h-4 w-4 text-zinc-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">
              Enviadas
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">{stats.sent}</div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">
              Pendentes
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">{stats.pending}</div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">
              Falharam
            </CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{stats.failed}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            placeholder="Buscar notificações..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-zinc-900 border-zinc-800"
          />
        </div>
        <Tabs value={filter} onValueChange={setFilter} className="w-auto">
          <TabsList className="bg-zinc-900">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="sent">Enviadas</TabsTrigger>
            <TabsTrigger value="pending">Pendentes</TabsTrigger>
            <TabsTrigger value="failed">Falharam</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Notifications Table */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800">
                <TableHead>Tipo</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Canal</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNotifications.map((notification) => (
                <TableRow key={notification.id} className="border-zinc-800">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(notification.type)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{notification.customer_name}</div>
                      {notification.castle_id && (
                        <div className="text-xs text-zinc-400">Castle: {notification.castle_id}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{notification.title}</div>
                      <div className="text-xs text-zinc-400 max-w-xs truncate">
                        {notification.message}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {notification.channel === 'whatsapp' && <MessageSquare className="h-3 w-3" />}
                      <span className="text-sm capitalize">{notification.channel}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      {getStatusBadge(notification.status)}
                      {notification.error && (
                        <div className="text-xs text-red-400 mt-1">{notification.error}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {notification.sent_at 
                        ? formatDate(notification.sent_at)
                        : formatDate(notification.scheduled_at)
                      }
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {notification.status === 'failed' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleResendNotification(notification.id)}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    )}
                    {notification.channel === 'whatsapp' && notification.status === 'pending' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                      >
                        <a
                          href={`https://wa.me/55${mockCustomers.find(c => c.id === notification.customer_id)?.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(notification.message)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageSquare className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* New Notification Dialog */}
      <Dialog open={showNewNotificationDialog} onOpenChange={setShowNewNotificationDialog}>
        <DialogContent className="bg-zinc-900 border-zinc-800">
          <DialogHeader>
            <DialogTitle>Nova Notificação</DialogTitle>
            <DialogDescription>
              Envie uma notificação para um cliente
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="customer">Cliente *</Label>
              <Select
                value={newNotification.customer_id}
                onValueChange={(value) => setNewNotification({...newNotification, customer_id: value})}
              >
                <SelectTrigger className="bg-zinc-800 border-zinc-700">
                  <SelectValue placeholder="Selecione um cliente" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800">
                  {mockCustomers.map(customer => (
                    <SelectItem key={customer.id} value={customer.id.toString()}>
                      {customer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Tipo</Label>
              <Select
                value={newNotification.type}
                onValueChange={(value) => setNewNotification({...newNotification, type: value})}
              >
                <SelectTrigger className="bg-zinc-800 border-zinc-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800">
                  <SelectItem value="general">Geral</SelectItem>
                  <SelectItem value="renewal_reminder">Lembrete de Renovação</SelectItem>
                  <SelectItem value="expiration_warning">Aviso de Expiração</SelectItem>
                  <SelectItem value="payment_pending">Pagamento Pendente</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="channel">Canal</Label>
              <Select
                value={newNotification.channel}
                onValueChange={(value) => setNewNotification({...newNotification, channel: value})}
              >
                <SelectTrigger className="bg-zinc-800 border-zinc-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800">
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                value={newNotification.title}
                onChange={(e) => setNewNotification({...newNotification, title: e.target.value})}
                className="bg-zinc-800 border-zinc-700"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Mensagem *</Label>
              <Textarea
                id="message"
                rows={4}
                value={newNotification.message}
                onChange={(e) => setNewNotification({...newNotification, message: e.target.value})}
                className="bg-zinc-800 border-zinc-700"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewNotificationDialog(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSendNotification} 
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Enviar Notificação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
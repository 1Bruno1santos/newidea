"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { 
  Plus, 
  Search, 
  Filter,
  Eye,
  Edit,
  Trash2,
  Bot,
  User,
  Mail,
  Phone,
  MapPin,
  MoreHorizontal
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { useToast } from "@/components/ui/use-toast"

// Mock data for development
const mockCustomers = [
  {
    id: 1,
    customer_code: "CLIENTE_001",
    name: "João Silva",
    email: "joao.silva@email.com",
    whatsapp: "11999887766",
    address: "Rua das Flores, 123 - São Paulo, SP",
    totalBots: 3,
    activeBots: 2,
    expiredBots: 1,
    monthlyValue: 450.00,
    created_at: new Date('2024-01-15').toISOString()
  },
  {
    id: 2,
    customer_code: "CLIENTE_002",
    name: "Maria Santos",
    email: "maria.santos@email.com",
    whatsapp: "21998765432",
    address: "Av. Principal, 456 - Rio de Janeiro, RJ",
    totalBots: 5,
    activeBots: 5,
    expiredBots: 0,
    monthlyValue: 750.00,
    created_at: new Date('2024-02-20').toISOString()
  },
  {
    id: 3,
    customer_code: "CLIENTE_003",
    name: "Pedro Costa",
    email: "pedro.costa@email.com",
    whatsapp: "31987654321",
    address: "Rua do Comércio, 789 - Belo Horizonte, MG",
    totalBots: 2,
    activeBots: 1,
    expiredBots: 1,
    monthlyValue: 300.00,
    created_at: new Date('2024-03-10').toISOString()
  }
]

export default function CustomersPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [customers, setCustomers] = useState(mockCustomers)
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)
  const [showNewCustomerDialog, setShowNewCustomerDialog] = useState(false)
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    whatsapp: "",
    address: "",
    password: ""
  })

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.customer_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-BR')
  }

  const generateCustomerCode = () => {
    const lastCustomer = customers.sort((a, b) => b.id - a.id)[0]
    const nextNumber = lastCustomer ? lastCustomer.id + 1 : 1
    return `CLIENTE_${nextNumber.toString().padStart(3, '0')}`
  }

  const handleCreateCustomer = async () => {
    if (!newCustomer.name || !newCustomer.password) {
      toast({
        title: "Erro",
        description: "Nome e senha são obrigatórios",
        variant: "destructive"
      })
      return
    }

    setLoading(true)
    
    // In production, this would be an API call
    const customerCode = generateCustomerCode()
    const newCustomerData = {
      id: customers.length + 1,
      customer_code: customerCode,
      ...newCustomer,
      totalBots: 0,
      activeBots: 0,
      expiredBots: 0,
      monthlyValue: 0,
      created_at: new Date().toISOString()
    }

    setCustomers([...customers, newCustomerData])
    setShowNewCustomerDialog(false)
    setNewCustomer({
      name: "",
      email: "",
      whatsapp: "",
      address: "",
      password: ""
    })
    
    toast({
      title: "Cliente criado",
      description: `${newCustomerData.name} foi adicionado com sucesso!`
    })
    
    setLoading(false)
  }

  const handleDeleteCustomer = async (customerId: number) => {
    if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
      setCustomers(customers.filter(c => c.id !== customerId))
      toast({
        title: "Cliente excluído",
        description: "O cliente foi removido com sucesso."
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Clientes</h1>
          <p className="text-zinc-400 mt-1">
            Gerencie todos os clientes do sistema
          </p>
        </div>
        <Button 
          onClick={() => setShowNewCustomerDialog(true)}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Novo Cliente
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            placeholder="Buscar por nome, código ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-zinc-900 border-zinc-800"
          />
        </div>
        <Button variant="outline" className="border-zinc-800">
          <Filter className="h-4 w-4 mr-2" />
          Filtros
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">
              Total de Clientes
            </CardTitle>
            <User className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
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
            <div className="text-2xl font-bold">
              {customers.reduce((sum, c) => sum + c.activeBots, 0)}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">
              Receita Mensal
            </CardTitle>
            <span className="text-emerald-500">R$</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(customers.reduce((sum, c) => sum + c.monthlyValue, 0))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customers Table */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800">
                <TableHead>Código</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead className="text-center">Bots</TableHead>
                <TableHead className="text-right">Valor Mensal</TableHead>
                <TableHead>Cadastro</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id} className="border-zinc-800">
                  <TableCell className="font-mono text-sm">
                    {customer.customer_code}
                  </TableCell>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {customer.email && (
                        <div className="flex items-center gap-1 text-xs text-zinc-400">
                          <Mail className="h-3 w-3" />
                          {customer.email}
                        </div>
                      )}
                      {customer.whatsapp && (
                        <div className="flex items-center gap-1 text-xs text-zinc-400">
                          <Phone className="h-3 w-3" />
                          {customer.whatsapp}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-4">
                      <div className="text-center">
                        <div className="text-sm font-medium">{customer.activeBots}</div>
                        <div className="text-xs text-emerald-500">Ativos</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">{customer.expiredBots}</div>
                        <div className="text-xs text-red-500">Expirados</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">{customer.totalBots}</div>
                        <div className="text-xs text-zinc-400">Total</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(customer.monthlyValue)}
                  </TableCell>
                  <TableCell className="text-sm text-zinc-400">
                    {formatDate(customer.created_at)}
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
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/users/${customer.id}`} className="cursor-pointer">
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Detalhes
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-500"
                          onClick={() => handleDeleteCustomer(customer.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* New Customer Dialog */}
      <Dialog open={showNewCustomerDialog} onOpenChange={setShowNewCustomerDialog}>
        <DialogContent className="bg-zinc-900 border-zinc-800">
          <DialogHeader>
            <DialogTitle>Novo Cliente</DialogTitle>
            <DialogDescription>
              Adicione um novo cliente ao sistema
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome *</Label>
              <Input
                id="name"
                value={newCustomer.name}
                onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                className="bg-zinc-800 border-zinc-700"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newCustomer.email}
                onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                className="bg-zinc-800 border-zinc-700"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input
                id="whatsapp"
                placeholder="11999887766"
                value={newCustomer.whatsapp}
                onChange={(e) => setNewCustomer({...newCustomer, whatsapp: e.target.value})}
                className="bg-zinc-800 border-zinc-700"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Endereço</Label>
              <Input
                id="address"
                value={newCustomer.address}
                onChange={(e) => setNewCustomer({...newCustomer, address: e.target.value})}
                className="bg-zinc-800 border-zinc-700"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Senha *</Label>
              <Input
                id="password"
                type="password"
                value={newCustomer.password}
                onChange={(e) => setNewCustomer({...newCustomer, password: e.target.value})}
                className="bg-zinc-800 border-zinc-700"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewCustomerDialog(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleCreateCustomer} 
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Criar Cliente
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
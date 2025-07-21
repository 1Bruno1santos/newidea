"use client"

import { useEffect, useState } from "react"
import { 
  Settings as SettingsIcon,
  Save,
  FolderOpen,
  Check,
  X,
  AlertCircle,
  RefreshCw,
  Database,
  Key,
  Bell,
  Bot,
  Globe
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for development
const mockSettings = {
  config_path: "C:\\Users\\bruno\\Desktop\\lordsbot_dev\\config",
  bot_token: "••••••••••••••••••••••••••••••••",
  whatsapp_api_key: "",
  notification_email: "admin@dieselbot.com",
  renewal_reminder_days: "30,15,7,1",
  auto_notifications: true,
  backup_enabled: true,
  backup_retention_days: 30,
  maintenance_mode: false,
  system_language: "pt-BR"
}

export default function SettingsPage() {
  const { toast } = useToast()
  const [settings, setSettings] = useState(mockSettings)
  const [loading, setLoading] = useState(false)
  const [pathValid, setPathValid] = useState(true)
  const [testingPath, setTestingPath] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  const convertPathToWSL = (windowsPath: string) => {
    // Convert Windows path to WSL path
    if (windowsPath.match(/^[A-Z]:\\/)) {
      const drive = windowsPath[0].toLowerCase()
      const path = windowsPath.substring(2).replace(/\\/g, '/')
      return `/mnt/${drive}${path}`
    }
    return windowsPath
  }

  const handlePathChange = (value: string) => {
    setSettings({ ...settings, config_path: value })
    setHasChanges(true)
    setPathValid(true) // Reset validation
  }

  const handleTestPath = async () => {
    setTestingPath(true)
    
    // Simulate path validation
    setTimeout(() => {
      const isValid = settings.config_path.length > 0
      setPathValid(isValid)
      setTestingPath(false)
      
      toast({
        title: isValid ? "Caminho válido" : "Caminho inválido",
        description: isValid 
          ? "O caminho foi validado com sucesso!" 
          : "Não foi possível acessar o caminho especificado.",
        variant: isValid ? "default" : "destructive"
      })
    }, 1000)
  }

  const handleSaveSettings = async () => {
    setLoading(true)
    
    // In production, this would save to database
    setTimeout(() => {
      setLoading(false)
      setHasChanges(false)
      
      toast({
        title: "Configurações salvas",
        description: "As configurações foram atualizadas com sucesso!"
      })
    }, 1000)
  }

  const handleResetSettings = () => {
    setSettings(mockSettings)
    setHasChanges(false)
    toast({
      title: "Configurações restauradas",
      description: "As configurações foram restauradas para os valores padrão."
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Configurações do Sistema</h1>
          <p className="text-zinc-400 mt-1">
            Gerencie as configurações globais do DieselBot
          </p>
        </div>
        <div className="flex gap-2">
          {hasChanges && (
            <Button
              variant="outline"
              onClick={handleResetSettings}
              className="border-zinc-800"
            >
              <X className="h-4 w-4 mr-2" />
              Descartar
            </Button>
          )}
          <Button 
            onClick={handleSaveSettings}
            disabled={loading || !hasChanges}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Save className="h-4 w-4 mr-2" />
            Salvar Configurações
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-zinc-900">
          <TabsTrigger value="general">
            <SettingsIcon className="h-4 w-4 mr-2" />
            Geral
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="integrations">
            <Globe className="h-4 w-4 mr-2" />
            Integrações
          </TabsTrigger>
          <TabsTrigger value="advanced">
            <Database className="h-4 w-4 mr-2" />
            Avançado
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          {/* Config Path */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle>Caminho de Configuração</CardTitle>
              <CardDescription>
                Define onde os arquivos de configuração dos castelos são armazenados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="config_path">Caminho dos Arquivos</Label>
                <div className="flex gap-2">
                  <Input
                    id="config_path"
                    value={settings.config_path}
                    onChange={(e) => handlePathChange(e.target.value)}
                    placeholder="C:\Users\bruno\Desktop\lordsbot_dev\config"
                    className={cn(
                      "bg-zinc-800 border-zinc-700 flex-1",
                      !pathValid && "border-red-500"
                    )}
                  />
                  <Button
                    variant="outline"
                    onClick={handleTestPath}
                    disabled={testingPath}
                    className="border-zinc-700"
                  >
                    {testingPath ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : pathValid ? (
                      <Check className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-zinc-500">
                  Caminho convertido para WSL: {convertPathToWSL(settings.config_path)}
                </p>
              </div>

              <div className="rounded-lg bg-zinc-800/50 p-4 space-y-2">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-yellow-500">Importante</p>
                    <p className="text-zinc-400">
                      Este caminho deve conter os diretórios de cada castelo com seus arquivos settings.json
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Settings */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>
                Configurações básicas do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="system_language">Idioma do Sistema</Label>
                  <Select
                    value={settings.system_language}
                    onValueChange={(value) => {
                      setSettings({ ...settings, system_language: value })
                      setHasChanges(true)
                    }}
                  >
                    <SelectTrigger className="bg-zinc-800 border-zinc-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-800">
                      <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="es-ES">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notification_email">Email de Notificação</Label>
                  <Input
                    id="notification_email"
                    type="email"
                    value={settings.notification_email}
                    onChange={(e) => {
                      setSettings({ ...settings, notification_email: e.target.value })
                      setHasChanges(true)
                    }}
                    className="bg-zinc-800 border-zinc-700"
                  />
                </div>
              </div>

              <Separator className="bg-zinc-800" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Modo de Manutenção</Label>
                    <p className="text-sm text-zinc-400">
                      Desativa o acesso dos clientes ao sistema
                    </p>
                  </div>
                  <Switch
                    checked={settings.maintenance_mode}
                    onCheckedChange={(checked) => {
                      setSettings({ ...settings, maintenance_mode: checked })
                      setHasChanges(true)
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Backup Automático</Label>
                    <p className="text-sm text-zinc-400">
                      Faz backup dos arquivos de configuração diariamente
                    </p>
                  </div>
                  <Switch
                    checked={settings.backup_enabled}
                    onCheckedChange={(checked) => {
                      setSettings({ ...settings, backup_enabled: checked })
                      setHasChanges(true)
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle>Configurações de Notificações</CardTitle>
              <CardDescription>
                Configure como e quando as notificações são enviadas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="renewal_reminder_days">Dias para Lembrete de Renovação</Label>
                <Input
                  id="renewal_reminder_days"
                  value={settings.renewal_reminder_days}
                  onChange={(e) => {
                    setSettings({ ...settings, renewal_reminder_days: e.target.value })
                    setHasChanges(true)
                  }}
                  placeholder="30,15,7,1"
                  className="bg-zinc-800 border-zinc-700"
                />
                <p className="text-xs text-zinc-500">
                  Separe os dias com vírgula (ex: 30,15,7,1)
                </p>
              </div>

              <Separator className="bg-zinc-800" />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificações Automáticas</Label>
                  <p className="text-sm text-zinc-400">
                    Enviar lembretes de renovação automaticamente
                  </p>
                </div>
                <Switch
                  checked={settings.auto_notifications}
                  onCheckedChange={(checked) => {
                    setSettings({ ...settings, auto_notifications: checked })
                    setHasChanges(true)
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle>Telegram Bot</CardTitle>
              <CardDescription>
                Configure a integração com o bot do Telegram
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bot_token">Bot Token</Label>
                <Input
                  id="bot_token"
                  type="password"
                  value={settings.bot_token}
                  onChange={(e) => {
                    setSettings({ ...settings, bot_token: e.target.value })
                    setHasChanges(true)
                  }}
                  placeholder="Digite o token do bot"
                  className="bg-zinc-800 border-zinc-700"
                />
                <p className="text-xs text-zinc-500">
                  Token fornecido pelo @BotFather no Telegram
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle>WhatsApp Business API</CardTitle>
              <CardDescription>
                Configure a integração com WhatsApp para notificações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="whatsapp_api_key">API Key</Label>
                <Input
                  id="whatsapp_api_key"
                  type="password"
                  value={settings.whatsapp_api_key}
                  onChange={(e) => {
                    setSettings({ ...settings, whatsapp_api_key: e.target.value })
                    setHasChanges(true)
                  }}
                  placeholder="Digite a API key do WhatsApp"
                  className="bg-zinc-800 border-zinc-700"
                />
                <p className="text-xs text-zinc-500">
                  Deixe em branco para usar links wa.me (modo desenvolvimento)
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle>Configurações de Backup</CardTitle>
              <CardDescription>
                Configure o sistema de backup automático
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="backup_retention_days">Retenção de Backup (dias)</Label>
                <Input
                  id="backup_retention_days"
                  type="number"
                  value={settings.backup_retention_days}
                  onChange={(e) => {
                    setSettings({ ...settings, backup_retention_days: parseInt(e.target.value) })
                    setHasChanges(true)
                  }}
                  min="1"
                  max="365"
                  className="bg-zinc-800 border-zinc-700"
                />
                <p className="text-xs text-zinc-500">
                  Quantos dias manter os arquivos de backup
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle>Banco de Dados</CardTitle>
              <CardDescription>
                Informações sobre a conexão com o banco de dados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-zinc-800/50 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm font-medium">PostgreSQL (Supabase)</span>
                </div>
                <p className="text-xs text-zinc-400">
                  Status: <span className="text-emerald-500">Conectado</span>
                </p>
                <p className="text-xs text-zinc-400 font-mono">
                  db.ynerykeqaycpcgssrqrg.supabase.co:5432
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
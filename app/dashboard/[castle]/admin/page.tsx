"use client"

import { useState } from "react"
import { ArrowLeft, Building2, AlertCircle, Search, Plus, Trash2, Users } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { CastlePageNavigation } from "@/components/castle-page-navigation"
import { getNavigationLinks } from "@/utils/navigation"

const commandsList = [
  { id: "CheckBalance", command: "bal", rank: "RANK1" },
  { id: "SetAccount", command: "setacc", rank: "RANK4" },
  { id: "SendFood", command: "food", rank: "RANK1" },
  { id: "SendStone", command: "stone", rank: "RANK1" },
  { id: "SendWood", command: "wood", rank: "RANK1" },
  { id: "SendOre", command: "ore", rank: "RANK1" },
  { id: "SendGold", command: "gold", rank: "RANK1" },
  { id: "SendFoodAdmin", command: "adminfood", rank: "RANK4" },
  { id: "SendStoneAdmin", command: "adminstone", rank: "RANK4" },
  { id: "SendWoodAdmin", command: "adminwood", rank: "RANK4" },
  { id: "SendOreAdmin", command: "adminore", rank: "RANK4" },
  { id: "SendGoldAdmin", command: "admingold", rank: "RANK4" },
  { id: "donateFood", command: "donatefood", rank: "RANK1" },
  { id: "donateStone", command: "donatestone", rank: "RANK1" },
  { id: "donateWood", command: "donatewood", rank: "RANK1" },
  { id: "donateOre", command: "donateore", rank: "RANK1" },
  { id: "donateGold", command: "donategold", rank: "RANK1" },
  { id: "setRssLimit", command: "setrsslimit", rank: "Authorized" },
  { id: "CheckAdminBal", command: "adminbal", rank: "RANK4" },
  { id: "SetBalance", command: "setbal", rank: "Authorized" },
  { id: "TmpDisconnect", command: "stop", rank: "Authorized" },
  { id: "checkShield", command: "shield", rank: "RANK4" },
  { id: "searchResource", command: "findtile", rank: "Authorized" },
  { id: "searchMonster", command: "findmonster", rank: "Authorized" },
  { id: "BankPos", command: "pos", rank: "RANK1" },
  { id: "huntMonster", command: "hunt", rank: "Authorized" },
  { id: "MovePos", command: "relocate", rank: "Authorized" },
  { id: "JoinGuild", command: "guild", rank: "Authorized" },
  { id: "clearQueue", command: "abort", rank: "RANK4" },
  { id: "buildSpam", command: "buildspam", rank: "RANK4" },
  { id: "setTitle", command: "addtitle", rank: "RANK4" },
  { id: "removeTitle", command: "deltitle", rank: "RANK4" },
  { id: "TransferAccount", command: "transfer", rank: "RANK1" },
  { id: "guildStat", command: "stats", rank: "RANK1" },
  { id: "chainResource", command: "rss", rank: "RANK1" },
  { id: "chainResourceAdmin", command: "adminrss", rank: "RANK4" },
  { id: "addWhitelist", command: "whitelist", rank: "RANK4" },
  { id: "addBlacklist", command: "blacklist", rank: "RANK4" },
  { id: "unlistWhite", command: "unlistwhite", rank: "RANK4" },
  { id: "unlistBlack", command: "unlistblack", rank: "RANK4" },
  { id: "purgeChat", command: "purge", rank: "RANK4" },
  { id: "checkGuildQuest", command: "quest", rank: "RANK1" },
]

interface User {
  id: string
  name: string
}

export default function AdminPage({ params }: { params: { castle: string } }) {
  const castleName = decodeURIComponent(params.castle)
  const [settings, setSettings] = useState({
    enableCommands: true,
    ignoreBalance: true,
    requireAuthorizedBalance: false,
    allowIgnoreLimits: true,
    useBackpack: true,
    saveMovementLogs: false,
    autoDeleteMessages: false,
    disableCommandResponses: false,
    disableErrorResponses: false,
    allowExternalCommands: true,
    useBalance: false,
    bypassRssLimit: true,
  })

  const [users, setUsers] = useState<User[]>([])

  const [newUser, setNewUser] = useState({
    name: "",
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddUser = () => {
    if (newUser.name) {
      setUsers((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substr(2, 9),
          name: newUser.name,
        },
      ])
      setNewUser({ name: "" })
      setIsDialogOpen(false)
    }
  }

  const handleDeleteUser = (id: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id))
  }

  const handleClearUsers = () => {
    setUsers([])
  }

  const handleSettingChange = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const fadeAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }

  const { prevPage } = getNavigationLinks("admin")

  return (
    <AnimatePresence mode="wait">
      <motion.div key="admin-content" {...fadeAnimation} transition={{ duration: 0.3 }}>
        <div className="min-h-screen bg-black p-4 sm:p-6">
          {/* Header */}
          <div className="mb-6">
            <CastlePageNavigation castle={params.castle} prevPage={prevPage} />
          </div>

          <div className="bg-amber-950/30 border border-amber-500/20 p-4 rounded-lg text-amber-500 mt-4">
            <div className="flex items-center justify-center gap-2">
              <Building2 className="h-5 w-5" />
              <h1 className="text-xl font-semibold text-center">{castleName}</h1>
            </div>
          </div>
          <div className="bg-cyan-950/30 border border-cyan-500/20 p-4 rounded-lg text-cyan-500 mt-4 mb-6">
            <h2 className="text-xl font-semibold text-center">Administrador</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader className="border-b border-zinc-800">
                <CardTitle className="text-xl font-semibold text-cyan-500">Configurações de Administrador</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="bank-data" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="bank-data">Dados do Banco</TabsTrigger>
                    <TabsTrigger value="authorized-users">Usuários Autorizados</TabsTrigger>
                    <TabsTrigger value="command-settings">Configurações de Comandos</TabsTrigger>
                  </TabsList>
                  <TabsContent value="bank-data">
                    <div className="space-y-4 mt-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="enableCommands"
                          checked={settings.enableCommands}
                          onCheckedChange={() => handleSettingChange("enableCommands")}
                        />
                        <label
                          htmlFor="enableCommands"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-300"
                        >
                          Ativar Comandos
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="ignoreBalance"
                          checked={settings.ignoreBalance}
                          onCheckedChange={() => handleSettingChange("ignoreBalance")}
                        />
                        <label
                          htmlFor="ignoreBalance"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-300"
                        >
                          Ignorar Saldo
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="requireAuthorizedBalance"
                          checked={settings.requireAuthorizedBalance}
                          onCheckedChange={() => handleSettingChange("requireAuthorizedBalance")}
                        />
                        <label
                          htmlFor="requireAuthorizedBalance"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-300"
                        >
                          Exigir Saldo Autorizado
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="allowIgnoreLimits"
                          checked={settings.allowIgnoreLimits}
                          onCheckedChange={() => handleSettingChange("allowIgnoreLimits")}
                        />
                        <label
                          htmlFor="allowIgnoreLimits"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-300"
                        >
                          Permitir Ignorar Limites
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="useBackpack"
                          checked={settings.useBackpack}
                          onCheckedChange={() => handleSettingChange("useBackpack")}
                        />
                        <label
                          htmlFor="useBackpack"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-300"
                        >
                          Usar Mochila
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="saveMovementLogs"
                          checked={settings.saveMovementLogs}
                          onCheckedChange={() => handleSettingChange("saveMovementLogs")}
                        />
                        <label
                          htmlFor="saveMovementLogs"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-300"
                        >
                          Salvar Logs de Movimentação
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="autoDeleteMessages"
                          checked={settings.autoDeleteMessages}
                          onCheckedChange={() => handleSettingChange("autoDeleteMessages")}
                        />
                        <label
                          htmlFor="autoDeleteMessages"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-300"
                        >
                          Excluir Mensagens Automaticamente
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="disableCommandResponses"
                          checked={settings.disableCommandResponses}
                          onCheckedChange={() => handleSettingChange("disableCommandResponses")}
                        />
                        <label
                          htmlFor="disableCommandResponses"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-300"
                        >
                          Desativar Respostas de Comando
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="disableErrorResponses"
                          checked={settings.disableErrorResponses}
                          onCheckedChange={() => handleSettingChange("disableErrorResponses")}
                        />
                        <label
                          htmlFor="disableErrorResponses"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-300"
                        >
                          Desativar Respostas de Erro
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="allowExternalCommands"
                          checked={settings.allowExternalCommands}
                          onCheckedChange={() => handleSettingChange("allowExternalCommands")}
                        />
                        <label
                          htmlFor="allowExternalCommands"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-300"
                        >
                          Permitir Comandos Externos
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="useBalance"
                          checked={settings.useBalance}
                          onCheckedChange={() => handleSettingChange("useBalance")}
                        />
                        <label
                          htmlFor="useBalance"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-300"
                        >
                          Usar Saldo
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="bypassRssLimit"
                          checked={settings.bypassRssLimit}
                          onCheckedChange={() => handleSettingChange("bypassRssLimit")}
                        />
                        <label
                          htmlFor="bypassRssLimit"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-300"
                        >
                          Ignorar Limite de RSS
                        </label>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="authorized-users">
                    <div className="space-y-4 mt-4">
                      <div className="flex items-center gap-2">
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                          <DialogTrigger asChild>
                            <Button>
                              <Plus className="mr-2 h-4 w-4" /> Adicionar Usuário
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Adicionar Novo Usuário</DialogTitle>
                              <DialogDescription>
                                Preencha os dados do usuário que você deseja adicionar ao sistema.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                  Nome
                                </Label>
                                <Input
                                  id="name"
                                  value={newUser.name}
                                  onChange={(e) => setNewUser((prev) => ({ ...prev, name: e.target.value }))}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="bg-cyan-950/30 border border-cyan-500/20 p-4 rounded-lg text-cyan-500 text-sm">
                                Novo usuário e esta conta devem estar na mesma guilda no momento do registro
                              </div>
                            </div>
                            <DialogFooter>
                              <Button onClick={handleAddUser}>Adicionar Usuário</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" onClick={handleClearUsers}>
                          Limpar Usuários
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-4 py-2 px-4 bg-zinc-800/50 rounded-t-lg">
                          <div className="font-medium text-zinc-400">Nome</div>
                          <div className="font-medium text-zinc-400">Ações</div>
                        </div>
                        {users.map((user) => (
                          <div key={user.id} className="grid grid-cols-2 gap-4 py-2 px-4 bg-zinc-800/20 rounded">
                            <div className="text-zinc-300">{user.name}</div>
                            <div className="flex justify-end">
                              <Button variant="ghost" size="sm" onClick={() => handleDeleteUser(user.id)}>
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="command-settings">
                    <div className="space-y-4 mt-4">
                      <div className="flex items-center space-x-2 mb-4">
                        <Search className="text-zinc-500" />
                        <Input placeholder="Buscar comandos..." className="flex-grow" />
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-zinc-900/50">
                              <th className="text-left p-3 text-sm font-medium text-zinc-400">ID</th>
                              <th className="text-left p-3 text-sm font-medium text-zinc-400">Comando</th>
                              <th className="text-left p-3 text-sm font-medium text-zinc-400">Ativado</th>
                              <th className="text-left p-3 text-sm font-medium text-zinc-400">Rank Mínimo</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-zinc-800">
                            {commandsList.map((cmd) => (
                              <tr key={cmd.id} className="bg-black/20">
                                <td className="p-3 text-sm text-zinc-300">{cmd.id}</td>
                                <td className="p-3 text-sm text-zinc-300">{cmd.command}</td>
                                <td className="p-3">
                                  <Checkbox defaultChecked />
                                </td>
                                <td className="p-3">
                                  <Select defaultValue={cmd.rank}>
                                    <SelectTrigger className="w-[120px] bg-black/20 border-zinc-800">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="RANK1">RANK1</SelectItem>
                                      <SelectItem value="RANK2">RANK2</SelectItem>
                                      <SelectItem value="RANK3">RANK3</SelectItem>
                                      <SelectItem value="RANK4">RANK4</SelectItem>
                                      <SelectItem value="RANK5">RANK5</SelectItem>
                                      <SelectItem value="Authorized">Authorized</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}


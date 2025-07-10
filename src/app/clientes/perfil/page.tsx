"use client"

import { useState } from "react"
import { User, Mail, Phone, Lock, Camera, Save, Edit3, Calendar, Trophy, Settings, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("personal")

  const [userData, setUserData] = useState({
    firstName: "María",
    lastName: "González",
    email: "maria.gonzalez@email.com",
    phone: "+56 9 8765 4321",
    birthDate: "1990-05-15",
    gender: "female",
    goals: "Mejorar mi condición física general y ganar fuerza muscular",
    experience: "intermediate",
  })

  const handleSave = () => {
    setIsEditing(false)
    // Aquí iría la lógica para guardar los datos
  }

  const upcomingTrainings = [
    { date: "2024-01-15", time: "10:00", trainer: "María Rodríguez", type: "Personal" },
    { date: "2024-01-17", time: "15:00", trainer: "Carlos López", type: "Grupal" },
  ]

  const trainingHistory = [
    { date: "2024-01-10", trainer: "María Rodríguez", type: "Personal", status: "Completado" },
    { date: "2024-01-08", trainer: "Ana Silva", type: "Yoga", status: "Completado" },
    { date: "2024-01-05", trainer: "Carlos López", type: "Grupal", status: "Completado" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Mi Perfil</h1>
          <p className="text-gray-600">Gestiona tu información y configuraciones</p>
        </div>

        {/* Profile Header Card */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Perfil" />
                  <AvatarFallback className="text-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white">
                    {userData.firstName[0]}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="text-center md:text-left flex-1">
                <h2 className="text-2xl font-bold text-gray-900">
                  {userData.firstName} {userData.lastName}
                </h2>
                <p className="text-gray-600 mb-2">
                <Badge className="bg-orange-100 text-orange-700">{userData.email}</Badge></p>
              </div>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                <Edit3 className="h-4 w-4 mr-2" />
                {isEditing ? "Cancelar" : "Editar Perfil"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={activeTab === "personal" ? "default" : "outline"}
            onClick={() => setActiveTab("personal")}
            className={activeTab === "personal" ? "bg-gradient-to-r from-orange-500 to-red-500" : ""}
          >
            <User className="h-4 w-4 mr-2" />
            Información Personal
          </Button>
          <Button
            variant={activeTab === "security" ? "default" : "outline"}
            onClick={() => setActiveTab("security")}
            className={activeTab === "security" ? "bg-gradient-to-r from-orange-500 to-red-500" : ""}
          >
            <Lock className="h-4 w-4 mr-2" />
            Seguridad
          </Button>
          <Button
            variant={activeTab === "trainings" ? "default" : "outline"}
            onClick={() => setActiveTab("trainings")}
            className={activeTab === "trainings" ? "bg-gradient-to-r from-orange-500 to-red-500" : ""}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Mis Entrenamientos
          </Button>
        </div>

        {/* Personal Information Tab */}
        {activeTab === "personal" && (
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
              <CardDescription>Actualiza tus datos personales y objetivos fitness</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombre Completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="firstName"
                      value={userData.firstName}
                      onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      value={userData.phone}
                      onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <Card>
            <CardHeader>
              <CardTitle>Seguridad</CardTitle>
              <CardDescription>Cambia tu contraseña y gestiona la seguridad de tu cuenta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Contraseña Actual</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Tu contraseña actual"
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">Nueva Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Tu nueva contraseña"
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirma tu nueva contraseña"
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                Cambiar Contraseña
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Trainings Tab */}
        {activeTab === "trainings" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Próximos Entrenamientos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingTrainings.map((training, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                      <div>
                        <p className="font-semibold">
                          {training.type} con {training.trainer}
                        </p>
                        <p className="text-sm text-gray-600">
                          {training.date} a las {training.time}
                        </p>
                      </div>
                      <Badge className="bg-orange-100 text-orange-700">Confirmado</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Historial de Entrenamientos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trainingHistory.map((training, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-semibold">
                          {training.type} con {training.trainer}
                        </p>
                        <p className="text-sm text-gray-600">{training.date}</p>
                      </div>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        {training.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

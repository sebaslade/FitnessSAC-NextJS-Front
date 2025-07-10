"use client"

import { useState } from "react"
import { User, Mail, Phone, Lock, Save, Edit3, Calendar, Eye, EyeOff, ArrowLeft, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DialogDescription } from "@radix-ui/react-dialog"
import type { Reserva } from "@/types/reserva"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("personal")
  const [showDialog, setShowDialog] = useState(false)
  const [dialogTitle, setDialogTitle] = useState("")
  const [dialogMessage, setDialogMessage] = useState("")
  const [dialogSuccess, setDialogSuccess] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [upcomingTrainings, setUpcomingTrainings] = useState<Reserva[]>([])
  const [trainingHistory, setTrainingHistory] = useState<Reserva[]>([])

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  })


  const router = useRouter()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId")
        //console.log("userId obtenido:", userId)

        if (!userId) {
          router.push("/clientes/login")
          return
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clientes/${userId}`)

        if (!res.ok) {
          throw new Error("No se pudo obtener la información del usuario.")
        }

        const data = await res.json()

        setUserData({
          name: data.nombre?.split(" ")[0] || "",
          email: data.email || "",
          phone: data.telefono || "",
        })
      } catch (error) {
        console.error("Error al obtener usuario:", error)
        router.push("/clientes/login")
      }
    }

    fetchUserData()
  }, [router])

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const userId = localStorage.getItem("userId")
        if (!userId) return

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clientes/${userId}/reservas`)
        
        if (!res.ok) throw new Error("Error al obtener reservas")

        const data = await res.json()
        //console.log("Reservas obtenidas:", data)

        const ahora = new Date()
        const upcoming = data.filter((r: Reserva) => {
          const fechaReserva = new Date(r.fecha_reserva)
          return fechaReserva >= ahora
        })

        const history = data.filter((r: Reserva) => {
          const fechaReserva = new Date(r.fecha_reserva)
          return fechaReserva < ahora
        })

        setUpcomingTrainings(upcoming)
        setTrainingHistory(history)
      } catch (err) {
        console.error("Error cargando reservas:", err)
      }
    }

    fetchReservas()
  }, [router])


  const handleSaveChanges = async () => {
    try {
      const userId = localStorage.getItem("userId")
      if (!userId) throw new Error("ID de usuario no encontrado.")

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clientes/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre: userData.name,
          email: userData.email,
          telefono: userData.phone
        })
      })

      if (!res.ok) {
        const errorText = await res.text()
        throw new Error(errorText)
      }

      setDialogTitle("Cambios guardados")
      setDialogMessage("Tu información se actualizó correctamente.")
      setDialogSuccess(true)
      setIsEditing(false)
    } catch (error:unknown) {
      if (error instanceof Error) {
        setDialogTitle("Error al cambiar contraseña")
        setDialogMessage(error.message)
      } else {
        setDialogMessage("Ocurrió un error inesperado")
      }
      setDialogSuccess(false)
      setShowDialog(true)
    }finally {
      setShowDialog(true)
    }
  }

  const handleChangePassword = async () => {
    try {
      const userId = localStorage.getItem("userId")
      if (!userId) throw new Error("ID de usuario no encontrado")

      if (newPassword !== confirmPassword) {
        throw new Error("Las nuevas contraseñas no coinciden")
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clientes/${userId}/cambiarPassword`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          passwordActual: currentPassword,
          nuevaPassword: newPassword
        }),
      })

      const responseText = await res.text()

      if (!res.ok) throw new Error(responseText)

      setDialogTitle("Contraseña actualizada")
      setDialogMessage("Tu contraseña fue cambiada correctamente.")
      setDialogSuccess(true)
      setShowDialog(true)
      
      // Limpia campos
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (error: unknown) {
      if (error instanceof Error) {
        setDialogTitle("Error al cambiar contraseña")
        setDialogMessage(error.message)
      } else {
        setDialogMessage("Ocurrió un error inesperado")
      }
      setDialogSuccess(false)
      setShowDialog(true)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("userId")
    router.push("/clientes/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <br />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Mi Perfil</h1>
          <p className="text-gray-600">Gestiona tu información y configuraciones</p>

          <div className="mb-4 flex justify-between items-center">
            <Button
              variant="outline"
              onClick={() => router.push("/entrenamientos")}
              className="flex items-center gap-2 hover:text-orange-600 cursor-pointer bg-white shadow hover:shadow-md transition"
            >
              <ArrowLeft className="h-4 w-4 text-orange-600" /> Volver a entrenamientos
            </Button>
            
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white cursor-pointer"
            >
              <Lock className="h-4 w-4" /> Cerrar sesión
            </Button>
          </div>

        </div>

        {/* Profile Header Card */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={"/placeholder.svg"} alt="Perfil" />
                  <AvatarFallback className="text-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white">
                    {userData.name ? userData.name[0] : ""}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="text-center md:text-left flex-1">
                <h2 className="text-2xl font-bold text-gray-900">
                  {userData.name}
                </h2>
                <p className="text-gray-600 mb-2">
                <Badge className="bg-orange-100 text-orange-700">{userData.email}</Badge></p>
              </div>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 cursor-pointer text-white flex items-center gap-2"
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
            className={activeTab === "personal" ? "bg-gradient-to-r from-orange-500 to-red-500" : "cursor-pointer"}
          >
            <User className="h-4 w-4 mr-2" />
            Información Personal
          </Button>
          <Button
            variant={activeTab === "security" ? "default" : "outline"}
            onClick={() => setActiveTab("security")}
            className={activeTab === "security" ? "bg-gradient-to-r from-orange-500 to-red-500" : "cursor-pointer"}
          >
            <Lock className="h-4 w-4 mr-2" />
            Seguridad
          </Button>
          <Button
            variant={activeTab === "trainings" ? "default" : "outline"}
            onClick={() => setActiveTab("trainings")}
            className={activeTab === "trainings" ? "bg-gradient-to-r from-orange-500 to-red-500" : "cursor-pointer"}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Mis Reservas
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
                      value={userData.name}
                      onChange={(e) => setUserData({ ...userData, name: e.target.value })}
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
              {isEditing && (
                <div className="flex justify-end">
                  <Button
                    onClick={handleSaveChanges}
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 cursor-pointer"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Guardar Cambios
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {dialogSuccess ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
                <span className={dialogSuccess ? "text-orange-500" : "text-red-600"}>
                  {dialogTitle}
                </span>
              </DialogTitle>
              <DialogDescription className="text-gray-700">
                {dialogMessage}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

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
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 cursor-pointer"
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
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 cursor-pointer"
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
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button 
                onClick={handleChangePassword}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 cursor-pointer">
                Cambiar Contraseña
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Trainings Tab */}
        {activeTab === "trainings" && (
            <Card>
              <CardHeader>
                <CardTitle>Mis Reservas</CardTitle>
                <CardDescription>Consulta tus reservas de entrenamientos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {/* Próximos entrenamientos */}
                  <h3 className="text-lg font-semibold text-gray-800">Próximos Entrenamientos</h3>
                  {upcomingTrainings.length > 0 ? (
                    upcomingTrainings.map((training: Reserva, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-orange-50 rounded-lg mb-2">
                        <div>
                          <p className="font-semibold">
                            {training.entrenamiento.tipo}
                          </p>
                          <p>
                            Entrenador: {training.entrenamiento.trainer.nombre}
                          </p>
                          <p className="text-sm text-gray-600">
                            {new Date(`${training.fecha_reserva}T${training.entrenamiento.hora_inicio}`).toLocaleDateString()} a las{" "}
                            {new Date(`${training.fecha_reserva}T${training.entrenamiento.hora_inicio}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                          <p className="text-sm text-gray-600">
                            Ubicación: {training.entrenamiento.modalidad.ubicacion}
                          </p>
                        </div>
                        <Badge className="bg-orange-100 text-orange-700">{training.estado}</Badge>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No tienes próximos entrenamientos.</p>
                  )}

                  {/* Historial de entrenamientos */}
                  {trainingHistory.length > 0 && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-800 mt-8">Historial de Entrenamientos</h3>
                      {trainingHistory.map((training: Reserva, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg mb-2">
                          <div>
                            <p className="font-semibold">
                              {training.entrenamiento.tipo} 
                            </p>
                            <p>Entrenador: {training.entrenamiento.trainer.nombre}</p>
                            <p className="text-sm text-gray-600">
                              {new Date(`${training.fecha_reserva}T${training.entrenamiento.hora_inicio}`).toLocaleDateString()} a las{" "}
                              {new Date(`${training.fecha_reserva}T${training.entrenamiento.hora_inicio}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                            <p className="text-sm text-gray-600">
                              Ubicación: {training.entrenamiento.modalidad.ubicacion}
                            </p>
                          </div>
                          <Badge className="bg-gray-300 text-gray-800">{training.estado}</Badge>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
      </div>
    </div>
  )
}

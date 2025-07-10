"use client"

import { useState } from "react"
import { Clock, MapPin, Star, User, Filter, Search, ChevronRight, Users, Dumbbell, Heart, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function TrainingList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")

  const trainings = [
    {
      id: 1,
      title: "Entrenamiento Personal",
      trainer: "María Rodríguez",
      trainerImage: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
      reviews: 127,
      duration: 60,
      price: 45000,
      location: "Gimnasio FitZone - Sala 2",
      category: "Personal",
      level: "Todos los niveles",
      description: "Sesión personalizada enfocada en tus objetivos específicos",
      tags: ["Fuerza", "Cardio", "Personalizado"],
      icon: <User className="h-5 w-5" />,
      color: "bg-blue-100 text-blue-700",
      maxParticipants: 1,
      availableSlots: ["09:00", "10:00", "15:00", "16:00"],
    },
    {
      id: 2,
      title: "CrossFit Intensivo",
      trainer: "Carlos López",
      trainerImage: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
      reviews: 89,
      duration: 45,
      price: 25000,
      location: "Gimnasio FitZone - Área CrossFit",
      category: "Grupal",
      level: "Intermedio-Avanzado",
      description: "Entrenamiento funcional de alta intensidad para mejorar tu condición física",
      tags: ["CrossFit", "HIIT", "Funcional"],
      icon: <Dumbbell className="h-5 w-5" />,
      color: "bg-red-100 text-red-700",
      maxParticipants: 12,
      availableSlots: ["07:00", "18:00", "19:00"],
    },
    {
      id: 3,
      title: "Yoga Restaurativo",
      trainer: "Ana Silva",
      trainerImage: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
      reviews: 156,
      duration: 75,
      price: 18000,
      location: "Estudio Zen - Sala Principal",
      category: "Bienestar",
      level: "Principiante",
      description: "Práctica suave de yoga para relajación y flexibilidad",
      tags: ["Yoga", "Relajación", "Flexibilidad"],
      icon: <Heart className="h-5 w-5" />,
      color: "bg-green-100 text-green-700",
      maxParticipants: 15,
      availableSlots: ["08:00", "17:00", "20:00"],
    },
    {
      id: 4,
      title: "Spinning Energético",
      trainer: "Diego Morales",
      trainerImage: "/placeholder.svg?height=40&width=40",
      rating: 4.7,
      reviews: 203,
      duration: 50,
      price: 22000,
      location: "Gimnasio FitZone - Sala Spinning",
      category: "Cardio",
      level: "Todos los niveles",
      description: "Clase de ciclismo indoor con música motivadora",
      tags: ["Spinning", "Cardio", "Música"],
      icon: <Zap className="h-5 w-5" />,
      color: "bg-yellow-100 text-yellow-700",
      maxParticipants: 20,
      availableSlots: ["06:30", "12:00", "19:30"],
    },
    {
      id: 5,
      title: "Entrenamiento Funcional",
      trainer: "Laura Vega",
      trainerImage: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
      reviews: 94,
      duration: 55,
      price: 28000,
      location: "Gimnasio FitZone - Área Funcional",
      category: "Grupal",
      level: "Intermedio",
      description: "Movimientos funcionales para mejorar tu día a día",
      tags: ["Funcional", "Fuerza", "Movilidad"],
      icon: <Users className="h-5 w-5" />,
      color: "bg-purple-100 text-purple-700",
      maxParticipants: 10,
      availableSlots: ["09:00", "11:00", "17:00"],
    },
    {
      id: 6,
      title: "Pilates Reformer",
      trainer: "Sofía Herrera",
      trainerImage: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
      reviews: 78,
      duration: 60,
      price: 35000,
      location: "Estudio Pilates - Sala 1",
      category: "Bienestar",
      level: "Todos los niveles",
      description: "Fortalecimiento del core con equipos especializados",
      tags: ["Pilates", "Core", "Postura"],
      icon: <Heart className="h-5 w-5" />,
      color: "bg-pink-100 text-pink-700",
      maxParticipants: 6,
      availableSlots: ["10:00", "14:00", "16:00"],
    },
  ]

  const filteredTrainings = trainings.filter((training) => {
    const matchesSearch =
      training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      training.trainer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || training.category === selectedCategory
    const matchesLevel = selectedLevel === "all" || training.level.includes(selectedLevel)

    return matchesSearch && matchesCategory && matchesLevel
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Entrenamientos Disponibles</h1>
          <p className="text-gray-600">Encuentra el entrenamiento perfecto para ti</p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar entrenamientos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600">Mostrando {filteredTrainings.length} entrenamientos disponibles</p>
        </div>

        {/* Training Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrainings.map((training) => (
            <Card key={training.id} className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className={`p-2 rounded-lg ${training.color} mb-3`}>{training.icon}</div>
                </div>

                <CardTitle className="text-xl group-hover:text-orange-600 transition-colors">
                  {training.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Trainer Info */}
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={training.trainerImage || "/placeholder.svg"} alt={training.trainer} />
                    <AvatarFallback>
                      {training.trainer
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{training.trainer}</p>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>Máx. {training.maxParticipants}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span className="truncate">{training.location}</span>
                </div>

                {/* Available Slots Preview */}
                <div className="text-sm">
                  <span className="text-gray-500">Horario: </span>
                  <div className="flex gap-1 mt-1">
                    {training.availableSlots.slice(0, 3).map((slot, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {slot}
                      </Badge>
                    ))}
                    {training.availableSlots.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{training.availableSlots.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <span className="text-2xl font-bold text-orange-600">{formatPrice(training.price)}</span>
                    <span className="text-sm text-gray-500 ml-1">por sesión</span>
                  </div>
                  <Button
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 group-hover:shadow-md transition-all"
                    size="sm"
                  >
                    Ver detalles
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredTrainings.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No se encontraron entrenamientos</h3>
            <p className="text-gray-600 mb-4">Intenta ajustar tus filtros o términos de búsqueda</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
                setSelectedLevel("all")
              }}
              variant="outline"
            >
              Limpiar filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

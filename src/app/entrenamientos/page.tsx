"use client"

import { useState, useEffect } from "react"
import {
  Search,
  Users,
  MapPin,
  ChevronRight,
  Dumbbell,
  Heart,
  Zap,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Entrenamiento } from "@/types/entrenamiento"
import { useRouter } from "next/navigation"

export default function Entrenamientos() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [selectedLevel, setSelectedLevel] = useState("all")
    const [loading, setLoading] = useState(true)
    const [trainings, setTrainings] = useState<Entrenamiento[]>([])

    const router = useRouter()

    useEffect(() => {
        const fetchTrainings = async () => {
          try {
              const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/entrenamientos`)
              const data = await res.json()
              setTrainings(data)
          } catch (error) {
              console.error("Error al obtener entrenamientos:", error)
          } finally {
              setLoading(false)
          }
        }

        fetchTrainings()
    }, [])

    const filteredTrainings = trainings.filter((training) => {
        const matchesSearch =
        training.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        training.trainer.nombre.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesCategory =
        selectedCategory === "all" || training.modalidad.tipo === selectedCategory

        const matchesLevel = selectedLevel === "all"

        return matchesSearch && matchesCategory && matchesLevel
    })

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("es-PE", {
        style: "currency",
        currency: "PEN",
        minimumFractionDigits: 2,
        }).format(price)
    }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <br />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Entrenamientos Disponibles</h1>
          <p className="text-gray-600">Encuentra el entrenamiento perfecto para ti</p>
          <br />
          <button
            onClick={() => router.push("/clientes/perfil")}
            className="p-2 rounded-full bg-white shadow hover:shadow-md transition cursor-pointer text-orange-600"
            aria-label="Ver perfil"
          >
            <User className="h-6 w-20 text-orange-600 flex" /> Perfil
          </button>
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

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">Mostrando {filteredTrainings.length} entrenamientos disponibles</p>
        </div>

        {/* Trainings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrainings.map((training) => {
            const slots = [
              training.hora_inicio.substring(0, 5),
              training.hora_fin.substring(0, 5),
            ]

            return (
                <Card 
                    className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
                    key={training.idEntrenamiento} 
                    onClick={() => router.push(`/entrenamientos/${training.idEntrenamiento}`)}
                >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className={`p-2 rounded-lg bg-orange-100 text-orange-700 mb-3`}>
                      <Dumbbell className="h-5 w-5" />
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-orange-600 transition-colors">
                    {training.tipo}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    {training.modalidad.descripcion}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Trainer Info */}
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={"/placeholder.svg"} alt={training.trainer.nombre} />
                      <AvatarFallback>
                        {training.trainer.nombre
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{training.trainer.nombre}</p>
                    </div>
                  </div>

                  {/* Info rápida */}
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>Máx. {training.max_participantes}</span>
                  </div>

                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span className="truncate">{training.modalidad.ubicacion}</span>
                  </div>

                  {/* Horario */}
                  <div className="text-sm">
                    <span className="text-gray-500">Horario: </span>
                    <div className="flex gap-1 mt-1">
                      {slots.map((slot, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {slot}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Precio */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <span className="text-2xl font-bold text-orange-600">
                        {formatPrice(training.precio)}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">por sesión</span>
                    </div>
                    <Button
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 group-hover:shadow-md transition-all cursor-pointer"
                      size="sm"
                      onClick={() => router.push(`/entrenamientos/${training.idEntrenamiento}`)}
                    >
                      Ver detalles
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredTrainings.length === 0 && !loading && (
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

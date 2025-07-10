"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Clock, MapPin, User, CheckCircle, ArrowLeft } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import type { Entrenamiento } from "@/types/entrenamiento"

export default function EntrenamientoDetallePage() {
  const { id } = useParams()
  const router = useRouter()
  const [entrenamiento, setEntrenamiento] = useState<Entrenamiento | null>(null)

  useEffect(() => {
    const fetchEntrenamiento = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/entrenamientos/${id}`)
        const data = await res.json()
        setEntrenamiento(data)
      } catch (error) {
        console.error("Error al obtener el entrenamiento", error)
      }
    }

    if (id) {
      fetchEntrenamiento()
    }
  }, [id])

  if (!entrenamiento) return <div className="text-center py-10">Cargando entrenamiento...</div>

  const slots = [
    entrenamiento.hora_inicio.substring(0, 5),
    entrenamiento.hora_fin.substring(0, 5),
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl relative">
        <Button
          variant="ghost"
          className="absolute top-4 left-4 flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 cursor-pointer"
          onClick={() => router.push("/entrenamientos")}
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>

        <CardHeader className="mt-13">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder.svg" alt="Entrenador" />
              <AvatarFallback>
                {entrenamiento.trainer.nombre
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{entrenamiento.tipo}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {entrenamiento.trainer.nombre} - {entrenamiento.trainer.especialidad}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>
                {slots[0]} - {slots[1]}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{entrenamiento.modalidad.ubicacion}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Badge variant="secondary">{entrenamiento.modalidad.tipo}</Badge>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold mb-3">Descripción</h4>
            <p className="text-gray-600">{entrenamiento.modalidad.descripcion}</p>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold mb-3">¿Qué incluye este entrenamiento?</h4>
            <ul className="text-gray-600 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Evaluación física inicial
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Plan de entrenamiento personalizado
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Seguimiento de progreso
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Asesoramiento nutricional básico
              </li>
            </ul>
          </div>

          <Separator />

          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">
              S/ {entrenamiento.precio.toFixed(2)}
            </div>
            <p className="text-gray-600 mb-6">Por sesión individual</p>

            <Button className="w-full bg-orange-600 hover:bg-orange-700 text-lg py-6 cursor-pointer" size="lg">
              Reservar Entrenamiento
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

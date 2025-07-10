"use client"

import { useState } from "react"
import { Clock, MapPin, Star, User, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

export default function EntreamientoDetalle() {
  const [isBooked, setIsBooked] = useState(false)

  const handleBooking = () => {
    setIsBooked(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Entrenador" />
              <AvatarFallback>MR</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">Entrenamiento Personal</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <User className="h-4 w-4" />
                María Rodríguez - Entrenadora Certificada
              </CardDescription>    
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="h-4 w-4" />
              <span>Duración: 60 minutos</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>Gimnasio FitZone - Sala 2</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Badge variant="secondary">Fuerza</Badge>
            <Badge variant="secondary">Cardio</Badge>
            <Badge variant="secondary">Personalizado</Badge>
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
            <div className="text-4xl font-bold text-orange-600 mb-2">$45.000</div>
            <p className="text-gray-600 mb-6">Por sesión individual</p>

            <Button onClick={handleBooking} className="w-full bg-orange-600 hover:bg-orange-700 text-lg py-6" size="lg">
              Reservar Entrenamiento
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

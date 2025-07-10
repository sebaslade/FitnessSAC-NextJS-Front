"use client";
import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';

const EntramientoSuccess: React.FC = () => {
    const [isBooked, setIsBooked] = useState(false)
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-green-700 mb-4">¡Reserva Exitosa!</h2>
            <p className="text-gray-600 mb-6">
              Tu entrenamiento personal ha sido reservado correctamente. Te contactaremos pronto para coordinar los
              detalles.
            </p>
            <Button onClick={() => setIsBooked(false)} className="w-full" size="lg">
              Hacer otra reserva
            </Button>
          </CardContent>
        </Card>
      </div>
  )
}

export default EntramientoSuccess;

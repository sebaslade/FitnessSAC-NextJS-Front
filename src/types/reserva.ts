export type Reserva = {
  id_reserva: number
  fecha_reserva: string
  estado: string
  entrenamiento: {
    idEntrenamiento: number
    tipo: string
    fecha: string
    hora_inicio: string
    hora_fin: string
    precio: number
    max_participantes: number
    modalidad: {
      id_modalidad: number
      tipo: string
      descripcion: string
      ubicacion: string
    }
    trainer: {
      id_trainer: number
      nombre: string
      especialidad: string
      estado: string
    }
  }
}

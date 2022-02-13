import { Schema, model } from 'mongoose'

const OrdenadorSchema = new Schema({
    _modelo: {
        type: String,
        unique: true //Campo unique para que sea clave única 
    },
    _fecha_montaje: Date,
    _fecha_garantia: Date,
    _precio_del_pc: Number,
    _cantidad: Number,
    _RAM: Number,
    _disco_duro: String,
    _comprador: String,
    _duracion_bateria: Number,
    _refrig_liquida: String
}
)

export const Ordenadores = model('ordenadores', OrdenadorSchema  )


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
    _refrig_liquida: Boolean
}
)

export type OrdPortatil = {
    _modelo: String | null
    _fecha_montaje: String | null,
    _fecha_garantia: String | null,
    _precio_del_pc: Number | null,
    _cantidad: String | null,
    _RAM: Number | null,
    _disco_duro: String | null,
    _comprador: String | null,
    _duracion_bateria: Number | null
}

export type OrdSobremesa = {
    _modelo: String | null
    _fecha_montaje: String | null,
    _fecha_garantia: String | null,
    _precio_del_pc: Number | null,
    _cantidad: String | null,
    _RAM: Number | null,
    _disco_duro: String | null,
    _comprador: String | null,
    _refrig_liquida: Boolean
}

export const Ordenadores = model('ordenadores', OrdenadorSchema  )


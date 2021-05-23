import { Schema, model } from 'mongoose'

const CompradorSchema = new Schema({
    _identif: String,
    _nombre_comprador: String,
    _presupuesto: Number,
    _n_telefono: Number,
},{
    collection:'compradores'
}
)

const OrdenadorSchema = new Schema({
    _modelo: String,
    _fabricante: String,
    _fecha_montaje: Date,
    _precio_del_pc: Number,
    _cantidad: Number,
    _RAM: Number,
    _tipo: String,
    _comprador: String
},{
    collection:'ordenadores'
}
)

export const Ordenadores = model('ordenadores', OrdenadorSchema  )
export const Compradores = model('compradores', CompradorSchema  )


import { Schema, model } from 'mongoose'

const CompradorSchema = new Schema({
    _identif: {
        type: String,
        unique: true //Campo unique para que sea clave única 
    },
    _nombre_comprador: String,
    _presupuesto: Number,
    _n_telefono: Number,
},{
    collection:'compradores'
}
)

export const Compradores = model('compradores', CompradorSchema  )
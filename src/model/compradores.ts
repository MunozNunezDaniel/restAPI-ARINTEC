import { Schema, model } from 'mongoose'

const CompradorSchema = new Schema({
    _nombre_comprador: {
        type: String,
        unique: true //Campo unique para que sea clave única
    },
    _presupuesto: Number,
    _n_telefono: Number,
}
)

export const Compradores = model('compradores', CompradorSchema  )
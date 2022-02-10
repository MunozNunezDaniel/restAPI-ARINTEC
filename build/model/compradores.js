"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compradores = void 0;
const mongoose_1 = require("mongoose");
const CompradorSchema = new mongoose_1.Schema({
    _nombre_comprador: {
        type: String,
        unique: true //Campo unique para que sea clave única 
    },
    _presupuesto: Number,
    _n_telefono: Number,
});
exports.Compradores = (0, mongoose_1.model)('compradores', CompradorSchema);

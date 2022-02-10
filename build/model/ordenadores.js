"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ordenadores = void 0;
const mongoose_1 = require("mongoose");
const OrdenadorSchema = new mongoose_1.Schema({
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
});
exports.Ordenadores = (0, mongoose_1.model)('ordenadores', OrdenadorSchema);

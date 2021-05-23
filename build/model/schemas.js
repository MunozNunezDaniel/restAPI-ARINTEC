"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compradores = exports.Ordenadores = void 0;
const mongoose_1 = require("mongoose");
const CompradorSchema = new mongoose_1.Schema({
    _identif: String,
    _nombre_comprador: String,
    _presupuesto: Number,
    _n_telefono: Number,
}, {
    collection: 'compradores'
});
const OrdenadorSchema = new mongoose_1.Schema({
    _modelo: String,
    _fabricante: String,
    _fecha_montaje: Date,
    _precio_del_pc: Number,
    _cantidad: Number,
    _RAM: Number,
    _tipo: String,
    _comprador: String
}, {
    collection: 'ordenadores'
});
exports.Ordenadores = mongoose_1.model('ordenadores', OrdenadorSchema);
exports.Compradores = mongoose_1.model('compradores', CompradorSchema);

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const ordenadores_1 = require("../model/ordenadores");
const compradores_1 = require("../model/compradores");
const database_1 = require("../database/database");
class Routes {
    constructor() {
        //Listar todos los ordenadores
        this.getOrd = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const query = yield ordenadores_1.Ordenadores.find();
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        //Muestra los todos los compradores con un nuevo campo compuesto de un array de los ordenadores que ha comprado
        this.getOrdenadores = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const query = yield compradores_1.Compradores.aggregate([
                    {
                        $lookup: {
                            from: 'ordenadores',
                            localField: '_nombre_comprador',
                            foreignField: '_comprador',
                            as: "_ordenadores_comprados"
                        }
                    }
                ]);
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        //Muestra los ordenadores que ha comprado un determinado comprador 
        this.getCompr = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nombre_comprador } = req.params;
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const query = yield compradores_1.Compradores.aggregate([
                    {
                        $lookup: {
                            from: 'ordenadores',
                            localField: '_nombre_comprador',
                            foreignField: '_comprador',
                            as: "_ordenadores_comprados"
                        }
                    }, {
                        $match: {
                            _nombre_comprador: nombre_comprador
                        }
                    }
                ]);
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        //Crear un nuevo ordenador
        this.postOrdenador = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { modelo, fecha_montaje, fecha_garantia, precio_del_pc, cantidad, RAM, disco_duro, comprador, duracion_bateria, refrig_liquida } = req.body;
            yield database_1.db.conectarBD();
            const dSchema = {
                _modelo: modelo,
                _fecha_montaje: fecha_montaje,
                _fecha_garantia: fecha_garantia,
                _precio_del_pc: precio_del_pc,
                _cantidad: cantidad,
                _RAM: RAM,
                _disco_duro: disco_duro,
                _comprador: comprador,
                _duracion_bateria: duracion_bateria,
                _refrig_liquida: refrig_liquida
            };
            const oSchema = new ordenadores_1.Ordenadores(dSchema);
            yield oSchema.save()
                .then((doc) => res.send(doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        //Modificar un ordenador mediante put pasandole el modelo
        this.modificaOrdenador = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { modelo } = req.params;
            const { fecha_montaje, fecha_garantia, precio_del_pc, cantidad, RAM, disco_duro, comprador, duracion_bateria, refrig_liquida } = req.body;
            yield database_1.db.conectarBD();
            yield ordenadores_1.Ordenadores.findOneAndUpdate({ _modelo: modelo }, {
                _fecha_montaje: fecha_montaje,
                _fecha_garantia: fecha_garantia,
                _precio_del_pc: precio_del_pc,
                _cantidad: cantidad,
                _RAM: RAM,
                _disco_duro: disco_duro,
                _comprador: comprador,
                _duracion_bateria: duracion_bateria,
                _refrig_liquida: refrig_liquida
            }, {
                new: true,
                runValidators: true
            })
                .then((doc) => {
                if (doc == null) {
                    console.log('El modelo que desea modificar no existe');
                    res.json({ "Error": "No existe el modelo " + modelo });
                }
                else {
                    console.log('Se ha modificado correctamente el modelo ' + modelo);
                    res.json(doc);
                }
            })
                .catch((err) => {
                console.log('Error: ' + err);
                res.json({ error: 'Error: ' + err });
            });
            database_1.db.desconectarBD();
        });
        //Listar un solo ordenador pasandole el modelo
        this.getOrdenador = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { modelo } = req.params;
            yield database_1.db.conectarBD();
            const x = yield ordenadores_1.Ordenadores.find({ _modelo: modelo });
            yield database_1.db.desconectarBD();
            res.json(x);
        });
        //Listar compradores
        this.getCompradores = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                const query = yield compradores_1.Compradores.find({});
                console.log(query);
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
                console.log(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        //Crear un nuevo comprador
        this.postComprador = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nombre_comprador, presupuesto, n_telefono } = req.body;
            yield database_1.db.conectarBD();
            const dSchema = {
                _nombre_comprador: nombre_comprador,
                _presupuesto: presupuesto,
                _n_telefono: n_telefono
            };
            const oSchema = new compradores_1.Compradores(dSchema);
            yield oSchema.save()
                .then((doc) => res.send(doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        //Modificar comprador pasandole el identificador
        this.modificaComprador = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nombre_comprador } = req.params;
            const { presupuesto, n_telefono } = req.body;
            yield database_1.db.conectarBD();
            yield compradores_1.Compradores.findOneAndUpdate({ _nombre_comprador: nombre_comprador }, {
                _presupuesto: presupuesto,
                _n_telefono: n_telefono
            }, {
                new: true,
                runValidators: true
            })
                .then((doc) => {
                if (doc == null) {
                    console.log('El comprador que desea modificar no existe');
                    res.json({ "Error": "No existe el comprador " + nombre_comprador });
                }
                else {
                    console.log('Se ha modificado correctamente el comprador ' + nombre_comprador);
                    res.json(doc);
                }
            })
                .catch((err) => {
                console.log('Error: ' + err);
                res.json({ error: 'Error: ' + err });
            });
            database_1.db.desconectarBD();
        });
        //Borrar comprador pasandole el identificador
        this.deleteComprador = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nombre_comprador } = req.params;
            console.log(nombre_comprador);
            yield database_1.db.conectarBD();
            yield compradores_1.Compradores.findOneAndDelete({ _nombre_comprador: nombre_comprador })
                .then((doc) => {
                console.log(doc);
                res.json(doc);
            });
            database_1.db.desconectarBD();
        });
        //Borrar ordenador pasandole el modelo
        this.deleteOrdenador = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { modelo } = req.params;
            console.log(modelo);
            yield database_1.db.conectarBD();
            yield ordenadores_1.Ordenadores.findOneAndDelete({ _modelo: modelo })
                .then((doc) => {
                console.log(doc);
                res.json(doc);
            });
            database_1.db.desconectarBD();
        });
        this._router = (0, express_1.Router)();
    }
    get router() {
        return this._router;
    }
    misRutas() {
        this._router.get('/compradores', this.getOrdenadores), //Hace un lookup de ambas colecciones HECHO
            this._router.get('/comprador/:nombre_comprador', this.getCompr), //Hace un lookup de ambas colecciones agrupando por nombre del comprador HECHO
            this._router.get('/compradoresT', this.getCompradores), //Obtiene todos los compradores HECHO
            this._router.post('/compradorN', this.postComprador), //A??adir nuevo comprador HECHO
            this._router.delete('/compradorB/:nombre_comprador', this.deleteComprador); //Borrar comprador HECHO
        this._router.put('/compradormod/:nombre_comprador', this.modificaComprador), //Modificar comprador HECHO
            this._router.get('/ordenador/:modelo', this.getOrdenador), //Obtiene 1 ordenador HECHO
            this._router.get('/ordenadoresT', this.getOrd), //Obtiene todos los ordenadores HECHO
            this._router.post('/ordenadorN', this.postOrdenador), //A??adir nuevo ordenador HECHO
            this._router.delete('/ordenadorB/:modelo', this.deleteOrdenador), //Borrar ordenador HECHO
            this._router.put('/ordenadormod/:modelo', this.modificaOrdenador); //Modificar ordenador HECHO
    }
}
const obj = new Routes();
obj.misRutas();
exports.routes = obj.router;

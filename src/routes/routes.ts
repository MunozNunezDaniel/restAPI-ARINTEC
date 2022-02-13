import {Request, Response, Router } from 'express'
import { Ordenadores } from '../model/ordenadores'
import { Compradores } from '../model/compradores'
import { db } from '../database/database'

class Routes {
    private _router: Router

    constructor() {
        this._router = Router()
    }
    get router(){
        return this._router
    }

//Listar todos los ordenadores
    private getOrd = async (req: Request, res: Response) => {
        await db.conectarBD()
        .then( async () => {
            const query = await Ordenadores.find() 
            res.json(query) 
        })

        .catch((mensaje) => {
            res.send(mensaje)
        })

        await db.desconectarBD()
    }

//Muestra los todos los compradores con un nuevo campo compuesto de un array de los ordenadores que ha comprado
    private getOrdenadores = async (req:Request, res: Response) => {
        await db.conectarBD()
        .then( async ()=> {
            const query = await Compradores.aggregate([
                {
                    $lookup: {
                        from: 'ordenadores',
                        localField: '_nombre_comprador',
                        foreignField: '_comprador',
                        as: "_ordenadores_comprados"
                    }
                }
            ])
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })
        await db.desconectarBD()
    }

//Muestra los ordenadores que ha comprado un determinado comprador 
    private getCompr = async (req:Request, res: Response) => {
       const { nombre_comprador } = req.params
        await db.conectarBD()
        .then( async ()=> {
            const query = await Compradores.aggregate([
                {
                    $lookup: {
                        from: 'ordenadores',
                        localField: '_nombre_comprador',
                        foreignField: '_comprador',
                        as: "_ordenadores_comprados"
                    }
                },{
                    $match: {
                        _nombre_comprador: nombre_comprador
                    }
                }
            ])
           res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })
        await db.desconectarBD()
    }

//Crear un nuevo ordenador
    private postOrdenador = async (req: Request, res: Response) => {
        const { modelo, fecha_montaje, fecha_garantia, precio_del_pc, cantidad, RAM, disco_duro, comprador, duracion_bateria, refrig_liquida} = req.body
        await db.conectarBD()
        const dSchema={
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
        }
        const oSchema = new Ordenadores(dSchema)
        await oSchema.save()
            .then( (doc) => res.send(doc))
            .catch( (err: any) => res.send('Error: '+ err))
        await db.desconectarBD()
    }
    
//Modificar un ordenador mediante put pasandole el modelo
    private modificaOrdenador = async (req: Request, res: Response) => {
        const { modelo } = req.params
        const { fecha_montaje, fecha_garantia, precio_del_pc, cantidad, RAM, disco_duro, comprador, duracion_bateria, refrig_liquida} = req.body
        await db.conectarBD()
        await Ordenadores.findOneAndUpdate(
                { _modelo: modelo }, 
                {
                _fecha_montaje: fecha_montaje,
                _fecha_garantia: fecha_garantia,
                _precio_del_pc: precio_del_pc,
                _cantidad: cantidad,
                _RAM: RAM,
                _disco_duro: disco_duro,
                _comprador: comprador,
                _duracion_bateria: duracion_bateria,
                _refrig_liquida: refrig_liquida
                },
                {
                    new: true, // para retornar el documento después de que se haya aplicado la modificación
                    runValidators: true
                }  
            )
            .then( (doc: any) => {
                    if (doc==null){
                        console.log('El modelo que desea modificar no existe')
                        res.json({"Error":"No existe el modelo "+modelo})
                    } else {
                        console.log('Se ha modificado correctamente el modelo '+modelo) 
                        res.json(doc)
                    }
                    
                }
            )
            .catch( (err: string) => {
                console.log('Error: '+err)
                res.json({error: 'Error: '+err })
            }
            )
        db.desconectarBD()
    }

//Listar un solo ordenador pasandole el modelo
    private getOrdenador = async (req: Request, res: Response) => {
        const { modelo } = req.params
        await db.conectarBD()
        const x = await Ordenadores.find(
                { _modelo: modelo }
            )
        await db.desconectarBD()
        res.json(x)
    }

//Listar compradores
    private getCompradores = async (req: Request, res: Response) => {
        await db.conectarBD()
        .then( async (mensaje) => {
            console.log(mensaje)
            const query:any  = await Compradores.find({})
            console.log(query)
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
            console.log(mensaje)
        })

        await db.desconectarBD()
    }

//Crear un nuevo comprador
    private postComprador = async (req: Request, res: Response) => {
        const { nombre_comprador, presupuesto, n_telefono } = req.body
        await db.conectarBD()
        const dSchema={
            _nombre_comprador: nombre_comprador,
            _presupuesto: presupuesto,
            _n_telefono: n_telefono
        }
        const oSchema = new Compradores(dSchema)
        await oSchema.save()
            .then( (doc) => res.send(doc))
            .catch( (err: any) => res.send('Error: '+ err)) 
        await db.desconectarBD()
    }
    
//Modificar comprador pasandole el identificador
    private modificaComprador = async (req: Request, res: Response) => {
        const { nombre_comprador } = req.params
        const { presupuesto, n_telefono } = req.body
        await db.conectarBD()
        await Compradores.findOneAndUpdate(
                { _nombre_comprador: nombre_comprador }, 
                {
                    _presupuesto: presupuesto,
                    _n_telefono: n_telefono
                },
                {
                    new: true,
                    runValidators: true
                }  
            )
            .then( (doc: any) => {
                if (doc==null){
                    console.log('El comprador que desea modificar no existe')
                    res.json({"Error":"No existe el comprador "+nombre_comprador})
                } else {
                    console.log('Se ha modificado correctamente el comprador '+nombre_comprador) 
                    res.json(doc)
                }
                
            }
        )
            .catch( (err: string) => {
                console.log('Error: '+err)
                res.json({error: 'Error: '+err })
            }
            )
        db.desconectarBD()
    }

//Borrar comprador pasandole el identificador
    private deleteComprador = async (req: Request, res: Response) => {
        const { nombre_comprador } = req.params
        console.log(nombre_comprador)
        await db.conectarBD()
        await Compradores.findOneAndDelete( { _nombre_comprador: nombre_comprador } )
        .then(
            (doc: any) => {
                console.log(doc)
                res.json(doc)
            }) 
        db.desconectarBD()
    }

//Borrar ordenador pasandole el modelo
    private deleteOrdenador = async (req: Request, res: Response) => {
            const { modelo } = req.params
            console.log(modelo)
            await db.conectarBD()
            await Ordenadores.findOneAndDelete( { _modelo:modelo } )
            .then(
                (doc: any) => {
                    console.log(doc)
                    res.json(doc)
                }) 
            db.desconectarBD()
        }
    
    misRutas(){
        this._router.get('/compradores', this.getOrdenadores), //Hace un lookup de ambas colecciones HECHO
        this._router.get('/comprador/:nombre_comprador', this.getCompr),//Hace un lookup de ambas colecciones agrupando por nombre del comprador HECHO
        this._router.get('/compradoresT', this.getCompradores), //Obtiene todos los compradores HECHO
        this._router.post('/compradorN', this.postComprador), //Añadir nuevo comprador HECHO
        this._router.delete('/compradorB/:nombre_comprador', this.deleteComprador) //Borrar comprador HECHO
        this._router.put('/compradormod/:nombre_comprador', this.modificaComprador), //Modificar comprador HECHO

        this._router.get('/ordenador/:modelo', this.getOrdenador), //Obtiene 1 ordenador HECHO
        this._router.get('/ordenadoresT', this.getOrd), //Obtiene todos los ordenadores HECHO
        this._router.post('/ordenadorN', this.postOrdenador), //Añadir nuevo ordenador HECHO
        this._router.delete('/ordenadorB/:modelo', this.deleteOrdenador), //Borrar ordenador HECHO
        this._router.put('/ordenadormod/:modelo', this.modificaOrdenador) //Modificar ordenador HECHO
    }
}

const obj = new Routes()
obj.misRutas()
export const routes = obj.router


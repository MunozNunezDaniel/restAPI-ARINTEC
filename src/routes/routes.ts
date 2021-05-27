import {Request, Response, Router } from 'express'
import { Ordenadores, Compradores } from '../model/schemas'
import { db } from '../database/database'

class Routes {
    private _router: Router

    constructor() {
        this._router = Router()
    }
    get router(){
        return this._router
    }

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

//arreglado
    private getOrdenadores = async (req:Request, res: Response) => {
        await db.conectarBD()
        .then( async ()=> {
            const query = await Compradores.aggregate([
                {
                    $lookup: {
                        from: 'ordenadores',
                        localField: '_nombre_comprador',
                        foreignField: '_comprador',
                        as: "_ordenadores_comprador"
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

//arreglado
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
                        as: "_ordenadores_comprador"
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

    private postOrdenador = async (req: Request, res: Response) => {
        const { modelo, fecha_montaje, fecha_garantia, precio_del_pc, cantidad, RAM, disco_duro, comprador} = req.body
        await db.conectarBD()
        const dSchema={
            _modelo: modelo,
            _fecha_montaje: fecha_montaje,
            _fecha_garantia: fecha_garantia,
            _precio_del_pc: precio_del_pc,
            _cantidad: cantidad,
            _RAM: RAM,
            _disco_duro: disco_duro,
            _comprador: comprador
        }
        const oSchema = new Ordenadores(dSchema)
        await oSchema.save()
            .then( (doc) => res.send(doc))
            .catch( (err: any) => res.send('Error: '+ err)) 
        await db.desconectarBD()
    }
    
    private modificaOrdenador = async (req: Request, res: Response) => {
        const { modelo } = req.params
        const { fecha_montaje, fecha_garantia, precio_del_pc, cantidad, RAM, disco_duro, comprador} = req.body
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
                _comprador: comprador
                },
                {
                    new: true,
                    runValidators: true
                }  
            )
            //////Añadir mas mensajes de error//////
            .then( (doc) => {
                    if (doc==null){
                        console.log('El modelo que desea modificar no existe')
                        res.json({"Error":"No existe el modelo "+modelo})
                    } else {
                        console.log('Se ha modificado correctamente el modelo '+modelo) 
                        res.json(doc)
                    }
                    
                }
            )
            //////////////////////////////////////////
            .catch( (err) => {
                console.log('Error: '+err)
                res.json({error: 'Error: '+err })
            }
            )
        db.desconectarBD()
    }

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

    private getOrdenador = async (req: Request, res: Response) => {
        const { modelo } = req.params
        await db.conectarBD()
        const x = await Compradores.find(
                { _modelo: modelo }
            )
        await db.desconectarBD()
        res.json(x)
    }

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

    private postComprador = async (req: Request, res: Response) => {
        const { identif, nombre_comprador, presupuesto , n_telefono } = req.body
        await db.conectarBD()
        const dSchema={
            _identif : identif,
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
    
    private modificaComprador = async (req: Request, res: Response) => {
        const { identif } = req.params
        const { nombre_comprador, presupuesto , n_telefono } = req.body
        await db.conectarBD()
        await Compradores.findOneAndUpdate(
                { _identif: identif }, 
                {
                    _nombre_comprador: nombre_comprador,
                    _presupuesto: presupuesto,
                    _n_telefono: n_telefono
                },
                {
                    new: true,
                    runValidators: true
                }  
            )
            .then( (doc) => {
                if (doc==null){
                    console.log('El comprador que desea modificar no existe')
                    res.json({"Error":"No existe el comprador "+identif})
                } else {
                    console.log('Se ha modificado correctamente el comprador '+identif) 
                    res.json(doc)
                }
                
            }
        )
            .catch( (err) => {
                console.log('Error: '+err)
                res.json({error: 'Error: '+err })
            }
            )
        db.desconectarBD()
    }


private deleteComprador = async (req: Request, res: Response) => {
    const { identif } = req.params
    console.log(identif)
    await db.conectarBD()
    await Compradores.findOneAndDelete( { _identif: identif } )
    .then(
        (doc: any) => {
            console.log(doc)
            res.json(doc)
        }) 
    db.desconectarBD()
}
//Hay que añadir una nueva ruta que sea ordenador:/modelo y que en la funcion solo tenga un req.params

    misRutas(){
        this._router.get('/compradores', this.getOrdenadores), //Hace un lookup de ambas colecciones Funciona
        this._router.get('/comprador/:nombre_comprador', this.getCompr),//Hace un lookup de ambas colecciones agrupando por nombre del comprador
        this._router.get('/compradoresT', this.getCompradores), //Obtiene todos los compradores Funciona
        this._router.post('/compradorN', this.postComprador), //Añadir nuevo comprador Funciona
        this._router.post('/compradormod/:identif', this.modificaComprador), // Funciona
        this._router.delete('/compradorB/:identif', this.deleteComprador) //Funciona

        this._router.get('/ordenador/:modelo', this.getOrdenador), //Obtiene 1 ordenador (cambiar por ordenador) Funciona
        this._router.get('/ordenadores', this.getOrd), //Obtiene todos los ordenadores Funciona
        this._router.post('/ordenadorN', this.postOrdenador), //Añadir nuevo ordenador Funciona
        this._router.delete('/ordenadorB/:modelo', this.deleteOrdenador), // Funciona
        this._router.post('/ordenadormod/:modelo', this.modificaOrdenador), //Funciona
    }
}

/*
misRutas(){
        this._router.get('/obr', this.getObr), //obtiene todas las obras
        this._router.get('/obras', this.getObras), //Hace el lookup normal
        this._router.get('/obra/:alias', this.getObra), //Hace el lookup agrupando por alias
        this._router.post('/', this.postObra), //crea una nueva obra
        this._router.delete('/borra/:alias', this.deleteObra), //Borra una obra por el alias
        this._router.post('/actualiza/:alias', this.actualizaObra) 
        
        this._router.get('/plts', this.getPilotes), //Obtiene todos los pilotes
        this._router.get('/plt/:identif', this.getPilote), //Obtiene 1 solo pilote
        this._router.post('/pilotes', this.postPilote), //Crea un nuevo pilote
        this._router.post('/actualizaP/:identif', this.actualizaPilote),
        this._router.delete('/borraP/:identif', this.deletePilote)
    }
}
*/
const obj = new Routes()
obj.misRutas()
export const routes = obj.router


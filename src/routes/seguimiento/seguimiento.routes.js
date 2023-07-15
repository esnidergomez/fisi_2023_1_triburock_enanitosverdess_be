import { Router } from "express"
import {getHistorialPagos, getReportePagos} from '../../controllers/seguimiento/seguimiento.controller.js'


const routerSeguimiento = Router()

routerSeguimiento.get('/departamentos/:idDepartamento/historialPagos', getHistorialPagos)

routerSeguimiento.get('/departamentos/:idDepartamento/reportePagos/:anio/:mes', getReportePagos)

export default routerSeguimiento
import { Router } from "express";
import { 
        postAsignarServico,
        postAsignarNotificaciones,
        postAsignarAlertas,
        getListarServicios, 
        getListarNotificacoes,
        //Falta
        getHistorialPagos
        } from "../../controllers/admi presupuesto/adminpresupuesto.controller.js";

const adminPresupRouter = Router();

adminPresupRouter.post("/asignar-servicio", postAsignarServico);
adminPresupRouter.post("/asignar-servicio/asignar-notificaciones", postAsignarNotificaciones);
adminPresupRouter.post("/asignar-servicio/asignar-alertas", postAsignarAlertas);
adminPresupRouter.get("/listar-servicio/:id_departamento", getListarServicios);
adminPresupRouter.get("/listar-notificaciones/:id_usuario", getListarNotificacoes);
adminPresupRouter.get("/historial-pagos", getHistorialPagos);

export default adminPresupRouter;
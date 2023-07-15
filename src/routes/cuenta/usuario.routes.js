import { Router } from "express";
import { 
        putEditar_datos, 
        getListarContactos, 
        getPreguntasFrecuentes 
        } from "../../controllers/cuenta/usuario.controller.js";

const usuarioRouter = Router();

usuarioRouter.put("/editar-datos/:id_usuario", putEditar_datos);
usuarioRouter.get("/listar-contactos/:id_usuario", getListarContactos);
usuarioRouter.get("/preguntas-frecuentes", getPreguntasFrecuentes);

export default usuarioRouter;
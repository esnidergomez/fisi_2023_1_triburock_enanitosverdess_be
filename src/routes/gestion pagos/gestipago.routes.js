import { Router } from "express";
import { 
          getListarPagos,
          postPagar,
          postActualizarPago,
          postSubirComprobante
        } from "../../controllers/gestion pagos/gestipago.controller.js";
import multer from "multer";

const gestiPagoRouter = Router();

// Configurar el almacenamiento con Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

gestiPagoRouter.get("/departamentos/:idDeparatamento/listaPagos", getListarPagos);
gestiPagoRouter.post("/pagos/:idPago/pagar", postPagar);
gestiPagoRouter.post("/webhook", postActualizarPago);
gestiPagoRouter.post("/pagos/:idPago/subircomprobante", upload.single('archivo'), postSubirComprobante);

export default gestiPagoRouter;
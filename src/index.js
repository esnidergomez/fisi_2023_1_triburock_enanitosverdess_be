import express  from "express";
import usuarioRouter from "./routes/cuenta/usuario.routes.js";
import adminPresupRouter from "./routes/admi presupuesto/adminpresupuesto.routes.js";
import gestiPagoRouter from "./routes/gestion pagos/gestipago.routes.js";
import routerSeguimiento from "./routes/seguimiento/seguimiento.routes.js"; 
import { PORT } from './config.js'

const app = express();
const usuario       = '/ux-cuenta/appcodigo/servicio-al-cliente/v1',
      adminPresup   = '/ux-administracion-presupuesto/appcodigo/servicio-al-cliente/v1',
      gestiPago     = '/ux-gestion-pagos/appcodigo/servicio-al-cliente/v1',
      seguimiento   = '/ux-seguimiento/condo/servicio-al-cliente/v1';

app.use(express.json());
app.use(usuario,usuarioRouter); 
app.use(adminPresup,adminPresupRouter);
app.use(gestiPago,gestiPagoRouter);
app.use(seguimiento,routerSeguimiento);
app.use((req, res, next) => {
    res.status(404).json({ message: "endpoint Not found" });
});

app.listen(PORT);
console.log(PORT);
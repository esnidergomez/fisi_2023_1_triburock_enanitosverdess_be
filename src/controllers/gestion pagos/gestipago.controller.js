import { pool } from "../../db.js";
import mercadopago from "mercadopago";

export const getListarPagos = async (req, res) => { 
  const { idDeparatamento } = req.params;
  try{
    const [rows] = await pool.query('CALL GetPendingPayments(?);', [idDeparatamento])
    if (rows[0].length === 0) return res.status(404).json({ 
      message: 'No se encontraron facturas pendientes'
    })
    res.send(rows[0])
  }catch (error) {
    res.status(500).send(error); 
  }
}

export const postPagar = async (req, res) => { 
  const { titulo, precio} = req.body;
  mercadopago.configure({
      access_token: 'TEST-56925687694290-071103-bdf6640e055ddacf48b60f3c71ecba7e-1420890444'
  })
  const result = await mercadopago.preferences.create({
      items: [
          {
              title: titulo,
              unit_price: precio,
              currency_id: "PEN",
              quantity: 1,
          }
      ],
      back_urls: {
          success: 'http://localhost:3000/success',
          failure: 'http://localhost:3000/failure',
          pending: 'http://localhost:3000/pending',
      },
      notification_urls: "http://localhost:3000/webhook",
  })

  const { idPago } = req.params;
  try{
    const [rows] = await pool.query('CALL UpdatePaymentStatus(?);', [idPago])
    console.log(rows);
    res.send({
      actualiza: rows[0],
      link: result.body.init_point
    })
  }catch (error) {
    res.status(500).send(error);
  }
  //res.send(result.body.init_point)
};

export const postSubirComprobante = async (req, res) => { 
  const archivoPDF = req.file.buffer;
  const { idPago } = req.params;
  const { nombre_archivo } = req.body;

  // Ejecutar la consulta
  //await pool.query('CALL FillComprobante(?, ?);', values);
  try{
    await pool.query('INSERT INTO Comprobante (Documento, Fecha_subida, Validado, Numero_factura, Fecha_emision, Pago_id_pago) VALUES (?, ?, ?, ?, ?, ?);', [archivoPDF,'2023-07-11 10:00:00',1,145,'2023-07-11 10:00:00',idPago]);
  }catch (error) {
    //console.log(error);
    res.status(500).send(error);
  }
};
export const postActualizarPago = async (req, res) => {
  const { idPago } = req.params;
  try{
    const [rows] = await pool.query('CALL UpdatePaymentStatus(?);', [idPago])
    console.log(rows);
    res.send(rows[0])
  }catch (error) {
    res.status(500).send(error);
  }
}
import { pool } from "../../db.js"

export const putEditar_datos = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, email, telefono } = req.body;
  const [result] = await pool.query('UPDATE usuario SET nombre = ?;',[id])
  if (result.affectedRows === 0) {
    return res.status(404).json({ 
      message: "Alerta não cadastrada com sucesso!"
    });
  }
  const [rows] = await pool.query('SELECT * FROM usuario WHERE id =?;',[id])
  res.send(rows)
};

export const getListarContactos = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM contacto;')
  if (rows.length > 0) return res.status(404).json({ 
    message: "No hay contactos" 
  })
  res.send(rows[0])
};

export const getPreguntasFrecuentes = async (req, res) => { 
  const [rows] = await pool.query('SELECT * FROM pregunta_frecuente;')
  if (rows.length > 0) return res.status(404).json({ 
    message: "No hay preguntas frecuentes" 
  })
  res.send(rows[0])
}
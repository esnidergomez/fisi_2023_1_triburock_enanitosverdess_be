import { pool } from "../../db.js"

export const postAsignarServico = async (req, res) => {
  const { nome, descricao, valor } = req.body;
  try {
    await pool.query(
      "INSERT INTO servicos (nome, descricao, valor) VALUES ($1, $2, $3)",
      [
        nome,
        descricao,
        valor,
      ]
    );
    res.send({
      message: "Servico cadastrado com sucesso!",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const postAsignarNotificaciones = async (req, res) => { 
  const { id_notificacion, id_asignacion, mensaje, fecha_envio } = req.body;
  try {
    await pool.query(
      "INSERT INTO notificacoes (nome, descricao, valor) VALUES ($1, $2, $3)",
      [
        nome,
        descricao,
        valor,
      ]
    );
    res.send({
      message: "Notificação cadastrada com sucesso!",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const postAsignarAlertas = async (req, res) => { 
  const { nome, descricao, valor } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO alertas (nome, descricao, valor) VALUES ($1, $2, $3)",
      [
        nome,
        descricao,
        valor,
      ]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        message: "Alerta não cadastrada com sucesso!"
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getListarServicios = async (req, res) =>{ 
  const { id_depa } = req.params;
  try{
    const [rows] = await pool.query('SELECT * FROM servicios ?;', [id_depa])
    if (rows.length > 0) return res.status(404).json({ 
      message: "No hay contactos" 
    })
    res.send(rows[0])
  }catch (error) {
    res.status(500).send(error);
  }
};

export const getListarNotificacoes = async (req, res) =>{ 
  const { id_usuario } = req.params;
  try{
    const [rows] = await pool.query('SELECT * FROM notificacoes?;', [id_usuario])
    if (rows.length > 0) return res.status(404).json({ 
      message: "No hay contactos" 
    })
    res.send(rows[0])
  }catch (error) {
    res.status(500).send(error);
  }
}
//falta

export const getHistorialPagos = async (req, res) =>{ 
  const { id_depa } = req.params;
  try{
    const [rows] = await pool.query('SELECT * FROM pagos?;', [id_depa])
    if (rows.length > 0) return res.status(404).json({ 
      message: "No hay contactos" 
    })
    res.send(rows[0])
  }catch (error) {
    res.status(500).send(error);
  }
}
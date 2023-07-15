import {pool} from '../../db.js'

export const getHistorialPagos = async (req, res) => {
    try{
        const [rows] = await pool.query('CALL SP_HISTORIAL_PAGOS(?)', [req.params.idDepartamento])
        if(rows[0].length <= 0) return res.status(404).json({
            message : 'El departamento no registra pagos'
        })
        //res.json(rows)
        res.send(rows[0])
        //console.log(rows)
    } catch(error){
        return res.status(500).json({
            message : 'Error en el servidor'
        })
    }
}

export const getReportePagos = async (req, res) => {
    try{
        const [rows] = await pool.query('CALL SP_REPORTE_PAGOS (?, ?, ?)', [req.params.idDepartamento, req.params.anio, req.params.mes]);
        console.log(rows);
        if(rows[0].length <= 0) return res.status(404).json({
            message : 'El departamento no registra pagos en el periodo indicado'
        })
        //res.json(rows)
        res.send(rows[0])
        //console.log(rows)
    } catch(error){
        return res.status(500).json({
            message : 'Error en el servidor'
        })
    }
}
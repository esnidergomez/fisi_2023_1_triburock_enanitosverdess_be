--Agregar un servicio
DELIMITER //
CREATE PROCEDURE AsignarNotificacion (
  IN p_id_alerta INT,
  IN p_id_asignacion INT,
  IN p_mensaje VARCHAR(255),
  IN p_fecha_envio DATETIME
)
BEGIN
  INSERT INTO Alerta (id_alerta, id_asignacion, mensaje, fecha_envio)
  VALUES (p_id_alerta, p_id_asignacion, p_mensaje, p_fecha_envio);
  
  UPDATE Alerta
  SET asignada = 1
  WHERE id_alerta = p_id_alerta;
END //
DELIMITER ;

--Listar pagos
DELIMITER //

DROP PROCEDURE IF EXISTS GetPendingPayments //

CREATE PROCEDURE GetPendingPayments(IN departmentID INT)
BEGIN
    SELECT P.Monto AS Monto_Pago, A.Fecha_vencimiento, S.nombre_servicio, 
           (SELECT COUNT(DISTINCT D.id_departamento) FROM Departamento D 
            WHERE D.id_usuario = U.id_usuario) AS Cantidad_Departamentos
    FROM Pago P
    INNER JOIN Asignacion A ON P.Asignacion_id_asignacion = A.id_asignacion
    INNER JOIN servicio S ON A.id_servicio = S.idservicio
    INNER JOIN Departamento D ON A.id_servicio = D.id_usuario
    INNER JOIN Usuario U ON D.id_usuario = U.id_usuario
    WHERE P.Estado = 'pendiente' AND D.id_departamento = departmentID;
END //

DELIMITER ;
CALL GetPendingPayments(1);

--Actualizar estado de tabla pago
DELIMITER //

CREATE PROCEDURE UpdatePaymentStatus(IN paymentID INT)
BEGIN
    UPDATE Pago SET Estado = 'pagado' WHERE id_pago = paymentID AND Estado = 'pendiente';

    IF ROW_COUNT() > 0 THEN
        SELECT 'El estado del pago se ha actualizado correctamente a "pagado".' AS Message;
    ELSE
        SELECT 'No se encontró ningún pago pendiente con el ID especificado.' AS Message;
    END IF;
END //

DELIMITER ;
CALL UpdatePaymentStatus(1);

-- Subida de comrpbante
DELIMITER //

DROP PROCEDURE IF EXISTS FillComprobante //

CREATE PROCEDURE FillComprobante(
    IN paymentID INT,
    IN document LONGBLOB
)
BEGIN
    DECLARE existingComprobanteCount INT;

    -- Verificar si ya existe un comprobante para el pago
    SELECT COUNT(*) INTO existingComprobanteCount FROM Comprobante WHERE Pago_id_pago = paymentID;

    IF existingComprobanteCount > 0 THEN
        -- Actualizar el comprobante existente
        UPDATE Comprobante SET Documento = document WHERE Pago_id_pago = paymentID;

        SELECT 'El comprobante existente ha sido actualizado correctamente.' AS Message;
    ELSE
        -- Insertar un nuevo registro en la tabla Comprobante
        INSERT INTO Comprobante (Documento, Fecha_subida, Validado, Numero_factura, Fecha_emision, Pago_id_pago)
        VALUES (document, NOW(), 0, '', NOW(), paymentID);

        SELECT 'El comprobante ha sido llenado correctamente.' AS Message;
    END IF;
END //

DELIMITER ;

CALL FillComprobante(paymentID, document);


--Seguimiento
DELIMITER //

DROP PROCEDURE IF EXISTS SP_HISTORIAL_PAGOS //

CREATE PROCEDURE SP_HISTORIAL_PAGOS(IN ID_DEPARTAMENTO INT)
BEGIN
    SELECT MONTO, FECHA_PAGO, MÉTODO_PAGO, ESTADO FROM PAGO
    WHERE DEPARTAMENTO_ID_DEPARTAMENTO = ID_DEPARTAMENTO;
END //

DELIMITER ;

DELIMITER //

DROP PROCEDURE IF EXISTS SP_REPORTE_PAGOS //

CREATE PROCEDURE SP_REPORTE_PAGOS(IN ID_DEPARTAMENTO INT, IN ANIO INT, IN MES INT)
BEGIN
    SELECT MONTO, FECHA_PAGO, MÉTODO_PAGO, ESTADO FROM PAGO
    WHERE DEPARTAMENTO_ID_DEPARTAMENTO = ID_DEPARTAMENTO
    AND YEAR(FECHA_PAGO) = ANIO
    AND MONTH(fecha_pago) = MES;
END //

DELIMITER ;
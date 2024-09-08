<?php
include_once('../config/config.php');

class IvaModel
{
    public function todos()
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM iva";
        $datos = mysqli_query($con, $cadena);
        return $datos;
        $con->close();
    }

}

<?php
if(!empty($_POST["enviar"]))

    if (empty($_POST["name"]) or empty($_POST["email"])or empty($_POST["date"])or empty($_POST["time"] )) {
        echo '<div class="aleta"> Error, algun campo o campos vacios';
    } else {
        $cedula=$_POST["name"];
        $email=$_POST["email"];
        $date=$_POST["date"];
        $time=$_POST["time"];
        $guests=$_POST["guests"];
        $comments=$_POST["comments"];
        $sql=$conexion->query("insert into reservas(Cedula,Email,Fecha,Hora,Numero,Comentarios)values('$cedula','$email','$date','$time', '$guests',' $comments')");
        if($sql==1){
            echo'<div class="success"> reserva agregado correctamente </div>';
        } else {
            echo 'div class="alerta"> error al registrar reserva</div>';
    }
    
}

?>
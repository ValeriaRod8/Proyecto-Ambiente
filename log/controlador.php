<?php
if(!empty($_POST["registro"])){
    if (empty($_POST["usuario"]) or empty($_POST["password"]) or empty($_POST["email"])) {
        echo '<div class="aleta"> Error, algun campo o campos vacios';
    } else {
        $usuario=$_POST["usuario"];
        $password=md5($_POST["password"]);
        $email=$_POST["email"];
        $sql=$conexion->query("insert into usuarios(usuario,password,Email)values('$usuario','$password','$email')");
        if($sql==1){
            echo'<div class="success"> Usuario agregado correctamente </div>';
        } else {
            echo 'div class="alerta"> error al registrar</div>';
    }
    
}
}
?>
<?php
$usuario=$_POST['usuario'];
$password=$_POST['password'];
session_start();
$_SESSION['usuario']=$usuario;

$conexion=mysqli_connect("localhost","root","","barcharlies");
$consulta= "SELECT*FROM usuarios where usuario='$usuario' and password='$password'";
$resultado=mysqli_query($conexion,$consulta);

$filas=mysqli_num_rows($resultado);
if($filas){
    header("location:home.php");

}else{
    ?>
    <?php
    include("index.php");
    ?>
    <h1 class="bad"> ERROR EN LA AUTENTIFICACION </h1>
    <?php
}
mysqli_free_result($resultado);
mysqli_close($conexion);
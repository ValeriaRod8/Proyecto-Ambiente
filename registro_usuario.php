<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro</title>
</head>

<body>
<h1>Formulario en PHP</h1>

<form method="POST" action="" class=formulario>
    <?php
    include("db.php");
    include("controlador.php");
    ?>
    <label for="">Nombre:</label>
    <input type="text" id="usuario" name="usuario">

    <label for="">Contraseña:</label>
    <input type="password" id="password" name="password">

    <label for="">Correo Electrónico:</label>
    <input type="email" id="email" name="email">

    <input type="submit" value="registro" name= "registro">
</form>
</body>
</html>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="/css/index.css">
	<title>Iniciar sesión</title>
</head>
<body>
	<h1>Iniciar sesión</h1>
	<form action="validar.php" method="post">
		<label for="usuario">Nombre de usuario:</label>
		<input type="text" id="usuario" name="usuario" required>
		<label for="password">Contraseña:</label>
		<input type="password" id="password" name="password" required>
		<input type="submit" value="Iniciar sesión">
	</form>
</body>
</html>
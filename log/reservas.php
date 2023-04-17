<!DOCTYPE html>
<html>

<head>
	<meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" type="text/css" href="src/view/css/reservas.css">
	<title>Reservar en el Restaurante</title>
</head>
<header>
	<div class="container">
		<div class="logo">
			<h1>𝑅𝑒𝓈𝓉𝒶𝓊𝓇𝒶𝓃𝓉𝑒 𝐵𝒶𝓇 𝒞𝒽𝒶𝓇𝓁𝒾𝑒𝓈</h1>
			<p></p>
		</div>
		<nav>
            <ul>
                <li><a href="src/view/inicio.html">𝐼𝓃𝒾𝒸𝒾𝑜</a></li>
                <li><a href="src/view/menu.html">𝑀𝑒𝓃𝓊</a></li>
                <li><a href="reservas.php">𝑅𝑒𝓈𝑒𝓇𝓋𝒶𝓈</a></li>
                <li><a href="src/view/contacto.html">𝒞𝑜𝓃𝓉𝒶𝒸𝓉𝑜</a></li>
            </ul>
        </nav>
	</div>
</header>

<body>
	<h1>Reservar en el Restaurante</h1>
	<form method="POST"  action="" class=formulario>
		<?php
		include("db.php");
		include("guardareserva.php")
		?>
		<label for="name">Cedula:</label>
		<input type="text" id="name" name="name"><br>

		<label for="email">Email:</label>
		<input type="email" id="email" name="email"><br>

		<label for="date">Fecha:</label>
		<input type="date" id="date" name="date"><br>

		<label for="time">Hora:</label>
		<input type="time" id="time" name="time"><br>

		<label for="guests">Numero de Invitados:</label>
		<input type="number" id="guests" name="guests"><br>

		<label for="comments">Comentarios:</label><br>
		<textarea id="comments" name="comments"></textarea><br>

		<input type="submit" value="Enviar Reserva"name="enviar">
		

	</form>
	<div style="width:100%; position:relative; margin:0 auto; padding-top:80px; height:350px; background-image:url('upload/<?php echo $array['piotr-szulawski-DCmUhk54F6M-unsplash.jpg']; ?>'); 
    background-repeat:no-repeat; 
    background-size:100%; 
    text-align:center; 
    padding-bottom:40px;">
</body>


</html>
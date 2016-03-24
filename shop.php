<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$outp = '[ {"name":"Єгипет, Хургада","icon":"1.jpg", "desc":"Mirage New Hawaii 4* 08.04.2016 (10 ночей) Харчування: все включено", "price":498},'.
          '{"name":"Кіпр, Айя-Напа","icon":"2.jpg", "desc":"Makronissos Village 08.05.2016 (11 ночей) Харчування: без харч", "price":380},'.
          '{"name":"Іспанія, Ллорет де Мар","icon":"3.jpg", "desc":"SUNSHINE PARK 3* 18.05.2016 (7 ночей) Харчування: сніданки", "price":364} ]';

echo($outp);
?>


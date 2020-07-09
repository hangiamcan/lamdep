<?php
require_once 'Mobile_Detect.php';
$user_ip = getenv('REMOTE_ADDR');
$geo = unserialize(file_get_contents("http://www.geoplugin.net/php.gp?ip=$user_ip"));
$country = $geo["geoplugin_countryName"];
$city = $geo["geoplugin_city"];
//echo $country;

$detect = new Mobile_Detect;
if ( $detect->isMobile() && $country=='Thailand' ) 
{
 // echo "Mày dùng mobile và mày là người VN";
 require_once 'pre-link.php';
} else {
 // echo "Mày đéo phải người dùng mobile ok hoặc mày là mấy con đĩ lồn bên FB bot";
 require_once 'pre-sach.php';
}



?>
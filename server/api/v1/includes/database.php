<?php 
$servername = "localhost";
$username = "winter";
$password = "nauatlau1234";

try {
    $conn = new PDO("mysql:host=$servername;dbname=tradersnotes", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo "Connection Failed: " . $e->getMessage();
}
?>
<?php
header('Access-Control-Allow-Origin: *');
include '../includes/database.php';

// Get the data

$stmt = $conn->prepare("SELECT * FROM users");
$stmt->execute();

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($result);

?>
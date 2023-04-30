<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
include '../includes/database.php';

$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);
$username = $data['username'];
$password = $data['password'];

// Check if user exists
$stmt = $conn->prepare('SELECT * FROM users WHERE Name = :username');
$stmt->bindValue(':username', $username);
$stmt->execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user) {
    $response = array('status' => 'error', 'message' => 'User already exists');
    echo json_encode($response);
    exit();
}

$createSqlTable = "CREATE TABLE IF NOT EXISTS $username (`date` DATE NOT NULL , `trade` TEXT NOT NULL , `result` TEXT NOT NULL , `duration` TEXT NOT NULL ) ENGINE = InnoDB; ";

if ($conn->query($createSqlTable) === false) {
    die("Error creating table: " . $conn->error);
}

$insertSql = "INSERT INTO users (Name, Pass) VALUES ('$username', '$password')";

if ($conn->query($insertSql) === false) {
    die("Error inserting into table: " . $conn->error);
}

$success = array('status' => 'success', 'message' => 'User created');
echo json_encode($success);

?>
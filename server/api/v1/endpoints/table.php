<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include('../includes/database.php');

$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);
$username = $data['uname'];

if ($username == '') {
    $error = array('status' => 'error', 'message' => 'No username provided');
    echo json_encode($error);
    exit();
}

$stmt = $conn->prepare("SELECT * FROM `$username`");
$stmt->execute();
$table = $stmt->fetchAll(PDO::FETCH_ASSOC);

if (!$table) {
    $error = array('status' => 'error', 'message' => 'Table does not exist');
    echo json_encode($error);
    exit();
}

echo json_encode($table);

?>
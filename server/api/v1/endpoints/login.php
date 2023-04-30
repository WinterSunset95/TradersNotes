
<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);
include '../includes/database.php';

$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);
$username = $data['username'];
$password = $data['password'];

// Check if user exists
$stmt = $conn->prepare('SELECT `Pass` FROM users WHERE Name = :username');
$stmt->bindValue(':username', $username);
$stmt->execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user) {
    $error = array('status' => 'error', 'message' => 'User does not exist');
    echo json_encode($error);
    exit();
}

if ($user['Pass'] == $password) {
    $response = array('status' => 'success', 'message' => 'User logged in');
    echo json_encode($response);
} else {
    $error = array('status' => 'error', 'message' => 'Incorrect password');
    echo json_encode($error);
}

?>
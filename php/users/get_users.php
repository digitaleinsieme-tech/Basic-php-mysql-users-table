<?php
require_once '.././config.php';

header("Content-Type: application/json");
$data = json_decode(file_get_contents("php://input"), true);
$field = $data["field"] ?? "id";
$order = strtoupper($data["order"] ?? "ASC");

$allowedFields = ["id", "name", "lastname", "email"];
$allowedOrder = ["ASC", "DESC"];

if (!in_array($field, $allowedFields)) {
    $field = "id";
}

if (!in_array($order, $allowedOrder)) {
    $order = "ASC";
}

$sql = "SELECT * FROM users ORDER BY $field $order";

$result = $conn->query($sql);

if (!$result) {
    http_response_code(500);
    echo json_encode([
        'error' => mysqli_error($conn)
    ]);
    exit;
}

$users = [];
while ($row = mysqli_fetch_assoc($result)) {
    $users[] = $row;
}

header('Content-Type: application/json');
echo json_encode($users);

$conn->close();
?>
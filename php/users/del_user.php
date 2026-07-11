<?php
require_once '.././config.php';
$data = json_decode(file_get_contents("php://input"), true);

$stmt = $conn->prepare("DELETE FROM users WHERE id = ?");

if (!$stmt) {
    die($conn->error);
}

$stmt->bind_param("i", $data["id"]);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "User deleted" . $data["id"]
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => $stmt->error
    ]);
}

$stmt->close();
$conn->close();
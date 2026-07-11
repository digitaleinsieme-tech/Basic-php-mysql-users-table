<?php
require_once '.././config.php';

header("Content-Type: application/json");


if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "message" => "Errore di connessione"
    ]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$stmt = $conn->prepare("
    UPDATE users
    SET name = ?, lastname = ?, email = ?
    WHERE id = ?
");

$stmt->bind_param(
    "sssi",
    $data["name"],
    $data["lastname"],
    $data["email"],
    $data["id"]
);

$stmt->execute();

echo json_encode([
    "success" => true,
    "message" => "Utente aggiornato"
]);

$stmt->close();
$conn->close();
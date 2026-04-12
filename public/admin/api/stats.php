<?php
header('Content-Type: application/json; charset=utf-8');
require_once '../../db/db.php';

$stats = [];

// Количество предметов
$result = $conn->query("SELECT COUNT(*) as count FROM subjects");
$row = $result->fetch_assoc();
$stats['subjects'] = $row['count'];

// Количество учителей
$result = $conn->query("SELECT COUNT(*) as count FROM teachers");
$row = $result->fetch_assoc();
$stats['teachers'] = $row['count'];
$result = $conn->query("SELECT COUNT(*) as count FROM tests");
$row = $result->fetch_assoc();
$stats['tests'] = $row['count'];

echo json_encode($stats);

$conn->close();
?>
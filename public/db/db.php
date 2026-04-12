<?php
// db/db.php - подключение к базе данных

// Настройки подключения
$host = 'MySQL-8.0'; // или 'localhost' в зависимости от вашего хостинга
$username = 'root';
$password = '';
$database = 'podgotovka_db';

// Создаем подключение
$conn = new mysqli($host, $username, $password, $database);

// Проверяем подключение
if ($conn->connect_error) {
    // Если ошибка подключения, возвращаем JSON с ошибкой
    header('Content-Type: application/json; charset=utf-8');
    die(json_encode([
        'error' => 'Ошибка подключения к базе данных: ' . $conn->connect_error
    ]));
}

// Устанавливаем кодировку
$conn->set_charset("utf8mb4");

// Для отладки (можно закомментировать на продакшене)
// error_reporting(E_ALL);
// ini_set('display_errors', 1);

// Функция для безопасного экранирования (на всякий случай)
function escape($value) {
    global $conn;
    return $conn->real_escape_string($value);
}

// Функция для проверки авторизации администратора
function isAdmin() {
    session_start();
    return isset($_SESSION['login']) && isset($_SESSION['pass']);
}

// Функция для проверки авторизации учителя
function isTeacher() {
    session_start();
    return isset($_SESSION['teacher_id']);
}

// Функция для получения текущего учителя
function getCurrentTeacher() {
    if (!isTeacher()) return null;
    global $conn;
    $teacher_id = $_SESSION['teacher_id'];
    $result = $conn->query("SELECT * FROM teachers WHERE id = $teacher_id");
    return $result->fetch_assoc();
}

// Функция для получения статистики (как в stats.php)
function getStats() {
    global $conn;
    $stats = [];
    
    $result = $conn->query("SELECT COUNT(*) as count FROM subjects");
    $stats['subjects'] = $result->fetch_assoc()['count'];
    
    $result = $conn->query("SELECT COUNT(*) as count FROM teachers");
    $stats['teachers'] = $result->fetch_assoc()['count'];
    
    $result = $conn->query("SELECT COUNT(*) as count FROM tests");
    $stats['tests'] = $result->fetch_assoc()['count'];
    
    return $stats;
}
?>
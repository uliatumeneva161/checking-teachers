<?php
header('Content-Type: application/json; charset=utf-8');
require_once '../db/db.php';

if (!empty($_GET['test_id'])) {
    $test_id = intval($_GET['test_id']);
    
    $sql = "SELECT q.*, 
            (SELECT COUNT(*) FROM options WHERE question_id = q.id) as option_count
            FROM questions q 
            WHERE q.test_id = $test_id 
            ORDER BY q.question_order";
    
    $result = $conn->query($sql);
    $questions = [];
     while ($row = $result->fetch_assoc()) {
        $question_id = $row['id'];
        $optionsSql = "SELECT * FROM options WHERE question_id = $question_id";
        $optionsResult = $conn->query($optionsSql);
        $options = [];
        
        while ($optionRow = $optionsResult->fetch_assoc()) {
            $options[] = [
                'id' => $optionRow['id'],
                'text' => $optionRow['option_text'],
                'isCorrect' => (bool)$optionRow['is_correct']
            ];
        }
        
        $row['options'] = $options;
        $questions[] = $row;
    }
    echo json_encode($questions);
} else {
    http_response_code(400);
    echo json_encode(['error' => 'ID теста обязательно']);
}

$conn->close();
?>

admin/api/stats.php
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

// Количество тестов
$result = $conn->query("SELECT COUNT(*) as count FROM tests");
$row = $result->fetch_assoc();
$stats['tests'] = $row['count'];

echo json_encode($stats);

$conn->close();
?>
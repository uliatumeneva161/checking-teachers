<?php
header('Content-Type: application/json; charset=utf-8');
require_once '../../db/db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Получить все тесты с названием предмета
        $sql = "SELECT t.*, s.name as subject_name, 
                DATE_FORMAT(t.created_at, '%d.%m.%Y') as created_date
                FROM tests t 
                LEFT JOIN subjects s ON t.subject_id = s.id 
                ORDER BY t.created_at DESC";
        
        $result = $conn->query($sql);
        $tests = [];
        while ($row = $result->fetch_assoc()) {
            $tests[] = $row;
        }
        echo json_encode($tests);
        break;
        
    case 'POST':
        // Добавить новый тест с вопросами
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!empty($data['name']) && !empty($data['subject_id']) && !empty($data['questions'])) {
            $conn->begin_transaction();
            
            try {
                $name = $conn->real_escape_string(trim($data['name']));
                $subject_id = intval($data['subject_id']);
                $question_count = count($data['questions']);
                
                // Добавляем тест
                 $sql = "INSERT INTO tests (name, subject_id, question_count) 
                        VALUES ('$name', $subject_id, $question_count)";
                
                if (!$conn->query($sql)) {
                    throw new Exception('Ошибка при добавлении теста: ' . $conn->error);
                }
                
                $test_id = $conn->insert_id;
                
                // Добавляем вопросы и варианты ответов
                foreach ($data['questions'] as $questionIndex => $question) {
                    $question_text = $conn->real_escape_string(trim($question['text']));
                    $question_order = $questionIndex + 1;
                    
                    $sql = "INSERT INTO questions (test_id, question_text, question_order) 
                            VALUES ($test_id, '$question_text', $question_order)";
                    
                    if (!$conn->query($sql)) {
                        throw new Exception('Ошибка при добавлении вопроса: ' . $conn->error);
                          }
                    
                    $question_id = $conn->insert_id;
                    
                    // Добавляем варианты ответов
                    foreach ($question['options'] as $optionIndex => $option) {
                        $option_text = $conn->real_escape_string(trim($option['text']));
                        $is_correct = $option['isCorrect'] ? 1 : 0;
                        
                        $sql = "INSERT INTO options (question_id, option_text, is_correct) 
                                VALUES ($question_id, '$option_text', $is_correct)";
                        
                        if (!$conn->query($sql)) {
                            throw new Exception('Ошибка при добавлении варианта ответа: ' . $conn->error);
                        }
                    }
                }
                
                $conn->commit();
                // Получаем данные нового теста
                $getSql = "SELECT t.*, s.name as subject_name, 
                          DATE_FORMAT(t.created_at, '%d.%m.%Y') as created_date
                          FROM tests t 
                          LEFT JOIN subjects s ON t.subject_id = s.id 
                          WHERE t.id = $test_id";
                $getResult = $conn->query($getSql);
                $newTest = $getResult->fetch_assoc();
                
                echo json_encode($newTest);
                
            } catch (Exception $e) {
                $conn->rollback();
                http_response_code(500);
                echo json_encode(['error' => $e->getMessage()]);
            }
             } else {
            http_response_code(400);
            echo json_encode(['error' => 'Не все обязательные поля заполнены']);
        }
        break;
        
    case 'DELETE':
        // Удалить тест
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!empty($data['id'])) {
            $id = intval($data['id']);
            
            $sql = "DELETE FROM tests WHERE id = $id";
            if ($conn->query($sql)) {
                echo json_encode(['success' => true, 'message' => 'Тест удален']);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Ошибка при удалении теста: ' . $conn->error]);
                  }
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'ID теста обязательно']);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Метод не поддерживается']);
        break;
}

$conn->close();
?>

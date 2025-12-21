let currentData = {
    teachers: [],
    subjects: [],
    tests: []
};

let currentDeleteItem = { type: null, id: null };

function saveToLocalStorage() {
    localStorage.setItem('schoolData', JSON.stringify({
        teachers: currentData.teachers,
        subjects: currentData.subjects,
        tests: currentData.tests,
        lastUpdated: new Date().toISOString()
    }));
}

function loadFromLocalStorage() {
    const savedData = localStorage.getItem('schoolData');
    if (savedData) {
        try {
            const parsedData = JSON.parse(savedData);
            currentData.teachers = parsedData.teachers || [];
            currentData.subjects = parsedData.subjects || [];
            currentData.tests = parsedData.tests || [];
        } catch (e) {
            console.error('Error loading data:', e);
            initializeDefaultData();
        }
    } else {
        initializeDefaultData();
    }
}

function initializeDefaultData() {
    currentData = {
        teachers: [
            { 
                id: 1, 
                full_name: "Иванов Петр Сергеевич", 
                login: "ivanov_ps", 
                password: "password123", 
                subject_id: 1, 
                subject_name: "Математика" 
            },
            { 
                id: 2, 
                full_name: "Смирнова Анна Владимировна", 
                login: "smirnova_av", 
                password: "literature2023", 
                subject_id: 2, 
                subject_name: "Литература" 
            },
            { 
                id: 3, 
                full_name: "Петров Дмитрий Иванович", 
                login: "petrov_di", 
                password: "physics123", 
                subject_id: 3, 
                subject_name: "Физика" 
            }
        ],
        subjects: [
            { id: 1, name: "Математика", teacher_count: 1, test_count: 1 },
            { id: 2, name: "Литература", teacher_count: 1, test_count: 1 },
            { id: 3, name: "Физика", teacher_count: 1, test_count: 1 }
        ],
        tests: [
            { 
                id: 1, 
                name: "Алгебра. Квадратные уравнения", 
                subject_id: 1, 
                subject_name: "Математика", 
                question_count: 15, 
                created_date: "2025-12-10" 
            },
            { 
                id: 2, 
                name: "Русская литература 19 века", 
                subject_id: 2, 
                subject_name: "Литература", 
                question_count: 20, 
                created_date: "2025-09-12" 
            },
            { 
                id: 3, 
                name: "Механика. Законы Ньютона", 
                subject_id: 3, 
                subject_name: "Физика", 
                question_count: 18, 
                created_date: "2025-08-15" 
            }
        ]
    };
    saveToLocalStorage();
}

function populateSubjectDropdown(selectId) {
    const select = document.getElementById(selectId);
    if (select) {
        select.innerHTML = '<option value="">Выберите предмет</option>';
        currentData.subjects.forEach(subject => {
            const option = document.createElement('option');
            option.value = subject.id;
            option.textContent = subject.name;
            select.appendChild(option);
        });
    }
}

function confirmDelete() {
    const { type, id } = currentDeleteItem;
    
    if (type === 'teacher') {
        const teacherIndex = currentData.teachers.findIndex(t => t.id === id);
        if (teacherIndex !== -1) {
            currentData.teachers.splice(teacherIndex, 1);
        }
    } else if (type === 'subject') {
        const subjectTeachers = currentData.teachers.filter(t => t.subject_id === id);
        if (subjectTeachers.length > 0) {
            showNotification(`Невозможно удалить предмет, так как с ним связаны преподаватели`, 'error');
            document.getElementById('delete-confirm-modal').classList.remove('active');
            return;
        }
        
        const subjectIndex = currentData.subjects.findIndex(s => s.id === id);
        if (subjectIndex !== -1) {
            currentData.subjects.splice(subjectIndex, 1);
        }
    } else if (type === 'test') {
        const testIndex = currentData.tests.findIndex(t => t.id === id);
        if (testIndex !== -1) {
            currentData.tests.splice(testIndex, 1);
        }
    }
    
    saveToLocalStorage();
    loadAllTables();
    updateStats();
    showNotification(`Элемент успешно удален`, 'success');
    document.getElementById('delete-confirm-modal').classList.remove('active');
}

function formatDate(dateString) {
    if (!dateString) return 'Не указана';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? dateString : date.toLocaleDateString('ru-RU');
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 6px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        background-color: ${type === 'success' ? '#83bc91ff' : '#c97d85ff'};
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function updateStats() {
    const teachersCount = document.getElementById('teachers-count');
    const subjectsCount = document.getElementById('subjects-count');
    const testsCount = document.getElementById('tests-count');
    
    if (teachersCount) teachersCount.textContent = currentData.teachers.length;
    if (subjectsCount) subjectsCount.textContent = currentData.subjects.length;
    if (testsCount) testsCount.textContent = currentData.tests.length;
}

function loadAllTables() {
    if (document.getElementById('teachers-table-body')) {
        loadTeachersTable();
    }
    if (document.getElementById('subjects-table-body')) {
        loadSubjectsTable();
    }
    if (document.getElementById('tests-table-body')) {
        loadTestsTable();
    }
}

function loadSubjectsTable() {
    const tableBody = document.getElementById('subjects-table-body');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    currentData.subjects.forEach(subject => {
        const teacherCount = currentData.teachers.filter(t => t.subject_id === subject.id).length;
        const testCount = currentData.tests.filter(t => t.subject_id === subject.id).length;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${subject.id}</td>
            <td>${subject.name}</td>
            <td>${teacherCount}</td>
            <td>${testCount}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-danger delete-btn" 
                            data-type="subject" 
                            data-id="${subject.id}" 
                            data-name="${subject.name}">
                        <i class="fas fa-trash"></i> Удалить
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function loadTeachersTable() {
    const tableBody = document.getElementById('teachers-table-body');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    currentData.teachers.forEach(teacher => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${teacher.id}</td>
            <td>${teacher.full_name}</td>
            <td>${teacher.login}</td>
            <td>${teacher.password}</td>
            <td>${teacher.subject_name || 'Не указан'}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-danger delete-btn" 
                            data-type="teacher" 
                            data-id="${teacher.id}" 
                            data-name="${teacher.full_name}">
                        <i class="fas fa-trash"></i> Удалить
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function loadTestsTable() {
    const tableBody = document.getElementById('tests-table-body');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    currentData.tests.forEach(test => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${test.id}</td>
            <td>${test.name}</td>
            <td>${test.subject_name || 'Не указан'}</td>
            <td>${test.question_count || 0}</td>
            <td>${formatDate(test.created_date)}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-danger delete-btn" 
                            data-type="test" 
                            data-id="${test.id}" 
                            data-name="${test.name}">
                        <i class="fas fa-trash"></i> Удалить
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}


function handleAddSubject(e) {
    e.preventDefault();
    const subjectName = document.getElementById('subject-name').value;
    
    if (!subjectName.trim()) {
        showNotification('Введите название предмета', 'error');
        return;
    }
    
    const newId = currentData.subjects.length > 0 
        ? Math.max(...currentData.subjects.map(s => s.id)) + 1 
        : 1;
    
    const newSubject = {
        id: newId,
        name: subjectName,
        teacher_count: 0,
        test_count: 0
    };
    
    currentData.subjects.push(newSubject);
    saveToLocalStorage();
    
    loadSubjectsTable();
    updateStats();
    showNotification(`Предмет "${subjectName}" успешно добавлен`, 'success');
    
    document.getElementById('add-subject-modal').classList.remove('active');
    e.target.reset();
}

function handleAddTeacher(e) {
    e.preventDefault();
    
    const fullName = document.getElementById('teacher-full-name').value;
    const login = document.getElementById('teacher-login').value;
    const password = document.getElementById('teacher-password').value;
    const subjectId = parseInt(document.getElementById('teacher-subject').value);
    
    if (!fullName.trim()) {
        showNotification('Введите ФИО учителя', 'error');
        return;
    }
    if (!login.trim()) {
        showNotification('Введите логин', 'error');
        return;
    }
    
    if (!password.trim()) {
        showNotification('Введите пароль', 'error');
        return;
    }
    
    if (!subjectId) {
        showNotification('Выберите предмет', 'error');
        return;
    }
    
    const subject = currentData.subjects.find(s => s.id === subjectId);
    if (!subject) {
        showNotification('Ошибка: предмет не найден', 'error');
        return;
    }
    
    const newId = currentData.teachers.length > 0 
        ? Math.max(...currentData.teachers.map(t => t.id)) + 1 
        : 1;
    
    const newTeacher = {
        id: newId,
        full_name: fullName,
        login: login,
        password: password,
        subject_id: subjectId,
        subject_name: subject.name
    };
    
    currentData.teachers.push(newTeacher);
    saveToLocalStorage();
    
    loadTeachersTable();
    updateStats();
    showNotification(`Учитель ${fullName} успешно добавлен`, 'success');
    
    document.getElementById('add-teacher-modal').classList.remove('active');
    e.target.reset();
}

function setupSubjectsEventListeners() {
    const addSubjectBtn = document.getElementById('add-subject-btn');
    if (addSubjectBtn) {
        addSubjectBtn.addEventListener('click', function() {
            document.getElementById('add-subject-modal').classList.add('active');
        });
    }
    
    const closeSubjectBtn = document.getElementById('close-subject-modal');
    if (closeSubjectBtn) {
        closeSubjectBtn.addEventListener('click', function() {
            document.getElementById('add-subject-modal').classList.remove('active');
        });
    }
    
    const cancelSubjectBtn = document.getElementById('cancel-subject-btn');
    if (cancelSubjectBtn) {
        cancelSubjectBtn.addEventListener('click', function() {
            document.getElementById('add-subject-modal').classList.remove('active');
            document.getElementById('subject-form').reset();
        });
    }
    
    const subjectForm = document.getElementById('subject-form');
    if (subjectForm) {
        subjectForm.addEventListener('submit', handleAddSubject);
    }
}
function updateStats() {
    const teachersCount = document.getElementById('teachers-count');
    const subjectsCount = document.getElementById('subjects-count');
    const testsCount = document.getElementById('tests-count');
    
    if (teachersCount) teachersCount.textContent = currentData.teachers.length;
    if (subjectsCount) subjectsCount.textContent = currentData.subjects.length;
    if (testsCount) testsCount.textContent = currentData.tests.length;
}

function setupTeachersEventListeners() {
    const addTeacherBtn = document.getElementById('add-teacher-btn');
    if (addTeacherBtn) {
        addTeacherBtn.addEventListener('click', function() {
            document.getElementById('add-teacher-modal').classList.add('active');
        });
    }
    
    const closeTeacherBtn = document.getElementById('close-teacher-modal');
    if (closeTeacherBtn) {
        closeTeacherBtn.addEventListener('click', function() {
            document.getElementById('add-teacher-modal').classList.remove('active');
        });
    }
    
    const cancelTeacherBtn = document.getElementById('cancel-teacher-btn');
    if (cancelTeacherBtn) {
        cancelTeacherBtn.addEventListener('click', function() {
            document.getElementById('add-teacher-modal').classList.remove('active');
            document.getElementById('teacher-form').reset();
        });
    }
    
    const teacherForm = document.getElementById('teacher-form');
    if (teacherForm) {
        teacherForm.addEventListener('submit', handleAddTeacher);
    }
}

function setupDeleteModalListeners() {
    const closeDeleteBtn = document.getElementById('close-delete-modal');
    const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    
    if (closeDeleteBtn) {
        closeDeleteBtn.addEventListener('click', function() {
            document.getElementById('delete-confirm-modal').classList.remove('active');
        });
    }
    
    if (cancelDeleteBtn) {
        cancelDeleteBtn.addEventListener('click', function() {
            document.getElementById('delete-confirm-modal').classList.remove('active');
        });
    }
    
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', confirmDelete);
    }
    
    document.addEventListener('click', function(e) {
        if (e.target.closest('.delete-btn')) {
            e.preventDefault();
            const button = e.target.closest('.delete-btn');
            const type = button.getAttribute('data-type');
            const id = parseInt(button.getAttribute('data-id'));
            const name = button.getAttribute('data-name');
            
            currentDeleteItem = { type, id, name };
            
            let message = '';
            if (type === 'subject') {
                const subject = currentData.subjects.find(s => s.id === id);
                message = `Вы уверены, что хотите удалить предмет "${subject ? subject.name : name}"?`;
            } else if (type === 'teacher') {
                const teacher = currentData.teachers.find(t => t.id === id);
                message = `Вы уверены, что хотите удалить преподавателя "${teacher ? teacher.full_name : name}"?`;
            } else if (type === 'test') {
                const test = currentData.tests.find(t => t.id === id);
                message = `Вы уверены, что хотите удалить тест "${test ? test.name : name}"?`;
            }
            
            document.getElementById('delete-message').textContent = message;
            document.getElementById('delete-confirm-modal').classList.add('active');
        }
    });
}

function initAdminPanel() {
    const currentDateElement = document.getElementById('current-date');
    if (currentDateElement) {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        currentDateElement.textContent = now.toLocaleDateString('ru-RU', options);
    }
    updateStats();
}
function setupTabSwitchers() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            if (target.includes('.html')) {
                window.location.href = target;
            } else if (target.startsWith('#')) {
                const tabId = target.substring(1);
                showOnlyContent(tabId);
                navLinks.forEach(l => l.closest('.nav-item').classList.remove('active'));
                this.closest('.nav-item').classList.add('active');
            }
        });
    });
}

function showOnlyContent(contentId) {
    const allContents = document.querySelectorAll('.content');
    allContents.forEach(content => {
        content.classList.remove('active');
    });
    
    const targetContent = document.getElementById(contentId);
    if (targetContent) {
        targetContent.classList.add('active');
    }
}


let questionCounter = 1;

function handleAddTest(e) {
    e.preventDefault();
    
    const testName = document.getElementById('test-name').value;
    const subjectId = parseInt(document.getElementById('test-subject').value);
    if (!testName.trim()) {
        showNotification('Введите название теста', 'error');
        return;
    }
    
    if (!subjectId) {
        showNotification('Выберите предмет', 'error');
        return;
    }
    const subject = currentData.subjects.find(s => s.id === subjectId);
    if (!subject) {
        showNotification('Ошибка: предмет не найден', 'error');
        return;
    }
    const questions = collectTestQuestions();
    if (questions.length === 0) {
        showNotification('Добавьте хотя бы один вопрос', 'error');
        return;
    }
    const validationResult = validateTestQuestions(questions);
    if (!validationResult.valid) {
        showNotification(validationResult.message, 'error');
        return;
    }
    const newId = currentData.tests.length > 0 
        ? Math.max(...currentData.tests.map(t => t.id)) + 1 
        : 1;
    
    const newTest = {
        id: newId,
        name: testName,
        subject_id: subjectId,
        subject_name: subject.name,
        question_count: questions.length,
        created_date: new Date().toISOString().split('T')[0], 
        questions: questions 
    };
    currentData.tests.push(newTest);
    saveToLocalStorage();
    loadTestsTable();
    updateStats();
    showNotification(`Тест "${testName}" успешно создан`, 'success');
    document.getElementById('add-test-modal').classList.remove('active');
    resetTestForm();
}

function collectTestQuestions() {
    const questions = [];
    const questionItems = document.querySelectorAll('.question-item');
    
    questionItems.forEach(item => {
        const questionId = item.getAttribute('data-question-id');
        const questionText = document.getElementById(`question-text-${questionId}`).value.trim();
        const options = [];
        const optionElements = item.querySelectorAll('.option-item');
        let correctOption = null;
        
        optionElements.forEach((optionEl, index) => {
            const radioBtn = optionEl.querySelector('input[type="radio"]');
            const textInput = optionEl.querySelector('.option-text');
            
            if (radioBtn && textInput) {
                const optionText = textInput.value.trim();
                if (optionText) {
                    options.push({
                        id: index + 1,
                        text: optionText,
                        isCorrect: radioBtn.checked
                    });
                    
                    if (radioBtn.checked) {
                        correctOption = index + 1;
                    }
                }
            }
        });
        if (questionText && options.length >= 2) {
            questions.push({
                id: parseInt(questionId),
                text: questionText,
                options: options,
                correctOption: correctOption
            });
        }
    });
    
    return questions;
}

function validateTestQuestions(questions) {
    for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        if (!question.text || question.text.length < 5) {
            return {
                valid: false,
                message: `Вопрос #${question.id}: текст вопроса должен содержать минимум 5 символов`
            };
        }
        if (question.options.length < 2) {
            return {
                valid: false,
                message: `Вопрос #${question.id}: требуется минимум 2 варианта ответа`
            };
        }
        if (!question.correctOption) {
            return {
                valid: false,
                message: `Вопрос #${question.id}: выберите правильный вариант ответа`
            };
        }
        for (let j = 0; j < question.options.length; j++) {
            const option = question.options[j];
            if (!option.text || option.text.length < 1) {
                return {
                    valid: false,
                    message: `Вопрос #${question.id}, вариант ответа #${j + 1}: введите текст ответа`
                };
            }
        }
    }
    
    return { valid: true };
}

function resetTestForm() {
    document.getElementById('test-form').reset();
    questionCounter = 1;
    const questionsContainer = document.getElementById('questions-container');
    const firstQuestion = questionsContainer.querySelector('.question-item');
    questionsContainer.innerHTML = '<h4>Вопросы теста</h4>';
    if (firstQuestion) {
        firstQuestion.setAttribute('data-question-id', '1');
        firstQuestion.querySelector('.question-text').textContent = 'Вопрос #1';
        firstQuestion.querySelector('#question-text-1').value = '';
        const radioBtns = firstQuestion.querySelectorAll('input[type="radio"]');
        radioBtns.forEach(radio => {
            radio.checked = false;
        });
        const optionInputs = firstQuestion.querySelectorAll('.option-text');
        optionInputs.forEach((input, index) => {
            input.value = '';
            input.placeholder = `Вариант ответа ${index + 1}`;
        });
        const optionItems = firstQuestion.querySelectorAll('.option-item');
        optionItems.forEach((item, index) => {
            if (index >= 2) {
                item.remove();
            }
        });
        
        questionsContainer.appendChild(firstQuestion);
    }
}

function addQuestion() {
    questionCounter++;
    
    const newQuestion = document.createElement('div');
    newQuestion.className = 'question-item';
    newQuestion.setAttribute('data-question-id', questionCounter.toString());
    
    newQuestion.innerHTML = `
        <div class="question-header">
            <div class="question-text">Вопрос #${questionCounter}</div>
            <button type="button" class="btn btn-danger btn-sm remove-question-btn">
                <i class="fas fa-trash"></i> Удалить
            </button>
        </div>
        <div class="form-group">
            <label for="question-text-${questionCounter}">Текст вопроса *</label>
            <input type="text" id="question-text-${questionCounter}" placeholder="Введите вопрос" required>
        </div>
        <div class="options-list">
            <div class="option-item">
                <input type="radio" name="correct-answer-${questionCounter}" value="1" required>
                <input type="text" placeholder="Вариант ответа 1" class="option-text" required>
                <span class="correct-badge">Правильный ответ</span>
            </div>
            <div class="option-item">
                <input type="radio" name="correct-answer-${questionCounter}" value="2" required>
                <input type="text" placeholder="Вариант ответа 2" class="option-text" required>
                <span class="correct-badge">Правильный ответ</span>
            </div>
        </div>
        <button type="button" class="btn btn-sm add-option-btn" data-question-id="${questionCounter}">
            <i class="fas fa-plus"></i> Добавить вариант ответа
        </button>
    `;
    
    document.getElementById('questions-container').appendChild(newQuestion);
}

function addOption(questionId) {
    const questionElement = document.querySelector(`[data-question-id="${questionId}"]`);
    const optionsList = questionElement.querySelector('.options-list');
    const optionCount = optionsList.querySelectorAll('.option-item').length;
    const newOptionNumber = optionCount + 1;
    
    const newOption = document.createElement('div');
    newOption.className = 'option-item';
    
    newOption.innerHTML = `
        <input type="radio" name="correct-answer-${questionId}" value="${newOptionNumber}" required>
        <input type="text" placeholder="Вариант ответа ${newOptionNumber}" class="option-text" required>
        <span class="correct-badge">Правильный ответ</span>
    `;
    
    optionsList.appendChild(newOption);
}

function setupTestsEventListeners() {
    const addTestBtn = document.getElementById('add-test-btn');
    if (addTestBtn) {
        addTestBtn.addEventListener('click', function() {
            document.getElementById('add-test-modal').classList.add('active');
            populateSubjectDropdown('test-subject');
        });
    }
    
    const closeTestBtn = document.getElementById('close-test-modal');
    if (closeTestBtn) {
        closeTestBtn.addEventListener('click', function() {
            document.getElementById('add-test-modal').classList.remove('active');
            resetTestForm();
        });
    }
    
    const cancelTestBtn = document.getElementById('cancel-test-btn');
    if (cancelTestBtn) {
        cancelTestBtn.addEventListener('click', function() {
            document.getElementById('add-test-modal').classList.remove('active');
            resetTestForm();
        });
    }
    
    const addQuestionBtn = document.getElementById('add-question-btn');
    if (addQuestionBtn) {
        addQuestionBtn.addEventListener('click', addQuestion);
    }
    
    const testForm = document.getElementById('test-form');
    if (testForm) {
        testForm.addEventListener('submit', handleAddTest);
    }
    document.addEventListener('click', function(e) {
        if (e.target.closest('.remove-question-btn')) {
            const questionItem = e.target.closest('.question-item');
            const questionCount = document.querySelectorAll('.question-item').length;
            
            if (questionCount > 1) {
                questionItem.remove();
                updateQuestionNumbers();
            } else {
                showNotification('Тест должен содержать хотя бы один вопрос', 'error');
            }
        }
        if (e.target.closest('.add-option-btn')) {
            const button = e.target.closest('.add-option-btn');
            const questionId = button.getAttribute('data-question-id');
            addOption(questionId);
        }
    });
}

function updateQuestionNumbers() {
    const questions = document.querySelectorAll('.question-item');
    questions.forEach((question, index) => {
        const questionNumber = index + 1;
        question.setAttribute('data-question-id', questionNumber.toString());
        question.querySelector('.question-text').textContent = `Вопрос #${questionNumber}`;
        const textInput = question.querySelector('input[type="text"]');
        if (textInput && textInput.id.startsWith('question-text-')) {
            textInput.id = `question-text-${questionNumber}`;
        }
        const radioButtons = question.querySelectorAll('input[type="radio"]');
        radioButtons.forEach((radio, radioIndex) => {
            radio.name = `correct-answer-${questionNumber}`;
            radio.value = (radioIndex + 1).toString();
        });
    });
    questionCounter = questions.length;
}
function initPage() {
    loadFromLocalStorage();
    setupDeleteModalListeners();

    const currentPage = window.location.pathname.split('/').pop() || 'admin.html';
    
    if (currentPage === 'admin.html') {
        initAdminPanel();
        loadTeachersTable();
        loadSubjectsTable();
        loadTestsTable();
        setupSubjectsEventListeners();
        setupTeachersEventListeners();
        setupTestsEventListeners();
        populateSubjectDropdown('teacher-subject');
        populateSubjectDropdown('test-subject');
        showOnlyContent('dashboard');
        setupTabSwitchers();
    } else if (document.getElementById('subjects-content')) {
        loadSubjectsTable();
        setupSubjectsEventListeners();
    } else if (document.getElementById('teachers-content')) {
        loadTeachersTable();
        populateSubjectDropdown('teacher-subject');
        setupTeachersEventListeners();
    } else if (document.getElementById('tests-content')) {
        loadTestsTable();
        populateSubjectDropdown('test-subject');
        setupTestsEventListeners();
        questionCounter = 1; 
    }
}
function getBasePath() {
    if (window.location.hostname.includes('github.io')) {
        const repoName = window.location.pathname.split('/')[1];
        return `/${repoName}/admin/`;
    }
    return '';
}

function fixAdminLinks() {
    const basePath = getBasePath();
    
    // Исправляем ссылки навигации
    document.querySelectorAll('.nav-link[href$=".html"]').forEach(link => {
        const href = link.getAttribute('href');
        link.setAttribute('href', basePath + href);
    });
    
    // Исправляем ссылку "Выйти"
    const logoutLink = document.querySelector('a.btn-danger[href$="index.html"]');
    if (logoutLink) {
        logoutLink.setAttribute('href', `/${repoName}/index.html`);
    }
}

document.addEventListener('DOMContentLoaded', initPage, fixAdminLinks);
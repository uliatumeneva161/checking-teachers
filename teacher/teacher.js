// Данные пользователя (преподавателя)
const currentTeacher = {
    id: 1,
    name: "Петров Иван Сергеевич",
    login: "petrov_is",
    subject: "Математика",
    registrationDate: "15.01.2023"
};

// Тестовые данные (имитация базы данных из админ-панели)
const mockTestsData = [
    {
        id: 1,
        title: "Алгебра. Квадратные уравнения",
        subject: "Математика",
        description: "Тест по основам алгебры и квадратным уравнениям",
        questionsCount: 10,
        timeLimit: 20, 
        teacherId: 1, 
        questions: [
            {
                id: 1,
                text: "Что такое квадратное уравнение?",
                options: [
                    { id: 1, text: "Уравнение первой степени", correct: false },
                    { id: 2, text: "Уравнение вида ax² + bx + c = 0", correct: true },
                    { id: 3, text: "Уравнение с двумя переменными", correct: false },
                    { id: 4, text: "Линейное уравнение", correct: false }
                ]
            },
            {
                id: 2,
                text: "Как называется выражение D = b² - 4ac?",
                options: [
                    { id: 1, text: "Корень уравнения", correct: false },
                    { id: 2, text: "Дискриминант", correct: true },
                    { id: 3, text: "Коэффициент", correct: false },
                    { id: 4, text: "Формула", correct: false }
                ]
            },
            {
                id: 3,
                text: "Сколько корней имеет уравнение, если D > 0?",
                options: [
                    { id: 1, text: "Один корень", correct: false },
                    { id: 2, text: "Два корня", correct: true },
                    { id: 3, text: "Нет корней", correct: false },
                    { id: 4, text: "Бесконечное множество", correct: false }
                ]
            },
            {
                id: 4,
                text: "Какая формула для нахождения корней квадратного уравнения?",
                options: [
                    { id: 1, text: "x = -b ± √D / 2a", correct: true },
                    { id: 2, text: "x = b ± √D / 2a", correct: false },
                    { id: 3, text: "x = -b / 2a", correct: false },
                    { id: 4, text: "x = √D / 2a", correct: false }
                ]
            }
        ]
    },
    {
        id: 2,
        title: "Геометрия. Треугольники",
        subject: "Математика",
        description: "Тест по свойствам треугольников",
        questionsCount: 8,
        timeLimit: 15,
        teacherId: 1,
        questions: [
            {
                id: 1,
                text: "Сколько градусов в сумме углов треугольника?",
                options: [
                    { id: 1, text: "90°", correct: false },
                    { id: 2, text: "180°", correct: true },
                    { id: 3, text: "270°", correct: false },
                    { id: 4, text: "360°", correct: false }
                ]
            },
            {
                id: 2,
                text: "Как называется треугольник с равными сторонами?",
                options: [
                    { id: 1, text: "Прямоугольный", correct: false },
                    { id: 2, text: "Равнобедренный", correct: false },
                    { id: 3, text: "Равносторонний", correct: true },
                    { id: 4, text: "Тупоугольный", correct: false }
                ]
            }
        ]
    },
    {
        id: 3,
        title: "Механика. Законы Ньютона",
        subject: "Физика",
        description: "Тест по основам классической механики",
        questionsCount: 12,
        timeLimit: 25,
        teacherId: 3,
        questions: [
            {
                id: 1,
                text: "Как формулируется первый закон Ньютона?",
                options: [
                    { id: 1, text: "Сила равна массе, умноженной на ускорение", correct: false },
                    { id: 2, text: "Тело сохраняет состояние покоя или равномерного прямолинейного движения", correct: true },
                    { id: 3, text: "Действие равно противодействию", correct: false }
                ]
            }
        ]
    },
    {
        id: 4,
        title: "Русская литература XIX века",
        subject: "Литература",
        description: "Тест по произведениям классиков русской литературы",
        questionsCount: 15,
        timeLimit: 30,
        teacherId: 2,
        questions: [
            {
                id: 1,
                text: "Кто автор романа 'Война и мир'?",
                options: [
                    { id: 1, text: "Ф.М. Достоевский", correct: false },
                    { id: 2, text: "Л.Н. Толстой", correct: true },
                    { id: 3, text: "А.С. Пушкин", correct: false },
                    { id: 4, text: "И.С. Тургенев", correct: false }
                ]
            }
        ]
    },
    {
        id: 5,
        title: "Алгебра. Линейные уравнения",
        subject: "Математика",
        description: "Тест по основам линейных уравнений",
        questionsCount: 10,
        timeLimit: 15,
        teacherId: 1,
        questions: [
            {
                id: 1,
                text: "Что такое линейное уравнение?",
                options: [
                    { id: 1, text: "Уравнение первой степени", correct: true },
                    { id: 2, text: "Уравнение второй степени", correct: false },
                    { id: 3, text: "Уравнение с двумя переменными", correct: false }
                ]
            }
        ]
    },
    {
        id: 6,
        title: "Геометрия. Окружность",
        subject: "Математика",
        description: "Тест по свойствам окружности",
        questionsCount: 12,
        timeLimit: 20,
        teacherId: 1,
        questions: [
            {
                id: 1,
                text: "Как называется отрезок, соединяющий центр окружности с любой точкой на окружности?",
                options: [
                    { id: 1, text: "Диаметр", correct: false },
                    { id: 2, text: "Радиус", correct: true },
                    { id: 3, text: "Хорда", correct: false }
                ]
            }
        ]
    }
];

let mockResultsData = [
    {
        id: 1,
        testId: 1,
        testTitle: "Алгебра. Квадратные уравнения",
        subject: "Математика",
        date: "2023-06-10",
        correctAnswers: 8,
        totalQuestions: 10,
        score: 80,
        timeSpent: "12:30",
        status: "completed"
    },
    {
        id: 2,
        testId: 2,
        testTitle: "Геометрия. Треугольники",
        subject: "Математика",
        date: "2023-06-05",
        correctAnswers: 7,
        totalQuestions: 8,
        score: 87.5,
        timeSpent: "08:45",
        status: "completed"
    }
];

let appState = {
    currentTest: null,
    currentQuestionIndex: 0,
    userAnswers: {},
    testStartTime: null,
    timerInterval: null,
    timeRemaining: 0,
    testCompleted: false,
    currentCategory: 'available'
};

function populateUserData() {
    const teacherName = document.getElementById('teacher-name');
    if (teacherName) {
        teacherName.textContent = currentTeacher.name;
    }
    const teacherSubject = document.getElementById('teacher-subject');
    const dashboardSubject = document.getElementById('dashboard-subject');
    const testsSubject = document.getElementById('tests-subject');
    
    if (teacherSubject) teacherSubject.textContent = currentTeacher.subject;
    if (dashboardSubject) dashboardSubject.textContent = currentTeacher.subject;
    if (testsSubject) testsSubject.textContent = currentTeacher.subject;
    const profileName = document.getElementById('profile-name');
    const profileLogin = document.getElementById('profile-login');
    const profileSubject = document.getElementById('profile-subject');
    const profileDate = document.getElementById('profile-date');
    
    if (profileName) profileName.textContent = currentTeacher.name;
    if (profileLogin) profileLogin.textContent = currentTeacher.login;
    if (profileSubject) profileSubject.textContent = currentTeacher.subject;
    if (profileDate) profileDate.textContent = currentTeacher.registrationDate;
    const welcomeName = document.getElementById('welcome-name');
    if (welcomeName) {
        const firstName = currentTeacher.name.split(' ')[1];
        welcomeName.textContent = firstName;
    }
}
function getTestsByTeacherSubject() {
    return mockTestsData.filter(test => 
        test.subject === currentTeacher.subject && test.teacherId === currentTeacher.id
    );
}

function updateStatistics() {
    const teacherTests = getTestsByTeacherSubject();
    const availableTests = teacherTests.length;
    const completedTests = mockResultsData.filter(result => 
        result.subject === currentTeacher.subject
    ).length;
    const teacherResults = mockResultsData.filter(result => 
        result.subject === currentTeacher.subject
    );
    
    const avgScore = teacherResults.length > 0 
        ? Math.round(teacherResults.reduce((sum, result) => sum + result.score, 0) / teacherResults.length)
        : 0;
    const availableTestsEl = document.getElementById('available-tests');
    const completedTestsEl = document.getElementById('completed-tests');
    const averageScoreEl = document.getElementById('average-score');
    
    if (availableTestsEl) availableTestsEl.textContent = availableTests;
    if (completedTestsEl) completedTestsEl.textContent = completedTests;
    if (averageScoreEl) averageScoreEl.textContent = avgScore + '%';
    const totalTestsEl = document.getElementById('total-tests');
    const passedTestsEl = document.getElementById('passed-tests');
    const bestResultEl = document.getElementById('best-result');
    const avgTimeEl = document.getElementById('avg-time');
    
    if (totalTestsEl) totalTestsEl.textContent = availableTests;
    if (passedTestsEl) passedTestsEl.textContent = completedTests;
    
    const bestResult = teacherResults.length > 0
        ? Math.max(...teacherResults.map(r => r.score))
        : 0;
    if (bestResultEl) bestResultEl.textContent = bestResult + '%';
    const avgTime = teacherResults.length > 0
        ? Math.round(teacherResults.reduce((sum, result) => {
            const [min, sec] = result.timeSpent.split(':').map(Number);
            return sum + min + sec/60;
        }, 0) / teacherResults.length)
        : 0;
    if (avgTimeEl) avgTimeEl.textContent = avgTime + ' мин';
}
function loadAvailableTests() {
    const teacherTests = getTestsByTeacherSubject();
    const availableGrid = document.getElementById('tests-available-grid');
    const completedGrid = document.getElementById('tests-completed-grid');
    const allGrid = document.getElementById('tests-all-grid');
    
    if (availableGrid) availableGrid.innerHTML = '';
    if (completedGrid) completedGrid.innerHTML = '';
    if (allGrid) allGrid.innerHTML = '';
    
    if (teacherTests.length === 0) {
        showNoTestsMessage();
        return;
    }
    teacherTests.forEach(test => {
        const isCompleted = mockResultsData.some(result => result.testId === test.id);
        const testCard = createTestCard(test, isCompleted);
        if (availableGrid && !isCompleted) {
            availableGrid.appendChild(testCard.cloneNode(true));
        }
        
        if (completedGrid && isCompleted) {
            completedGrid.appendChild(testCard.cloneNode(true));
        }
        if (allGrid) {
            allGrid.appendChild(testCard);
        }
    });
    checkEmptyCategories();
}

function createTestCard(test, isCompleted) {
    const testCard = document.createElement('div');
    testCard.className = `test-card ${isCompleted ? 'completed' : 'available'}`;
    testCard.dataset.testId = test.id;
    
    testCard.innerHTML = `
        <div class="test-card-header">
            <h4>${test.title}</h4>
            <span class="test-status ${isCompleted ? 'completed' : 'available'}">
                ${isCompleted ? 'Пройден' : 'Доступен'}
            </span>
        </div>
        <div class="test-card-body">
            <p class="test-subject">
                <i class="fas fa-book"></i> ${test.subject}
            </p>
            <p class="test-description">${test.description}</p>
            <div class="test-meta">
                <span><i class="fas fa-question-circle"></i> ${test.questionsCount} вопросов</span>
                <span><i class="fas fa-clock"></i> ${test.timeLimit} минут</span>
            </div>
        </div>
        <div class="test-card-footer">
            ${isCompleted ? 
                `<button class="btn-view-result" data-test-id="${test.id}">
                    <i class="fas fa-chart-bar"></i> Результат
                </button>` : 
                `<button class="btn-start-test" data-test-id="${test.id}">
                    <i class="fas fa-play"></i> Начать тест
                </button>`
            }
        </div>
    `;
    
    return testCard;
}

function showNoTestsMessage() {
    const message = `
        <div class="no-tests-message">
            <i class="fas fa-clipboard-list"></i>
            <h3>Нет доступных тестов</h3>
            <p>Администратор еще не создал тесты по предмету "${currentTeacher.subject}"</p>
        </div>
    `;
    
    const availableGrid = document.getElementById('tests-available-grid');
    const completedGrid = document.getElementById('tests-completed-grid');
    const allGrid = document.getElementById('tests-all-grid');
    
    if (availableGrid) availableGrid.innerHTML = message;
    if (completedGrid) completedGrid.innerHTML = message;
    if (allGrid) allGrid.innerHTML = message;
}
function checkEmptyCategories() {
    const categories = ['available', 'completed', 'all'];
    
    categories.forEach(category => {
        const grid = document.getElementById(`tests-${category}-grid`);
        if (grid && grid.children.length === 0) {
            grid.innerHTML = `
                <div class="no-tests-message">
                    <i class="fas fa-inbox"></i>
                    <p>В этой категории пока нет тестов</p>
                </div>
            `;
        }
    });
}
function loadResultsHistory() {
    const resultsTable = document.getElementById('results-table-body');
    if (!resultsTable) return;
    
    resultsTable.innerHTML = '';
    const teacherResults = mockResultsData.filter(result => 
        result.subject === currentTeacher.subject
    );
    
    if (teacherResults.length === 0) {
        resultsTable.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 40px;">
                    <i class="fas fa-chart-bar" style="font-size: 48px; color: #e9ecef; margin-bottom: 15px; display: block;"></i>
                    <p style="color: #6c757d;">Вы еще не проходили тесты по предмету "${currentTeacher.subject}"</p>
                </td>
            </tr>
        `;
        return;
    }
    
    teacherResults.forEach(result => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${result.testTitle}</td>
            <td>${result.subject}</td>
            <td>${formatDate(result.date)}</td>
            <td>${result.correctAnswers}/${result.totalQuestions}</td>
            <td>
                <span class="score-badge" style="background-color: ${getScoreColor(result.score)}">
                    ${result.score}%
                </span>
            </td>
            <td>
                <span class="status-badge status-completed">Завершен</span>
            </td>
            <td>
                <button class="btn-view-details" data-result-id="${result.id}">
                    <i class="fas fa-eye"></i> Подробнее
                </button>
            </td>
        `;
        
        resultsTable.appendChild(row);
    });
}
function loadRecentTests() {
    const recentTestsList = document.getElementById('recent-tests-list');
    if (!recentTestsList) return;
    
    recentTestsList.innerHTML = '';
    const teacherTests = getTestsByTeacherSubject();
    const recentTests = teacherTests.slice(0, 3);
    
    if (recentTests.length === 0) {
        recentTestsList.innerHTML = `
            <div class="no-tests-message" style="padding: 20px;">
                <i class="fas fa-clipboard-list"></i>
                <p>Нет тестов по предмету "${currentTeacher.subject}"</p>
            </div>
        `;
        return;
    }
    
    recentTests.forEach(test => {
        const isCompleted = mockResultsData.some(result => result.testId === test.id);
        
        const testItem = document.createElement('div');
        testItem.className = 'recent-test-item';
        
        testItem.innerHTML = `
            <div class="recent-test-info">
                <h4>${test.title}</h4>
                <p><i class="fas fa-book"></i> ${test.subject}</p>
            </div>
            <div class="recent-test-actions">
                ${isCompleted ? 
                    `<span class="completed-badge">Пройден</span>` : 
                    `<button class="btn-take-test" data-test-id="${test.id}">
                        Пройти
                    </button>`
                }
            </div>
        `;
        
        recentTestsList.appendChild(testItem);
    });
}

function startTest(testId) {
    const test = mockTestsData.find(t => t.id === testId);
    if (!test) {
        showNotification('Тест не найден', 'error');
        return;
    }
    
    if (test.subject !== currentTeacher.subject) {
        showNotification('Этот тест не по вашему предмету', 'error');
        return;
    }
    
    appState.currentTest = test;
    appState.currentQuestionIndex = 0;
    appState.userAnswers = {};
    appState.testStartTime = new Date();
    appState.timeRemaining = test.timeLimit * 60;
    appState.testCompleted = false;
    saveState();
    showTestModal(test);
}
function showTestModal(test) {
    const modal = document.getElementById('test-modal');
    const title = document.getElementById('test-modal-title');
    const subject = document.getElementById('test-subject-name');
    const questionsCount = document.getElementById('test-questions-count');
    const timeLimit = document.getElementById('test-time-limit');
    const description = document.getElementById('test-description');
    
    if (modal && title && subject && questionsCount && timeLimit && description) {
        title.textContent = test.title;
        subject.textContent = test.subject;
        questionsCount.textContent = `${test.questionsCount} вопросов`;
        timeLimit.textContent = `${test.timeLimit} минут`;
        description.textContent = test.description;
        document.getElementById('test-start-section').style.display = 'block';
        document.getElementById('test-questions-section').style.display = 'none';
        document.getElementById('test-results-section').style.display = 'none';
        
        modal.classList.add('active');
    }
}

function beginTest() {
    document.getElementById('test-start-section').style.display = 'none';
    document.getElementById('test-questions-section').style.display = 'block';
    startTimer();
    loadQuestion(appState.currentQuestionIndex);
}

function loadQuestion(questionIndex) {
    if (!appState.currentTest || !appState.currentTest.questions[questionIndex]) {
        return;
    }    
    const question = appState.currentTest.questions[questionIndex];
    const questionText = document.getElementById('question-text');
    const optionsList = document.getElementById('options-list');
    const currentQuestion = document.getElementById('current-question');
    const totalQuestions = document.getElementById('total-questions');
    const progressFill = document.getElementById('progress-fill');
    if (questionText) {
        questionText.textContent = question.text;
    }
    if (currentQuestion) {
        currentQuestion.textContent = questionIndex + 1;
    }
    
    if (totalQuestions) {
        totalQuestions.textContent = appState.currentTest.questions.length;
    }
    if (progressFill) {
        const progress = ((questionIndex + 1) / appState.currentTest.questions.length) * 100;
        progressFill.style.width = `${progress}%`;
    }
    if (optionsList) {
        optionsList.innerHTML = '';
        
        question.options.forEach(option => {
            const optionItem = document.createElement('div');
            optionItem.className = 'option-item';
            const isSelected = appState.userAnswers[question.id] === option.id;
            
            optionItem.innerHTML = `
                <input type="radio" 
                       name="question-${question.id}" 
                       id="option-${question.id}-${option.id}" 
                       value="${option.id}"
                       ${isSelected ? 'checked' : ''}>
                <label for="option-${question.id}-${option.id}">
                    ${option.text}
                </label>
            `;
            const radioInput = optionItem.querySelector('input');
            radioInput.addEventListener('change', function() {
                saveAnswer(question.id, option.id);
            });
            
            optionsList.appendChild(optionItem);
        });
    }
    updateNavigationButtons();
}
function saveAnswer(questionId, optionId) {
    appState.userAnswers[questionId] = optionId;
    saveState();
}
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-question-btn');
    const nextBtn = document.getElementById('next-question-btn');
    const skipBtn = document.getElementById('skip-question-btn');
    const completeBtn = document.getElementById('complete-test-btn');
    
    if (!prevBtn || !nextBtn || !skipBtn || !completeBtn) return;
    
    const totalQuestions = appState.currentTest.questions.length;
    const isLastQuestion = appState.currentQuestionIndex === totalQuestions - 1;
    
    prevBtn.disabled = appState.currentQuestionIndex === 0;
    skipBtn.style.display = !isLastQuestion ? 'inline-flex' : 'none';
    
    if (isLastQuestion) {
        nextBtn.style.display = 'none';
        completeBtn.style.display = 'inline-flex';
    } else {
        nextBtn.style.display = 'inline-flex';
        completeBtn.style.display = 'none';
    }
}
function nextQuestion() {
    if (appState.currentQuestionIndex < appState.currentTest.questions.length - 1) {
        appState.currentQuestionIndex++;
        loadQuestion(appState.currentQuestionIndex);
    }
}
function prevQuestion() {
    if (appState.currentQuestionIndex > 0) {
        appState.currentQuestionIndex--;
        loadQuestion(appState.currentQuestionIndex);
    }
}

function skipQuestion() {
    const questionId = appState.currentTest.questions[appState.currentQuestionIndex].id;
    appState.userAnswers[questionId] = null;
    nextQuestion();
}

function completeTest() {
    stopTimer();
    calculateResults();
    showTestResults();
    appState.testCompleted = true;
    saveState();
}
function calculateResults() {
    if (!appState.currentTest) return;
    
    const results = {
        correctAnswers: 0,
        wrongAnswers: 0,
        skippedQuestions: 0,
        totalQuestions: appState.currentTest.questions.length,
        userAnswers: appState.userAnswers
    };
    
    appState.currentTest.questions.forEach(question => {
        const userAnswerId = appState.userAnswers[question.id];
        
        if (userAnswerId === null || userAnswerId === undefined) {
            results.skippedQuestions++;
        } else {
            const selectedOption = question.options.find(opt => opt.id === userAnswerId);
            if (selectedOption && selectedOption.correct) {
                results.correctAnswers++;
            } else {
                results.wrongAnswers++;
            }
        }
    });
    
    results.score = Math.round((results.correctAnswers / results.totalQuestions) * 100);
    const endTime = new Date();
    const timeDiff = (endTime - appState.testStartTime) / 1000;
    const minutes = Math.floor(timeDiff / 60);
    const seconds = Math.floor(timeDiff % 60);
    results.timeSpent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    appState.testResults = results;
    const newResult = {
        id: mockResultsData.length + 1,
        testId: appState.currentTest.id,
        testTitle: appState.currentTest.title,
        subject: appState.currentTest.subject,
        date: new Date().toISOString().split('T')[0],
        correctAnswers: results.correctAnswers,
        totalQuestions: results.totalQuestions,
        score: results.score,
        timeSpent: results.timeSpent,
        status: "completed"
    };
    
    mockResultsData.unshift(newResult);
    updateStatistics();
    loadResultsHistory();
    loadRecentTests();
    loadAvailableTests();
}
function showTestResults() {
    if (!appState.testResults) return;
    
    const resultsSection = document.getElementById('test-results-section');
    const questionsSection = document.getElementById('test-questions-section');
    
    if (resultsSection && questionsSection) {
        questionsSection.style.display = 'none';
        resultsSection.style.display = 'block';
        document.getElementById('final-score').textContent = appState.testResults.score;
        document.getElementById('correct-answers').textContent = appState.testResults.correctAnswers;
        document.getElementById('wrong-answers').textContent = appState.testResults.wrongAnswers;
        document.getElementById('skipped-questions').textContent = appState.testResults.skippedQuestions;
        document.getElementById('time-spent').textContent = appState.testResults.timeSpent;
    }
}
function startTimer() {
    const timerElement = document.getElementById('timer');
    if (!timerElement) return;
    updateTimerDisplay();
    appState.timerInterval = setInterval(() => {
        appState.timeRemaining--;
        updateTimerDisplay();
        if (appState.timeRemaining <= 0) {
            timeExpired();
        }
        saveState();
    }, 1000);
}
function updateTimerDisplay() {
    const timerElement = document.getElementById('timer');
    if (!timerElement) return;
    
    const minutes = Math.floor(appState.timeRemaining / 60);
    const seconds = appState.timeRemaining % 60;
    if (appState.timeRemaining < 60) { 
        timerElement.style.color = '#f72585';
    } else if (appState.timeRemaining < 300) {
        timerElement.style.color = '#f8961e';
    } else {
        timerElement.style.color = '';
    }
    
    timerElement.textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
function stopTimer() {
    if (appState.timerInterval) {
        clearInterval(appState.timerInterval);
        appState.timerInterval = null;
    }
}
function timeExpired() {
    stopTimer();
    completeTest();
    showNotification('Время вышло! Тест автоматически завершен.', 'warning');
}
function showAnswersReview() {
    if (!appState.currentTest || !appState.testResults) return;
    
    const reviewQuestions = document.getElementById('review-questions');
    if (!reviewQuestions) return;
    
    reviewQuestions.innerHTML = '';
    
    appState.currentTest.questions.forEach((question, index) => {
        const userAnswerId = appState.userAnswers[question.id];
        const correctOption = question.options.find(opt => opt.correct);
        const userOption = question.options.find(opt => opt.id === userAnswerId);
        
        const isCorrect = correctOption && userOption && correctOption.id === userOption.id;
        const isSkipped = userAnswerId === null || userAnswerId === undefined;
        
        const questionElement = document.createElement('div');
        questionElement.className = `review-question ${isCorrect ? 'correct' : isSkipped ? 'skipped' : 'wrong'}`;
        
        questionElement.innerHTML = `
            <div class="review-question-header">
                <h5>Вопрос ${index + 1}: ${question.text}</h5>
                <span class="review-status">
                    ${isCorrect ? '✓ Правильно' : isSkipped ? '↷ Пропущено' : '✗ Неправильно'}
                </span>
            </div>
            <div class="review-options">
                ${question.options.map(option => {
                    let className = 'review-option';
                    if (option.correct) className += ' correct-option';
                    if (option.id === userAnswerId) className += ' user-answer';
                    
                    return `
                        <div class="${className}">
                            <span class="option-marker">${option.id}.</span>
                            <span class="option-text">${option.text}</span>
                            ${option.correct ? '<span class="correct-marker">✓</span>' : ''}
                            ${option.id === userAnswerId && !option.correct ? '<span class="wrong-marker">✗</span>' : ''}
                        </div>
                    `;
                }).join('')}
            </div>
            ${!isCorrect && !isSkipped ? `
                <div class="review-explanation">
                    <strong>Правильный ответ:</strong> ${correctOption ? correctOption.text : 'Не указан'}
                </div>
            ` : ''}
        `;
        
        reviewQuestions.appendChild(questionElement);
    });
    document.getElementById('review-modal').classList.add('active');
}
function switchCategory(categoryId) {
    appState.currentCategory = categoryId;
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.category === categoryId) {
            tab.classList.add('active');
        }
    });
    document.querySelectorAll('.category-content').forEach(content => {
        content.classList.remove('active');
        if (content.id === `category-${categoryId}`) {
            content.classList.add('active');
        }
    });
}

function formatDate(dateString) {
    if (!dateString) return 'Не указана';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? dateString : date.toLocaleDateString('ru-RU');
}

function getScoreColor(score) {
    if (score >= 90) return '#4cc9f0'; // Отлично
    if (score >= 70) return '#89a373'; // Хорошо
    if (score >= 50) return '#f8961e'; // Удовлетворительно
    return '#d37e85'; // Неудовлетворительно
}


function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    const styles = `
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
        background-color: ${type === 'success' ? '#4cc9f0' : 
                         type === 'error' ? '#f72585' : 
                         type === 'warning' ? '#f8961e' : '#4361ee'};
    `;
    
    notification.style.cssText = styles;
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

function saveState() {
    try {
        const stateToSave = {
            currentTest: appState.currentTest ? {
                id: appState.currentTest.id,
                title: appState.currentTest.title
            } : null,
            currentQuestionIndex: appState.currentQuestionIndex,
            userAnswers: appState.userAnswers,
            timeRemaining: appState.timeRemaining,
            testCompleted: appState.testCompleted,
            currentCategory: appState.currentCategory
        };
        
        localStorage.setItem('teacherCabinetState', JSON.stringify(stateToSave));
    } catch (error) {
        console.error('Ошибка сохранения состояния:', error);
    }
}

function showConfirmModal(message, onConfirm, onCancel) {
    const modal = document.getElementById('confirm-modal');
    const messageElement = document.getElementById('confirm-message');
    const cancelBtn = document.getElementById('cancel-confirm-btn');
    const okBtn = document.getElementById('ok-confirm-btn');
    
    if (modal && messageElement && cancelBtn && okBtn) {
        messageElement.textContent = message;
        modal.classList.add('active');
        
        const handleCancel = () => {
            modal.classList.remove('active');
            if (onCancel) onCancel();
            cleanup();
        };
        
        const handleOk = () => {
            modal.classList.remove('active');
            if (onConfirm) onConfirm();
            cleanup();
        };
        
        const handleClose = () => {
            modal.classList.remove('active');
            if (onCancel) onCancel();
            cleanup();
        };
        
        const cleanup = () => {
            cancelBtn.removeEventListener('click', handleCancel);
            okBtn.removeEventListener('click', handleOk);
            document.getElementById('close-confirm-modal').removeEventListener('click', handleClose);
        };
        
        cancelBtn.addEventListener('click', handleCancel);
        okBtn.addEventListener('click', handleOk);
        document.getElementById('close-confirm-modal').addEventListener('click', handleClose);
    }
}

function viewTestResult(testId) {
    const result = mockResultsData.find(r => r.testId === testId);
    if (!result) {
        showNotification('Результат теста не найден', 'error');
        return;
    }
    alert(`Результат теста "${result.testTitle}":
    
Правильных ответов: ${result.correctAnswers}/${result.totalQuestions}
Результат: ${result.score}%
Затраченное время: ${result.timeSpent}
Дата прохождения: ${formatDate(result.date)}`);
}

function viewResultDetails(resultId) {
    const result = mockResultsData.find(r => r.id === resultId);
    if (!result) {
        showNotification('Результат не найден', 'error');
        return;
    }
    
    showConfirmModal(
        `Показать детали результата теста "${result.testTitle}"?`,
        () => {
            const test = mockTestsData.find(t => t.id === result.testId);
            if (test) {
                alert(`Детали результата:
                
Тест: ${result.testTitle}
Предмет: ${result.subject}
Дата: ${formatDate(result.date)}
Результат: ${result.score}% (${result.correctAnswers}/${result.totalQuestions})
Время: ${result.timeSpent}

Нажмите "Просмотр ответов" в окне теста для детального разбора.`);
            }
        }
    );
}
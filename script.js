// Multiple Transformations Practice
// Compositions and Sequences of Transformations

// State management
let currentPhase = 1;
let exercisesCompleted = 0;
let independentScore = 0;
let independentAnswered = 0;
const totalIndependent = 20;

// Correct answers for independent practice
const independentAnswers = {
    1: 'correct',  // (2,5) → (-1,5) → (-1,-5)
    2: 'correct',  // (-3,4) → (3,-4) → (3,-2)
    3: 'correct',  // Two perpendicular reflections = 180° rotation
    4: 'correct',  // (0,3) → (-3,0) → (3,0)
    5: 'correct',  // Yes, order matters
    6: 'correct',  // (4,-2) → (-2,4) → (-1,4)
    7: 'correct',  // Translation + Reflection
    8: 'correct',  // Two 90° CW = 180°, so (1,1) → (-1,-1)
    9: 'correct',  // 2 × 4 = 8 units
    10: 'correct', // (-2,3) → (-2,-3) → (2,-4)
    11: 'correct', // (5,-1) → (5,-3) → (3,5)
    12: 'correct', // S, then R, then T (read right to left)
    13: 'correct', // (2,6) → (6,2) → (6,-2)
    14: 'correct', // 2 × 45° = 90° rotation
    15: 'correct', // (-1,4) → (4,1) → (7,-1)
    16: 'correct', // Yes, translations are commutative
    17: 'correct', // (3,0) → (0,-3) → (-3,0)
    18: 'correct', // y-axis then 180° = x-axis reflection
    19: 'correct', // 90° CW then 90° CCW cancel out
    20: 'correct'  // (0,3) → (2,3) → (2,-3)
};

// Problem descriptions for print results
const problemDescriptions = {
    1: "A(2,5) translated 3 left, then reflected over x-axis",
    2: "B(-3,4) rotated 180°, then translated 2 up",
    3: "Single transformation equivalent to reflect x then y",
    4: "C(0,3) rotated 90° CCW, then reflected over y-axis",
    5: "Does order matter: Translation then Rotation?",
    6: "D(4,-2) reflected over y=x, then translated 1 right",
    7: "What two transformations make a glide reflection?",
    8: "E(1,1) rotated 90° CW twice",
    9: "Distance moved after two reflections over parallel lines 4 apart",
    10: "F(-2,3) reflected over x-axis, then translated (4,-1)",
    11: "G(5,-1) translated 2 down, then rotated 90° CCW",
    12: "Order of transformations in notation T ∘ R ∘ S",
    13: "H(2,6) reflected over y=x, then reflected over x-axis",
    14: "Rotation produced by two reflections over lines at 45°",
    15: "J(-1,4) rotated 270° CCW, then translated (3,-2)",
    16: "Are two translations commutative?",
    17: "K(3,0) reflected over y=-x, then rotated 90° CW",
    18: "Single transformation equivalent to y-axis reflection then 180° rotation",
    19: "L(1,-3) rotated 90° CW, then rotated 90° CCW",
    20: "R(0,3) after glide reflection: translate 2 right, reflect over x-axis"
};

// Answer labels for printing
const answerLabels = {
    1: { correct: '(-1, -5)', wrong1: '(5, -5)', wrong2: '(-1, 5)' },
    2: { wrong1: '(3, 4)', correct: '(3, -2)', wrong2: '(-3, -6)' },
    3: { wrong1: 'Reflection over y = x', correct: 'Rotation 180°', wrong2: 'Translation' },
    4: { wrong1: '(-3, 0)', wrong2: '(0, -3)', correct: '(3, 0)' },
    5: { correct: 'Yes, order matters', wrong1: 'No, same result' },
    6: { wrong1: '(-2, 5)', correct: '(-1, 4)', wrong2: '(5, -2)' },
    7: { wrong1: 'Rotation + Dilation', correct: 'Translation + Reflection', wrong2: 'Two rotations' },
    8: { correct: '(-1, -1)', wrong1: '(1, 1)', wrong2: '(-1, 1)' },
    9: { wrong1: '4 units', correct: '8 units', wrong2: '2 units' },
    10: { wrong1: '(-6, 2)', wrong2: '(2, 2)', correct: '(2, -4)' },
    11: { correct: '(3, 5)', wrong1: '(-3, 5)', wrong2: '(5, 3)' },
    12: { wrong1: 'T, then R, then S', correct: 'S, then R, then T', wrong2: 'R, then S, then T' },
    13: { wrong1: '(2, -6)', correct: '(6, -2)', wrong2: '(-6, 2)' },
    14: { wrong1: '45° rotation', correct: '90° rotation', wrong2: '180° rotation' },
    15: { correct: '(7, -1)', wrong1: '(1, 2)', wrong2: '(-4, 1)' },
    16: { correct: 'Yes, always the same result', wrong1: 'No, order matters' },
    17: { wrong1: '(0, 3)', correct: '(-3, 0)', wrong2: '(3, 0)' },
    18: { correct: 'Reflect over x-axis', wrong1: 'Reflect over y = x', wrong2: 'Rotate 90°' },
    19: { wrong1: '(-1, 3)', wrong2: '(-3, -1)', correct: '(1, -3)' },
    20: { wrong1: '(2, 3)', correct: '(2, -3)', wrong2: '(-2, -3)' }
};

// Track student answers for printing
let studentAnswers = {};

// Track which independent problems have been answered
let answeredProblems = {};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateProgress();
});

// Navigation functions
function nextPhase() {
    if (currentPhase < 5) {
        document.getElementById(`phase${currentPhase}`).classList.remove('active');
        document.querySelector(`.phase-dot[data-phase="${currentPhase}"]`).classList.remove('active');
        document.querySelector(`.phase-dot[data-phase="${currentPhase}"]`).classList.add('completed');

        currentPhase++;

        document.getElementById(`phase${currentPhase}`).classList.add('active');
        document.querySelector(`.phase-dot[data-phase="${currentPhase}"]`).classList.add('active');

        updateProgress();
        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (currentPhase === 5) {
            updateFinalScores();
        }
    }
}

function prevPhase() {
    if (currentPhase > 1) {
        document.getElementById(`phase${currentPhase}`).classList.remove('active');
        document.querySelector(`.phase-dot[data-phase="${currentPhase}"]`).classList.remove('active');

        currentPhase--;

        document.getElementById(`phase${currentPhase}`).classList.add('active');
        document.querySelector(`.phase-dot[data-phase="${currentPhase}"]`).classList.add('active');

        updateProgress();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function updateProgress() {
    const progress = ((currentPhase - 1) / 4) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
    document.getElementById('progressText').textContent = `${Math.round(progress)}%`;
}

// ========== Exercise 1: Translation then Reflection ==========
function checkStep1Ex1(answer) {
    const result = document.getElementById('ex1-result1');
    const step1 = document.getElementById('ex1-step1');
    const step2 = document.getElementById('ex1-step2');

    step1.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = true);

    if (answer === 'correct') {
        result.textContent = 'Correct! (2+4, 3) = (6, 3)';
        result.className = 'result-badge correct';
        step1.classList.add('completed');
        step1.classList.remove('active');
        step2.classList.remove('hidden');
        step2.classList.add('visible', 'active');
    } else {
        result.textContent = 'Translate right means add to x: 2+4 = 6';
        result.className = 'result-badge incorrect';
        step1.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = false);
    }
}

function checkStep2Ex1(answer) {
    const result = document.getElementById('ex1-result2');
    const step2 = document.getElementById('ex1-step2');
    const step3 = document.getElementById('ex1-step3');

    step2.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = true);

    if (answer === 'correct') {
        result.textContent = 'Correct! Reflect over x-axis: (6, 3) → (6, -3)';
        result.className = 'result-badge correct';
        step2.classList.add('completed');
        step2.classList.remove('active');
        step3.classList.remove('hidden');
        step3.classList.add('visible', 'active');
    } else {
        result.textContent = 'Reflect over x-axis means negate y only!';
        result.className = 'result-badge incorrect';
        step2.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = false);
    }
}

// ========== Exercise 2: Rotation then Translation ==========
function checkStep1Ex2(answer) {
    const result = document.getElementById('ex2-result1');
    const step1 = document.getElementById('ex2-step1');
    const step2 = document.getElementById('ex2-step2');

    step1.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = true);

    if (answer === 'correct') {
        result.textContent = 'Correct! (4,0) → (-0, 4) = (0, 4)';
        result.className = 'result-badge correct';
        step1.classList.add('completed');
        step1.classList.remove('active');
        step2.classList.remove('hidden');
        step2.classList.add('visible', 'active');
    } else {
        result.textContent = '90° CCW: (x,y) → (-y, x), so (4,0) → (0, 4)';
        result.className = 'result-badge incorrect';
        step1.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = false);
    }
}

function checkStep2Ex2(answer) {
    const result = document.getElementById('ex2-result2');
    const step2 = document.getElementById('ex2-step2');
    const step3 = document.getElementById('ex2-step3');

    step2.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = true);

    if (answer === 'correct') {
        result.textContent = 'Correct! (0, 4+2) = (0, 6)';
        result.className = 'result-badge correct';
        step2.classList.add('completed');
        step2.classList.remove('active');
        step3.classList.remove('hidden');
        step3.classList.add('visible', 'active');
    } else {
        result.textContent = 'Translate up 2: add 2 to y coordinate';
        result.className = 'result-badge incorrect';
        step2.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = false);
    }
}

// ========== Exercise 3: Double Reflection ==========
function checkStep1Ex3(answer) {
    const result = document.getElementById('ex3-result1');
    const step1 = document.getElementById('ex3-step1');
    const step2 = document.getElementById('ex3-step2');

    step1.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = true);

    if (answer === 'correct') {
        result.textContent = 'Correct! Over y-axis: negate x only';
        result.className = 'result-badge correct';
        step1.classList.add('completed');
        step1.classList.remove('active');
        step2.classList.remove('hidden');
        step2.classList.add('visible', 'active');
    } else {
        result.textContent = 'Reflect over y-axis: (x,y) → (-x, y)';
        result.className = 'result-badge incorrect';
        step1.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = false);
    }
}

function checkStep2Ex3(answer) {
    const result = document.getElementById('ex3-result2');
    const step2 = document.getElementById('ex3-step2');
    const step3 = document.getElementById('ex3-step3');

    step2.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = true);

    if (answer === 'correct') {
        result.textContent = 'Correct! (1,2) → (-1,-2) is 180° rotation!';
        result.className = 'result-badge correct';
        step2.classList.add('completed');
        step2.classList.remove('active');
        step3.classList.remove('hidden');
        step3.classList.add('visible', 'active');
    } else {
        result.textContent = 'Both coordinates negated = 180° rotation';
        result.className = 'result-badge incorrect';
        step2.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = false);
    }
}

// ========== Exercise 4: Triangle Transformation ==========
function checkStep1Ex4(answer) {
    const result = document.getElementById('ex4-result1');
    const step1 = document.getElementById('ex4-step1');
    const step2 = document.getElementById('ex4-step2');

    step1.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = true);

    if (answer === 'correct') {
        result.textContent = 'Correct! (3, 0) → (-3, 0)';
        result.className = 'result-badge correct';
        step1.classList.add('completed');
        step1.classList.remove('active');
        step2.classList.remove('hidden');
        step2.classList.add('visible', 'active');
    } else {
        result.textContent = 'Over y-axis: negate x, keep y';
        result.className = 'result-badge incorrect';
        step1.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = false);
    }
}

function checkStep2Ex4(answer) {
    const result = document.getElementById('ex4-result2');
    const step2 = document.getElementById('ex4-step2');
    const step3 = document.getElementById('ex4-step3');

    step2.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = true);

    if (answer === 'correct') {
        result.textContent = 'Correct! (-3 + 5, 0) = (2, 0)';
        result.className = 'result-badge correct';
        step2.classList.add('completed');
        step2.classList.remove('active');
        step3.classList.remove('hidden');
        step3.classList.add('visible', 'active');
    } else {
        result.textContent = 'Translate 5 right: -3 + 5 = 2';
        result.className = 'result-badge incorrect';
        step2.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = false);
    }
}

// Complete exercise and move to next
function completeExercise(exerciseNum) {
    exercisesCompleted++;

    if (exerciseNum < 4) {
        document.getElementById(`exercise${exerciseNum}`).style.display = 'none';
        document.getElementById(`exercise${exerciseNum + 1}`).style.display = 'block';
    } else {
        document.getElementById('phase3Next').disabled = false;
    }
}

// ========== Independent Practice ==========
function checkIndependent(problemNum, answer) {
    if (answeredProblems[problemNum]) return;
    answeredProblems[problemNum] = true;

    const result = document.getElementById(`ind${problemNum}-result`);
    const correctAnswer = independentAnswers[problemNum];

    const problemDiv = result.closest('.independent-problem');
    problemDiv.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = true);

    studentAnswers[problemNum] = {
        answer: answerLabels[problemNum][answer],
        correct: answer === correctAnswer,
        correctAnswer: answerLabels[problemNum][correctAnswer]
    };

    if (answer === correctAnswer) {
        result.textContent = '✓ Correct!';
        result.style.color = '#16a34a';
        independentScore++;
    } else {
        result.textContent = '✗ Correct answer: ' + answerLabels[problemNum][correctAnswer];
        result.style.color = '#dc2626';
    }

    independentAnswered++;
    document.getElementById('independentScore').textContent = independentScore;

    if (independentAnswered === totalIndependent) {
        showFinalScore();
    }
}

function showFinalScore() {
    const finalScoreDiv = document.getElementById('finalScore');
    const finalScoreNumber = document.getElementById('finalScoreNumber');

    finalScoreNumber.textContent = `${independentScore}/${totalIndependent}`;
    finalScoreDiv.style.display = 'block';
    document.getElementById('phase4Next').disabled = false;
}

function updateFinalScores() {
    document.getElementById('finalIndScore').textContent = `${independentScore}/${totalIndependent}`;
    const overallScore = 4 + independentScore;
    document.getElementById('overallScore').textContent = `${overallScore}/24`;
}

// ========== Print Functions ==========
function printWorksheet() {
    document.body.classList.add('printing-worksheet');
    window.print();
    document.body.classList.remove('printing-worksheet');
}

function printResults() {
    const resultsContainer = document.getElementById('printIndependentResults');
    resultsContainer.innerHTML = '';

    for (let i = 1; i <= totalIndependent; i++) {
        const answer = studentAnswers[i];
        const div = document.createElement('div');
        div.className = `result-item ${answer && answer.correct ? 'correct' : 'incorrect'}`;

        if (answer) {
            div.innerHTML = `
                <span>${i}. ${problemDescriptions[i]}</span>
                <span>Your answer: ${answer.answer} ${answer.correct ? '✓' : '✗ (Correct: ' + answer.correctAnswer + ')'}</span>
            `;
        } else {
            div.innerHTML = `
                <span>${i}. ${problemDescriptions[i]}</span>
                <span>Not answered</span>
            `;
        }

        resultsContainer.appendChild(div);
    }

    const overallScore = 4 + independentScore;
    const percentage = Math.round((overallScore / 24) * 100);

    document.getElementById('printFinalScore').textContent = `${overallScore}/24`;
    document.getElementById('printPercentage').textContent = `${percentage}%`;

    document.body.classList.remove('printing-worksheet');
    window.print();
}

function restartLesson() {
    currentPhase = 1;
    exercisesCompleted = 0;
    independentScore = 0;
    independentAnswered = 0;
    studentAnswers = {};
    answeredProblems = {};

    document.querySelectorAll('.content-card').forEach(card => card.classList.remove('active'));
    document.getElementById('phase1').classList.add('active');

    document.querySelectorAll('.phase-dot').forEach((dot, index) => {
        dot.classList.remove('active', 'completed');
        if (index === 0) dot.classList.add('active');
    });

    for (let i = 1; i <= 4; i++) {
        const exercise = document.getElementById(`exercise${i}`);
        exercise.style.display = i === 1 ? 'block' : 'none';

        for (let j = 1; j <= 3; j++) {
            const step = document.getElementById(`ex${i}-step${j}`);
            if (step) {
                step.classList.remove('completed', 'active');
                if (j === 1) {
                    step.classList.remove('hidden');
                    step.classList.add('visible', 'active');
                } else {
                    step.classList.add('hidden');
                    step.classList.remove('visible');
                }
                step.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = false);
            }
        }

        const result1 = document.getElementById(`ex${i}-result1`);
        const result2 = document.getElementById(`ex${i}-result2`);
        if (result1) { result1.textContent = ''; result1.className = 'result-badge'; }
        if (result2) { result2.textContent = ''; result2.className = 'result-badge'; }
    }

    for (let i = 1; i <= totalIndependent; i++) {
        const result = document.getElementById(`ind${i}-result`);
        const problemDiv = result.closest('.independent-problem');

        result.textContent = '';
        problemDiv.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = false);
    }

    document.getElementById('independentScore').textContent = '0';
    document.getElementById('finalScore').style.display = 'none';
    document.getElementById('phase3Next').disabled = true;
    document.getElementById('phase4Next').disabled = true;

    updateProgress();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

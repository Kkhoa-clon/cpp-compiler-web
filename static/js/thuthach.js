const challenges = [
    {
        id: 'challenge1',
        question: `for ( auto const num : a ) const được sử dụng trong for each có tác dụng gì?`,
        options: ['A) giá trị tạm không thay đổi', 'B) tăng tốc độ thực thi', 'C) không có tác dụng','D) thay đổi giá trị tạm'],
        answer: 'A'
    },
    {
        id: 'challenge2',
        question: `for ( auto &num : a ) & được sử dụng trong for each có tác dụng gì?`,
        options: ['A) giúp rút ngắn thời gian', 'B) cho phép thao tác với giá trị tạm', 'C) cố định giá trị tạm' , 'D) rút ngắn thời gian thực thi'],
        answer: 'B'
    },
    {
        id: 'challenge3',
        question: `map trong thư viện STL là loại container cấu trúc nào?`,
        options: ['A) cấu trúc luyến tính', 'B) cấu trúc tree ( cây nhị phân )', 'C) cấu trúc giống mảng'],
        answer: 'B'
    },
    {
        id: 'challenge4',
        question: `Kết quả của đoạn mã sau là gì?\n\nint a = 9;\nint b = 3;\nint division = a / b;\ncout << division;`,
        options: ['A) 3', 'B) 6', 'C) 12'],
        answer: 'A'
    },
    {
        id: 'challenge5',
        question: `Kết quả của đoạn mã sau là gì?\n\nint a = 5;\nint b = 5;\nint mod = a % b;\ncout << mod;`,
        options: ['A) 0', 'B) 1', 'C) 5'],
        answer: 'A'
    },
    {
        id: 'challenge6',
        question: `Kết quả của đoạn mã sau là gì?\n\nint a = 2;\nint b = 3;\nint pow = pow(a, b);\ncout << pow;`,
        options: ['A) 6', 'B) 8', 'C) 9'],
        answer: 'B'
    },
    {
        id: 'challenge7',
        question: `Kết quả của đoạn mã sau là gì?\n\nint a = 5;\nint b = 2;\nb = a++;\ncout << b;`,
        options: ['A) 2', 'B) 5', 'C) 6'],
        answer: 'B'
    },
    {
        id: 'challenge8',
        question: `Kết quả của đoạn mã sau là gì?\n\nint a = 1;\nint b = ++a;\ncout << b;`,
        options: ['A) 1', 'B) 2', 'C) 3'],
        answer: 'B'
    },
    {
        id: 'challenge9',
        question: `Kết quả của đoạn mã sau là gì?\n\nint a = 0;\nfor (int i = 0; i < 5; i++) {\n  a += i;\n}\ncout << a;`,
        options: ['A) 5', 'B) 10', 'C) 15'],
        answer: 'B'
    },
    {
        id: 'challenge10',
        question: `Kết quả của đoạn mã sau là gì?\n\nint a = 1;\nwhile (a < 5) {\n  a++;\n}\ncout << a;`,
        options: ['A) 1', 'B) 4', 'C) 5'],
        answer: 'C'
    },
    // Thêm các thử thách khác tại đây
];

let currentChallengeIndex = 0;

function loadChallenge() {
    const challenge = challenges[currentChallengeIndex];
    const challengeElement = document.createElement('section');
    challengeElement.id = challenge.id;
    challengeElement.innerHTML = `
        <h2>${challenge.question}</h2>
        ${challenge.options.map((option, index) => `
            <label><input type="radio" name="answer${currentChallengeIndex + 1}" value="${String.fromCharCode(65 + index)}"> ${option}</label><br>
        `).join('')}
        <button onclick="checkAnswer('${challenge.id}', '${challenge.answer}')">Kiểm tra</button>
        <p id="result${currentChallengeIndex + 1}"></p>
    `;
    document.getElementById('content').appendChild(challengeElement);
}

function checkAnswer(challengeId, correctAnswer) {
    const radios = document.getElementsByName(`answer${currentChallengeIndex + 1}`);
    let selectedAnswer;
    for (const radio of radios) {
        if (radio.checked) {
            selectedAnswer = radio.value;
            break;
        }
    }
    
    const resultElement = document.getElementById(`result${currentChallengeIndex + 1}`);
    if (selectedAnswer === correctAnswer) {
        resultElement.textContent = "Chính xác! Bạn có thể chuyển sang thử thách tiếp theo.";
        resultElement.style.color = "green";
        
        currentChallengeIndex++;
        if (currentChallengeIndex < challenges.length) {
            document.getElementById('content').innerHTML = '';
            loadChallenge();
        } else {
            resultElement.textContent = "Chúc mừng! Bạn đã hoàn thành tất cả các thử thách.";
        }
    } else {
        resultElement.textContent = "Sai rồi! Hãy thử lại.";
        resultElement.style.color = "red";
    }
}

// Tải thử thách đầu tiên khi trang web được tải
window.onload = loadChallenge;

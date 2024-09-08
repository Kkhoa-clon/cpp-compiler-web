document.getElementById('submissionForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const code = e.target.code.value;

    fetch('/test/1', { // Thay '1' bằng ID của bài kiểm tra
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = data.map(testCase => 
            `<div>Input: ${testCase.input} <br> Result: ${testCase.result} ${testCase.details ? ' (' + testCase.details + ')' : ''}</div>`
        ).join('');
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
});

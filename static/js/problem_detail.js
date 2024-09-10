document.addEventListener("DOMContentLoaded", function() {
    var editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
        lineNumbers: true,
        mode: "text/x-c++src",
        theme: "dracula",
        autoCloseBrackets: true,
        extraKeys: {"Ctrl-Space": "autocomplete"},
        hintOptions: {
            completeSingle: false
        },
        showHint: true // Đảm bảo rằng hint được kích hoạt
    });

    editor.setSize("100%", "100%");
    
    document.getElementById('run').addEventListener('click', function () {
        var code = editor.getValue();
        var input = document.getElementById('input').value;

        fetch('/run', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: code,
                input: input
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById('output').value = `Error: ${data.error}`;
            } else {
                document.getElementById('output').value = data.output;
            }
        })
        .catch(error => {
            document.getElementById('output').value = `Fetch error: ${error}`;
        });
    });

    // Thay đổi theme khi chọn từ dropdown
    document.getElementById('inlineFormSelectTheme').addEventListener('change', function() {
        var theme = this.value;
        editor.setOption('theme', theme);
    });
});

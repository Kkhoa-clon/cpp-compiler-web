document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('login-form');
    const errorMessageElement = document.getElementById('error-message');
    
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của form
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        try {
            // Gửi yêu cầu POST đến server
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    username: username,
                    password: password
                })
            });
            
            if (response.redirected) {
                // Nếu yêu cầu được chuyển hướng (ví dụ: đến trang chính sau khi đăng nhập thành công)
                window.location.href = response.url;
            } else {
                // Hiển thị thông báo lỗi nếu đăng nhập không thành công
                const errorText = await response.text();
                errorMessageElement.textContent = 'Invalid username or password'; // Cập nhật thông báo lỗi
            }
        } catch (error) {
            console.error('Error:', error);
            errorMessageElement.textContent = 'An error occurred. Please try again later.';
        }
    });
});

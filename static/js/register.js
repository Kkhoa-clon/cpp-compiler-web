document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('register-form');
    const errorMessageElement = document.getElementById('error-message');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của form

        const formData = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(response => response.text())
        .then(text => {
            // Kiểm tra xem phản hồi có chứa thông báo lỗi hay không
            if (text.includes('Tên người dùng đã tồn tại.') || text.includes('Mật khẩu xác nhận không khớp.') || text.includes('Vui lòng cung cấp tất cả thông tin.')) {
                errorMessageElement.textContent = text;
            } else {
                // Nếu không có lỗi, chuyển hướng đến trang đăng nhập
                window.location.href = '/login';
            }
        })
        .catch(error => {
            errorMessageElement.textContent = 'Có lỗi xảy ra khi gửi dữ liệu.';
        });
    });
});

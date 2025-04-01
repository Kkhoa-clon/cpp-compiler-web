@echo off
setlocal

:: Kiểm tra xem ứng dụng Flask có đang chạy trên cổng 5000 hay không
netstat -ano | findstr :5000 >nul
if %errorlevel% equ 0 (
    echo Ứng dụng Flask đã chạy trên cổng 5000.
) else (
    echo Ứng dụng Flask không chạy. Bắt đầu khởi động ứng dụng...
    call start.bat
    timeout /t 5 /nobreak >nul
)

:: Mở trình duyệt đến localhost:5000/adminkhoa
echo Mở trình duyệt đến http://localhost:5000/adminkhoa

:: Mở trình duyệt (sử dụng start để mở trang web)
start http://localhost:5000/adminkhoa

:: Thông báo hoàn tất
echo Quá trình đã hoàn tất.

endlocal
exit /b 0

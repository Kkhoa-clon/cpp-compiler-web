@echo off
setlocal

:: Kiểm tra xem Python có được cài hay không
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo Python chưa được cài, vui lòng cài đặt Python từ https://www.python.org/downloads/
    exit /b 1
) else (
    echo Python đã được cài đặt.
)

:: Kiểm tra xem pip có được cài hay không
python -m pip --version >nul 2>nul
if %errorlevel% neq 0 (
    echo pip chưa được cài, tiến hành cài đặt...
    python -m ensurepip --upgrade
) else (
    echo pip đã được cài đặt.
)

:: Cài đặt các thư viện từ requirements.txt nếu có
if exist "requirements.txt" (
    echo Cài đặt các thư viện từ requirements.txt...
    python -m pip install --upgrade -r requirements.txt
) else (
    echo File requirements.txt không tồn tại.
    exit /b 1
)

:: Kiểm tra và kích hoạt môi trường ảo
if exist "venv" (
    echo Kích hoạt môi trường ảo...
    call venv\Scripts\activate.bat
) else (
    echo Môi trường ảo không tồn tại, hãy tạo một môi trường ảo trước khi chạy.
    exit /b 1
)

:: Kiểm tra xem port 5000 có bị chiếm không
set PORT=5000
echo Kiểm tra xem port %PORT% có bị chiếm không...
netstat -ano | findstr :%PORT% >nul
if %errorlevel% equ 0 (
    echo Port %PORT% đã bị chiếm, nhưng sẽ khởi động lại ứng dụng trên cổng này.
) else (
    echo Port %PORT% có sẵn, sử dụng cổng này cho ứng dụng.
)

:: Chạy ứng dụng Python trên port 5000
echo Chạy ứng dụng Python với port %PORT%...
start /b python app.py --port=%PORT%

:: Chờ ứng dụng khởi động
timeout /t 3 /nobreak >nul

:: Tự động mở trình duyệt vào localhost với port đã chọn
echo Mở trình duyệt đến http://localhost:%PORT%
start http://localhost:%PORT%

:: Thông báo hoàn tất
echo Cài đặt và khởi động ứng dụng đã hoàn tất!

endlocal
exit /b 0

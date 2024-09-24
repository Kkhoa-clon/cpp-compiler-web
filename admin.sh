#!/bin/bash

# Kiểm tra xem ứng dụng Flask có đang chạy trên cổng 5000 hay không
if lsof -i :5000 >/dev/null; then
    echo "Ứng dụng Flask đã chạy trên cổng 5000."
else
    echo "Ứng dụng Flask không chạy. Bắt đầu khởi động ứng dụng..."
    ./start.sh
    sleep 5  # Đợi một chút để ứng dụng khởi động
fi

# Mở liên kết localhost:5000 đến .adminkhoa trong một tab mới của shell đang dùng
echo "Mở trình duyệt đến http://localhost:5000/adminkhoa"
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Mở một tab mới trong terminal hiện tại
    gnome-terminal --tab -- fish -c "xdg-open http://localhost:5000/adminkhoa; exec fish"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    # MacOS: sử dụng tab mới trong Terminal
    osascript -e 'tell application "Terminal" to do script "open http://localhost:5000/adminkhoa"'
elif [[ "$OSTYPE" == "cygwin" || "$OSTYPE" == "msys" ]]; then
    # Mở trong tab mới trên Windows
    start cmd /k "start http://localhost:5000/adminkhoa"
else
    echo "Không xác định được hệ điều hành, vui lòng mở trình duyệt thủ công tại http://localhost:5000/adminkhoa"
fi

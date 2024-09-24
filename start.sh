#!/bin/bash

# Kiểm tra hệ điều hành
OS=$(uname)

# Kiểm tra môi trường ảo
if [ -d "venv" ]; then
  echo "Kích hoạt môi trường ảo..."
  source venv/bin/activate
else
  echo "Môi trường ảo không tồn tại, hãy chạy install.sh trước khi khởi động."
  exit 1
fi

# Chạy ứng dụng Python
if [[ "$OS" == "Linux" || "$OS" == "Darwin" ]]; then
  echo "Chạy ứng dụng Python trên Linux/macOS..."
  python3 app.py --allow-unsafe-werkzeug &
else
  echo "Chạy ứng dụng Python trên Windows..."
  python app.py --allow-unsafe-werkzeug &
fi

# Chờ ứng dụng khởi động
sleep 3  # Điều chỉnh nếu ứng dụng khởi động lâu hơn

# Tự động mở trình duyệt vào localhost:5000
if [[ "$OS" == "Linux" ]]; then
  xdg-open http://localhost:5000
elif [[ "$OS" == "Darwin" ]]; then
  open http://localhost:5000
elif [[ "$OS" == "MINGW"* || "$OS" == "CYGWIN"* || "$OS" == "MSYS"* ]]; then
  start http://localhost:5000  # Windows
else
  echo "Không xác định được hệ điều hành, vui lòng mở trình duyệt thủ công tại http://localhost:5000"
fi

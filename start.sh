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

# Hàm kiểm tra xem port có bị chiếm không
check_port_in_use() {
  local port=$1
  if lsof -i :$port > /dev/null; then
    return 1  # Port đang bị chiếm
  else
    return 0  # Port trống
  fi
}

# Bắt đầu kiểm tra từ port 5000
PORT=5000
while ! check_port_in_use $PORT; do
  echo "Port $PORT đang bị chiếm. Thử port $(($PORT + 1))..."
  PORT=$(($PORT + 1))
done

echo "Sử dụng port $PORT cho ứng dụng Python."

# Chạy ứng dụng Python với port đã chọn
if [[ "$OS" == "Linux" || "$OS" == "Darwin" ]]; then
  echo "Chạy ứng dụng Python trên Linux/macOS với port $PORT..."
  python3 app.py --port=$PORT &
else
  echo "Chạy ứng dụng Python trên Windows với port $PORT..."
  python app.py --port=$PORT &
fi

# Chờ ứng dụng khởi động
sleep 3  # Điều chỉnh nếu ứng dụng khởi động lâu hơn

# Tự động mở trình duyệt vào localhost với port đã chọn
if [[ "$OS" == "Linux" ]]; then
  xdg-open http://localhost:$PORT
elif [[ "$OS" == "Darwin" ]]; then
  open http://localhost:$PORT
elif [[ "$OS" == "MINGW"* || "$OS" == "CYGWIN"* || "$OS" == "MSYS"* ]]; then
  start http://localhost:$PORT  # Windows
else
  echo "Không xác định được hệ điều hành, vui lòng mở trình duyệt thủ công tại http://localhost:$PORT"
fi

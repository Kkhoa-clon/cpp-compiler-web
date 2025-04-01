#!/bin/bash

# Kiểm tra hệ điều hành
OS=$(uname)

# Hàm kiểm tra và cài đặt Python
install_python() {
  if ! command -v python3 &> /dev/null; then
    echo "Python3 không được cài, tiến hành cài đặt..."
    if [[ "$OS" == "Linux" ]]; then
      sudo apt-get update
      sudo apt-get install -y python3
    elif [[ "$OS" == "Darwin" ]]; then # macOS
      brew install python3
    elif [[ "$OS" == "MINGW"* || "$OS" == "CYGWIN"* || "$OS" == "MSYS"* ]]; then # Windows
      echo "Vui lòng cài đặt Python từ https://www.python.org/downloads/"
      exit 1
    else
      echo "Hệ điều hành không hỗ trợ tự động cài đặt Python"
      exit 1
    fi
  else
    echo "Python3 đã được cài đặt"
  fi
}

# Hàm kiểm tra và cài đặt pip
install_pip() {
  if ! command -v pip3 &> /dev/null; then
    echo "pip chưa được cài, tiến hành cài đặt..."
    curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
    python3 get-pip.py
    rm get-pip.py
  else
    echo "pip đã được cài đặt"
  fi
}

# Cài đặt Python và pip nếu cần
install_python
install_pip

# Cài đặt các thư viện từ requirements.txt với lệnh --break-system-packages
if [ -f "requirements.txt" ]; then
  echo "Cài đặt các thư viện từ requirements.txt..."
  pip3 install -r requirements.txt --break-system-packages
else
  echo "File requirements.txt không tồn tại."
  exit 1
fi

# Kiểm tra và kích hoạt môi trường ảo tùy theo shell
if [ -d "venv" ]; then
  if [[ "$SHELL" == *"fish"* ]]; then
    echo "Sử dụng Fish shell, kích hoạt môi trường ảo với Fish..."
    source venv/bin/activate.fish
  else
    echo "Kích hoạt môi trường ảo với Bash..."
    source venv/bin/activate
  fi
else
  echo "Môi trường ảo không tồn tại, hãy tạo một môi trường ảo trước khi chạy."
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

# Kiểm tra port 5000
PORT=5000
if check_port_in_use $PORT; then
  echo "Port $PORT có sẵn, sử dụng cổng này cho ứng dụng."
else
  echo "Port $PORT đã bị chiếm, nhưng sẽ khởi động lại ứng dụng trên cổng này."
fi

# Chạy ứng dụng Python trên port 5000
echo "Chạy ứng dụng Python trên $OS với port $PORT..."
if [[ "$OS" == "Linux" || "$OS" == "Darwin" ]]; then
  python3 app.py --port=$PORT &
elif [[ "$OS" == "MINGW"* || "$OS" == "CYGWIN"* || "$OS" == "MSYS"* ]]; then
  python app.py --port=$PORT &
else
  echo "Hệ điều hành không hỗ trợ, không thể chạy ứng dụng."
  exit 1
fi

# Chờ ứng dụng khởi động
sleep 3  # Điều chỉnh nếu ứng dụng khởi động lâu hơn

# Tự động mở trình duyệt vào localhost với port đã chọn
echo "Mở trình duyệt đến http://localhost:$PORT"
if [[ "$OS" == "Linux" ]]; then
  xdg-open http://localhost:$PORT
elif [[ "$OS" == "Darwin" ]]; then
  open http://localhost:$PORT
elif [[ "$OS" == "MINGW"* || "$OS" == "CYGWIN"* || "$OS" == "MSYS"* ]]; then
  start http://localhost:$PORT  # Windows
else
  echo "Không xác định được hệ điều hành, vui lòng mở trình duyệt thủ công tại http://localhost:$PORT"
fi

# Thông báo hoàn tất
echo "Cài đặt và khởi động ứng dụng đã hoàn tất!"

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

# Thông báo hoàn tất cài đặt
echo "Cài đặt hoàn tất. Sử dụng start.sh để khởi động ứng dụng."

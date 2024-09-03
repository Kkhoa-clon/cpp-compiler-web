from flask import Flask, request, render_template, jsonify, redirect, url_for, session, send_from_directory
import subprocess
import os
import re
import requests
import time
from datetime import datetime
import jwt
import random
import platform
import string
import json
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash




app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SECRET_KEY'] = 'khoa'  # Thay 'your_secret_key' bằng một giá trị bí mật
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
    'pool_timeout': 10,
    'pool_recycle': 3600
}

db = SQLAlchemy(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'
migrate = Migrate(app, db)

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)



@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.teardown_appcontext
def shutdown_session(exception=None):
    db.session.remove()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/thuthach')
def thuthach():
    return render_template('thuthach.html')

@app.route('/Tailieu')
def tailieu():
    return render_template('tailieu.html')

@app.route('/Khoahoc')
def Khoahoc():
    return render_template('Khoahoc.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        confirm_password = request.form.get('confirm-password')

        if username and password and confirm_password:
            if password != confirm_password:
                return render_template('register.html', error='Mật khẩu xác nhận không khớp.')
            
            existing_user = User.query.filter_by(username=username).first()
            if existing_user:
                return render_template('register.html', error='Tên người dùng đã tồn tại.')
            
            hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
            try:
                new_user = User(username=username, password=hashed_password)
                db.session.add(new_user)
                db.session.commit()
                return redirect(url_for('login'))
            except Exception as e:
                db.session.rollback()
                return render_template('register.html', error='Có lỗi xảy ra khi đăng ký người dùng.')
        
        return render_template('register.html', error='Vui lòng cung cấp tất cả thông tin.')
    
    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username).first()
        if user and check_password_hash(user.password, password):
            login_user(user)
            return redirect(url_for('index'))
        else:
            return 'sai mật khẩu hoặc tên người dùng'
    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))



@app.route('/compiler')
def compiler():
    return render_template('compiler.html')

@app.route('/run', methods=['POST'])
def run_code():
    code = request.json.get('code')
    input_data = request.json.get('input', '')

    if not code:
        return jsonify({'error': 'No code provided'}), 400

    if re.search(r'[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]', code):
        return jsonify({'error': 'chung toi khong ho tro cac ghi chu co dau'}), 400

    # Xác định thư mục tạm thời và tên file thực thi dựa trên hệ điều hành
    if platform.system() == 'Windows':
        temp_dir = 'C:\\temp'
        exec_path = 'C:\\temp\\program.exe'
    else:
        temp_dir = '/tmp/temp'
        exec_path = '/tmp/temp/program'

    os.makedirs(temp_dir, exist_ok=True)
    
    file_path = os.path.join(temp_dir, 'program.cpp')

    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(code)

    # Biên dịch mã nguồn
    compile_command = ['g++', file_path, '-o', exec_path]
    compile_result = subprocess.run(compile_command, capture_output=True)

    if compile_result.returncode != 0:
        return jsonify({'error': compile_result.stderr.decode()}), 400

    # Đặt quyền thực thi cho file trên Linux
    if platform.system() != 'Windows':
        os.chmod(exec_path, 0o755)

    # Thực thi file
    run_command = [exec_path]
    run_result = subprocess.run(run_command, input=input_data.encode(), capture_output=True)

    return jsonify({'output': run_result.stdout.decode() if run_result.returncode == 0 else run_result.stderr.decode()})




if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
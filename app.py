from flask import Flask, request, render_template, jsonify, redirect, url_for, session
from flask import Flask, request, jsonify, render_template, send_from_directory  # Thêm send_from_directory
import subprocess
import os
import re
import platform
import sys
import time
import json
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from wtforms import Form, StringField, TextAreaField, DateTimeField
from wtforms.validators import DataRequired
from flask_migrate import Migrate
import tempfile
import resource
from flask_socketio import SocketIO, emit


app = Flask(__name__)
socketio = SocketIO(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SECRET_KEY'] = 'khoa'  # Thay bằng giá trị bí mật của bạn
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
    'pool_timeout': 10,
    'pool_recycle': 3600,
    'connect_args': {'check_same_thread': False}  # Đối với SQLite
}

db = SQLAlchemy(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'
migrate = Migrate(app, db)

# Models
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)

class Contest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)
    problems = db.relationship('Problem', backref='contest', lazy=True)

class Problem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=False)
    contest_id = db.Column(db.Integer, db.ForeignKey('contest.id'), nullable=False)
    input_cases = db.Column(db.Text, nullable=False)  # Lưu trữ input cases
    output_cases = db.Column(db.Text, nullable=False)  # Lưu trữ output cases

# Admin Forms
class ProblemForm(Form):
    title = StringField('Title', validators=[DataRequired()])
    description = TextAreaField('Description', validators=[DataRequired()])
    contest_id = StringField('Contest ID', validators=[DataRequired()])
    input_cases = TextAreaField('Input Cases', validators=[DataRequired()])  # Nhập input cases
    output_cases = TextAreaField('Output Cases', validators=[DataRequired()])  # Nhập output cases

class ContestForm(Form):
    name = StringField('Name', validators=[DataRequired()])
    start_time = DateTimeField('Start Time', format='%Y-%m-%d %H:%M:%S', validators=[DataRequired()])
    end_time = DateTimeField('End Time', format='%Y-%m-%d %H:%M:%S', validators=[DataRequired()])

# Admin Views
class ProblemModelView(ModelView):
    form = ProblemForm
    column_list = ['title', 'description', 'contest.name']
    form_columns = ['title', 'description', 'contest', 'input_cases', 'output_cases']  # Thêm trường input và output cases

    def on_model_change(self, form, model, is_created):
        # Lưu input và output cases
        model.input_cases = form.input_cases.data
        model.output_cases = form.output_cases.data
        db.session.commit()

class ContestModelView(ModelView):
    form = ContestForm
    column_list = ['name', 'start_time', 'end_time']
    form_columns = ['name', 'start_time', 'end_time']

class SubmissionModelView(ModelView):
    column_list = ['user.username', 'problem.title', 'result', 'submitted_at']

# Admin setup
admin = Admin(app, name='MyApp', template_mode='bootstrap3', endpoint='adminkhoa', url='/adminkhoa')
admin.add_view(ModelView(User, db.session))
admin.add_view(ContestModelView(Contest, db.session))
admin.add_view(ProblemModelView(Problem, db.session))

# Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/thuthach')
def thuthach():
    contests = Contest.query.all()  # Lấy tất cả contest từ cơ sở dữ liệu
    return render_template('thuthach.html', contests=contests)

@app.route('/Tailieu')
def tailieu():
    return render_template('tailieu.html')

@app.route('/Khoahoc')
def Khoahoc():
    return render_template('Khoahoc.html')

@app.route('/thongtin')
def thongtin():
    return render_template('thongtin.html')

# Biến toàn cục để lưu tin nhắn
messages = []

@app.route('/chat')
def chat():
    return render_template('chat.html', messages=messages)

@socketio.on('send_message')
def handle_message(data):
    data['username'] = current_user.username  # Lưu tên người dùng
    data['id'] = len(messages) + 1  # Tạo ID duy nhất cho tin nhắn
    messages.append(data)
    emit('receive_message', data, broadcast=True)

@socketio.on('send_message')
def handle_message(data):
    data['username'] = current_user.username  # Lưu tên người dùng
    messages.append(data)
    emit('receive_message', data, broadcast=True)

@app.route('/contest/<int:contest_id>')
def contest_detail(contest_id):
    contest = Contest.query.get_or_404(contest_id)
    problems = Problem.query.filter_by(contest_id=contest_id).all()
    return render_template('contest_detail.html', contest=contest, problems=problems)

@app.route('/problem/<int:problem_id>')
def problem_detail(problem_id):
    problem = Problem.query.get_or_404(problem_id)
    input_cases = problem.input_cases  # Dữ liệu input cases dưới dạng văn bản
    output_cases = problem.output_cases  # Dữ liệu output cases dưới dạng văn bản
    return render_template('problem_detail.html', problem=problem, input_cases=input_cases, output_cases=output_cases)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/upload_audio', methods=['POST'])
def upload_audio():
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file provided'}), 400

    audio_file = request.files['audio']
    audio_file_path = os.path.join(UPLOAD_FOLDER, audio_file.filename)
    audio_file.save(audio_file_path)

    return jsonify({'audioUrl': f'/{audio_file.filename}'}), 200

@app.route('/<path:filename>', methods=['GET'])
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

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
            return 'Sai mật khẩu hoặc tên người dùng'
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
        return jsonify({'error': 'Chúng tôi không hỗ trợ các ghi chú có dấu'}), 400

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

import tempfile
import subprocess

def run_code_with_time_limit(code, input_data, time_limit):
    # Tạo thư mục tạm thời
    with tempfile.TemporaryDirectory() as temp_dir:
        # Đường dẫn tới file mã nguồn C++
        file_path = os.path.join(temp_dir, 'program.cpp')

        # Ghi mã nguồn vào file
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(code)

        # Đường dẫn tới file thực thi sau khi biên dịch
        exec_path = os.path.join(temp_dir, 'program')

        # Biên dịch mã nguồn
        compile_command = ['g++', file_path, '-o', exec_path]
        compile_result = subprocess.run(compile_command, capture_output=True)

        if compile_result.returncode != 0:
            return {'error': compile_result.stderr.decode()}

        try:
            # Chạy mã nguồn với giới hạn thời gian
            run_response = subprocess.run([exec_path], input=input_data.encode(),
                                          capture_output=True, timeout=time_limit)
            output = run_response.stdout.decode().strip()
            if run_response.returncode == 0:
                return {'output': output}
            else:
                return {'error': run_response.stderr.decode()}
        except subprocess.TimeoutExpired:
            return {'error': 'Time Limit Exceeded'}


@app.route('/test/<int:problem_id>', methods=['POST'])
def test_code_with_constraints(problem_id):
    code = request.json.get('code')
    problem = Problem.query.get_or_404(problem_id)
    
    # Đọc test cases từ file JSON
    test_cases_path = f'test_cases/{problem_id}.json'
    if not os.path.exists(test_cases_path):
        return jsonify({'error': 'Test cases file not found'}), 404
    
    try:
        with open(test_cases_path, 'r') as f:
            test_cases = json.load(f)['test_cases']
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    results = []
    for case in test_cases:
        input_data = case['input']
        expected_output = case['output']
        time_limit = case.get('time_limit', 1.0)  # Mặc định 1 giây

        result = run_code_with_time_limit(code, input_data, time_limit)
        output = result.get('output', '')
        error = result.get('error', '')

        if error:
            results.append({'input': input_data, 'result': 'fail', 'details': error})
        elif output.strip() == expected_output.strip():
            results.append({'input': input_data, 'result': 'pass'})
        else:
            results.append({'input': input_data, 'result': 'fail', 'details': output})

    return jsonify(results)

# Flask-Login user loader
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Route để phục vụ tệp xác minh
@app.route('/google377630dbe00e18b6.html')
def google_verification():
    return send_from_directory(os.getcwd(), 'google377630dbe00e18b6.html')


# if __name__ == "__main__":
#     # Mặc định sử dụng port 5000
#     port = 5000

#     # Kiểm tra xem có tham số cổng từ dòng lệnh không
#     if len(sys.argv) > 1 and sys.argv[1].startswith("--port="):
#         port = int(sys.argv[1].split("=")[1])

#     # Chạy ứng dụng với SocketIO
#     socketio.run(app, host='0.0.0.0', port=port, debug=True)

if __name__ == "__main__":
    # Mặc định sử dụng port 5000, nhưng trên PythonAnywhere bạn không cần phải xác định cổng
    socketio.run(app, host='0.0.0.0', debug=True)

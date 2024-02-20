from flask import Flask, render_template, redirect, url_for, request, flash, session
from flask_bcrypt import Bcrypt
from passlib.hash import pbkdf2_sha256

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key'
bcrypt = Bcrypt(app)

# In-memory database (replace this with a real database like SQLite)
users = []

@app.route('/')
def home():
    return 'Home Page'

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

        user = next((user for user in users if user['username'] == username), None)

        if user and pbkdf2_sha256.verify(password, user['password']):
            session['user_id'] = user['id']
            flash('Login successful!', 'success')
            return redirect(url_for('dashboard'))

        flash('Invalid credentials. Please try again.', 'danger')

    return render_template('login.html')

@app.route('/dashboard')
def dashboard():
    if 'user_id' in session:
        user = next((user for user in users if user['id'] == session['user_id']), None)
        return f'Dashboard - Welcome, {user["username"]}!'
    else:
        flash('You need to login first.', 'warning')
        return redirect(url_for('login'))

@app.route('/logout')
def logout():
    session.pop('user_id', None)
    flash('Logout successful!', 'success')
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)

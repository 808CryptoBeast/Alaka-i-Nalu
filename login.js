document.addEventListener('DOMContentLoaded', function () {
    const formWrapper = document.getElementById('formWrapper');
    const btnLogin = document.getElementById('btnLogin');
    const btnRegister = document.getElementById('btnRegister');

    btnLogin.addEventListener('click', function () {
        formWrapper.classList.remove('register-mode');
    });

    btnRegister.addEventListener('click', function () {
        formWrapper.classList.add('register-mode');
    });

    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = loginForm.querySelector('input[type="text"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;

        // Check if the user exists in local storage
        const storedUser = localStorage.getItem(username);

        if (storedUser) {
            const storedPassword = JSON.parse(storedUser).password;

            if (password === storedPassword) {
                alert('Login successful!');
                // Redirect to dashboard.html
                window.location.href = 'dashboard/dashboard.html';
            } else {
                alert('Invalid credentials. Please try again.');
            }
        } else {
            alert('Invalid credentials. Please try again.');
        }
    });

    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = registerForm.querySelector('input[type="text"]').value;
        const password = registerForm.querySelector('input[type="password"]').value;

        // Check if the user already exists in local storage
        if (localStorage.getItem(username)) {
            alert('Username is already taken. Please choose a different one.');
        } else {
            // Store user data in local storage
            const userData = JSON.stringify({ username, password });
            localStorage.setItem(username, userData);
            alert('Registration successful!');
        }
    });
});


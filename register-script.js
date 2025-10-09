// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
}

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // Here you would typically send the login request to your backend
    console.log('Login attempted with:', {
        email: email,
        rememberMe: remember
    });
    
    // Example: You would replace this with actual authentication
    alert('Login functionality would be connected to your backend here!');
    
    // Example of what you might do after successful login:
    // window.location.href = 'dashboard.html';
});

// Handle create account button
function createAccount() {
    // Navigate to registration page
    window.location.href = 'register.html';
}

// Menu icon click handler (optional - for future menu functionality)
document.querySelector('.menu-icon').addEventListener('click', function() {
    // Add your menu toggle functionality here
    console.log('Menu clicked');
    // Example: toggleMenu();
});
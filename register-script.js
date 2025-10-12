// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
}

// Show check marks when inputs are valid
document.addEventListener('DOMContentLoaded', function() {
    
    document.getElementById('email').addEventListener('input', function() {
        const emailCheck = document.getElementById('emailCheck');
        if (this.validity.valid && this.value.length > 0) {
            emailCheck.style.display = 'block';
        } else {
            emailCheck.style.display = 'none';
        }
    });

    document.getElementById('fullname').addEventListener('input', function() {
        const nameCheck = document.getElementById('nameCheck');
        if (this.value.length > 2) {
            nameCheck.style.display = 'block';
        } else {
            nameCheck.style.display = 'none';
        }
    });

    // Handle form submission
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const fullname = document.getElementById('fullname').value;
        const password = document.getElementById('password').value;
        const terms = document.getElementById('terms').checked;
        
        if (!terms) {
            alert('Please agree to the Terms & Conditions');
            return;
        }
        
        console.log('Registration successful:', email);
        
        alert('Account created successfully! Redirecting to homepage...');
        
        // Redirect to homepage after successful registration
        window.location.href = 'homepage.html';
    });

    // Menu icon click handler
    document.querySelector('.menu-icon').addEventListener('click', function() {
        console.log('Menu clicked');
    });
});

// Login Script by Jack Loveday

// Login Function
async function loginFormHandler(event) {
    event.preventDefault();

    // Get user info:
    const email = document
        .querySelector('#email-login')
        .value.trim();

    const password = document
        .querySelector('#password-login')
        .value.trim();

    // Validate both fields
    if (email && password) {

        // Use route to run login sequence
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        // If response is ok
        if (response.ok) {
            // Then forward user to their dashboard
            document.location.replace('/dashboard');
        } else {
            // Otherwise login info must be wrong, alert user
            alert(response.statusText);
        }
    }
}

document.querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
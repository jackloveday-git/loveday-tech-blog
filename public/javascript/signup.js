// Signup Script by Jack Loveday

// Signup Function
async function signupFormHandler(event) {
    event.preventDefault();

    // Pull new user input data (username, email, password)
    const username = document
        .querySelector('#username-signup')
        .value
        .trim();

    const email = document
        .querySelector('#email-signup')
        .value
        .trim();

    const password = document
        .querySelector('#password-signup')
        .value
        .trim();

    // Validate all three fields
    if (username && email && password) {

        // Use routes to post our new user
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        // If response is ok
        if (response.ok) {

            // Let the user know we created their account
            alert(`New User: ${username} created`);

            // Then move us to the new users dashboard
            document.location.replace('/dashboard');
        } else {

            // Otherwise display error data
            alert(response.statusText)
        }
    }
}

document.querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
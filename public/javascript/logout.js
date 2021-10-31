// Logout Script by Jack Loveday

// Logout function
async function logout() {

    // Use route method to verify existing user data
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });

    // If response is good
    if (response.ok) {
        // Move user back to the homepage
        document.location.replace('/');
    } else {
        // Else send error text
        alert(response.statusText);
    }
}

document.querySelector('#logout')
    .addEventListener('click', logout);
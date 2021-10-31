// Delete Post Script by Jack Loveday

// Delete Form Function
async function deleteFormHandler(event) {
    event.preventDefault();

    // Get Post id
    const id = window.location
        .toString()
        .split('/')[
        window.location
            .toString()
            .split('/')
            .length - 1
    ];

    // Delete post based on id
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    });

    // If response is ok
    if (response.ok) {

        // Redirect back to your dashboard
        document.location.replace('/dashboard');
    } else {

        // Otherwise display our error
        alert(response.statusText);
    }
}

document.querySelector('.delete-post-btn')
    .addEventListener('click', deleteFormHandler);
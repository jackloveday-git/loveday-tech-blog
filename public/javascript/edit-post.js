// Edit Post Script by Jack Loveday

// Edit Post function
async function editFormHandler(event) {
    event.preventDefault();

    // Get post id
    const id = window.location
        .toString()
        .split('/')[
        window.location
            .toString()
            .split('/')
            .length - 1
    ];

    // Get post Title and Content
    const title = document
        .querySelector('input[name="post-title"]')
        .value;

    const post_text = document
        .querySelector('textarea[name="post-text"]')
        .value;

    // Use route to edit/update the post by id
    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            post_text
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // If response is ok
    if (response.ok) {

        // Redirect back to dashboard
        document.location.replace('/dashboard');
    } else {

        // Otherwise display error
        alert(response.statusText);
    }

}

document.querySelector('.edit-post-form')
    .addEventListener('submit', editFormHandler);
// New Post Script by Jack Loveday

// New Post Function
async function newFormHandler(event) {
    event.preventDefault();

    // Save post title, and content
    const title = document.querySelector('input[name="post-title"]').value;
    const post_text = document.querySelector('textarea[name="post-text"]').value;

    // Use our post route to create our new user post
    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            post_text
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // If ok, reload page
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {

        // Display error if not ok
        alert(response.statusText);
    }
}

document.querySelector('.new-post-form')
    .addEventListener('submit', newFormHandler);
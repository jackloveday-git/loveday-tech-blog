// Comment Script by Jack Loveday

// Comment Form Function
async function commentFormHandler(event) {
    event.preventDefault();

    // Get Comment content/text
    const comment_text = document.querySelector('textarea[name="comment-body"]')
        .value
        .trim();

    // Get Post id for comment's parent
    const post_id = window.location
        .toString()
        .split('/')[
        window.location
            .toString()
            .split('/')
            .length - 1
    ];

    // If Comment content exists:
    if (comment_text) {

        // Use our post route to create our new comment
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // If response is ok
        if (response.ok) {
            // Update/reload our page
            document.location.reload();
        } else {
            
            // Otherwise display any errors
            alert(response.statusText);
        }
    }
}

document.querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);
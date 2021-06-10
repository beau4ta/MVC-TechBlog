async function commentPost(event) {
    event.preventDefault();
  
    const comment = $('.comment-input').val();
  
    const post_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    if (comment_text) {
        const response = await fetch('/api/comment', {
          method: 'POST',
          body: JSON.stringify({
            post_id: post_id,
            comment: comment
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      
        if (response.ok) {
          document.location.reload();
        } else {
          alert(response.statusText);
        }
      }
  }
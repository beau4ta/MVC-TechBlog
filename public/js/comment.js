async function commentPost(event) {
    event.preventDefault();
  
    const comment = $('.comment-input').val();
  
    const post = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    if (comment) {
        const response = await fetch('/api/comments', {
          method: 'POST',
          body: JSON.stringify({
            post_id: post,
            comment: comment
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(response)
      
        if (response.ok) {
          document.location.reload();
        } else {
          alert(response.statusText);
        }
      }
  }

  $('.comment-btn').on('click', commentPost);
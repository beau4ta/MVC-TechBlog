async function editPost (event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const title = $('.title-input').val();
    const post = $('.body-input').val();

    // use the update route to update the post
    const response = await fetch(`/api/post/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: title,
          post: post
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

    if (response.ok) {
        document.location.replace('/');
        } else {
        alert(response.statusText);
        }

  }
  
  $('.save-btn').on('click', editPost);
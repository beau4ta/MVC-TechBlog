const toPostPage = () => {
    document.location.replace('/dashboard/create');
};

$('.post-btn').on('click', toPostPage);

const addPost = (event) => {
    event.preventDefault();

    const title = $('.title-input').val();
    const post = $('.body-input').val();

    const response = fetch('api/posts', {
        method: 'POST',
        body: JSON.stringify({
            title,
            post
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert(response.statusText);
        }
    }

    $('.create-btn').on('click', addPost);
  
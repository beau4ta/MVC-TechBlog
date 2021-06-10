const toPostPage = () => {
    document.location.replace('/dashboard/create');
};

$('.post-btn').on('click', toPostPage);

const addPost = async (event) => {
    event.preventDefault();

    const title = $('.title-text').val();
    const post = $('.body-text').val();

    const response = await fetch('/api/post', {
        method: 'POST',
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

    $('.create-btn').on('click', addPost);
  
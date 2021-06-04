const toPostPage = () => {
    document.location.replace('/dashboard/create');
};

$('.post-btn').on('click', toPostPage);
const signupForm = async (event) => {
    event.preventDefault();

    const name = $('#signup-name').val().trim();
    const email = $('#signup-email').val().trim();
    const password = $('#signup-password').val().trim();
  

    if (name && email && password) {
        const response = await fetch('/api/users/', {
          method: 'POST',
          body: JSON.stringify({ name: name, email: email, password: password }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};

$('.signup-btn').on('click', signupForm);


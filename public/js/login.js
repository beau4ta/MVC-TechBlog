const loginForm = async (event) => {
    event.preventDefault();

    const email = $('.email-form').val().trim();
    const password = $('.password-form').val().trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email: email, password: password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

$('.login-btn').on('click', loginForm);
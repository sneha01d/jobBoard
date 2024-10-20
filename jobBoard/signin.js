// signin.js

document.addEventListener('DOMContentLoaded', () => {
    const signInForm = document.getElementById('signin-form');
    const errorMessage = document.getElementById('error-message');

    // Function to validate the form
    function validateForm() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Simple email pattern validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            errorMessage.textContent = 'Please enter a valid email address.';
            return false;
        }

        if (password.length < 6) {
            errorMessage.textContent = 'Password must be at least 6 characters long.';
            return false;
        }

        errorMessage.textContent = ''; // Clear error message
        return true;
    }

    // Function to handle form submission
    async function submitForm(event) {
        event.preventDefault(); // Prevent default form submission behavior

        if (!validateForm()) return; // Stop if form validation fails

        // Prepare form data
        const formData = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
        };

        try {
            // Send a POST request using fetch API
            const response = await fetch('https://your-backend-api-url.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            // Debugging: Log the full response object for troubleshooting
            console.log('Response:', response);

            // Check if the response is successful (status in the 200-299 range)
            if (response.ok) {
                const data = await response.json();
                console.log('Response Data:', data);

                // Ensure your backend returns success status or a token
                if (data.status === 'success') {
                    // Redirect to account/dashboard page
                    window.location.href = 'dashboard.html'; // Redirect to dashboard
                } else {
                    errorMessage.textContent = data.message || 'Login failed. Please try again.';
                }
            } else {
                const errorData = await response.json();
                errorMessage.textContent = errorData.message || 'Login failed. Please try again.';
            }
        } catch (error) {
            errorMessage.textContent = 'Error connecting to the server. Please try again later.';
            console.error('Error during form submission:', error);
        }
    }

    // Attach the event listener to the form
    signInForm.addEventListener('submit', submitForm);
});

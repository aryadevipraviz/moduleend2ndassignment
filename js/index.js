
function togglePassword(id) {
    const field = document.getElementById(id);
    field.type = field.type === "password" ? "text" : "password";
}

function showError(input, message) {
    const small = input.parentElement.parentElement.querySelector(".error") || 
                  input.parentElement.querySelector(".error");
    small.innerText = message;
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
}

function showSuccess(input) {
    const small = input.parentElement.parentElement.querySelector(".error") || 
                  input.parentElement.querySelector(".error");
    small.innerText = "";
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
}


const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let isValid = true;

        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const phone = document.getElementById("phone");
        const city = document.getElementById("city");
        const password = document.getElementById("password");
        const confirmPassword = document.getElementById("confirmPassword");
        const terms = document.querySelector(".form-check-input");

        // Patterns
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^[0-9]{10}$/;
        const cityPattern = /^[A-Za-z ]+$/;

        // Name
        if (name.value.trim() === "") {
            showError(name, "Full name is required");
            isValid = false;
        } else {
            showSuccess(name);
        }

        // Email
        if (!emailPattern.test(email.value.trim())) {
            showError(email, "Enter a valid email");
            isValid = false;
        } else {
            showSuccess(email);
        }

        // Phone
        if (!phonePattern.test(phone.value.trim())) {
            showError(phone, "Phone must be 10 digits");
            isValid = false;
        } else {
            showSuccess(phone);
        }

        // City
        if (!cityPattern.test(city.value.trim())) {
            showError(city, "City must contain only letters");
            isValid = false;
        } else {
            showSuccess(city);
        }

        // Password
        if (password.value.length < 8) {
            showError(password, "Minimum 8 characters required");
            isValid = false;
        } else {
            showSuccess(password);
        }

        // Confirm Password
        if (confirmPassword.value !== password.value) {
            showError(confirmPassword, "Passwords do not match");
            isValid = false;
        } else {
            showSuccess(confirmPassword);
        }

        // Terms Checkbox
        if (!terms.checked) {
            alert("Please accept Terms & Conditions");
            isValid = false;
        }

        // If all valid
        if (isValid) {
            localStorage.setItem("userName", name.value);
            localStorage.setItem("userEmail", email.value);
            localStorage.setItem("userPassword", password.value);

            alert("Signup Successful!");
            window.location.href = "SignIn.html";
        }
    });
}

const signinForm = document.getElementById("signinForm");

if (signinForm) {
    signinForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("loginEmail");
        const password = document.getElementById("loginPassword");

        const storedEmail = localStorage.getItem("userEmail");
        const storedPassword = localStorage.getItem("userPassword");

        let isValid = true;

        // Email check
        if (email.value.trim() === "") {
            showError(email, "Email required");
            isValid = false;
        } else {
            showSuccess(email);
        }

        // Password check
        if (password.value.trim() === "") {
            showError(password, "Password required");
            isValid = false;
        } else {
            showSuccess(password);
        }

        // Match credentials
        if (isValid) {
            if (email.value === storedEmail && password.value === storedPassword) {
                alert("Login Successful!");
                window.location.href = "travel.html";
            } else {
                alert("Invalid Email or Password");
            }
        }
    });
}
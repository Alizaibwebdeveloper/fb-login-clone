
// Function to show the signup form
const show = () => {
    const form = document.querySelector("#signup");
    form.classList.add("show"); // Add "show" class
    document.querySelector(".layer").style.display = "block";

    // Add event listener to the close button
    const closeButton = document.querySelector(".top img");
    closeButton.addEventListener("click", hide);
};

// Function to hide the signup form
const hide = () => {
    const form = document.querySelector("#signup");
    form.classList.remove("show"); 
    document.querySelector(".layer").style.display = "none";
};


// Function to handle signup form submission
const handleSignup = () => {
    const firstName = document.querySelector("#first-name").value;
    const lastName = document.querySelector("#last-name").value;
    const email = document.querySelector("#signup-email").value;
    const password = document.querySelector("#signup-password").value;

    // Check if any of the fields are empty
    if (!firstName || !lastName || !email || !password) {
        alert("Please fill in all fields");
        return;
    }

    // Get the existing user data from localStorage or initialize an empty array if it doesn't exist
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the user already exists with the same email
    const userExists = existingUsers.some((user) => user.email === email);

    if (userExists) {
        alert("Signup successful!");
        return;
    }

    // Create a user object with the entered data
    const newUser = {
        firstName,
        lastName,
        email,
        password,
    };

    // Add the new user to the array of users
    existingUsers.push(newUser);

    // Store the updated user data in localStorage
    localStorage.setItem("users", JSON.stringify(existingUsers));

    // Close the signup form
    hide();

    // Clear the signup form fields
    document.querySelector("#first-name").value = "";
    document.querySelector("#last-name").value = "";
    document.querySelector("#signup-email").value = "";
    document.querySelector("#signup-password").value = "";

   
};

// Function to handle login
const handleLogin = () => {
    const email = document.querySelector("#login-email").value;
    const password = document.querySelector("#login-password").value;

    // Get the user data from localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Find the user with the matching email and password
    const matchedUser = existingUsers.find(
        (user) => user.email === email && user.password === password
    );

    if (matchedUser) {
        alert("Login successful!");
    } else {
        alert("Invalid email or password");
    }
};

document.querySelector("#signup-button").addEventListener("click", handleSignup);
document.querySelector(".login").addEventListener("click", handleLogin);


// Prevent form submission on Enter key press (optional)
document.querySelector("#login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    handleLogin();
});

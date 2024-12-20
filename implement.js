// User Data Array
const users = [];

// Elements
const userTable = document.getElementById('userTable');
const addUserForm = document.getElementById('addUserForm');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const roleInput = document.getElementById('role');

// Populate Users Table
function loadUsers() {
    userTable.innerHTML = '';
    users.forEach((user, index) => {
        const row = `
            <tr>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editUser(${index})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteUser(${index})">Delete</button>
                </td>
            </tr>
        `;
        userTable.innerHTML += row;
    });
}

// Add User Functionality
addUserForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const role = roleInput.value;

    // Validation
    if (!validateForm(username, email, password)) {
        return;
    }

    // Add user to the list
    users.push({ username, email, role });
    loadUsers();

    // Reset the form
    alert('User added successfully!');
    addUserForm.reset();
});

// Validate Form Inputs
function validateForm(username, email, password) {
    let isValid = true;

    // Username Validation
    if (username === '') {
        setError(usernameInput, 'Username is required.');
        isValid = false;
    } else {
        clearError(usernameInput);
    }

    // Email Validation
    if (!validateEmail(email)) {
        setError(emailInput, 'Enter a valid email.');
        isValid = false;
    } else {
        clearError(emailInput);
    }

    // Password Validation
    if (password.length < 6) {
        setError(passwordInput, 'Password must be at least 6 characters long.');
        isValid = false;
    } else {
        clearError(passwordInput);
    }

    return isValid;
}

// Validate Email Format
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Set Error Message
function setError(element, message) {
    const parent = element.parentElement;
    parent.querySelector('.form-text')?.remove();

    const errorText = document.createElement('div');
    errorText.className = 'form-text text-danger';
    errorText.innerText = message;

    element.classList.add('is-invalid');
    parent.appendChild(errorText);
}

// Clear Error Message
function clearError(element) {
    element.classList.remove('is-invalid');
    const parent = element.parentElement;
    parent.querySelector('.form-text')?.remove();
}

// Edit User Functionality
function editUser(index) {
    const user = users[index];
    const newUsername = prompt('Enter new username:', user.username);
    const newEmail = prompt('Enter new email:', user.email);

    if (newUsername && newEmail && validateEmail(newEmail)) {
        users[index].username = newUsername;
        users[index].email = newEmail;
        alert('User updated successfully!');
        loadUsers();
    } else {
        alert('Invalid input.');
    }
}

// Delete User Functionality
function deleteUser(index) {
    if (confirm(`Are you sure you want to delete ${users[index].username}?`)) {
        users.splice(index, 1);
        loadUsers();
    }
}

// Initialize Users Table
loadUsers();

// Store user data in localStorage
const users = JSON.parse(localStorage.getItem("users")) || [];
const posts = JSON.parse(localStorage.getItem("posts")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

// Display sections based on login status
function updateUI() {
  const authSection = document.getElementById("auth-section");
  const appSection = document.getElementById("app-section");
  if (currentUser) {
    authSection.style.display = "none";
    appSection.style.display = "block";
    document.getElementById("username-display").textContent = currentUser.username;
    displayPosts();
  } else {
    authSection.style.display = "block";
    appSection.style.display = "none";
  }
}

// Register a new user
function register() {
  const username = document.getElementById("reg-username").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value;

  if (!username || !email || !password) {
    alert("All fields are required!");
    return;
  }

  if (users.find(user => user.email === email)) {
    alert("Email is already registered!");
    return;
  }

  users.push({ username, email, password });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Registration successful! Please log in.");
}

// Login an existing user
function login() {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  const user = users.find(user => user.email === email && user.password === password);

  if (user) {
    currentUser = user;
    localStorage.setItem("currentUser", JSON.stringify(user));
    updateUI();
  } else {
    alert("Invalid email or password!");
  }
}

// Logout the current user
function logout() {
  currentUser = null;
  localStorage.removeItem("currentUser");
  updateUI();
}

// Create a new post
function createPost() {
  const content = document.getElementById("post-content").value.trim();
  if (!content) {
    alert("Post content cannot be empty!");
    return;
  }

  posts.push({ username: currentUser.username, content, createdAt: new Date().toLocaleString() });
  localStorage.setItem("posts", JSON.stringify(posts));
  document.getElementById("post-content").value = "";
  displayPosts();
}

// Display posts
function displayPosts() {
  const postsContainer = document.getElementById("posts");
  postsContainer.innerHTML = "";
  posts.slice().reverse().forEach(post => {
    const postElement = document.createElement("div");
    postElement.className = "post";
    postElement.innerHTML = `<strong>${post.username}</strong> <em>${post.createdAt}</em><p>${post.content}</p>`;
    postsContainer.appendChild(postElement);
  });
}

// Initialize UI on page load
updateUI();
const form = document.getElementById("registerForm");

form.addEventListener("submit", function (e) {
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    e.preventDefault();
    alert("Passwords do not match!");
  }
});
// Filter professionals by search input
function filterProfessionals() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const professionals = document.querySelectorAll("#professionalList li");
  
    professionals.forEach(professional => {
      const name = professional.getAttribute("data-name").toLowerCase();
      const profession = professional.getAttribute("data-profession").toLowerCase();
  
      if (name.includes(searchInput) || profession.includes(searchInput)) {
        professional.style.display = "flex";
      } else {
        professional.style.display = "none";
      }
    });
  }
  
  // Simulate sending a connection request
  function sendRequest(name) {
    alert(`Connection request sent to ${name}`);
  }
  document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type'); // Get the "type" from the query parameter
  
    if (type) {
      document.querySelector('h2').innerText = `Professional Network - ${type.replace('-', ' ')}`;
      filterByType(type);
    }
  });
  
  function filterByType(type) {
    const professionals = document.querySelectorAll("#professionalList li");
  
    professionals.forEach(professional => {
      const professionType = professional.getAttribute("data-type"); // Add "data-type" to li
      if (professionType === type || !type) {
        professional.style.display = "flex";
      } else {
        professional.style.display = "none";
      }
    });
  }
  

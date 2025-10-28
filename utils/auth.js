function loginUser(form) {
  const { identifier, password } = form;
  const users = JSON.parse(localStorage.getItem("ticketapp_users") || "[]");
  const user = users.find(
    u => (u.username === identifier || u.email === identifier) && u.password === password
  );
  if (!user) throw new Error("Invalid credentials");
  localStorage.setItem("ticketapp_session", JSON.stringify(user));
}

function signupUser(form) {
  const users = JSON.parse(localStorage.getItem("ticketapp_users") || "[]");
  if (users.some(u => u.email === form.email))
    throw new Error("Email already exists");
  users.push(form);
  localStorage.setItem("ticketapp_users", JSON.stringify(users));
  localStorage.setItem("ticketapp_session", JSON.stringify(form));
}

function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.getElementById("toast-container").appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

function initLoginPage() {
  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = {
      identifier: e.target.identifier.value.trim(),
      password: e.target.password.value,
    };
    try {
      loginUser(form);
      showToast("Welcome back!", "success");
      setTimeout(() => (window.location.href = "/dashboard"), 1000);
    } catch (err) {
      showToast(err.message, "error");
    }
  });
}

function initSignupPage() {
  document.getElementById("signupForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = {
      username: e.target.username.value.trim(),
      email: e.target.email.value.trim(),
      password: e.target.password.value,
      confirm: e.target.confirm.value,
    };
    if (form.password !== form.confirm) return showToast("Passwords do not match", "error");
    try {
      signupUser(form);
      showToast("Account created successfully!", "success");
      setTimeout(() => (window.location.href = "/dashboard"), 1000);
    } catch (err) {
      showToast(err.message, "error");
    }
  });
}

export function isAuthenticated() {
  return !!getSession();
}

export function protectRoute() {
  if (!isAuthenticated()) {
    window.location.href = "/login";
  }
}

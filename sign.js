const signupUsername = document.getElementById("username");
const signupPassword = document.getElementById("password");
const signupButton = document.getElementById("signupButton");

const users = JSON.parse(localStorage.getItem("users")) || [];

signupButton.addEventListener("click", () => {
  if (!signupUsername.value || !signupPassword.value) {
    alert("Username or password cannot be empty!");
    return;
  }

  const existingUser = users.find((u) => u.username === signupUsername.value);
  if (existingUser) {
    alert("Username already exists!");
    return;
  }
  users.push({
    username: signupUsername.value,
    password: signupPassword.value,
  });

  localStorage.setItem("users", JSON.stringify(users));
  alert("User registered successfully!");
  signupUsername.value = "";
  signupPassword.value = "";
  window.location.href = "login.html";
});

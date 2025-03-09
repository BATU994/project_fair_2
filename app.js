const loginUsername = document.getElementById("loginUsername");
const loginPassword = document.getElementById("loginPassword");
const loginButton = document.getElementById("loginButton");

const users = JSON.parse(localStorage.getItem("users"));

loginButton.addEventListener("click", () => {
  if (!loginUsername.value || !loginPassword.value) {
    alert("Fill in");
    return;
  }

  try {
    const user = users.find((u) => u.username === loginUsername.value);

    if (!user) {
      alert("User or password is incorrect");
      return;
    }
    if (user.password === loginPassword.value) {
      alert("Logged in successfully!");
      window.location.href = "/index.html";
    } else {
      alert("Invalid password!");
    }
    function loginUser(username) {
      localStorage.setItem("username", username);
    }
    loginUser(user.username);
  } catch (error) {
    alert("An error occurred during login");
  }
});

window.onload = function () {
  const username = localStorage.getItem("username");
  const userNameDisplay = document.getElementById("userName");
  const loginButton = document.getElementById("loginButton");
  const signInButton = document.getElementById("signInButton");

  if (username) {
    userNameDisplay.textContent = `Welcome, ${username}`;
    loginButton.style.display = "none";
    signInButton.style.display = "none";
  } else {
    userNameDisplay.textContent = "";
    loginButton.style.display = "inline";
    signInButton.style.display = "inline";
  }
};

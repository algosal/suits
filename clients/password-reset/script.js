document.addEventListener("DOMContentLoaded", () => {
  const resetForm = document.getElementById("resetForm");
  const messageDiv = document.getElementById("message");
  const emailInput = document.getElementById("email");
  const codeInput = document.getElementById("code");
  const newPasswordInput = document.getElementById("newPassword");
  const confirmPasswordInput = document.getElementById("confirmPassword");

  // Extract email and code from URL
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get("email");
  const code = urlParams.get("code");

  if (email && code) {
    emailInput.value = email;
    codeInput.value = code;
  } else {
    messageDiv.textContent = "Invalid URL parameters.";
    messageDiv.classList.add("error");
    messageDiv.classList.remove("hidden");
    resetForm.style.display = "none";
  }

  resetForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newPassword = newPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (newPassword.length < 6) {
      messageDiv.textContent = "Password must be at least 6 characters long.";
      messageDiv.classList.add("error");
      messageDiv.classList.remove("hidden");
      return;
    }

    if (newPassword !== confirmPassword) {
      messageDiv.textContent = "Passwords do not match.";
      messageDiv.classList.add("error");
      messageDiv.classList.remove("hidden");
      return;
    }

    // Send POST request to your password reset API
    const apiUrl =
      "https://suitsdevital.com/automation/reset-password/reset-password.php"; // Replace with your API URL
    const requestBody = {
      email: email,
      code: code,
      newPassword: newPassword,
    };

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          messageDiv.textContent = "Password reset successful.";
          messageDiv.classList.add("success");
          messageDiv.classList.remove("error");
          messageDiv.classList.remove("hidden");

          resetForm.style.display = "none";
        } else {
          messageDiv.textContent = "Password reset failed. Please try again.";
          messageDiv.classList.add("error");
          messageDiv.classList.remove("hidden");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        messageDiv.textContent = "An error occurred. Please try again later.";
        messageDiv.classList.add("error");
        messageDiv.classList.remove("hidden");
      });
  });
});

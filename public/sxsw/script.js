// Password protection
const PASSWORD = "ReadyLetsGo";

const passwordInput = document.getElementById("password-input");
const passwordSubmit = document.getElementById("password-submit");
const passwordContainer = document.getElementById("password-container");
const videoContainer = document.getElementById("video-container");
const errorMessage = document.getElementById("error-message");

function checkPassword() {
  const enteredPassword = passwordInput.value;

  if (enteredPassword === PASSWORD) {
    // Correct password - show video
    passwordContainer.style.display = "none";
    videoContainer.style.display = "flex";
  } else {
    // Wrong password - show error
    errorMessage.textContent = "Incorrect password";
    errorMessage.classList.add("show");
    passwordInput.value = "";

    // Hide error after 3 seconds
    setTimeout(() => {
      errorMessage.classList.remove("show");
    }, 3000);
  }
}

// Submit on button click
passwordSubmit.addEventListener("click", checkPassword);

// Submit on Enter key
passwordInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkPassword();
  }
});

// ===== Animated Background =====
const bg = document.getElementById("animated-background");

// Generate random circles
function createCircles() {
  const colors = [
    "rgba(0, 212, 230, 0.15)",  // accent teal
    "rgba(0, 184, 204, 0.12)",  // lighter teal
    "rgba(72, 244, 255, 0.10)", // chip-bg color
  ];

  for (let i = 0; i < 3; i++) {
    const circle = document.createElement("div");
    circle.className = "animated-circle";

    // Random size, position, color
    const size = Math.random() * 300 + 100;
    circle.style.width = size + "px";
    circle.style.height = size + "px";
    circle.style.background = colors[Math.floor(Math.random() * colors.length)];

    // Random starting position
    circle.style.left = Math.random() * 100 + "%";
    circle.style.top = Math.random() * 100 + "%";

    bg.appendChild(circle);

    // Animate
    animateCircle(circle);
  }
}

function animateCircle(circle) {
  const duration = (Math.random() * 20 + 15) * 1000; // 15-35s
  const deltaX = (Math.random() - 0.5) * 300;
  const deltaY = (Math.random() - 0.5) * 300;

  circle.style.transition = `transform ${duration}ms linear`;
  circle.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

  // Loop animation
  setTimeout(() => {
    circle.style.transition = "none";
    circle.style.transform = "translate(0, 0)";
    setTimeout(() => animateCircle(circle), 50);
  }, duration);
}

createCircles();

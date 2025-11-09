// ===== Password Protection (Server-Side Verification) =====
const passwordInput = document.getElementById("password-input");
const passwordSubmit = document.getElementById("password-submit");
const passwordContainer = document.getElementById("password-container");
const videoContainer = document.getElementById("video-container");
const errorMessage = document.getElementById("error-message");

async function checkPassword() {
  const enteredPassword = passwordInput.value.trim();

  if (!enteredPassword) {
    showError("Please enter a password");
    return;
  }

  // Disable input during verification
  passwordSubmit.disabled = true;
  passwordSubmit.textContent = "Verifying...";

  try {
    const response = await fetch('/api/sxsw/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: enteredPassword })
    });

    const data = await response.json();

    if (data.success) {
      // Correct password - show video
      passwordContainer.style.display = "none";
      videoContainer.style.display = "flex";
    } else {
      // Wrong password - show error
      showError(data.error || "Incorrect password");
      passwordInput.value = "";
    }
  } catch (error) {
    console.error('Verification error:', error);
    showError("Network error. Please try again.");
  } finally {
    // Re-enable input
    passwordSubmit.disabled = false;
    passwordSubmit.textContent = "Enter";
  }
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.add("show");

  // Hide error after 3 seconds
  setTimeout(() => {
    errorMessage.classList.remove("show");
  }, 3000);
}

// Submit on button click
passwordSubmit.addEventListener("click", checkPassword);

// Submit on Enter key
passwordInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkPassword();
  }
});

// ===== Video Play Button =====
const videoWrapper = document.getElementById('video-wrapper');
const video = document.getElementById('pitch-video');
const playButton = document.querySelector('.play-button-overlay');

// Function to play video and enter fullscreen
async function playAndFullscreen() {
  if (video.paused) {
    try {
      // Start playing first
      await video.play();

      // Small delay to ensure video is playing before fullscreen
      setTimeout(() => {
        // Request fullscreen on the video element
        if (video.requestFullscreen) {
          video.requestFullscreen().catch(err => {
            console.log('Fullscreen request failed:', err);
          });
        } else if (video.webkitRequestFullscreen) { // Safari
          video.webkitRequestFullscreen();
        } else if (video.webkitEnterFullscreen) { // iOS Safari
          video.webkitEnterFullscreen();
        } else if (video.mozRequestFullScreen) { // Firefox
          video.mozRequestFullScreen();
        } else if (video.msRequestFullscreen) { // IE/Edge
          video.msRequestFullscreen();
        }
      }, 100);
    } catch (error) {
      console.error('Error playing video:', error);
    }
  }
}

// Click on play button to play and fullscreen
if (playButton) {
  playButton.addEventListener('click', (e) => {
    e.stopPropagation();
    playAndFullscreen();
  });
}

// Click anywhere on video wrapper to play and fullscreen
videoWrapper.addEventListener('click', () => {
  playAndFullscreen();
});

// Hide play button when video starts playing
video.addEventListener('play', () => {
  videoWrapper.classList.add('playing');
});

// Show play button when video is paused
video.addEventListener('pause', () => {
  videoWrapper.classList.remove('playing');
});

// ===== Animated Background (copied from main page) =====
const COLOR_SCHEMES = {
  blue: ['#00A6F4', '#00BCD4', '#0088CC', '#20B2AA', '#4682B4'],
};

class AnimatedBackground {
  constructor(container, options = {}) {
    this.container = container;
    this.intensity = options.intensity || 'medium';
    this.colorScheme = options.colorScheme || 'blue';
    this.circles = [];
    this.animationFrames = [];

    this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  init() {
    const circleCount = this.intensity === 'high' ? 6 : this.intensity === 'medium' ? 4 : 3;
    const colors = COLOR_SCHEMES[this.colorScheme];

    for (let i = 0; i < circleCount; i++) {
      const circle = this.createCircle(colors, i);
      this.circles.push(circle);
      this.container.appendChild(circle.element);

      if (!this.reduceMotion) {
        setTimeout(() => this.animateCircle(circle), i * 1000);
      }
    }
  }

  createCircle(colors, index) {
    const element = document.createElement('div');
    element.className = 'animated-circle';

    const size = 60 + Math.random() * 120;
    const opacity = 0.15 + Math.random() * 0.15;
    const color = colors[Math.floor(Math.random() * colors.length)];

    const startX = Math.random() * (window.innerWidth - 200) + 100;
    const startY = Math.random() * (window.innerHeight - 200) + 100;

    element.style.width = `${size}px`;
    element.style.height = `${size}px`;
    element.style.backgroundColor = color;
    element.style.opacity = opacity;
    element.style.left = `${startX}px`;
    element.style.top = `${startY}px`;

    return {
      element,
      currentX: startX,
      currentY: startY,
      size,
      opacity,
      color,
      id: `circle-${index}`
    };
  }

  animateCircle(circle) {
    if (this.reduceMotion) return;

    const animate = () => {
      const targetX = Math.random() * (window.innerWidth - 200) + 100;
      const targetY = Math.random() * (window.innerHeight - 200) + 100;

      const duration = 20000 + Math.random() * 15000;

      circle.element.style.transition = `transform ${duration}ms linear`;
      circle.element.style.transform = `translate(${targetX - circle.currentX}px, ${targetY - circle.currentY}px)`;

      circle.currentX = targetX;
      circle.currentY = targetY;

      setTimeout(animate, duration);
    };

    animate();
  }
}

// Initialize background
const backgroundContainer = document.getElementById('animated-background');
new AnimatedBackground(backgroundContainer, {
  intensity: 'medium',
  colorScheme: 'blue'
});

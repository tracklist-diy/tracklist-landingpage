// Authentication is handled by HTTP Basic Auth on the server
// No client-side password checking needed

// ===== Video Play Button =====
const videoWrapper = document.getElementById('video-wrapper');
const video = document.getElementById('pitch-video');

// Click anywhere on video wrapper to play
videoWrapper.addEventListener('click', () => {
  if (video.paused) {
    video.play();
    videoWrapper.classList.add('playing');
  }
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

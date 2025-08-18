// Color schemes from the React Native version
const COLOR_SCHEMES = {
  blue: ['#00A6F4', '#00BCD4', '#0088CC', '#20B2AA', '#4682B4'],
  purple: ['#8B5CF6', '#7C3AED', '#6D28D9', '#5B21B6', '#4C1D95'],
  green: ['#10B981', '#059669', '#047857', '#065F46', '#064E3B'],
  mixed: ['#00A6F4', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444']
};

// Animated Background implementation
class AnimatedBackground {
  constructor(container, options = {}) {
    this.container = container;
    this.intensity = options.intensity || 'medium';
    this.colorScheme = options.colorScheme || 'blue';
    this.circles = [];
    this.animationFrames = [];
    
    // Respect reduced motion preference
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
        // Start animation with staggered delay
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
    
    // Random starting position (keep away from edges)
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
      // Generate new random target position
      const targetX = Math.random() * (window.innerWidth - 200) + 100;
      const targetY = Math.random() * (window.innerHeight - 200) + 100;
      
      // Duration between 20-35 seconds for smooth movement
      const duration = 20000 + Math.random() * 15000;
      
      // Update the element's position with CSS transition
      circle.element.style.transition = `transform ${duration}ms linear`;
      circle.element.style.transform = `translate(${targetX - circle.currentX}px, ${targetY - circle.currentY}px)`;
      
      // Update current position for next animation
      circle.currentX = targetX;
      circle.currentY = targetY;
      
      // Schedule next animation
      setTimeout(animate, duration);
    };
    
    animate();
  }

  destroy() {
    this.circles.forEach(circle => {
      if (circle.element.parentNode) {
        circle.element.parentNode.removeChild(circle.element);
      }
    });
    this.circles = [];
  }
}

// Rotating middle line with fade-out / fade-in
function initTextAnimation() {
  const phrases = [
    "without limits",
    "unleashed", 
    "for all",
    "on your terms"
  ];

  const el = document.getElementById('changing-text');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    el.textContent = phrases[0];
    return;
  }

  let i = 0;
  const fadeDuration = 600;   // must match --fade in CSS
  const holdDuration = 2000;  // time text stays fully visible

  function next(){
    // fade out
    el.classList.add('out');
    setTimeout(() => {
      // swap text while invisible
      i = (i + 1) % phrases.length;
      el.textContent = phrases[i];
      // fade back in
      el.classList.remove('out');
      // schedule the next cycle after it has faded in and held
      setTimeout(next, holdDuration);
    }, fadeDuration);
  }

  // start after an initial hold
  setTimeout(next, holdDuration);
}

// Function to match button width to music text
function matchButtonWidthToMusic() {
  const musicHeader = document.querySelector('.hero h1');
  const signUpButton = document.querySelector('.btn-primary');
  
  if (musicHeader && signUpButton) {
    // Create a temporary element to measure just the text
    const tempElement = document.createElement('span');
    tempElement.textContent = musicHeader.textContent;
    tempElement.style.position = 'absolute';
    tempElement.style.visibility = 'hidden';
    tempElement.style.whiteSpace = 'nowrap';
    
    // Copy the exact styles from the h1
    const computedStyle = window.getComputedStyle(musicHeader);
    tempElement.style.fontFamily = computedStyle.fontFamily;
    tempElement.style.fontSize = computedStyle.fontSize;
    tempElement.style.fontWeight = computedStyle.fontWeight;
    tempElement.style.letterSpacing = computedStyle.letterSpacing;
    tempElement.style.lineHeight = computedStyle.lineHeight;
    
    document.body.appendChild(tempElement);
    const textWidth = tempElement.getBoundingClientRect().width;
    document.body.removeChild(tempElement);
    
    signUpButton.style.width = `${textWidth}px`;
  }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize animated background
  const backgroundContainer = document.getElementById('animated-background');
  new AnimatedBackground(backgroundContainer, {
    intensity: 'medium',
    colorScheme: 'blue'
  });

  // Initialize text animation
  initTextAnimation();
  
  // Match button width to music text
  matchButtonWidthToMusic();
  
  // Re-match on window resize
  window.addEventListener('resize', matchButtonWidthToMusic);
});
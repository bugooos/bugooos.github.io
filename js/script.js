// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without page jump
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
            }
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const form = e.target;
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            try {
                // Show loading state
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    const nextPage = form.querySelector('input[name="_next"]')?.value;
                    if (nextPage) {
                        window.location.href = nextPage;
                    } else {
                        alert('Message sent successfully!');
                        form.reset();
                    }
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                alert('Oops! Something went wrong. Please email me directly at knightfrig@gmail.com');
            } finally {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

    // Add floating animation to social cards
    const socialCards = document.querySelectorAll('.social-card');
    socialCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('floating');
    });

    // Active section detection for navigation
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    function updateActiveSection() {
        let current = '';
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Run on scroll and initial load
    window.addEventListener('scroll', updateActiveSection);
    updateActiveSection();

    // Typing animation for the name
    const nameElement = document.querySelector('h1');
    if (nameElement) {
        const nameText = "Raktim Baidya";
        let i = 0;
        
        // Clear existing text
        nameElement.textContent = '';
        nameElement.style.opacity = '1';
        
        function typeWriter() {
            if (i < nameText.length) {
                nameElement.textContent += nameText.charAt(i);
                i++;
                setTimeout(typeWriter, 100); // Typing speed (ms per character)
            } 
        }
        
        // Start the animation after a slight delay
        setTimeout(typeWriter, 500);
    }

    class RotatingDisplay {
  constructor(containerSelector, itemSelector, items) {
    this.container = document.querySelector(containerSelector);
    this.items = document.querySelectorAll(itemSelector);
    this.allItems = items; // Array of all your certificates/badges data
    this.currentIndex = 0;
    this.interval = null;
    this.animationDuration = 500; // ms
    
    // Initialize display
    this.updateDisplay();
    
    // Start rotation
    this.startRotation(3000); // Rotate every 3 seconds
  }
  
  updateDisplay() {
    // Clear all classes first
    this.items.forEach(item => {
      item.className = itemSelector.replace('.', ''); // Reset to base class
    });
    
    // Calculate indices for current, next, and previous items
    const prevIndex = (this.currentIndex - 1 + this.allItems.length) % this.allItems.length;
    const nextIndex = (this.currentIndex + 1) % this.allItems.length;
    
    // Update DOM elements with data
    this.updateItem(this.items[0], this.allItems[this.currentIndex], 'active');
    this.updateItem(this.items[1], this.allItems[nextIndex], 'next');
    this.updateItem(this.items[2], this.allItems[prevIndex], 'prev');
  }
  
  updateItem(element, data, className) {
    element.classList.add(className);
    // Update element content with your data
    element.innerHTML = `
      <img src="${data.image}" alt="${data.title}">
      <h3>${data.title}</h3>
      <p>${data.description}</p>
    `;
  }
  
  rotate() {
    // Animate current item out
    this.items[0].classList.add('slide-out');
    
    setTimeout(() => {
      this.currentIndex = (this.currentIndex + 1) % this.allItems.length;
      this.updateDisplay();
      
      // Animate new item in
      this.items[0].classList.add('slide-in');
      
      setTimeout(() => {
        this.items[0].classList.remove('slide-in');
      }, this.animationDuration);
    }, this.animationDuration);
  }
  
  startRotation(interval) {
    this.interval = setInterval(() => this.rotate(), interval);
  }
  
  stopRotation() {
    clearInterval(this.interval);
  }
}

// Your data arrays
const certificatesData = [
  { image: 'cert1.jpg', title: 'Certificate 1', description: 'Description 1' },
  // Add all your certificates
];

const badgesData = [
  { image: 'badge1.png', title: 'Badge 1', description: 'Description 1' },
  // Add all your badges
];

// Initialize displays
const certificatesDisplay = new RotatingDisplay('.certificates-slider', '.certificate', certificatesData);
const badgesDisplay = new RotatingDisplay('.badges-slider', '.badge', badgesData);

});
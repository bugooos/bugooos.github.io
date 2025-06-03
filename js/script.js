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

    <script>


    // Modified typing animation with backspacing effect
    document.addEventListener('DOMContentLoaded', function() {
        const nameElement = document.querySelector('.hero h1');
        if (nameElement) {
            const phrases = [
                {text: "Raktim Baidya", hold: 2000},
                {text: "nexu", hold: 2000},
                {text: "bugooos", hold: 2000}
            ];
            
            let currentPhraseIndex = 0;
            let isTyping = true;
            let currentText = '';
            let charIndex = 0;
            let holdTimeout;

            // Clear existing text and make visible
            nameElement.textContent = '';
            nameElement.style.opacity = '1';

            function animate() {
                clearTimeout(holdTimeout);
                
                const currentPhrase = phrases[currentPhraseIndex].text;
                const holdDuration = phrases[currentPhraseIndex].hold;

                if (isTyping) {
                    // Typing forward
                    if (charIndex < currentPhrase.length) {
                        currentText = currentPhrase.substring(0, charIndex + 1);
                        nameElement.textContent = currentText;
                        charIndex++;
                        setTimeout(animate, 100); // Typing speed
                    } else {
                        // Finished typing, hold for 2 seconds
                        isTyping = false;
                        holdTimeout = setTimeout(animate, holdDuration);
                    }
                } else {
                    // Backspacing
                    if (currentText.length > 0) {
                        currentText = currentText.substring(0, currentText.length - 1);
                        nameElement.textContent = currentText;
                        setTimeout(animate, 50); // Backspacing speed
                    } else {
                        // Move to next phrase or loop
                        isTyping = true;
                        charIndex = 0;
                        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                        setTimeout(animate, 300); // Delay before next phrase
                    }
                }
            }

            // Start animation after slight delay
            setTimeout(animate, 500);
        }
    });
</script>
});
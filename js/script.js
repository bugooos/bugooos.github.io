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
            this.allItems = items;
            this.currentIndex = 0;
            this.interval = null;
            this.animationDuration = 500;
            
            this.updateDisplay();
            this.startRotation(3000);
        }
        
        updateDisplay() {
            // Clear all classes first
            this.items.forEach(item => {
                item.className = item.className.split(' ')[0]; // Reset to base class
            });
            
            const prevIndex = (this.currentIndex - 1 + this.allItems.length) % this.allItems.length;
            const nextIndex = (this.currentIndex + 1) % this.allItems.length;
            
            this.updateItem(this.items[0], this.allItems[this.currentIndex], 'active');
            this.updateItem(this.items[1], this.allItems[nextIndex], 'next');
            this.updateItem(this.items[2], this.allItems[prevIndex], 'prev');
        }
        
        updateItem(element, data, className) {
            element.classList.add(className);
            element.innerHTML = `
                <h4>${data.title}</h4>
                <p>${data.issuer ? `Issued by: ${data.issuer}` : data.description}</p>
                <a href="${data.link}" class="cta-button" target="_blank">
                    <i class="fas fa-${data.icon || (className.includes('badge') ? 'shield-alt' : 'certificate')}"></i> 
                    View ${className.includes('badge') ? 'Badge' : 'Certificate'}
                </a>
                ${data.image ? `<img src="${data.image}" alt="${data.title}" class="credential-image">` : ''}
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

    // Certificate data
    // Certificate data
const certificatesData = [
    {
        title: "Cyber Job Simulation",
        issuer: "Deloitte Australia",
        link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/E9pA6qsdbeyEkp3ti_9PBTqmSxAf6zZTseP_N7yWfvEKmA62rZgWu_1747731290478_completion_certificate.pdf",
        icon: "certificate"
    },
    {
        title: "Linux 100",
        issuer: "TCM Security",
        link: "https://drive.google.com/drive/u/2/folders/1OrJQwDZGIPmVMVlPKc-FTN2i-vmPr_00",
        icon: "certificate"
    },
    {
        title: "Soft Skill",
        issuer: "TCM Security",
        link: "https://drive.google.com/drive/u/2/folders/1dkyN7f-bt5CknC4J_zziB0xz12RI15yO",
        icon: "certificate"
    },
    // ADD NEW CERTIFICATES HERE
    //{
    //    title: "New Certificate",
    //    issuer: "Issuing Organization",
    //    link: "https://example.com",
    //    icon: "certificate"
    //}
];

    // Badge data
    const badgesData = [
        {
            title: "JWT Attacks and Detection",
            issuer: "letsdefend",
            link: "https://app.letsdefend.io/my-rewards/detail/1e83596a92254c8faf70512adac3deb9",
            icon: "shield-alt"
        },
        {
            title: "SOC Member",
            issuer: "letsdefend",
            link: "https://app.letsdefend.io/my-rewards/detail/40c748ce7b5a4e0e8ed99a0671222b57",
            icon: "shield-alt"
        },
        {
            title: "ISC2 Candidate",
            issuer: "ISC2",
            link: "https://www.credly.com/badges/8753d346-6154-4f1c-99e6-acd8034d6e61/linked_in_profile",
            icon: "shield-alt"
        },
        // ADD NEW BADGES HERE
        //{
        //    title: "New Badge",
        //    issuer: "Issuing Organization",
        //    link: "https://example.com",
        //    icon: "shield-alt"
        //}
];

    // Initialize displays
    if (document.querySelector('.certifications-slider')) {
        const certificatesDisplay = new RotatingDisplay('.certifications-slider', '.certification-item', certificatesData);
    }
    
    if (document.querySelector('.badges-slider')) {
        const badgesDisplay = new RotatingDisplay('.badges-slider', '.badge-item', badgesData);
    }
});
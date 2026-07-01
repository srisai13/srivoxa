document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle (Dark/Light Mode)
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    } else {
        // Default to dark as requested for premium look, but can respect system
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        html.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // 2. Sticky Header
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if(navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const answer = question.nextElementSibling;
            
            // Close all other open items
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = null;
            }
        });
    });

    if (mobileMenuBtn && navMenu) {
        // Close menu on link click


        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }

    // 4. Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;
        
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load


    // 6. Contact Form Submission (Mock)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
                btn.classList.replace('btn-primary', 'btn-outline');
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.replace('btn-outline', 'btn-primary');
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // 7. Portfolio Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        // Add a tiny delay for smooth reflow if needed, though simple display switch is fine
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    // 8. AI Assistant Logic
    const aiBtn = document.getElementById('aiAssistantBtn');
    const chatWindow = document.getElementById('aiChatWindow');
    const closeBtn = document.getElementById('closeChatBtn');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendChatBtn');

    if (aiBtn && chatWindow) {
        const clearChat = () => {
            chatMessages.innerHTML = `
                <div class="message ai-message">
                    Hello! I'm the Srivoxa AI Assistant. How can I help you today?
                </div>
            `;
            chatInput.value = '';
        };

        aiBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (chatWindow.classList.contains('show')) {
                chatWindow.classList.remove('show');
                setTimeout(clearChat, 300); // Clear after animation finishes
            } else {
                chatWindow.classList.add('show');
                chatInput.focus();
            }
        });

        closeBtn.addEventListener('click', () => {
            chatWindow.classList.remove('show');
            setTimeout(clearChat, 300); // Clear after animation finishes
        });

        const addMessage = (text, isUser = false) => {
            const msgDiv = document.createElement('div');
            msgDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
            msgDiv.textContent = text;
            chatMessages.appendChild(msgDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        };

        const addTypingIndicator = () => {
            if (document.getElementById('typingIndicator')) return; // Prevent duplicates
            const indicator = document.createElement('div');
            indicator.className = 'typing-indicator';
            indicator.id = 'typingIndicator';
            indicator.textContent = 'Srivoxa AI is typing...';
            chatMessages.appendChild(indicator);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        };

        const removeTypingIndicator = () => {
            const indicators = document.querySelectorAll('.typing-indicator');
            indicators.forEach(ind => ind.remove());
        };

        const handleSend = async () => {
            const text = chatInput.value.trim();
            if (!text) return;

            // User Message
            addMessage(text, true);
            chatInput.value = '';

            addTypingIndicator();
            
            // ==========================================
            // PASTE YOUR GEMINI API KEY BELOW:
            // ==========================================
            const API_KEY = "YOUR_GEMINI_API_KEY_HERE"; 
            
            // If the key is not the placeholder, try to use it
            if (API_KEY !== "YOUR_GEMINI_API_KEY_HERE") {
                try {
                    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
                    const promptContext = `You are Srivoxa AI, a helpful and professional assistant for Srivoxa, a web development and academic projects agency.
                    Keep your answers brief, friendly, and strictly related to web development, coding, or Srivoxa's services.
                    User says: "${text}"`;

                    const response = await fetch(endpoint, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ contents: [{ parts: [{ text: promptContext }] }] })
                    });

                    const data = await response.json();
                    removeTypingIndicator();

                    if (data.error) {
                        addMessage("API Error: Please check your API key.", false);
                    } else if (data.candidates && data.candidates.length > 0) {
                        addMessage(data.candidates[0].content.parts[0].text, false);
                    }
                } catch (error) {
                    removeTypingIndicator();
                    addMessage("Network error connecting to AI.", false);
                }
            } 
            // Otherwise, use the offline simulated AI
            else {
                setTimeout(() => {
                    removeTypingIndicator();
                    const lowerText = text.toLowerCase();
                    let response = "I'm running in offline simulation mode until an API key is provided! But feel free to explore our Services.";
                    
                    // Greetings & Identity
                    if (lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('hey')) {
                        response = "Hello there! I'm the Srivoxa AI Assistant. I can tell you about our web development services, academic projects, or help you contact our team.";
                    } else if (lowerText.includes('who are you') || lowerText.includes('name')) {
                        response = "I am Srivoxa AI, your friendly virtual assistant! I'm here to answer questions about Srivoxa's services, pricing, and capabilities.";
                    }
                    // Services & Capabilities
                    else if (lowerText.includes('service') || lowerText.includes('build') || lowerText.includes('offer')) {
                        response = "We offer Custom Web Development, Software Engineering, and Academic Project guidance. Check out our Services section for more details!";
                    } else if (lowerText.includes('academic') || lowerText.includes('project') || lowerText.includes('student')) {
                        response = "We specialize in helping students build robust academic projects, complete with documentation and modern tech stacks to help you score top grades.";
                    } else if (lowerText.includes('tech') || lowerText.includes('stack') || lowerText.includes('react') || lowerText.includes('node') || lowerText.includes('database')) {
                        response = "We work with modern technologies like React, Node.js, Python, MongoDB, and PostgreSQL to ensure your applications are fast, secure, and scalable.";
                    } else if (lowerText.includes('portfolio') || lowerText.includes('work') || lowerText.includes('example')) {
                        response = "You can view our recent projects in the 'Our Latest Work' section above. We've built e-commerce platforms, AI dashboards, and more!";
                    }
                    // Pricing & Time
                    else if (lowerText.includes('pricing') || lowerText.includes('cost') || lowerText.includes('price') || lowerText.includes('money') || lowerText.includes('rupees') || lowerText.includes('charge')) {
                        response = "Our academic projects start at ₹1,999. Professional web apps begin at ₹4,999, and E-commerce platforms start at ₹9,999. We also provide custom quotes for enterprise solutions.";
                    } else if (lowerText.includes('time') || lowerText.includes('long') || lowerText.includes('fast') || lowerText.includes('deadline') || lowerText.includes('deliver')) {
                        response = "Delivery timelines depend on project scope. Academic projects and basic landing pages take 3-7 days. Advanced full-stack applications take 2-4 weeks. We strictly adhere to agreed deadlines.";
                    }
                    // Contact & Support
                    else if (lowerText.includes('contact') || lowerText.includes('email') || lowerText.includes('human') || lowerText.includes('talk') || lowerText.includes('call') || lowerText.includes('number')) {
                        response = "You can connect with our team via the Contact form at the bottom of the page, or email us directly at hello@srivoxa.com. We typically respond within 24 hours.";
                    } else if (lowerText.includes('support') || lowerText.includes('help') || lowerText.includes('maintenance')) {
                        response = "All our enterprise and custom web projects come with complimentary technical support and maintenance for the first 6 months. Use the contact form below for immediate assistance.";
                    }
                    // Company Info
                    else if (lowerText.includes('company') || lowerText.includes('about') || lowerText.includes('srivoxa')) {
                        response = "Srivoxa is a premier software development agency dedicated to helping students, startups, and businesses build modern, reliable, and scalable applications.";
                    }
                    // Polite closings
                    else if (lowerText.includes('thank') || lowerText.includes('thanks')) {
                        response = "You're very welcome! Let me know if you need anything else.";
                    } else if (lowerText.includes('bye') || lowerText.includes('goodbye')) {
                        response = "Goodbye! Have a fantastic day and we hope to work with you soon!";
                    }
                    
                    addMessage(response, false);
                }, 1000 + Math.random() * 800);
            }
        };

        sendBtn.addEventListener('click', handleSend);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSend();
            }
        });
        // 9. Dynamic Page Title & Nav Active State Observer
        const sections = document.querySelectorAll('section, main#home');
        const navLinks = document.querySelectorAll('.desktop-nav-pill a, .mobile-nav-menu a');
        
        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    if (!id) return; // Skip sections without an ID (like CTA)
                    
                    let titleName = "Home";
                    if (id !== 'home') {
                        titleName = id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                    }
                    document.title = `Srivoxa | ${titleName}`;
                    
                    // Update Active Nav Links
                    navLinks.forEach(link => {
                        const href = link.getAttribute('href');
                        if (href === `#${id}` || (id === 'home' && href === '#top')) {
                            link.classList.add('active');
                        } else {
                            link.classList.remove('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            sectionObserver.observe(section);
        });

        // 10. Live Tech News Fetcher (Hacker News API)
        const fetchLiveTechNews = async () => {
            const slider = document.getElementById('techNewsSlider');
            if (!slider) return;

            try {
                // Fetch top stories IDs
                const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
                const storyIds = await response.json();
                
                // Get the top 9 stories for the slider
                const top9Ids = storyIds.slice(0, 9);
                
                // Fetch details for each story
                const storyPromises = top9Ids.map(id => 
                    fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.json())
                );
                const stories = await Promise.all(storyPromises);
                
                // Build the HTML
                slider.innerHTML = ''; // Clear loading text
                
                stories.forEach(story => {
                    if (story && story.title && story.url) {
                        const articleCard = document.createElement('article');
                        articleCard.className = 'blog-card';
                        
                        // Generate a unique image based on the Hacker News ID
                        const imageUrl = `https://picsum.photos/seed/${story.id}/400/300`;
                        
                        articleCard.innerHTML = `
                            <div class="blog-image">
                                <img src="${imageUrl}" alt="Tech News Image">
                                <div class="blog-date">Live</div>
                            </div>
                            <div class="blog-content">
                                <div class="blog-category">Tech News</div>
                                <h3>${story.title}</h3>
                                <a href="${story.url}" target="_blank" rel="noopener noreferrer" class="btn-read-more">Read Article &rarr;</a>
                            </div>
                        `;
                        slider.appendChild(articleCard);
                    }
                });

                // Add slider button logic
                const prevBtn = document.getElementById('newsPrevBtn');
                const nextBtn = document.getElementById('newsNextBtn');
                
                if (prevBtn && nextBtn) {
                    const scrollAmount = 380; // Card width + gap
                    
                    prevBtn.addEventListener('click', () => {
                        slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                    });
                    
                    nextBtn.addEventListener('click', () => {
                        slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                    });
                }

            } catch (error) {
                console.error("Failed to fetch live tech news", error);
                slider.innerHTML = '<p style="padding: 20px;">Failed to load news. Check back later.</p>';
            }
        };

        fetchLiveTechNews();
        
        // Auto-refresh the news every 5 minutes (300,000 milliseconds)
        setInterval(fetchLiveTechNews, 300000);
    }
    
    // Pricing slider button logic
    const pricingPrevBtn = document.getElementById('pricingPrevBtn');
    const pricingNextBtn = document.getElementById('pricingNextBtn');
    const pricingSlider = document.getElementById('pricingSlider');
    
    if (pricingPrevBtn && pricingNextBtn && pricingSlider) {
        const pricingScrollAmount = 330; // Card width + gap
        
        pricingPrevBtn.addEventListener('click', () => {
            pricingSlider.scrollBy({ left: -pricingScrollAmount, behavior: 'smooth' });
        });
        
        pricingNextBtn.addEventListener('click', () => {
            pricingSlider.scrollBy({ left: pricingScrollAmount, behavior: 'smooth' });
        });
    }

    // 11. Duplicate Reviews for Endless Marquee
    const reviewsMarquee = document.getElementById('reviewsMarquee');
    if (reviewsMarquee) {
        reviewsMarquee.innerHTML += reviewsMarquee.innerHTML;
    }
});

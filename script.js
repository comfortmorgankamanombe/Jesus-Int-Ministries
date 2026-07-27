// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });
}

// Close mobile menu when clicking a link (the "More" dropdown toggle is
// handled separately below since it opens a submenu, not a destination)
document.querySelectorAll('.nav-link:not(.nav-dropdown-toggle)').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    }

    // Update active state
    document.querySelectorAll('.nav-link').forEach(item => {
      item.classList.remove('active');
    });
    link.classList.add('active');
  });
});

// "More" nav dropdown
document.querySelectorAll('.nav-dropdown-toggle').forEach(toggle => {
  const dropdown = toggle.closest('.nav-dropdown');

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = dropdown.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });
});

document.addEventListener('click', (e) => {
  document.querySelectorAll('.nav-dropdown.open').forEach(dropdown => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('open');
      dropdown.querySelector('.nav-dropdown-toggle').setAttribute('aria-expanded', 'false');
    }
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.nav-dropdown.open').forEach(dropdown => {
      dropdown.classList.remove('open');
      dropdown.querySelector('.nav-dropdown-toggle').setAttribute('aria-expanded', 'false');
    });
  }
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Slider Functionality
if (document.querySelector('.slides')) {
  let currentSlide = 0;
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.querySelector('.slider-dots');
  
  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      goToSlide(i);
    });
    dotsContainer.appendChild(dot);
  });
  
  function goToSlide(slideIndex) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === slideIndex);
    });
    
    document.querySelectorAll('.dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === slideIndex);
    });
    
    currentSlide = slideIndex;
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    goToSlide(currentSlide);
  }
  
  // Auto-advance slides every 5 seconds
  setInterval(nextSlide, 5000);
}

// Gallery Functionality
if (document.querySelector('.gallery-container')) {
  let currentGalleryIndex = 0;
  const galleryItems = document.querySelectorAll('.gallery-item');
  const totalItems = galleryItems.length;

  function showGalleryItem(index) {
    galleryItems.forEach(item => item.style.display = 'none');
    galleryItems[index].style.display = 'block';
  }

  if (document.querySelector('.gallery-prev')) {
    document.querySelector('.gallery-prev').addEventListener('click', () => {
      currentGalleryIndex = (currentGalleryIndex - 1 + totalItems) % totalItems;
      showGalleryItem(currentGalleryIndex);
    });
  }

  if (document.querySelector('.gallery-next')) {
    document.querySelector('.gallery-next').addEventListener('click', () => {
      currentGalleryIndex = (currentGalleryIndex + 1) % totalItems;
      showGalleryItem(currentGalleryIndex);
    });
  }

  // Initialize gallery
  if (galleryItems.length > 0) {
    showGalleryItem(currentGalleryIndex);
  }
}

// FAQ Toggle Functionality
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const faqItem = question.parentElement;
    const answer = question.nextElementSibling;
    const icon = question.querySelector('i');
    
    // Toggle this item
    faqItem.classList.toggle('active');
    
    // Close other items
    document.querySelectorAll('.faq-item').forEach(item => {
      if (item !== faqItem) {
        item.classList.remove('active');
        item.querySelector('.faq-question i').classList.replace('fa-chevron-up', 'fa-chevron-down');
      }
    });
    
    // Toggle icon
    if (faqItem.classList.contains('active')) {
      icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
    } else {
      icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
    }
  });
});

// Chatbot Functionality
const chatbotToggler = document.getElementById('chatbot-toggler');
const chatbot = document.getElementById('chatbot');
const closeChat = document.querySelector('.close-chat');
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

if (chatbotToggler && chatbot) {
  // Toggle chatbot visibility
  chatbotToggler.addEventListener('click', () => {
    chatbot.classList.toggle('active');
    // Focus input when chatbot opens
    if (chatbot.classList.contains('active')) {
      setTimeout(() => {
        userInput.focus();
      }, 300);
    }
  });
  
  closeChat.addEventListener('click', () => {
    chatbot.classList.remove('active');
  });
  
  // Hardcoded chatbot responses
  const botResponses = {
    'hello': 'Hello! How can I help you today?',
    'hi': 'Hi there! What would you like to know about our ministry?',
    'service': 'Our service is every Sunday from 8:00 AM at Rusununguko Street, New Marimba. Includes worship, prophecy, undiluted word and miracles.',
    'time': 'We meet every Sunday from 8:00 AM for our powerful service.',
    'sunday': 'Join us every Sunday from 8:00 AM for worship, the Word, and prayer with manifestations of God\'s power.',
    'prayer': 'We pray for everyone during our Sunday service. You can also submit prayer requests through our contact form or WhatsApp.',
    'location': 'We are located at Rusununguko Street, New Marimba, Harare. Services every Sunday from 8:00 AM.',
    'address': 'Our physical address is Rusununguko Street, New Marimba. See you Sunday at 8:00 AM!',
    'contact': 'You can reach us at +263 785 585 244 (WhatsApp) or +263 772 401 528',
    'donate': 'Thank you for your interest in supporting the ministry! You can donate via Ecocash (+263 772 401 528 - E. Saupinda) or through our donation form.',
    'sermon': 'You can read our latest sermons and Bible teachings on The Word page.',
    'founder': 'The founder of JESUS International Ministries is Jesus Christ. Prophet J. Chikambure is the general overseer from 2020 under Prophet T.B. Joshua.',
    'prophet': 'Our ministry is led by Prophet J. Chikambure, who was spiritually fathered by Prophet T.B. Joshua.',
    'children': 'We have a vibrant children\'s ministry during our Sunday services from 8:00 AM.',
    'healing': 'We believe in God\'s power to heal. Join us Sundays from 8:00 AM for prayer and healing.',
    'deliverance': 'God is setting people free every Sunday during our services from 8:00 AM.'
  };
  
  // Default fallback response
  const defaultResponse = "I'm sorry, I didn't understand that. You can ask about:<br>- Service times (Sundays from 8:00 AM)<br>- Location (Rusununguko Street, New Marimba)<br>- Prayer requests<br>- Our founder (Jesus Christ with Prophet J. Chikambure as overseer)";
  
  // Process user message
  function processUserMessage(message) {
    message = message.toLowerCase();

    // Check for matching keywords as whole words, so short keywords like
    // "hi" don't false-match inside words like "which" or "history"
    for (const [keyword, response] of Object.entries(botResponses)) {
      if (new RegExp(`\\b${keyword}\\b`).test(message)) {
        return response;
      }
    }

    return defaultResponse;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Add message to chat
  function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('message-content');
    // Bot responses contain intentional <br> markup; user input is escaped
    // so typed HTML/script text can't be rendered as markup
    contentDiv.innerHTML = `<p>${isUser ? escapeHtml(content) : content}</p>`;

    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  
  // Handle send button click
  if (sendBtn) {
    sendBtn.addEventListener('click', sendMessage);
  }
  
  // Handle Enter key
  if (userInput) {
    userInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  }
  
  function sendMessage() {
    const message = userInput.value.trim();
    if (message === '') return;
    
    // Add user message
    addMessage(message, true);
    userInput.value = '';
    
    // Simulate typing delay
    setTimeout(() => {
      const response = processUserMessage(message);
      addMessage(response);
    }, 500); // Reduced delay for smoother experience
  }
}

// Function to send form data to WhatsApp
function sendToWhatsApp(form, formType) {
    // Prevent default form submission
    event.preventDefault();
    
    // Get form values
    const name = form.querySelector('[name="name"]').value;
    const phone = form.querySelector('[name="phone"]').value;
    
    // Create WhatsApp message based on form type
    let message = '';
    
    if (formType === 'contact') {
        const userMessage = form.querySelector('[name="message"]').value;
        message = `New Contact Form Submission:\n\nName: ${name}\nPhone: ${phone}\nMessage: ${userMessage}`;
    } else if (formType === 'donation') {
        const amount = form.querySelector('[name="amount"]').value;
        message = `New Donation Form Submission:\n\nName: ${name}\nPhone: ${phone}\nAmount: $${amount} USD`;
    }
    
    // Encode message for URL (using proper line breaks)
    const encodedMessage = encodeURIComponent(message).replace(/%0A/g, '%0D%0A');
    
    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/263785585244?text=${encodedMessage}`, '_blank');
    
    // Reset form
    form.reset();
    
    return false;
}

// Set first FAQ as active by default if exists
if (document.querySelector('.faq-item')) {
  document.querySelector('.faq-item').classList.add('active');
}

// Keep footer copyright year current
const copyrightYearEl = document.getElementById('copyright-year');
if (copyrightYearEl) {
  copyrightYearEl.textContent = new Date().getFullYear();
}